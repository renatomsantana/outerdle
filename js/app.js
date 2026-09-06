/* =====================================================================
   Outerdle — motor do jogo
   ===================================================================== */
(() => {
  "use strict";

  /* Conteúdo: js/data.js é gerado por tools/build.js a partir de src/dados.js.
     Decodificado só em memória; nada fica em variável global. */
  function loadData() {
    const blob = window.__ow; delete window.__ow;
    if (typeof blob !== "string") return null;
    try {
      const raw = atob(blob), key = "vinte-e-dois-minutos-ate-a-supernova";
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch { return null; }
  }
  const DATA = loadData();
  if (!DATA) {
    document.body.innerHTML = "<p style='padding:40px;text-align:center'>Não foi possível carregar os dados. Rode <code>node tools/build.js</code>.</p>";
    return;
  }
  const { LOCAIS, COLS_LOCAIS, PERSONAGENS, COLS_PERSONAGENS } = DATA;

  /* ---------- utilidades ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;

  const store = {
    get(k, d = null) { try { const v = localStorage.getItem("outerdle:" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("outerdle:" + k, JSON.stringify(v)); } catch { /* sem storage */ } },
    clear() { try { Object.keys(localStorage).filter(k => k.startsWith("outerdle:")).forEach(k => localStorage.removeItem(k)); } catch { /* sem storage */ } }
  };

  /* ---------- dia ---------- */
  const EPOCH = Date.UTC(2026, 8, 6);                       // 6 de setembro de 2026 = Outerdle #1
  /* O dia vira à meia-noite no horário local do jogador. */
  function todayIndex() {
    const n = new Date();
    return Math.round((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - EPOCH) / 864e5);
  }
  let dayIndex = todayIndex();
  let dayNum = dayIndex + 1;
  function msToMidnight() {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1) - n;
  }
  function fmtClock(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return [s / 3600, s % 3600 / 60, s % 60].map(x => String(Math.floor(x)).padStart(2, "0")).join(":");
  }

  /* ---------- sorteio determinístico ---------- */
  function mulberry32(a) {
    return () => {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hash(str) {
    let h = 1779033703 ^ str.length;
    for (const ch of str) { h = Math.imul(h ^ ch.charCodeAt(0), 3432918353); h = h << 13 | h >>> 19; }
    return h >>> 0;
  }
  function shuffled(arr, seed) {
    const a = arr.slice(), rnd = mulberry32(seed);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  /* Cada "época" de N dias percorre todos os itens sem repetir.
     Na virada de época, os itens que saíram nos últimos N/4 dias não podem
     aparecer nos primeiros N/4 dias da época seguinte. Assim o intervalo
     mínimo entre repetições fica em torno de N/4 dias e o típico em N dias. */
  const permCache = {};
  function epochPerm(pool, modeId, epoch) {
    const ck = `${modeId}:${epoch}:${pool.length}`;
    if (permCache[ck]) return permCache[ck];
    const n = pool.length, k = Math.floor(n / 4);
    const perm = shuffled(pool, hash(`${modeId}:${epoch}`));
    if (k > 0 && epoch > 0) {
      const prevTail = new Set(epochPerm(pool, modeId, epoch - 1).slice(n - k));
      for (let i = 0; i < k; i++) {
        if (!prevTail.has(perm[i])) continue;
        for (let j = n - 1; j >= k; j--) {
          if (!prevTail.has(perm[j])) { [perm[i], perm[j]] = [perm[j], perm[i]]; break; }
        }
      }
    }
    return (permCache[ck] = perm);
  }
  function seqItem(pool, modeId, day) {
    const n = pool.length, epoch = Math.floor(day / n), pos = ((day % n) + n) % n;
    return epochPerm(pool, modeId, epoch)[pos];
  }
  /* Se dois modos sorteariam o mesmo item no mesmo dia, o segundo pega um
     substituto que não apareça nem nos k dias anteriores nem nos k seguintes. */
  function dailyTarget(pool, modeId, day, avoid) {
    const t = seqItem(pool, modeId, day), n = pool.length;
    if (!avoid || t !== avoid || n < 2) return t;
    const k = Math.max(1, Math.floor(n / 4));
    for (let o = 0; o < n; o++) {
      const c = seqItem(pool, modeId, day + (n >> 1) + o);
      if (c === avoid) continue;
      let ok = true;
      for (let d = day - k; d <= day + k && ok; d++) if (seqItem(pool, modeId, d) === c) ok = false;
      if (ok) return c;
    }
    return t;
  }
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  /* ---------- modos ---------- */
  const MODES = [
    { id: "locais", label: "Locais", kind: "grid", items: LOCAIS, cols: COLS_LOCAIS,
      title: "Adivinhe o local de hoje", sub: "Pode estar em qualquer corpo celeste", placeholder: "Nome do local...",
      hintIdx: [1, 3] },
    { id: "personagens", label: "Personagens", kind: "grid", items: PERSONAGENS, cols: COLS_PERSONAGENS,
      title: "Adivinhe o personagem de hoje", sub: "Pode ser qualquer personagem, qualquer um mesmo", placeholder: "Nome do personagem...",
      hintIdx: [0, 1] },
    { id: "diario", label: "Diário", kind: "hints", items: LOCAIS.filter(l => l.diario),
      title: "De onde é esse registro?", sub: "Ache o local com entradas do diário de bordo", placeholder: "Nome do local..." }
  ];
  const modeById = id => MODES.find(m => m.id === id) || MODES[0];

  /* ---------- configurações ---------- */
  const settings = Object.assign({ dlc: false, contrast: false, anim: true, seenHelp: false, hard: false, helper: false }, store.get("settings", {}));
  /* dificuldade: no modo difícil não há dicas extras e o Diário tem menos tentativas */
  const hintsAt = () => settings.hard ? [] : [4, 6];
  const maxTries = m => m.kind === "hints" ? (settings.hard ? 4 : 6) : 0;
  function applySettings() {
    document.documentElement.dataset.contrast = settings.contrast ? "1" : "0";
    document.documentElement.dataset.anim = settings.anim ? "1" : "0";
  }
  function saveSettings() { store.set("settings", settings); applySettings(); }

  /* ---------- estado ---------- */
  let modeId = store.get("mode", "locais");
  if (!MODES.some(m => m.id === modeId)) modeId = "locais";
  let free = false;
  let viewDay = dayIndex;                                   // dia sendo jogado (arquivo permite dias anteriores)
  const daily = {}, freeGames = {};

  const poolFor = mode => mode.items.filter(i => !i.dlc || settings.dlc);
  const statusOf = (mode, guesses, target) =>
    guesses.includes(target) ? "won" : (maxTries(mode) && guesses.length >= maxTries(mode)) ? "lost" : "playing";
  const dayKey = (mode, day) => `${mode.id}:${day}`;
  const dayDate = day => new Date(EPOCH + day * 864e5);
  const fmtDate = day => dayDate(day).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" });

  function makeDaily(mode, day) {
    const pool = mode.items.filter(i => !i.dlc);
    const avoid = mode.id === "diario" ? dailyTarget(LOCAIS.filter(i => !i.dlc), "locais", day) : null;
    const target = dailyTarget(pool, mode.id, day, avoid);
    const saved = store.get(dayKey(mode, day), []);
    const guesses = (Array.isArray(saved) ? saved : []).map(id => mode.items.find(i => i.id === id)).filter(Boolean);
    return { mode, day, target, guesses, free: false, status: statusOf(mode, guesses, target), revealed: false };
  }
  function makeFree(mode) {
    return { mode, day: dayIndex, target: pick(poolFor(mode)), guesses: [], free: true, status: "playing", revealed: false };
  }
  function dailyGame(mode, day = dayIndex) {
    const k = dayKey(mode, day);
    return daily[k] || (daily[k] = makeDaily(mode, day));
  }
  function current() {
    const mode = modeById(modeId);
    if (free) return freeGames[mode.id] || (freeGames[mode.id] = makeFree(mode));
    return dailyGame(mode, viewDay);
  }
  const isToday = g => !g.free && g.day === dayIndex;

  /* Quantos itens ainda são compatíveis com todas as respostas até agora */
  function candidates(g) {
    const m = g.mode;
    return poolFor(m).filter(c => g.guesses.every(it => m.cols.every(col => {
      const a = compare(col, it[col.k], c[col.k]), b = compare(col, it[col.k], g.target[col.k]);
      return a.cls === b.cls && a.arrow === b.arrow;
    })));
  }

  /* ---------- estatísticas ---------- */
  const statsOf = id => Object.assign({ played: 0, wins: 0, streak: 0, max: 0, last: null, dist: {} }, store.get("stats:" + id, {}));
  function record(g) {
    const s = statsOf(g.mode.id);
    if (s.last === dayIndex) return;                         // já contabilizado
    const won = g.status === "won", n = g.guesses.length;
    s.played++;
    if (won) { s.wins++; s.streak = s.last === dayIndex - 1 ? s.streak + 1 : 1; s.max = Math.max(s.max, s.streak); }
    else s.streak = 0;
    s.last = dayIndex;
    const key = !won ? "X" : maxTries(g.mode) ? String(n) : n >= 7 ? "7+" : String(n);
    s.dist[key] = (s.dist[key] || 0) + 1;
    store.set("stats:" + g.mode.id, s);
  }

  /* ---------- comparação ---------- */
  function compare(col, a, b) {
    if (col.type === "num") {
      if (a === null || b === null) return { cls: a === b ? "ok" : "no", text: a === null ? "Varia" : String(a) };
      if (a === b) return { cls: "ok", text: String(a) };
      return { cls: "no", text: String(a), arrow: a < b ? "↑" : "↓",
               title: a < b ? "O alvo está mais longe do Sol" : "O alvo está mais perto do Sol" };
    }
    if (a === b) return { cls: "ok", text: a };
    if (col.near && col.near.some(grp => grp.includes(a) && grp.includes(b))) return { cls: "near", text: a };
    return { cls: "no", text: a };
  }
  const CLS_LABEL = { ok: "correto", near: "parcial", no: "errado" };

  /* ---------- chute ---------- */
  function findItem(mode, q) {
    const nq = norm(q);
    if (!nq) return null;
    return poolFor(mode).find(i => i.id === q || norm(i.nome) === nq || (i.alias || []).some(a => norm(a) === nq)) || null;
  }
  function guess(q) {
    const g = current();
    if (g.status !== "playing") return;
    const item = findItem(g.mode, q);
    if (!item) { shake(); toast("Não achei esse nome. Escolha um da lista."); return; }
    if (g.guesses.includes(item)) { shake(); toast("Você já tentou esse."); return; }
    g.guesses.push(item);
    g.status = statusOf(g.mode, g.guesses, g.target);
    if (!g.free) store.set(dayKey(g.mode, g.day), g.guesses.map(i => i.id));
    input.value = "";
    closeList();
    if (g.status !== "playing" && isToday(g)) record(g);
    render(true);
    if (g.status === "playing") input.focus();
  }

  /* ---------- render ---------- */
  const input = $("#guess"), goBtn = $("#go"), list = $("#list"), board = $("#board"), result = $("#result");

  function render(animate = false) {
    const mode = modeById(modeId), g = current();
    renderModes();

    const archive = !free && viewDay !== dayIndex;
    $("#title").textContent = mode.title;
    $("#subtitle").textContent = g.free ? "Modo livre: alvo aleatório, sem afetar as estatísticas"
      : archive ? `Arquivo: desafio #${viewDay + 1}, de ${fmtDate(viewDay)}. Não conta pras estatísticas.` : mode.sub;
    $("#seg-daily").classList.toggle("on", !free);
    $("#seg-daily").innerHTML = archive ? `#${viewDay + 1}` : `Hoje #${dayNum}`;
    $("#seg-free").classList.toggle("on", free);
    $("#freebar").classList.toggle("hidden", !free);
    $("#archivebar").classList.toggle("hidden", !archive);
    $("#clock").classList.toggle("hidden", free || archive);
    $("#btn-giveup").disabled = g.status !== "playing";

    const playing = g.status === "playing";
    input.disabled = !playing; goBtn.disabled = !playing;
    input.placeholder = playing ? mode.placeholder : (g.status === "won" ? "Você acertou!" : "Fim das tentativas");

    board.innerHTML = mode.kind === "grid" ? gridHTML(g, animate) : hintsHTML(g, animate);
    renderResult(g);
  }

  function renderModes() {
    $("#modes").innerHTML = MODES.map(m => {
      const st = dailyGame(m).status;
      const dot = st === "playing" ? "" : `<i class="dot ${st}" title="${st === "won" ? "Concluído hoje" : "Encerrado hoje"}"></i>`;
      return `<button class="mode ${m.id === modeId ? "on" : ""}" data-mode="${m.id}" role="tab" aria-selected="${m.id === modeId}">
        ${m.label}${dot}</button>`;
    }).join("");
  }

  function extraHintsHTML(g) {
    const m = g.mode, n = g.guesses.length, done = g.status !== "playing";
    return `<div class="hints">${hintsAt().map((at, i) => {
      const open = done || n >= at, txt = g.target.dicas[m.hintIdx[i]];
      const rem = at - n, falta = rem === 1 ? "Falta 1 chute" : `Faltam ${rem} chutes`;
      return open
        ? `<div class="hint"><b>Dica ${i + 1}</b><span>${esc(txt)}</span></div>`
        : `<div class="hint locked"><span>${falta} para liberar a dica ${i + 1}</span></div>`;
    }).join("")}</div>`;
  }

  function gridHTML(g, animate) {
    const m = g.mode;
    let html = extraHintsHTML(g);
    if (!g.guesses.length) {
      html += `<p class="empty">Nenhuma tentativa ainda. ${plural(poolFor(m).length, "opção possível", "opções possíveis")}.</p>`;
      return html;
    }
    html += `<div class="grid-wrap"><div class="grid" style="--cols:${m.cols.length}" role="table" aria-label="Tentativas">`;
    html += `<div class="head" role="columnheader">${m.id === "personagens" ? "Personagem" : "Local"}</div>`;
    html += m.cols.map(c => `<div class="head" role="columnheader" title="${esc(c.title || "")}">${esc(c.l)}</div>`).join("");
    [...g.guesses].reverse().forEach((it, ri) => {
      const isNew = animate && ri === 0;
      html += `<div class="row" role="row"><div class="tile name" role="cell">${esc(it.nome)}</div>`;
      m.cols.forEach((c, ci) => {
        const r = compare(c, it[c.k], g.target[c.k]);
        const style = isNew ? `style="animation-delay:${ci * 0.12}s"` : `style="animation:none"`;
        html += `<div class="tile ${r.cls}" role="cell" data-l="${esc(c.l)}" ${style} title="${esc(r.title || CLS_LABEL[r.cls])}" aria-label="${esc(c.l)}: ${esc(r.text)}, ${CLS_LABEL[r.cls]}">
          <span>${esc(r.text)}</span>${r.arrow ? `<small>${r.arrow}</small>` : ""}</div>`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;
    if (g.status === "playing" && settings.helper) {
      const n = candidates(g).length;
      html += `<p class="empty">${n === 1 ? "Só 1 opção ainda bate com as respostas." : `${n} opções ainda batem com as respostas.`}</p>`;
    }
    return html;
  }

  function hintsHTML(g, animate) {
    const m = g.mode, n = g.guesses.length, done = g.status !== "playing";
    const log = g.target.diario || g.target.dicas;
    const shown = done ? log.length : Math.min(n + 1, log.length);
    const max = maxTries(m);
    let html = `<div class="tries" aria-label="Tentativas">${Array.from({ length: max }, (_, i) => {
      const it = g.guesses[i];
      const cls = !it ? (i === n && !done ? "cur" : "") : it === g.target ? "ok" : "no";
      return `<i class="${cls}"></i>`;
    }).join("")}<span>${done ? "Encerrado" : `Tentativa ${n + 1} de ${max}`}</span></div>`;

    html += `<div class="log">${log.map((d, i) => {
      const open = i < shown, isNew = animate && open && i === shown - 1 && !done;
      return `<div class="entry ${open ? "" : "locked"} ${isNew ? "new" : ""}">
        <b>Registro ${i + 1}</b><span>${open ? esc(d) : "Libera após a próxima tentativa"}</span></div>`;
    }).join("")}</div>`;

    if (n) html += `<div class="chips">${g.guesses.map(it =>
      `<span class="chip ${it === g.target ? "ok" : "no"}">${it === g.target ? "✓" : "✗"} ${esc(it.nome)}</span>`).join("")}</div>`;
    return html;
  }

  function emojiRows(g) {
    const M = { ok: "🟩", near: "🟧", no: "🟥" };
    if (g.mode.kind === "grid")
      return g.guesses.map(it => g.mode.cols.map(c => M[compare(c, it[c.k], g.target[c.k]).cls]).join("")).join("\n");
    return g.guesses.map(it => it === g.target ? "🟩" : "🟥").join("");
  }
  function shareText(g) {
    const n = g.guesses.length, m = g.mode;
    const max = maxTries(m);
    const head = max ? `${g.status === "won" ? n : "X"}/${max}` : plural(n, "tentativa", "tentativas");
    const star = settings.hard ? " ★" : "";
    return `Outerdle ${m.label} #${g.day + 1} — ${head}${star}\n${emojiRows(g)}\n#Outerdle #OuterWilds`;
  }
  function siteURL() {
    if (!location.protocol.startsWith("http")) return "";
    return location.origin + location.pathname.replace(/index\.html$/, "");
  }

  function renderResult(g) {
    if (g.status === "playing") { result.classList.add("hidden"); result.innerHTML = ""; return; }
    const won = g.status === "won", t = g.target, n = g.guesses.length;
    const s = statsOf(g.mode.id);
    const stats = !isToday(g) ? "" : `<div class="stats">
        <div><b>${n}</b>${n === 1 ? "tentativa" : "tentativas"}</div>
        <div><b>${s.streak}</b>dias seguidos</div>
        <div><b>${s.wins}</b>${s.wins === 1 ? "vitória" : "vitórias"}</div></div>`;
    const actions = g.free
      ? `<button class="btn" id="res-new">Novo alvo</button><button class="btn ghost" id="res-daily">Voltar pro desafio do dia</button>`
      : isToday(g)
        ? `<button class="btn" id="res-share">Compartilhar</button><button class="btn ghost" id="res-free">Jogar modo livre</button>`
        : `<button class="btn" id="res-share">Compartilhar</button><button class="btn ghost" id="res-archive">Outro dia do arquivo</button><button class="btn ghost" id="res-today">Voltar pra hoje</button>`;
    result.innerHTML = `
      <div class="res-head ${won ? "won" : "lost"}">
        <h2>${won ? (g.revealed ? "Revelado" : "Acertou!") : g.revealed ? "Revelado" : "Não foi dessa vez"}</h2>
      </div>
      <p class="name">${esc(t.nome)}</p>
      <p class="desc">${esc(t.desc || "")}</p>
      ${stats}
      ${g.revealed ? "" : `<pre class="quad" aria-label="Resultado em emojis">${emojiRows(g)}</pre>`}
      <div class="actions">${actions}</div>
      ${g.revealed ? "" : socialHTML(g)}
      ${isToday(g) ? `<div class="timer">Próximo desafio em <b class="cd">${fmtClock(msToMidnight())}</b></div>` : ""}`;
    result.classList.remove("hidden");

    $("#res-share")?.addEventListener("click", () => share(g));
    $("#res-free")?.addEventListener("click", () => setFree(true));
    $("#res-new")?.addEventListener("click", newFree);
    $("#res-daily")?.addEventListener("click", () => setFree(false));
    $("#res-archive")?.addEventListener("click", () => openModal(archiveHTML(modeId)));
    $("#res-today")?.addEventListener("click", () => setDay(dayIndex));
    if (won && !g.revealed && isToday(g)) launchConfetti();
  }

  /* ---------- arquivo ---------- */
  function setDay(day) {
    viewDay = Math.max(0, Math.min(dayIndex, day)); free = false;
    input.value = ""; closeList(); closeModal(); render(); input.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function archiveHTML(id) {
    const m = modeById(id);
    const days = [];
    for (let d = dayIndex; d >= 0; d--) days.push(d);
    const rows = days.map(d => {
      const g = dailyGame(m, d);
      const st = g.status === "won" ? `<b class="ok">✓ ${g.guesses.length}</b>` : g.status === "lost" ? `<b class="no">✗</b>`
        : g.guesses.length ? `<b>${g.guesses.length} em andamento</b>` : `<b class="muted">—</b>`;
      return `<button class="day ${d === viewDay && !free ? "on" : ""}" data-day="${d}"><span>#${d + 1}</span><small>${fmtDate(d)}</small>${st}</button>`;
    }).join("");
    return `
      <h3>Arquivo</h3>
      <div class="chips tabs">${MODES.map(x => `<button class="chip ${x.id === id ? "on" : ""}" data-archive="${x.id}">${x.label}</button>`).join("")}</div>
      <p class="small">Jogue qualquer dia desde o lançamento. Dias anteriores ficam salvos, mas só o de hoje entra nas estatísticas.</p>
      ${dayIndex <= 0 ? `<p class="small">Hoje é o primeiro dia. Volte amanhã e o arquivo começa a crescer.</p>` : ""}
      <div class="days">${rows}</div>`;
  }

  /* ---------- relógio e virada do dia ---------- */
  function tickClock() {
    const txt = fmtClock(msToMidnight());
    document.querySelectorAll(".cd").forEach(el => { el.textContent = txt; });
    if (todayIndex() !== dayIndex) newDay();
  }
  function newDay() {
    dayIndex = todayIndex(); dayNum = dayIndex + 1;
    Object.keys(daily).forEach(k => delete daily[k]);
    Object.keys(freeGames).forEach(k => delete freeGames[k]);
    viewDay = dayIndex; free = false;
    input.value = ""; closeList(); closeModal();
    render();
    toast("Meia-noite! Novo desafio disponível.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  setInterval(tickClock, 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tickClock(); });

  function socialHTML(g) {
    const text = shareText(g), url = siteURL();
    const full = encodeURIComponent(url ? `${text}\n${url}` : text);
    const links = [
      ["WhatsApp", `https://wa.me/?text=${full}`],
      ["X", `https://twitter.com/intent/tweet?text=${full}`],
      ["Telegram", `https://t.me/share/url?url=${encodeURIComponent(url || " ")}&text=${encodeURIComponent(text)}`]
    ];
    return `<div class="social">${links.map(([n, h]) =>
      `<a href="${h}" target="_blank" rel="noopener noreferrer">${n}</a>`).join("")}</div>`;
  }

  async function share(g) {
    const url = siteURL(), text = url ? `${shareText(g)}\n${url}` : shareText(g), btn = $("#res-share");
    try {
      if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) { await navigator.share({ text }); return; }
      await navigator.clipboard.writeText(text);
      if (btn) btn.textContent = "Copiado!";
      toast("Resultado copiado.");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); if (btn) btn.textContent = "Copiado!"; toast("Resultado copiado."); }
      catch { toast("Não consegui copiar. Selecione o texto manualmente."); }
      ta.remove();
    }
  }

  /* ---------- modo livre ---------- */
  function setFree(v) { free = v; if (!v) viewDay = dayIndex; if (v && !freeGames[modeId]) freeGames[modeId] = makeFree(modeById(modeId)); render(); input.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function newFree() { freeGames[modeId] = makeFree(modeById(modeId)); render(); input.focus(); }
  function giveUp() { const g = current(); if (!g.free || g.status !== "playing") return; g.status = "lost"; g.revealed = true; render(); }

  /* ---------- feedback visual ---------- */
  let toastTimer = null;
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
  function shake() { const s = $(".search"); s.classList.remove("shake"); void s.offsetWidth; s.classList.add("shake"); }
  function launchConfetti() {
    if (!settings.anim || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = document.createElement("div"); wrap.className = "confetti";
    const colors = ["#f0913f", "#3fa060", "#e0982e", "#f2eee4", "#6fa8dc"];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.6 + "s";
      p.style.animationDuration = 1.6 + Math.random() * 1.2 + "s";
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 3500);
  }

  /* ---------- autocomplete ---------- */
  let sel = -1;
  function openList() {
    const g = current(); if (g.status !== "playing") return closeList();
    const q = norm(input.value);
    const match = i => !q || norm(i.nome).includes(q) || (i.alias || []).some(a => norm(a).includes(q));
    const starts = i => norm(i.nome).startsWith(q) ? 0 : 1;
    const items = poolFor(g.mode).filter(i => !g.guesses.includes(i) && match(i))
      .sort((a, b) => starts(a) - starts(b) || a.nome.localeCompare(b.nome, "pt"));
    list.innerHTML = items.map(i =>
      `<div role="option" data-id="${i.id}"><span class="nm">${esc(i.nome)}</span>${i.dlc ? `<small>DLC</small>` : ""}</div>`).join("");
    list.style.display = items.length ? "block" : "none";
    sel = -1;
  }
  function closeList() { list.style.display = "none"; sel = -1; }
  function submitFromInput() {
    const first = list.style.display !== "none" ? list.children[sel >= 0 ? sel : 0] : null;
    guess(first ? first.dataset.id : input.value);
  }

  input.addEventListener("input", openList);
  input.addEventListener("focus", openList);
  input.addEventListener("keydown", e => {
    const opts = [...list.children];
    if (e.key === "ArrowDown") { e.preventDefault(); if (list.style.display === "none") openList(); sel = Math.min(sel + 1, opts.length - 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); }
    else if (e.key === "Enter") { e.preventDefault(); submitFromInput(); return; }
    else if (e.key === "Escape") { closeList(); return; }
    else return;
    opts.forEach((o, i) => o.classList.toggle("sel", i === sel));
    opts[sel]?.scrollIntoView({ block: "nearest" });
  });
  list.addEventListener("mousedown", e => { e.preventDefault(); const d = e.target.closest("[data-id]"); if (d) guess(d.dataset.id); });
  document.addEventListener("click", e => { if (!e.target.closest(".search")) closeList(); });
  goBtn.addEventListener("click", submitFromInput);

  /* ---------- navegação ---------- */
  $("#modes").addEventListener("click", e => {
    const b = e.target.closest("[data-mode]"); if (!b) return;
    modeId = b.dataset.mode; store.set("mode", modeId);
    input.value = ""; closeList(); render();
  });
  $("#seg-daily").addEventListener("click", () => setFree(false));
  $("#seg-free").addEventListener("click", () => setFree(true));
  $("#btn-new").addEventListener("click", newFree);
  $("#btn-giveup").addEventListener("click", giveUp);

  /* ---------- modais ---------- */
  const modal = $("#modal"), modalBody = $("#modal-body");
  function openModal(html) { modalBody.innerHTML = html; modal.classList.remove("hidden"); modal.querySelector(".close").focus(); }
  function closeModal() { modal.classList.add("hidden"); modalBody.innerHTML = ""; }
  modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".close")) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

  function helpHTML() {
    return `
      <img class="art" src="assets/riebeck.jpg" alt="Riebeck tocando banjo no Vale Incerto" loading="lazy">
      <h3>Como jogar</h3>
      <p>Todo dia tem um desafio novo em cada modo. O progresso fica salvo neste navegador.</p>
      <h4>Locais</h4>
      <p>Chute um corpo celeste. Cada coluna mostra se aquele atributo bate com o local do dia. Tentativas ilimitadas${settings.hard ? ", sem dicas extras" : `, e dicas extras aparecem depois da ${hintsAt()[0]}ª e da ${hintsAt()[1]}ª`}.</p>
      <h4>Personagens</h4>
      <p>Mesma ideia, mas com Lenhosos e Nomai: espécie, local, papel, instrumento e status.</p>
      <h4>Diário</h4>
      <p>Você recebe um registro do diário de bordo e tem ${maxTries(MODES[2])} tentativas pra dizer de que lugar ele fala. Os registros são os do próprio jogo, e cada erro libera mais um.</p>
      <div class="legend">
        <span><i style="background:var(--ok)"></i> Correto</span>
        <span><i style="background:var(--near)"></i> Parcial</span>
        <span><i style="background:var(--no)"></i> Errado</span>
      </div>
      <p class="small">Na coluna Órbita, <b>↑</b> significa que o alvo está mais longe do Sol que o seu chute, e <b>↓</b> que está mais perto. "Parcial" em Corpo aparece quando planeta e lua são vizinhos (ou as duas gêmeas), e em Nomai quando um tem estrutura ativa e o outro só ruínas.</p>
      <p class="small">Os locais incluem planetas, luas e também lugares dentro deles: cidades, laboratórios, acampamentos, ilhas e ruínas. Mais de 50 no total.</p>
      <p class="small"><b>Modo livre:</b> alvos aleatórios, quantos quiser, sem afetar as estatísticas. Dá pra ligar os itens de <em>Echoes of the Eye</em> nas configurações.</p>`;
  }

  function statsHTML(id) {
    const m = modeById(id), s = statsOf(id);
    const keys = maxTries(m) ? ["1", "2", "3", "4", "5", "6", "X"] : ["1", "2", "3", "4", "5", "6", "7+"];
    const max = Math.max(1, ...keys.map(k => s.dist[k] || 0));
    const pct = s.played ? Math.round(s.wins / s.played * 100) : 0;
    return `
      <h3>Estatísticas</h3>
      <div class="chips tabs">${MODES.map(x => `<button class="chip ${x.id === id ? "on" : ""}" data-stats="${x.id}">${x.label}</button>`).join("")}</div>
      <div class="stats">
        <div><b>${s.played}</b>${s.played === 1 ? "jogo" : "jogos"}</div>
        <div><b>${pct}%</b>vitórias</div>
        <div><b>${s.streak}</b>sequência</div>
        <div><b>${s.max}</b>recorde</div>
      </div>
      <h4>Distribuição de tentativas</h4>
      <div class="dist">${keys.map(k => {
        const v = s.dist[k] || 0;
        return `<div class="row"><span>${k}</span><div class="bar ${k === "X" ? "lost" : ""}" style="width:${Math.max(6, v / max * 100)}%">${v}</div></div>`;
      }).join("")}</div>
      ${s.played ? "" : `<p class="small">Nenhum jogo concluído neste modo ainda.</p>`}`;
  }
  modalBody.addEventListener("click", e => {
    const b = e.target.closest("[data-stats]"); if (b) modalBody.innerHTML = statsHTML(b.dataset.stats);
  });

  function settingsHTML() {
    const row = (k, label, hint) => `
      <label class="switch"><span><b>${label}</b><small>${hint}</small></span>
        <input type="checkbox" data-setting="${k}" ${settings[k] ? "checked" : ""}><i></i></label>`;
    return `
      <h3>Configurações</h3>
      ${row("hard", "Modo difícil ★", "Sem dicas extras e Diário com 4 tentativas. Marca o resultado compartilhado com ★.")}
      ${row("helper", "Contador de candidatos", "Mostra quantas opções ainda batem com as respostas. Facilita bastante.")}
      ${row("dlc", "Echoes of the Eye", "Inclui locais e personagens da expansão nas listas e no modo livre.")}
      ${row("contrast", "Alto contraste", "Troca as cores das peças por azul, laranja e cinza.")}
      ${row("anim", "Animações", "Peças virando, confete e afins.")}
      <h4>Dados</h4>
      <p class="small">Tudo fica salvo só neste navegador. Apagar remove tentativas de hoje, estatísticas e configurações.</p>
      <button class="btn ghost danger" id="reset">Apagar todos os dados</button>`;
  }
  modalBody.addEventListener("change", e => {
    const k = e.target.dataset.setting; if (!k) return;
    settings[k] = e.target.checked; saveSettings();
    if (k === "dlc") Object.keys(freeGames).forEach(id => delete freeGames[id]);
    if (k === "hard") { Object.keys(daily).forEach(id => delete daily[id]); Object.keys(freeGames).forEach(id => delete freeGames[id]); }
    render();
  });
  modalBody.addEventListener("click", e => {
    const b = e.target.closest("#reset"); if (!b) return;
    if (b.dataset.armed) { store.clear(); location.reload(); return; }
    b.dataset.armed = "1"; b.textContent = "Clique de novo pra confirmar"; b.classList.add("armed");
  });

  $("#btn-help").addEventListener("click", () => openModal(helpHTML()));
  $("#btn-stats").addEventListener("click", () => openModal(statsHTML(modeId)));
  $("#btn-settings").addEventListener("click", () => openModal(settingsHTML()));
  $("#btn-archive").addEventListener("click", () => openModal(archiveHTML(modeId)));
  $("#btn-today").addEventListener("click", () => setDay(dayIndex));
  modalBody.addEventListener("click", e => {
    const t = e.target.closest("[data-archive]"); if (t) { modalBody.innerHTML = archiveHTML(t.dataset.archive); return; }
    const d = e.target.closest("[data-day]"); if (!d) return;
    modeId = modalBody.querySelector("[data-archive].on")?.dataset.archive || modeId; store.set("mode", modeId);
    setDay(Number(d.dataset.day));
  });

  /* atalho: "/" foca o campo de chute */
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== input && modal.classList.contains("hidden")) { e.preventDefault(); input.focus(); }
  });

  /* PWA: funciona offline quando servido por http(s) */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => { /* sem service worker, sem problema */ });
  }

  /* ---------- início ---------- */
  applySettings();
  $("#daynum").textContent = dayNum;
  render(false);
  tickClock();
  if (!settings.seenHelp) { openModal(helpHTML()); settings.seenHelp = true; saveSettings(); }
})();

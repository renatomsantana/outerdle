# Outerdle

Salve o bloco abaixo como `outerdle.html` e abra no navegador.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Outerdle - Adivinhe o local de Outer Wilds</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#0d1120;
    --card:#161c30;
    --card2:#1e2640;
    --line:#2a3454;
    --text:#f2eee4;
    --muted:#98a0b8;
    --accent:#f0913f;
    --ok:#3fa060;
    --near:#e0982e;
    --no:#8a3b3b;
  }
  *{box-sizing:border-box}
  html,body{margin:0}
  body{background:var(--bg);color:var(--text);font-family:"Montserrat",sans-serif;font-size:15px;line-height:1.5;min-height:100vh}
  a{color:inherit}
  .wrap{max-width:640px;margin:0 auto;padding:24px 16px 80px}

  /* topo */
  .logo{text-align:center;margin:12px 0 20px}
  .logo h1{margin:0;font-size:44px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}
  .logo h1 b{color:var(--accent)}
  .logo p{margin:2px 0 0;color:var(--muted);font-size:13px}

  .modes{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:24px}
  .mode{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 16px;font-weight:600;font-size:14px;color:var(--muted);display:flex;align-items:center;gap:8px}
  .mode.on{border-color:var(--accent);color:var(--text)}
  .mode.soon{opacity:.5}
  .mode span{font-size:11px;font-weight:500;background:var(--card2);padding:1px 6px;border-radius:4px}

  /* caixa principal */
  .box{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px;margin-bottom:18px}
  .box h2{margin:0 0 4px;font-size:20px;font-weight:700;text-align:center}
  .box .sub{text-align:center;color:var(--muted);font-size:13px;margin:0 0 16px}

  .search{position:relative}
  .search input{width:100%;background:var(--bg);border:2px solid var(--line);color:var(--text);font:inherit;font-weight:500;padding:12px 100px 12px 14px;border-radius:10px}
  .search input:focus{outline:none;border-color:var(--accent)}
  .search button{position:absolute;right:6px;top:6px;bottom:6px;background:var(--accent);color:#1b0c02;border:0;font:inherit;font-weight:700;padding:0 16px;border-radius:7px;cursor:pointer}
  .search button:disabled{opacity:.4;cursor:default}
  .list{position:absolute;left:0;right:0;top:calc(100% + 6px);background:var(--card2);border:1px solid var(--line);border-radius:10px;max-height:260px;overflow:auto;z-index:5;display:none}
  .list div{padding:10px 14px;cursor:pointer;display:flex;align-items:center;gap:10px}
  .list div:hover,.list div.sel{background:var(--line)}
  .list i{width:10px;height:10px;border-radius:50%;background:var(--accent);flex:none;opacity:.8}

  .hints{margin-top:14px;display:flex;flex-direction:column;gap:8px}
  .hint{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px 14px;font-size:14px;display:flex;gap:10px;align-items:baseline}
  .hint b{color:var(--accent);white-space:nowrap}
  .hint.locked{color:var(--muted)}

  /* grade de tentativas */
  .grid{display:grid;grid-template-columns:1.6fr repeat(6,1fr);gap:6px;margin-top:18px}
  .grid.empty{display:none}
  .head{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);text-align:center;padding-bottom:6px;border-bottom:2px solid var(--line);margin-bottom:4px}
  .tile{aspect-ratio:1;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:8px;font-size:12px;font-weight:600;padding:4px;background:var(--card2);animation:flip .6s cubic-bezier(.2,.8,.3,1) both;overflow:hidden}
  .tile.name{aspect-ratio:auto;justify-content:flex-start;text-align:left;padding:0 10px;font-size:13px;background:var(--bg);animation:none}
  .tile.ok{background:var(--ok)}
  .tile.near{background:var(--near);color:#1d1503}
  .tile.no{background:var(--no)}
  .tile small{display:block;font-size:14px;line-height:1}
  @keyframes flip{from{transform:rotateX(90deg);opacity:0}to{transform:none;opacity:1}}
  @media (prefers-reduced-motion:reduce){.tile{animation:none}}
  @media (max-width:520px){.grid{grid-template-columns:1.4fr repeat(6,1fr)}.tile{font-size:10px}.tile.name{font-size:11px}}

  /* resultado */
  .win{text-align:center}
  .win h2{color:var(--ok);font-size:28px;margin-bottom:8px}
  .win .name{font-size:22px;font-weight:700;margin:0 0 4px}
  .win .stats{display:flex;justify-content:center;gap:24px;margin:16px 0;color:var(--muted);font-size:13px}
  .win .stats b{display:block;font-size:24px;color:var(--text)}
  .win pre{font-family:inherit;margin:0 0 14px;font-size:18px;letter-spacing:1px;line-height:1.3}
  .btn{background:var(--accent);color:#1b0c02;border:0;font:inherit;font-weight:700;padding:12px 22px;border-radius:9px;cursor:pointer}
  .btn.ghost{background:none;color:var(--text);border:1px solid var(--line);margin-left:8px}
  .timer{margin-top:14px;color:var(--muted);font-size:13px}
  .timer b{color:var(--text);font-variant-numeric:tabular-nums}

  /* como jogar */
  .how h3{margin:0 0 10px;font-size:16px}
  .how p{margin:0 0 10px;color:var(--muted);font-size:14px}
  .legend{display:flex;gap:8px;flex-wrap:wrap;font-size:13px}
  .legend span{display:flex;align-items:center;gap:6px}
  .legend i{width:16px;height:16px;border-radius:4px;display:inline-block}
  .hidden{display:none}
</style>
</head>
<body>
<div class="wrap">

  <div class="logo">
    <h1>Outer<b>dle</b></h1>
    <p>Um desafio por dia, baseado em Outer Wilds</p>
  </div>

  <div class="modes">
    <div class="mode on">🪐 Locais</div>
    <div class="mode soon">📓 Diário <span>em breve</span></div>
    <div class="mode soon">🎻 Personagens <span>em breve</span></div>
  </div>

  <div class="box" id="game">
    <h2>Adivinhe o local de hoje</h2>
    <p class="sub">Digite qualquer corpo celeste pra começar</p>

    <div class="search">
      <input id="guess" placeholder="Nome do local..." autocomplete="off" spellcheck="false">
      <button id="go">Chutar</button>
      <div class="list" id="list"></div>
    </div>

    <div class="hints" id="hints"></div>

    <div class="grid empty" id="grid"></div>
  </div>

  <div class="box win hidden" id="win"></div>

  <div class="box how">
    <h3>Como jogar</h3>
    <p>Chute um local. Cada coluna mostra se aquele atributo bate com o local do dia. Dicas extras aparecem depois da 3ª e da 5ª tentativa.</p>
    <div class="legend">
      <span><i style="background:var(--ok)"></i> Correto</span>
      <span><i style="background:var(--near)"></i> Parcial</span>
      <span><i style="background:var(--no)"></i> Errado</span>
      <span>↑↓ mais perto / mais longe do Sol</span>
    </div>
  </div>

</div>

<script>
/* ============================ DADOS ============================ */
// orbita: posição a partir do Sol (null = varia)
// nomai: "Sim" (estrutura ativa/importante), "Ruínas" (só vestígios), "Não"
const LOCAIS = [
  { nome:"Sun Station",          tipo:"Estação", orbita:1,    atm:"Não", agua:"Não", perigo:"Calor",           nomai:"Sim",
    dicas:["O experimento planejado aqui nunca funcionou.","Não dá pra chegar com a nave."] },
  { nome:"Ember Twin",           tipo:"Planeta", orbita:2,    atm:"Sim", agua:"Não", perigo:"Areia",           nomai:"Sim",
    dicas:["As cavernas vão ficando mais apertadas conforme o tempo passa.","Tem uma cidade escondida embaixo da superfície."] },
  { nome:"Ash Twin",             tipo:"Planeta", orbita:2,    atm:"Sim", agua:"Não", perigo:"Areia",           nomai:"Sim",
    dicas:["A superfície vai embora aos poucos.","Torres daqui levam pra cada um dos outros mundos."] },
  { nome:"Timber Hearth",        tipo:"Planeta", orbita:3,    atm:"Sim", agua:"Sim", perigo:"Matéria fantasma",nomai:"Ruínas",
    dicas:["Gêiseres, pinheiros e uma cratera com uma vila.","É daqui que você decola."] },
  { nome:"Attlerock",            tipo:"Lua",     orbita:3,    atm:"Não", agua:"Não", perigo:"Nenhum",          nomai:"Sim",
    dicas:["Tem um posto de observação apontado pra um sinal distante.","Alguém fica lá sozinho reclamando que ninguém visita."] },
  { nome:"Brittle Hollow",       tipo:"Planeta", orbita:4,    atm:"Sim", agua:"Não", perigo:"Buraco negro",    nomai:"Sim",
    dicas:["Pedaços do chão somem de vez em quando.","Uma cidade foi construída pendurada sob a crosta."] },
  { nome:"Hollow's Lantern",     tipo:"Lua",     orbita:4,    atm:"Não", agua:"Não", perigo:"Lava",            nomai:"Não",
    dicas:["Vai encolhendo ao longo do ciclo.","Fica jogando pedras quentes no vizinho."] },
  { nome:"Giant's Deep",         tipo:"Planeta", orbita:5,    atm:"Sim", agua:"Sim", perigo:"Ciclones",        nomai:"Sim",
    dicas:["Ilhas que não ficam paradas no lugar.","Pra chegar ao centro é preciso vencer uma corrente que empurra tudo pra fora."] },
  { nome:"Orbital Probe Cannon", tipo:"Estação", orbita:5,    atm:"Não", agua:"Não", perigo:"Vácuo",           nomai:"Sim",
    dicas:["Dispara uma vez por ciclo.","Uma parte dele já caiu."] },
  { nome:"Dark Bramble",         tipo:"Planeta", orbita:6,    atm:"Sim", agua:"Não", perigo:"Peixe-pescador",  nomai:"Ruínas",
    dicas:["Névoa por todo lado e sons que viajam longe demais.","A primeira pessoa a voar está perdida aqui dentro."] },
  { nome:"The Interloper",       tipo:"Cometa",  orbita:7,    atm:"Não", agua:"Não", perigo:"Matéria fantasma",nomai:"Ruínas",
    dicas:["Visitante gelado com uma órbita alongada.","O que ele carregava explica por que um povo inteiro sumiu."] },
  { nome:"White Hole Station",   tipo:"Estação", orbita:8,    atm:"Não", agua:"Não", perigo:"Nenhum",          nomai:"Sim",
    dicas:["Você provavelmente chegou aqui sem querer.","É o outro lado do buraco negro."] },
  { nome:"Quantum Moon",         tipo:"Lua",     orbita:null, atm:"Não", agua:"Não", perigo:"Nenhum",          nomai:"Sim",
    dicas:["Só aparece em um lugar enquanto alguém observa.","Alguém ainda está lá em cima esperando visita."] },
];
const COLS = [
  ["tipo","Tipo"],["orbita","Órbita"],["atm","Atmosfera"],["agua","Água"],["perigo","Perigo"],["nomai","Nomai"]
];
const DICA_EM = [3,5]; // tentativas que liberam cada dica

/* ============================ JOGO ============================ */
const $ = s => document.querySelector(s);
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
const hoje = new Date();
const diaN = Math.floor(Date.UTC(hoje.getFullYear(),hoje.getMonth(),hoje.getDate())/86400000);
let alvo = LOCAIS[(diaN*7) % LOCAIS.length]; // *7 só pra embaralhar a ordem dos dias
let chutes = [], ganhou = false;

// persistência (falha em silêncio se não houver storage)
const store = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch{ return null; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch{} }
};

function comparar(k, a, b){
  if(k==="orbita"){
    if(a===null || b===null) return [a===b?"ok":"no", a===null?"varia":a];
    if(a===b) return ["ok", a];
    return ["near", `${a}<small>${a<b?"↑":"↓"}</small>`];
  }
  if(k==="nomai" && a!==b && a!=="Não" && b!=="Não") return ["near", a]; // Sim x Ruínas
  return [a===b?"ok":"no", a];
}

function chutar(nome){
  const item = LOCAIS.find(l => norm(l.nome)===norm(nome));
  if(!item || chutes.includes(item) || ganhou) return;
  chutes.push(item);
  $("#guess").value=""; fecharLista();
  render(true);
  if(item===alvo) vencer();
  salvar();
}

function render(animar){
  // dicas
  $("#hints").innerHTML = alvo.dicas.map((d,i) => {
    const em = DICA_EM[i], ok = chutes.length>=em || ganhou;
    return `<div class="hint ${ok?"":"locked"}"><b>Dica ${i+1}</b>${ok?d:`libera na tentativa ${em}`}</div>`;
  }).join("");

  // grade
  const g = $("#grid");
  g.classList.toggle("empty", !chutes.length);
  if(!chutes.length){ g.innerHTML=""; return; }
  let html = `<div class="head">Local</div>` + COLS.map(([,l]) => `<div class="head">${l}</div>`).join("");
  [...chutes].reverse().forEach((c,ri) => {
    html += `<div class="tile name">${c.nome}</div>`;
    COLS.forEach(([k],ci) => {
      const [cls,txt] = comparar(k, c[k], alvo[k]);
      const delay = animar && ri===0 ? `style="animation-delay:${ci*.12}s"` : `style="animation:none"`;
      html += `<div class="tile ${cls}" ${delay}>${txt}</div>`;
    });
  });
  g.innerHTML = html;
}

function vencer(){
  ganhou = true;
  $("#guess").disabled = true; $("#go").disabled = true;
  const st = store.get("outerdle-stats") || {streak:0, last:null, wins:0};
  if(st.last !== diaN){ st.streak = st.last===diaN-1 ? st.streak+1 : 1; st.wins++; st.last = diaN; store.set("outerdle-stats", st); }
  const quad = [...chutes].reverse().map(c => COLS.map(([k]) => ({ok:"🟩",near:"🟧",no:"🟥"})[comparar(k,c[k],alvo[k])[0]]).join("")).join("\n");
  const texto = `Outerdle #${diaN} — ${chutes.length} tentativa${chutes.length>1?"s":""}\n${quad}`;
  $("#win").innerHTML = `
    <h2>Acertou!</h2>
    <p class="name">${alvo.nome}</p>
    <div class="stats">
      <div><b>${chutes.length}</b>tentativas</div>
      <div><b>${st.streak}</b>dias seguidos</div>
      <div><b>${st.wins}</b>vitórias</div>
    </div>
    <pre>${quad}</pre>
    <button class="btn" id="share">Compartilhar</button>
    <button class="btn ghost" id="again">Modo livre</button>
    <div class="timer">Próximo local em <b id="cd">--:--:--</b></div>`;
  $("#win").classList.remove("hidden");
  $("#share").onclick = () => navigator.clipboard.writeText(texto).then(() => $("#share").textContent="Copiado!");
  $("#again").onclick = () => location.href = location.pathname + "?livre=" + Math.random().toString(36).slice(2);
  contagem();
}

function contagem(){
  const tick = () => {
    const n = new Date(), amanha = new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()+1));
    const s = Math.max(0, Math.floor((amanha-n)/1000));
    $("#cd").textContent = [s/3600, s%3600/60, s%60].map(x => String(Math.floor(x)).padStart(2,"0")).join(":");
  };
  tick(); setInterval(tick, 1000);
}

function salvar(){ if(!LIVRE) store.set("outerdle-"+diaN, chutes.map(c=>c.nome)); }

/* -------- autocomplete -------- */
const inp = $("#guess"), list = $("#list");
let sel = -1;
function abrirLista(){
  const q = norm(inp.value);
  const itens = LOCAIS.filter(l => !chutes.includes(l) && (!q || norm(l.nome).includes(q)));
  list.innerHTML = itens.map(l => `<div data-n="${l.nome}"><i></i>${l.nome}</div>`).join("");
  list.style.display = itens.length ? "block" : "none";
  sel = -1;
}
function fecharLista(){ list.style.display="none"; }
inp.addEventListener("input", abrirLista);
inp.addEventListener("focus", abrirLista);
inp.addEventListener("keydown", e => {
  const opts = [...list.children];
  if(e.key==="ArrowDown"){ e.preventDefault(); sel=Math.min(sel+1,opts.length-1); }
  else if(e.key==="ArrowUp"){ e.preventDefault(); sel=Math.max(sel-1,0); }
  else if(e.key==="Enter"){ e.preventDefault(); chutar(sel>=0 ? opts[sel].dataset.n : (opts[0]?.dataset.n || inp.value)); return; }
  else if(e.key==="Escape"){ fecharLista(); return; }
  opts.forEach((o,i) => o.classList.toggle("sel", i===sel));
  opts[sel]?.scrollIntoView({block:"nearest"});
});
list.addEventListener("mousedown", e => { const d=e.target.closest("[data-n]"); if(d) chutar(d.dataset.n); });
document.addEventListener("click", e => { if(!e.target.closest(".search")) fecharLista(); });
$("#go").onclick = () => chutar(list.children[0]?.dataset.n || inp.value);

/* -------- início -------- */
const LIVRE = new URLSearchParams(location.search).has("livre");
if(LIVRE){
  const r = LOCAIS[Math.floor(Math.random()*LOCAIS.length)];
  alvo = r;
  $("#game h2").textContent = "Modo livre";
} else {
  const salvos = store.get("outerdle-"+diaN) || [];
  chutes = salvos.map(n => LOCAIS.find(l => l.nome===n)).filter(Boolean);
  if(chutes.includes(alvo)) { render(false); vencer(); }
}
render(false);
</script>
</body>
</html>

```

#!/usr/bin/env node
// Valida src/dados.js e gera js/data.js ofuscado. Uso: node tools/build.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src", "dados.js");
const OUT = path.join(ROOT, "js", "data.js");
const KEY = "vinte-e-dois-minutos-ate-a-supernova"; // mesma chave em js/app.js

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(SRC, "utf8"), sandbox, { filename: "dados.js" });
const data = sandbox.window.OUTERDLE_DATA;
if (!data || !data.LOCAIS || !data.PERSONAGENS) { console.error("src/dados.js não definiu window.OUTERDLE_DATA"); process.exit(1); }

const ids = new Set(); let erros = 0;
const check = (ok, msg) => { if (!ok) { console.error("  ✗ " + msg); erros++; } };
for (const l of data.LOCAIS) {
  check(!ids.has(l.id), `id repetido: ${l.id}`); ids.add(l.id);
  check(Array.isArray(l.dicas) && l.dicas.length === 2, `${l.id}: precisa de 2 dicas`);
  for (const c of data.COLS_LOCAIS) check(c.k in l, `${l.id}: falta o campo "${c.k}"`);
  if ("diario" in l) check(Array.isArray(l.diario) && l.diario.length >= 3 && l.diario.length <= 6, `${l.id}: diario precisa de 3 a 6 registros`);
}
const locais = new Set(data.LOCAIS.map(l => l.nome));
for (const p of data.PERSONAGENS) {
  check(!ids.has(p.id), `id repetido: ${p.id}`); ids.add(p.id);
  check(Array.isArray(p.dicas) && p.dicas.length === 2, `${p.id}: precisa de 2 dicas`);
  for (const c of data.COLS_PERSONAGENS) check(c.k in p, `${p.id}: falta o campo "${c.k}"`);
  check(locais.has(p.local), `${p.id}: local desconhecido "${p.local}"`);
}
if (erros) { console.error(`\n${erros} problema(s) em src/dados.js. Nada foi gerado.`); process.exit(1); }

// JSON -> XOR com a chave -> base64. Não é segurança, só tira a resposta do "inspecionar".
const bytes = Buffer.from(JSON.stringify(data), "utf8");
const key = Buffer.from(KEY, "utf8");
for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length];
const blob = bytes.toString("base64");

const out = `/* Outerdle — conteúdo gerado por tools/build.js. Edite src/dados.js, não este arquivo. */\nwindow.__ow=${JSON.stringify(blob)};\n`;
fs.writeFileSync(OUT, out);
console.log(`✓ js/data.js gerado (${data.LOCAIS.length} locais, ${data.LOCAIS.filter(l => l.diario).length} com diário, ${data.PERSONAGENS.length} personagens, ${(out.length / 1024).toFixed(1)} KB)`);

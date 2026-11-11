// Gera os mockups (desenhos) das peças em assets/produtos/, a partir do catalog.js.
// Servem só para o site não ficar vazio enquanto as fotos reais não chegam.
// Uso: node ferramentas/gerar_mockups.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "assets", "produtos");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "catalog.js"), "utf8"), ctx);
const { modelos } = ctx.window.SK8;

const FUNDO = "#1c1c1c";
const FONTE = "Impact, 'Arial Narrow', 'Arial Black', sans-serif";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Contorno: mais claro em peça escura, mais escuro em peça clara.
const lum = (hex) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
const traco = (hex) => (lum(hex) < 0.4 ? "rgba(255,255,255,.22)" : "rgba(0,0,0,.28)");

// Texto da estampa em linhas, centralizado em (x, y).
function estampa(linhas, x, y, tamanho, cor) {
  const alt = tamanho * 0.92;
  const y0 = y - ((linhas.length - 1) * alt) / 2;
  return linhas.map((l, i) =>
    `<text x="${x}" y="${y0 + i * alt}" text-anchor="middle" dominant-baseline="middle" font-family="${FONTE}" font-size="${tamanho}" letter-spacing="2" fill="${cor}">${esc(l)}</text>`).join("");
}
const selo = (x, y, cor) => `<rect x="${x - 22}" y="${y - 9}" width="44" height="18" fill="${cor}"/>`;

const PECAS = {
  camiseta(m, lado) {
    const { peca, tinta, texto } = m.mock; const s = traco(peca);
    const gola = lado === "frente" ? "Q300 165 210 92" : "Q300 122 210 92";
    return `<path d="M210 92 L148 112 L56 196 L114 268 L162 232 L162 522 L438 522 L438 232 L486 268 L544 196 L452 112 L390 92 ${gola} Z" fill="${peca}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M162 232 L162 300 M438 232 L438 300" stroke="${s}" stroke-width="2"/>
      ${lado === "frente" ? selo(372, 200, tinta) : estampa(texto, 300, 300, texto.some((t) => t.length > 6) ? 54 : 72, tinta)}`;
  },
  moletom(m, lado) {
    const { peca, tinta, texto } = m.mock; const s = traco(peca);
    return `<path d="M214 118 Q300 30 386 118 Q300 150 214 118 Z" fill="${peca}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M214 118 L128 150 L50 420 L118 442 L168 290 L168 520 L432 520 L432 290 L482 442 L550 420 L472 150 L386 118 Q300 ${lado === "frente" ? 190 : 150} 214 118 Z" fill="${peca}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
      <rect x="168" y="506" width="264" height="26" fill="${peca}" stroke="${s}" stroke-width="3"/>
      ${lado === "frente"
        ? `<path d="M222 400 L378 400 L400 480 L200 480 Z" fill="none" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
           <path d="M280 170 L276 250 M320 170 L324 250" stroke="${s}" stroke-width="3" stroke-linecap="round"/>${selo(368, 250, tinta)}`
        : estampa(texto, 300, 320, texto.some((t) => t.length > 6) ? 52 : 68, tinta)}`;
  },
  calca(m, lado) {
    const { peca, tinta } = m.mock; const s = traco(peca);
    return `<path d="M180 70 L420 70 L452 540 L326 540 L300 230 L274 540 L148 540 Z" fill="${peca}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M180 100 L420 100" stroke="${s}" stroke-width="3"/>
      ${lado === "frente"
        ? `<path d="M300 100 L300 190 M196 104 Q214 170 178 190 M404 104 Q386 170 422 190" fill="none" stroke="${s}" stroke-width="3"/>`
        : `<rect x="205" y="130" width="70" height="78" fill="none" stroke="${s}" stroke-width="3"/><rect x="325" y="130" width="70" height="78" fill="none" stroke="${s}" stroke-width="3"/>${selo(360, 142, tinta)}`}`;
  },
  bone(m, lado) {
    const { peca, tinta, texto } = m.mock; const s = traco(peca);
    return lado === "frente"
      ? `<path d="M140 350 Q140 170 300 170 Q460 170 460 350 Z" fill="${peca}" stroke="${s}" stroke-width="3"/>
         <path d="M118 350 Q300 318 482 350 Q520 372 540 410 Q300 372 60 410 Q80 372 118 350 Z" fill="${peca}" stroke="${s}" stroke-width="3" stroke-linejoin="round"/>
         <path d="M300 170 L300 340" stroke="${s}" stroke-width="2"/>${estampa(texto, 300, 270, texto[0].length > 4 ? 40 : 58, tinta)}`
      : `<path d="M140 380 Q140 180 300 180 Q460 180 460 380 Z" fill="${peca}" stroke="${s}" stroke-width="3"/>
         <path d="M240 380 Q300 300 360 380 Z" fill="${FUNDO}" stroke="${s}" stroke-width="3"/>
         <rect x="236" y="368" width="128" height="16" fill="${peca}" stroke="${s}" stroke-width="3"/>
         <path d="M300 180 L300 316" stroke="${s}" stroke-width="2"/>`;
  },
};

const moldura = (conteudo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="${FUNDO}"/>${conteudo}` +
  `<text transform="translate(588 584) rotate(-90)" font-family="monospace" font-size="13" letter-spacing="2" fill="rgba(255,255,255,.3)">MOCKUP · FOTO EM BREVE</text></svg>\n`;

fs.mkdirSync(OUT, { recursive: true });
for (const m of modelos) {
  const draw = PECAS[m.tipo];
  const frente = draw(m, "frente"), costas = draw(m, "costas");
  fs.writeFileSync(path.join(OUT, `peca_${m.n}_frente.svg`), moldura(frente));
  fs.writeFileSync(path.join(OUT, `peca_${m.n}_costas.svg`), moldura(costas));
  fs.writeFileSync(path.join(OUT, `peca_${m.n}_conjunto.svg`), moldura(
    `<g transform="translate(-10 130) scale(.56)">${frente}</g><g transform="translate(274 130) scale(.56)">${costas}</g>`));
}
console.log(`OK: ${modelos.length * 3} mockups em assets/produtos/`);

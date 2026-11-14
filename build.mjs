// Gera a pasta dist/ com uma página HTML por endereço (cada uma com título,
// descrição e imagem próprias para a prévia de links no WhatsApp/Google).
// Uso: node build.mjs
// A pasta dist/ é um site estático comum: funciona em qualquer hospedagem.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");

// Endereço público do site, para as imagens de prévia (ex.: SITE_URL=https://sk8family.com.br node build.mjs).
const SITE_URL = (process.env.SITE_URL || process.env.URL || "").replace(/\/$/, "");
// Imagem de prévia dos links. O WhatsApp só aceita .jpg/.png (não aceita .svg).
const OG = "/assets/og.jpg";

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "catalog.js"), "utf8"), ctx);
const { modelos, colecoes } = ctx.window.SK8;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const abs = (u) => (SITE_URL ? SITE_URL + u : u);
const ehFoto = (u) => /\.(jpe?g|png|webp)$/i.test(u);

const pages = [
  { url: "/", title: "SK8FAMILY — Feito na rua, pra rua",
    desc: "SK8FAMILY: roupa de rua feita por skatista. Peças limitadas por drop.",
    ogTitle: "SK8FAMILY — Feito na rua, pra rua", ogDesc: "Roupa de rua feita por skatista. Peças limitadas por drop." },
  { url: "/colecoes", title: "Coleções — SK8FAMILY", desc: `As coleções da SK8FAMILY: ${colecoes.join(", ")}.`,
    ogDesc: "Drops pequenos e sem reposição." },
  { url: "/produtos", title: "Drops — SK8FAMILY", desc: "Todas as peças da SK8FAMILY: camisetas, polos, moletons, calças, bermuda e boné, com preço e tamanhos." },
  { url: "/sobre", title: "A Família — SK8FAMILY", desc: "A história da SK8FAMILY: skate, rua e quem anda junto.", ogDesc: "Feito na rua, pra rua." },
  { url: "/contato", title: "Contato — SK8FAMILY", desc: "Dúvida de tamanho, troca ou pedido: fale com a SK8FAMILY." },
  { url: "/favoritos", title: "Favoritos — SK8FAMILY", desc: "Suas peças favoritas da SK8FAMILY.", noindex: true },
  { url: "/finalizar", title: "Finalizar pedido — SK8FAMILY", desc: "Entrega e pagamento do seu pedido SK8FAMILY.", noindex: true },
  { url: "/pedido-enviado", title: "Pedido enviado — SK8FAMILY", desc: "Seu pedido SK8FAMILY.", noindex: true },
  { url: "/sacola", title: "Sacola — SK8FAMILY", desc: "Suas peças escolhidas, cupom de desconto e frete.", noindex: true },
  ...modelos.map((m) => ({ url: `/produtos/${m.slug}`, title: `${m.name} — SK8FAMILY`, desc: m.descricao, type: "product", img: ehFoto(m.img) ? m.img : OG })),
];

const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const temOG = fs.existsSync(path.join(ROOT, OG));
const meta = (p) => [
  `<title>${esc(p.title)}</title>`,
  `<meta name="description" content="${esc(p.desc)}" />`,
  `<meta property="og:title" content="${esc(p.ogTitle || p.title)}" />`,
  `<meta property="og:description" content="${esc(p.ogDesc || p.desc)}" />`,
  `<meta property="og:type" content="${p.type || "website"}" />`,
  temOG || (p.img && p.img !== OG) ? `<meta property="og:image" content="${esc(abs(p.img || OG))}" />` : "",
  SITE_URL ? `<meta property="og:url" content="${esc(SITE_URL + p.url)}" />` : "",
  `<meta name="twitter:card" content="summary_large_image" />`,
  p.noindex ? `<meta name="robots" content="noindex" />` : "",
].filter(Boolean).map((l) => "  " + l).join("\n");
const render = (p) => template.replace(/  <!--META-->[\s\S]*?<!--\/META-->/, meta(p));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const f of ["styles.css", "catalog.js", "app.js", "robots.txt", "favicon.svg", "site.webmanifest"]) {
  if (fs.existsSync(path.join(ROOT, f))) fs.copyFileSync(path.join(ROOT, f), path.join(OUT, f));
}
fs.cpSync(path.join(ROOT, "assets"), path.join(OUT, "assets"), { recursive: true });
for (const p of pages) {
  const dir = path.join(OUT, p.url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(p));
}
fs.writeFileSync(path.join(OUT, "404.html"), render({ url: "/404", title: "Página não encontrada — SK8FAMILY", desc: "Esta página não existe.", noindex: true }));
console.log(`OK: ${pages.length} páginas em dist/ ${SITE_URL ? "(" + SITE_URL + ")" : "(sem SITE_URL: imagens de prévia com caminho relativo)"}`);

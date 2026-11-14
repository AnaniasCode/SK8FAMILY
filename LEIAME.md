# SK8FAMILY — site

Loja da SK8FAMILY em HTML, CSS e JavaScript puros, sem dependências.

> As fotos das peças e do carrossel vieram da marca (WhatsApp e Instagram). Os textos de descrição foram
> escritos a partir das fotos; confira antes de divulgar.

## Onde editar
- `catalog.js`: produtos, preços (um por tipo de peça, em `TIPOS`), descrições, tamanhos, cores, WhatsApp, Instagram, e-mail, frete, cupons, destaques e slides da página inicial.
- `styles.css`: cores e fontes (no topo, em `:root`).
- `app.js`: as páginas (Início, Coleções, Produtos, Peça, Favoritos, Sacola, Finalizar, Sobre e Contato).
- `build.mjs`: título, descrição e imagem de prévia (WhatsApp e Google) de cada página.
- `assets/produtos/`: fotos das peças, na proporção 4:5 (ex.: 1080×1350), com os nomes `peca_N_1.jpg`, `peca_N_2.jpg`...
- `assets/logo.png`: logo do cabeçalho (preto, fundo transparente). `assets/logo-branco.png` é a versão clara.

## Antes de divulgar
Em `catalog.js`, preencha:
- `WHATSAPP_PEDIDOS`: número que recebe os pedidos (55 + DDD + número). Vazio, o pedido abre no WhatsApp sem destinatário.
- `OWNERS` e `SUPPORT_EMAIL` (o `INSTAGRAM` já está preenchido): aparecem na página da peça, no Contato e no rodapé (só os preenchidos).
- `FRETE` e `CUPONS` (modelo explicado no próprio arquivo).

## Adicionar ou trocar fotos e peças
1. Salve as fotos em `assets/produtos/` como `peca_N_1.jpg`, `peca_N_2.jpg`... (N é o número `n` da peça em `catalog.js`).
2. Em `catalog.js`, ajuste `fotos` (quantas fotos a peça tem). Para uma peça nova, copie um bloco da lista e mude os dados.
3. Peça com mais de uma cor: use `cores: ["Preta", "Amarela"]` no lugar de `cor`; o cliente escolhe a cor antes de comprar.
4. Carrossel da página inicial: substitua `assets/hero_N.jpg` ou edite `heroSlides` (`img` é a foto e `pos` a parte dela que fica à mostra). Essas fotos aparecem em preto e branco; as das peças aparecem coloridas.

## Pedidos pelo site
Sacola → `/finalizar` (nome, telefone, endereço com busca de CEP, forma de pagamento) →
o pedido abre pronto no WhatsApp da loja.

## Ver no próprio computador
```bash
node build.mjs
```
```bash
python3 -m http.server 8000 -d dist
```
Depois abra http://localhost:8000.

## Publicar
O site é publicado pela Cloudflare (projeto Workers `sk8family`, ligado a este repositório):
a cada mudança enviada ao GitHub, ela roda `node build.mjs` e publica a pasta `dist/`.
A configuração está em `wrangler.jsonc`.

A pasta `dist/` é um site estático comum e também funciona em qualquer outra hospedagem.
Para as prévias de link saírem com o endereço certo, gere com `SITE_URL=https://seu-dominio node build.mjs`.

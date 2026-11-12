# SK8FAMILY — site

Loja da SK8FAMILY em HTML, CSS e JavaScript puros, sem dependências.

> As peças, os preços e os textos atuais são **exemplos**, e as fotos das peças são **mockups** (desenhos).
> As fotos do carrossel (`assets/hero_1.jpg` a `hero_5.jpg`) vieram do Instagram da marca.
> Troque pelos dados e fotos reais antes de divulgar.

## Onde editar
- `catalog.js`: produtos, preços, descrições, tamanhos, tabela de medidas, WhatsApp, Instagram, e-mail, frete, cupons e slides da página inicial.
- `styles.css`: cores e fontes (no topo, em `:root`).
- `app.js`: as páginas (Início, Coleções, Produtos, Peça, Favoritos, Sacola, Finalizar, Sobre e Contato).
- `build.mjs`: título, descrição e imagem de prévia (WhatsApp e Google) de cada página.
- `assets/produtos/`: fotos das peças (3 por peça: frente, costas e conjunto).
- `assets/logo.png`: logo do cabeçalho (preto, fundo transparente). `assets/logo-branco.png` é a versão clara.

## Antes de divulgar
Em `catalog.js`, preencha:
- `WHATSAPP_PEDIDOS`: número que recebe os pedidos (55 + DDD + número). Vazio, o pedido abre no WhatsApp sem destinatário.
- `OWNERS` e `SUPPORT_EMAIL` (o `INSTAGRAM` já está preenchido): aparecem na página da peça, no Contato e no rodapé (só os preenchidos).
- `FRETE` e `CUPONS` (modelo explicado no próprio arquivo).

## Trocar os mockups por fotos
1. Salve as fotos em `assets/produtos/` como `peca_N_frente.jpg`, `peca_N_costas.jpg` e `peca_N_conjunto.jpg` (N é o primeiro número da peça em `catalog.js`).
2. Em `catalog.js`, mude `EXT_FOTO` de `"svg"` para `"jpg"`.
3. Para trocar as fotos do carrossel da página inicial, substitua `assets/hero_N.jpg` ou edite `heroSlides` (`img` é a foto e `pos` a parte dela que fica à mostra).

As fotos aparecem em preto e branco no site (filtro no `styles.css`), mesmo que o arquivo seja colorido.

Os mockups são gerados por `node ferramentas/gerar_mockups.mjs` a partir do catálogo.

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

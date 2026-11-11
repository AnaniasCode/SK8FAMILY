# SK8FAMILY — site

Loja da SK8FAMILY em HTML, CSS e JavaScript puros, sem dependências.

> As peças, os preços e os textos atuais são **exemplos**, e as fotos são **mockups** (desenhos).
> Troque pelos dados e fotos reais antes de divulgar.

## Onde editar
- `catalog.js`: produtos, preços, descrições, tamanhos, tabela de medidas, WhatsApp, Instagram, e-mail, frete, cupons e slides da página inicial.
- `styles.css`: cores e fontes (no topo, em `:root`).
- `app.js`: as páginas (Início, Coleções, Produtos, Peça, Favoritos, Sacola, Finalizar, Sobre e Contato).
- `build.mjs`: título, descrição e imagem de prévia (WhatsApp e Google) de cada página.
- `assets/produtos/`: fotos das peças (3 por peça: frente, costas e conjunto).

## Antes de divulgar
Em `catalog.js`, preencha:
- `WHATSAPP_PEDIDOS`: número que recebe os pedidos (55 + DDD + número). Vazio, o pedido abre no WhatsApp sem destinatário.
- `OWNERS`, `INSTAGRAM` e `SUPPORT_EMAIL`: aparecem na página da peça, no Contato e no rodapé (só os preenchidos).
- `FRETE` e `CUPONS` (modelo explicado no próprio arquivo).

## Trocar os mockups por fotos
1. Salve as fotos em `assets/produtos/` como `peca_N_frente.jpg`, `peca_N_costas.jpg` e `peca_N_conjunto.jpg` (N é o primeiro número da peça em `catalog.js`).
2. Em `catalog.js`, mude `EXT_FOTO` de `"svg"` para `"jpg"`.
3. Para foto de fundo no carrossel da página inicial, preencha `img` em `heroSlides` (ex.: `"/assets/hero_1.jpg"`).

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
`node build.mjs` cria a pasta `dist/`, que é um site estático comum e funciona em qualquer hospedagem
(comando de build: `node build.mjs`, pasta publicada: `dist`). Nenhuma hospedagem está configurada ainda.
Para as prévias de link saírem com o endereço certo, gere com `SITE_URL=https://seu-dominio node build.mjs`.

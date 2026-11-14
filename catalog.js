// Dados da loja: edite aqui produtos, preços, contatos e slides.
window.SK8 = (function () {
  const MARCA = "SK8FAMILY";

  // ---------- Contatos ----------
  // WhatsApp que recebe os pedidos (só números, com 55 + DDD). Ex.: "5511999999999".
  // Enquanto estiver vazio, o pedido abre no WhatsApp para o cliente escolher o contato.
  const WHATSAPP_PEDIDOS = "";
  // Quem atende pelo WhatsApp na página da peça. Ex.: { name: "Fulano", phone: "5511999999999" }
  const OWNERS = [];
  const INSTAGRAM = "https://www.instagram.com/sk8family.oficial/";
  const SUPPORT_EMAIL = "";  // ex.: "contato@sk8family.com.br"

  // ---------- Pedidos ----------
  const FRETE = 24.90; // valor fixo por pedido

  // Cupons de desconto. Para criar um, copie o modelo abaixo e ajuste.
  //   codigo:    o que o cliente digita (maiúsculas ou minúsculas tanto faz)
  //   tipo:      "percentual" (ex.: 10 = 10% nas peças), "valor" (ex.: 20 = R$ 20 de desconto)
  //              ou "frete" (frete grátis)
  //   valor:     número do desconto (não usado no tipo "frete")
  //   minimo:    valor mínimo em peças para o cupom valer (0 = sem mínimo)
  //   validoAte: último dia de uso, "AAAA-MM-DD" (ou "" para não expirar)
  //   ativo:     true para valer, false para pausar
  // Exemplo: { codigo: "FAMILY10", tipo: "percentual", valor: 10, minimo: 0, validoAte: "2027-12-31", ativo: true },
  const CUPONS = [
  ];

  // ---------- Tipos de peça: preço e tamanhos ----------
  // O preço vale para todas as peças do tipo. Para mudar, edite só aqui.
  const P_AO_GG = ["P", "M", "G", "GG"];
  const TIPOS = {
    camiseta: { nome: "Camiseta", plural: "Camisetas", preco: 100, tamanhos: P_AO_GG },
    polo: { nome: "Polo", plural: "Polos", preco: 130, tamanhos: P_AO_GG },
    moletom: { nome: "Moletom", plural: "Moletons", preco: 280, tamanhos: P_AO_GG },
    "calca-tactel": { nome: "Calça tactel", plural: "Calças tactel", preco: 160, tamanhos: P_AO_GG },
    "calca-jeans": { nome: "Calça jeans balão", plural: "Calças jeans", preco: 180, tamanhos: ["38", "40", "42", "44", "46"] },
    bermuda: { nome: "Bermuda", plural: "Bermudas", preco: 120, tamanhos: P_AO_GG },
    bone: { nome: "Boné", plural: "Bonés", preco: 150, tamanhos: ["Único"] },
  };

  // Fotos: ficam em assets/produtos/ como peca_N_1.jpg, peca_N_2.jpg... (N = número da peça).
  // A primeira é a capa do card; as outras entram no carrossel do card e na página da peça.
  const fotos = (n, qtd) => Array.from({ length: qtd }, (_, k) => `/assets/produtos/peca_${n}_${k + 1}.jpg`);

  // Cada peça:
  //   n: número (usado no nome das fotos e na etiqueta "Nº 01") · fotos: quantas fotos tem
  //   cores (opcional): quando a peça tem mais de uma cor, o cliente escolhe antes de comprar
  //   selo (opcional): texto ao lado do número na etiqueta do card, ex.: "Novo"
  const raw = [
    { n: 1, fotos: 1, slug: "camiseta-drip-branca", name: "Camiseta Drip — Branca", tipo: "camiseta", colecao: "Logo",
      tagline: "O logo escorrido, grande nas costas.",
      descricao: "Camiseta branca com o logo SK8FAMILY em estilo grafite escorrido nas costas e a versão pequena no peito.",
      cor: "Branca", estampa: "Costas: logo grafite preto · Peito: logo pequeno" },
    { n: 2, fotos: 1, slug: "camiseta-drip-preta", name: "Camiseta Drip — Preta", tipo: "camiseta", colecao: "Logo",
      tagline: "Preto no branco, tinta escorrendo.",
      descricao: "Camiseta preta com o logo SK8FAMILY em caixa escorrida, estampado em branco.",
      cor: "Preta", estampa: "Logo em caixa escorrida, branco" },
    { n: 3, fotos: 2, slug: "camiseta-racing", name: "Camiseta Racing — Branca", tipo: "camiseta", colecao: "Logo",
      tagline: "O logo de pista em azul, vermelho e preto.",
      descricao: "Camiseta branca com o logo SK8FAMILY em estilo racing, em azul, vermelho e preto, no peito.",
      cor: "Branca", estampa: "Peito: logo racing colorido" },
    { n: 4, fotos: 2, slug: "camiseta-original-das-ruas", name: "Camiseta Original das Ruas — Preta", tipo: "camiseta", colecao: "Original das Ruas",
      tagline: "Original das ruas, estampado nas costas.",
      descricao: "Camiseta preta com o lettering SK8 Family Original das Ruas em branco, nas costas.",
      cor: "Preta", estampa: "Costas: lettering Original das Ruas" },
    { n: 5, fotos: 2, slug: "camiseta-yin-yang", name: "Camiseta Yin Yang — Preta", tipo: "camiseta", colecao: "Original das Ruas",
      tagline: "Equilíbrio em cima do shape.",
      descricao: "Camiseta preta com a arte yin yang grande nas costas e a assinatura Original das Ruas.",
      cor: "Preta", estampa: "Costas: arte yin yang em branco" },
    { n: 6, fotos: 1, slug: "camiseta-bordada-roxa", name: "Camiseta Bordada — Roxa", tipo: "camiseta", colecao: "Original das Ruas",
      tagline: "A assinatura da família, bordada.",
      descricao: "Camiseta roxa com a assinatura SK8FAMILY e a frase Original das Ruas em preto.",
      cor: "Roxa", estampa: "Peito: assinatura e Original das Ruas" },
    { n: 7, fotos: 2, slug: "camiseta-brasil", name: "Camiseta Brasil", tipo: "camiseta", colecao: "Brasil",
      tagline: "O escudo da família com cinco estrelas.",
      descricao: "Camiseta com a assinatura SK8FAMILY e o escudo Brasil na frente, e o logo grande nas costas.",
      cores: ["Preta", "Amarela"], estampa: "Frente: assinatura e escudo · Costas: logo SK8FAMILY" },
    { n: 8, fotos: 2, slug: "polo-sk8family", name: "Polo SK8FAMILY", tipo: "polo", colecao: "Logo",
      tagline: "Gola polo, assinatura no peito.",
      descricao: "Polo em piquet com a assinatura SK8FAMILY no peito.",
      cores: ["Verde", "Branca", "Preta"], estampa: "Peito: assinatura SK8FAMILY" },
    { n: 9, fotos: 1, slug: "polo-brasil", name: "Polo Brasil", tipo: "polo", colecao: "Brasil",
      tagline: "A polo da seleção da família.",
      descricao: "Polo com o escudo Brasil e a assinatura SK8FAMILY no peito.",
      cores: ["Amarela", "Preta"], estampa: "Peito: escudo Brasil e assinatura" },
    { n: 10, fotos: 3, slug: "moletom-college-azul", name: "Moletom College — Azul", tipo: "moletom", colecao: "Logo",
      tagline: "Azul claro, logo college nas costas.",
      descricao: "Moletom canguru azul claro com capuz, o logo SK8FAMILY grande nas costas, pequeno no peito e na manga.",
      cor: "Azul claro", estampa: "Costas, peito e manga: logo college preto" },
    { n: 11, fotos: 2, slug: "moletom-big-logo-preto", name: "Moletom Big Logo — Preto", tipo: "moletom", colecao: "Logo",
      tagline: "O logo em letras grandes.",
      descricao: "Moletom canguru preto com capuz e o logo SK8FAMILY em letras grandes brancas.",
      cor: "Preto", estampa: "Logo SK8FAMILY grande em branco" },
    { n: 12, fotos: 1, slug: "moletom-brasil", name: "Moletom Brasil — Preto", tipo: "moletom", colecao: "Brasil",
      tagline: "Preto e amarelo, escudo no peito.",
      descricao: "Moletom canguru preto com capuz, o escudo Brasil e a assinatura SK8FAMILY em amarelo no peito, na manga e no capuz.",
      cor: "Preto", estampa: "Escudo Brasil e assinaturas em amarelo" },
    { n: 13, fotos: 1, slug: "moletom-careca-xadrez", name: "Moletom Careca Xadrez — Cinza", tipo: "moletom", colecao: "Logo",
      tagline: "Gola careca, xadrez cinza.",
      descricao: "Moletom gola careca em xadrez cinza, com a assinatura SK8FAMILY em preto.",
      cor: "Cinza xadrez", estampa: "Assinatura SK8FAMILY em preto" },
    { n: 14, fotos: 1, slug: "calca-tactel-preta", name: "Calça Tactel — Preta", tipo: "calca-tactel", colecao: "Logo",
      tagline: "Leve, com cordão e logo na perna.",
      descricao: "Calça de tactel preta com elástico e cordão na cintura e o logo SK8FAMILY na perna.",
      cor: "Preta", estampa: "Perna: logo SK8FAMILY" },
    { n: 15, fotos: 1, slug: "calca-jeans-balao-preta", name: "Calça Jeans Balão — Preta", tipo: "calca-jeans", colecao: "Logo",
      tagline: "Perna larga para andar solto.",
      descricao: "Calça jeans balão preta, de perna larga, com o logo SK8FAMILY bordado.",
      cor: "Preta", estampa: "Logo SK8FAMILY pequeno" },
    { n: 16, fotos: 2, slug: "bermuda-globo-preta", name: "Bermuda Globo — Preta", tipo: "bermuda", colecao: "Logo",
      tagline: "O globo da família na perna.",
      descricao: "Bermuda preta com elástico na cintura, o globo Fundado em 2014 em uma perna e a assinatura SK8FAMILY na outra.",
      cor: "Preta", estampa: "Globo SK8FAMILY e assinatura em branco" },
    { n: 17, fotos: 1, slug: "bone-five-panel", name: "Boné Five Panel — Preto", tipo: "bone", colecao: "Logo",
      tagline: "Cinco gomos, aba reta, um logo.",
      descricao: "Boné five panel preto com o logo SK8FAMILY em branco na frente.",
      cor: "Preto", estampa: "Frente: logo SK8FAMILY" },
  ];

  const brl = (v) => "R$ " + v.toFixed(2).replace(".", ",");
  const modelos = raw.map((p) => {
    const t = TIPOS[p.tipo];
    const f = fotos(p.n, p.fotos);
    return { ...p, code: "SK-" + String(p.n).padStart(3, "0"), collection: p.colecao, tipoNome: t.nome,
      preco: brl(t.preco), precoNum: t.preco, tamanhos: t.tamanhos, cores: p.cores || null,
      cor: p.cor || p.cores.join(", "), selo: p.selo || "", img: f[0], fotos: f };
  });

  const colecoes = Array.from(new Set(modelos.map((m) => m.collection)));
  const tipos = Array.from(new Set(modelos.map((m) => m.tipo))).map((id) => ({ id, nome: TIPOS[id].plural }));

  // Página inicial: nome do drop (título da seção e faixa) e as peças em destaque, na ordem.
  const DROP = "Drop 01";
  const DESTAQUES = ["camiseta-drip-branca", "moletom-college-azul", "camiseta-brasil", "camiseta-yin-yang", "bermuda-globo-preta", "bone-five-panel"];

  // Slides da página inicial (carrossel). Fotos do Instagram da marca.
  //   etiqueta: selo pequeno · titulo: linha cheia · contorno: linha só com contorno
  //   botao + href: botão principal
  //   img: foto de fundo (fica em preto e branco sozinha) · pos: parte da foto que fica à mostra
  //        ("center 70%" = mais para baixo, "center 30%" = mais para cima)
    const heroSlides = [
    { etiqueta: "Drop 01 · No ar", titulo: "Feito na rua.", contorno: "Pra rua.", botao: "Ver o drop", href: "/produtos", img: "/assets/hero_1.jpg", pos: "center 78%" },
    { etiqueta: "A família na pista", titulo: "Sessão", contorno: "todo dia.", botao: "Ver as camisetas", href: "/produtos?tipo=camiseta", img: "/assets/hero_2.jpg", pos: "center 30%" },
    { etiqueta: "Moletons", titulo: "Malha pesada.", contorno: "Corte largo.", botao: "Ver os moletons", href: "/produtos?tipo=moletom", img: "/assets/hero_3.jpg", pos: "center 24%" },
    { etiqueta: "Original das Ruas", titulo: "Original", contorno: "das ruas.", botao: "Ver a coleção", href: "/produtos?colecao=Original%20das%20Ruas", img: "/assets/hero_5.jpg", pos: "center 45%" },
    { etiqueta: "Desde 2014", titulo: "Bem-vindo", contorno: "à família.", botao: "Conhecer a família", href: "/sobre", img: "/assets/hero_4.jpg", pos: "center 40%" },
    { etiqueta: "Tiragem limitada", titulo: "Acabou,", contorno: "acabou.", botao: "Ver todas as peças", href: "/produtos", img: "/assets/hero_6.jpg", pos: "center 42%" },
  ];

  function whatsLink(phone, text) {
    const q = [phone ? `phone=${phone}` : "", text ? `text=${encodeURIComponent(text)}` : ""].filter(Boolean).join("&");
    return `https://api.whatsapp.com/send${q ? "?" + q : ""}`;
  }

  return { MARCA, WHATSAPP_PEDIDOS, FRETE, CUPONS, OWNERS, INSTAGRAM, SUPPORT_EMAIL, modelos, colecoes, tipos, heroSlides, DROP, DESTAQUES, whatsLink };
})();

// Dados da loja: edite aqui produtos, preços, contatos e slides.
// ATENÇÃO: as peças, preços e contatos abaixo são EXEMPLOS para montar o site.
// Troque pelos dados reais da SK8FAMILY antes de divulgar.
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

  // ---------- Tipos de peça: tamanhos, tecido e tabela de medidas ----------
  const TIPOS = {
    camiseta: {
      nome: "Camiseta", tamanhos: ["P", "M", "G", "GG"], tecido: "100% algodão, malha pesada",
      medidas: { colunas: ["Comprimento", "Largura"], linhas: [["P", "70 cm", "54 cm"], ["M", "73 cm", "57 cm"], ["G", "76 cm", "60 cm"], ["GG", "79 cm", "63 cm"]] },
    },
    moletom: {
      nome: "Moletom", tamanhos: ["P", "M", "G", "GG"], tecido: "Moletom flanelado, 3 cabos",
      medidas: { colunas: ["Comprimento", "Largura"], linhas: [["P", "66 cm", "58 cm"], ["M", "69 cm", "61 cm"], ["G", "72 cm", "64 cm"], ["GG", "75 cm", "67 cm"]] },
    },
    calca: {
      nome: "Calça", tamanhos: ["38", "40", "42", "44", "46"], tecido: "Sarja 100% algodão",
      medidas: { colunas: ["Cintura", "Comprimento"], linhas: [["38", "76 cm", "102 cm"], ["40", "80 cm", "104 cm"], ["42", "84 cm", "106 cm"], ["44", "88 cm", "108 cm"], ["46", "92 cm", "110 cm"]] },
    },
    bone: {
      nome: "Boné", tamanhos: ["Único"], tecido: "Sarja com regulador",
      medidas: { colunas: ["Circunferência"], linhas: [["Único", "55 a 60 cm (ajustável)"]] },
    },
  };

  // Fotos: coloque os arquivos em assets/produtos/ com estes nomes:
  //   peca_N_frente, peca_N_costas e peca_N_conjunto (hoje são mockups .svg gerados por
  //   ferramentas/gerar_mockups.mjs; ao trocar por foto .jpg, mude EXT_FOTO para "jpg").
  const EXT_FOTO = "svg";
  const fotos = (n) => ({
    frente: `/assets/produtos/peca_${n}_frente.${EXT_FOTO}`,
    costas: `/assets/produtos/peca_${n}_costas.${EXT_FOTO}`,
    conjunto: `/assets/produtos/peca_${n}_conjunto.${EXT_FOTO}`,
  });

  // [nº da foto, código, endereço, nome, tipo, coleção, frase curta, descrição, cor, arte, preço, selo (opcional)]
  // "mock" (último campo) só serve para desenhar o mockup: cor da peça, cor da estampa e texto.
  const raw = [
    [1, "SK-001", "camiseta-oversized-family", "Camiseta Oversized Family", "camiseta", "Drop 01",
      "Corte oversized, malha pesada.",
      "Camiseta oversized de malha pesada, com o logo SK8FAMILY nas costas e a etiqueta no peito. Modelagem larga, do jeito que a sessão pede.",
      "Preto", "Costas: logo SK8FAMILY em off-white", "R$ 119,90", "Limitado",
      { peca: "#161616", tinta: "#f1ede2", texto: ["SK8", "FAMILY"] }],
    [2, "SK-002", "family-og-off", "Family OG Tee — Off White", "camiseta", "Family Classics",
      "A clássica da família, na versão clara.",
      "A mesma modelagem larga da OG, em off-white com estampa preta. Combina com tudo e aguenta o rolê.",
      "Off-white", "Costas: logo SK8FAMILY em preto", "R$ 119,90", "",
      { peca: "#ece7da", tinta: "#141414", texto: ["SK8", "FAMILY"] }],
    [3, "SK-003", "no-comply", "No Comply Tee", "camiseta", "Family Classics",
      "Para quem não segue regra de ninguém.",
      "Lettering No Comply em off-white nas costas, sobre preto. No peito, o selo da família.",
      "Preto com arte off-white", "Costas: lettering No Comply", "R$ 129,90", "Limitado",
      { peca: "#161616", tinta: "#f6f5f3", texto: ["NO", "COMPLY"] }],
    [4, "SK-004", "concrete-waves", "Concrete Waves Tee", "camiseta", "Bowl Riders",
      "O surf é no concreto.",
      "Arte Concrete Waves em off-white nas costas, numa camiseta cinza-asfalto. Feita para o bowl.",
      "Cinza-asfalto", "Costas: arte Concrete Waves em off-white", "R$ 129,90", "",
      { peca: "#55555a", tinta: "#f6f5f3", texto: ["CONCRETE", "WAVES"] }],
    [5, "SK-005", "moletom-pesado-drop-01", "Moletom Pesado Drop 01", "moletom", "Drop 01",
      "Capuz, bolso canguru e a rua inteira pela frente.",
      "Moletom canguru pesado, flanelado, com capuz forrado e a estampa do Drop 01 nas costas. Quente e largo.",
      "Preto", "Costas: estampa Drop 01 em off-white", "R$ 249,90", "Limitado",
      { peca: "#161616", tinta: "#f1ede2", texto: ["DROP", "01"] }],
    [6, "SK-006", "bowl-riders-hoodie", "Bowl Riders Hoodie", "moletom", "Bowl Riders",
      "Para as sessões que entram pela noite.",
      "Moletom canguru grafite com a arte Bowl Riders em off-white nas costas. Punho e barra em ribana.",
      "Grafite", "Costas: Bowl Riders em off-white", "R$ 259,90", "",
      { peca: "#3d3d3d", tinta: "#f6f5f3", texto: ["BOWL", "RIDERS"] }],
    [7, "SK-007", "calca-cargo-sarja", "Calça Cargo Sarja", "calca", "Drop 01",
      "Bolso cargo e sarja que aguenta queda.",
      "Calça cargo de sarja com bolsos laterais, cós ajustável e etiqueta SK8FAMILY. Liberdade total de movimento.",
      "Preto", "Etiqueta SK8FAMILY no bolso", "R$ 219,90", "",
      { peca: "#161616", tinta: "#f6f5f3", texto: ["SK8"] }],
    [8, "SK-008", "calca-baggy-caqui", "Calça Baggy Family — Cáqui", "calca", "Family Classics",
      "A baggy da família em cáqui.",
      "Modelagem baggy em sarja cáqui. Resistente para a pista, limpa para o dia a dia.",
      "Cáqui", "Etiqueta SK8FAMILY no bolso", "R$ 219,90", "",
      { peca: "#8f8d88", tinta: "#141414", texto: ["SK8"] }],
    [9, "SK-009", "bone-five-panel", "Boné Five Panel SK8", "bone", "Family Classics",
      "Aba reta, cinco gomos, um logo.",
      "Boné five panel de sarja com regulador e o logo SK8 bordado na frente.",
      "Preto", "Frente: logo SK8 bordado", "R$ 99,90", "",
      { peca: "#161616", tinta: "#f6f5f3", texto: ["SK8"] }],
    [10, "SK-010", "bone-dad-hat", "Boné Dad Hat Family", "bone", "Family Classics",
      "Aba curva e bordado discreto.",
      "Dad hat off-white com o bordado Family em preto e fecho regulável.",
      "Off-white", "Frente: bordado Family", "R$ 99,90", "",
      { peca: "#ece7da", tinta: "#141414", texto: ["FAMILY"] }],
  ];

  const modelos = raw.map(([n, code, slug, name, tipo, collection, tagline, descricao, cor, estampa, preco, selo, mock]) => {
    const f = fotos(n);
    const t = TIPOS[tipo];
    const precoNum = Number(preco.replace(/[^\d,]/g, "").replace(",", "."));
    return { n, code, slug, name, tipo, tipoNome: t.nome, collection, tagline, descricao, cor, estampa, preco, precoNum,
      selo, tecido: t.tecido, tamanhos: t.tamanhos, medidas: t.medidas, img: f.frente, fotos: f, mock };
  });

  const colecoes = Array.from(new Set(modelos.map((m) => m.collection)));
  const tipos = Array.from(new Set(modelos.map((m) => m.tipo))).map((id) => ({ id, nome: TIPOS[id].nome }));

  // Slides da página inicial (carrossel).
  //   etiqueta: selo pequeno · titulo: linha cheia · contorno: linha só com contorno
  //   botao + href: botão principal · slug: peça mostrada ao lado enquanto não há foto
  //   img: foto de fundo do slide, ex.: "/assets/hero_1.jpg" (fica em preto e branco sozinha)
  const heroSlides = [
    { etiqueta: "Drop 01 · No ar", titulo: "Feito na rua.", contorno: "Pra rua.", botao: "Ver o drop", href: "/produtos?colecao=Drop%2001", slug: "camiseta-oversized-family", img: "", colecao: "Drop 01" },
    { etiqueta: "Drop 01 · Limitado", titulo: "Malha pesada.", contorno: "Corte largo.", botao: "Ver o moletom", href: "/produtos/moletom-pesado-drop-01", slug: "moletom-pesado-drop-01", img: "", colecao: "Drop 01" },
    { etiqueta: "Tiragem limitada", titulo: "Acabou,", contorno: "acabou.", botao: "Ver todas as peças", href: "/produtos", slug: "calca-cargo-sarja", img: "", colecao: "Drop 01" },
  ];

  function whatsLink(phone, text) {
    const q = [phone ? `phone=${phone}` : "", text ? `text=${encodeURIComponent(text)}` : ""].filter(Boolean).join("&");
    return `https://api.whatsapp.com/send${q ? "?" + q : ""}`;
  }

  return { MARCA, WHATSAPP_PEDIDOS, FRETE, CUPONS, OWNERS, INSTAGRAM, SUPPORT_EMAIL, modelos, colecoes, tipos, heroSlides, whatsLink };
})();

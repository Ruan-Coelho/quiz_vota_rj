/* ==========================================================================
   Teste de afinidade partidária — RJ 2026 · esquerdas
   Campos comparados (nível de legenda no voto proporcional):
     PT/PCdoB — Federação Brasil da Esperança (PT–PCdoB–PV): os votos das três
                siglas se somam como uma legenda única.
     PSB      — Partido Socialista Brasileiro.
     PDT      — Partido Democrático Trabalhista.
     PSOL     — federado com a Rede (Federação PSOL–Rede).
   Posições codificadas pelo autor a partir do guia comparativo e de posições
   públicas verificadas (corte informativo: 20/07/2026). Escala: −2 a +2.
   Como são todos partidos de esquerda, os códigos medem sobretudo INTENSIDADE
   e PRIORIDADE, não direções opostas. Tudo roda localmente no navegador.
   ========================================================================== */

"use strict";

const PARTIDOS = {
  PT:   { sigla: "PT/PCdoB", nome: "Federa\u00e7\u00e3o Brasil da Esperan\u00e7a (PT\u2013PCdoB\u2013PV)", cor: "pt"  },
  PSB:  { sigla: "PSB",      nome: "Partido Socialista Brasileiro",                                     cor: "psb" },
  PDT:  { sigla: "PDT",      nome: "Partido Democr\u00e1tico Trabalhista",                              cor: "pdt" },
  PSOL: { sigla: "PSOL",     nome: "PSOL (federado com a Rede)",                                        cor: "psol" }
};

const ESCOPO_ROTULO = {
  federal: "Vale para: deputado federal",
  estadual: "Vale para: deputado estadual",
  ambos: "Vale para: as duas c\u00e2maras"
};

const QUESTOES = [
  {
    eixo: "Governo Lula", escopo: "federal",
    texto: "Um bom deputado de esquerda deve defender o governo Lula por inteiro, evitando cr\u00edticas p\u00fablicas que possam enfraquec\u00ea-lo.",
    ctx: "O contr\u00e1rio disso \u00e9 o chamado \u201capoio cr\u00edtico\u201d: votar com o governo contra a direita, mas cobr\u00e1-lo abertamente quando discorda.",
    pos: { PT: 2, PSB: 2, PDT: 1, PSOL: -1 },
    just: "PT/PCdoB e PSB s\u00e3o o n\u00facleo do governo (a vice-presid\u00eancia \u00e9 do PSB). O PDT \u00e9 aliado, com desgastes recentes. O PSOL pratica o apoio cr\u00edtico: vota junto na maioria das pautas, mas critica pela esquerda \u2014 caso do arcabou\u00e7o fiscal e do petr\u00f3leo na Amaz\u00f4nia."
  },
  {
    eixo: "Economia \u00b7 Regras fiscais", escopo: "federal",
    texto: "O governo acerta ao respeitar limites de gastos \u2014 o chamado arcabou\u00e7o fiscal \u2014 mesmo que isso adie investimentos sociais.",
    ctx: "Arcabou\u00e7o fiscal \u00e9 a regra que limita quanto as despesas federais podem crescer por ano, para controlar a d\u00edvida p\u00fablica.",
    pos: { PT: 1, PSB: 1, PDT: 0, PSOL: -2 },
    just: "A gest\u00e3o Haddad (PT) fez do arcabou\u00e7o seu piso de credibilidade, com PSB junto. O PDT aceita com reservas trabalhistas. O PSOL votou contra e defende revogar limites que travem gasto social."
  },
  {
    eixo: "Economia \u00b7 Impostos", escopo: "federal",
    texto: "O Brasil deve criar impostos sobre grandes fortunas e heran\u00e7as milion\u00e1rias, mesmo enfrentando forte rea\u00e7\u00e3o do mercado financeiro.",
    ctx: "Hoje o pa\u00eds n\u00e3o taxa grandes fortunas; a taxa\u00e7\u00e3o de heran\u00e7as \u00e9 baixa em compara\u00e7\u00e3o internacional.",
    pos: { PT: 1, PSB: 0, PDT: 1, PSOL: 2 },
    just: "\u00c9 bandeira hist\u00f3rica de todo o campo, mas com intensidades diferentes: o PSOL a coloca no centro do programa; PT e PDT a mant\u00eam no papel enquanto priorizam reformas negoci\u00e1veis (como a isen\u00e7\u00e3o do IR at\u00e9 R$ 5 mil); o PSB \u00e9 o mais cauteloso com o mercado."
  },
  {
    eixo: "Estilo \u00b7 Centr\u00e3o", escopo: "federal",
    texto: "Para aprovar projetos importantes, \u00e9 aceit\u00e1vel negociar cargos e emendas com o chamado Centr\u00e3o.",
    ctx: "Centr\u00e3o \u00e9 o bloco de partidos sem ideologia fixa que apoia qualquer governo em troca de cargos e verbas do or\u00e7amento.",
    pos: { PT: 1, PSB: 1, PDT: 0, PSOL: -2 },
    just: "PT/PCdoB e PSB governam e negociam \u2014 \u00e9 o pre\u00e7o da governabilidade que aceitam pagar. O PSOL faz da recusa a esse m\u00e9todo uma marca de identidade. O PDT oscila conforme a conjuntura."
  },
  {
    eixo: "Ambiente \u00b7 Petr\u00f3leo", escopo: "federal",
    texto: "O Brasil deveria desistir de explorar petr\u00f3leo perto da foz do rio Amazonas, mesmo abrindo m\u00e3o dessa receita.",
    ctx: "Em 2025, o governo autorizou a Petrobras a pesquisar petr\u00f3leo na regi\u00e3o, contrariando ambientalistas \u2014 inclusive dentro da pr\u00f3pria base.",
    pos: { PT: 0, PSB: 1, PDT: -1, PSOL: 2 },
    just: "A licen\u00e7a saiu de um governo do PT dividido entre as alas ambientalista e desenvolvimentista. O PSB pende ao clima no programa. O PDT \u00e9 desenvolvimentista cl\u00e1ssico. O PSOL foi a principal voz contra, \u00e0 esquerda do governo."
  },
  {
    eixo: "Costumes \u00b7 Aborto", escopo: "federal",
    texto: "Deputados devem defender abertamente a legaliza\u00e7\u00e3o do aborto, mesmo sabendo que o tema tem alto custo eleitoral.",
    ctx: "Hoje o aborto s\u00f3 \u00e9 legal no Brasil em tr\u00eas situa\u00e7\u00f5es: estupro, risco de vida da gestante e anencefalia do feto.",
    pos: { PT: 1, PSB: 0, PDT: -1, PSOL: 2 },
    just: "O PSOL assume a pauta sem rodeios. No PT/PCdoB, muitas parlamentares a defendem (Jandira Feghali \u00e9 refer\u00eancia hist\u00f3rica na sa\u00fade da mulher), mas a c\u00fapula evita o tema. PSB e PDT abrigam alas crist\u00e3s e preferem sil\u00eancio."
  },
  {
    eixo: "Seguran\u00e7a \u00b7 Drogas", escopo: "federal",
    texto: "A maconha deveria ser legalizada e regulamentada pelo Estado, para tirar essa fonte de dinheiro do tr\u00e1fico.",
    ctx: "Legalizar \u00e9 diferente de descriminalizar: na legaliza\u00e7\u00e3o, o Estado regula produ\u00e7\u00e3o e venda, como faz com \u00e1lcool e tabaco.",
    pos: { PT: 0, PSB: 0, PDT: -1, PSOL: 2 },
    just: "\u00c9 pauta assumida do PSOL, tamb\u00e9m como pol\u00edtica de seguran\u00e7a. PT/PCdoB e PSB t\u00eam defensores individuais, sem posi\u00e7\u00e3o de bancada. No PDT, a base ligada \u00e0s pol\u00edcias empurra na dire\u00e7\u00e3o contr\u00e1ria."
  },
  {
    eixo: "Estrat\u00e9gia \u00b7 Gest\u00e3o", escopo: "ambos",
    texto: "A esquerda ganha mais elei\u00e7\u00f5es provando que governa bem \u2014 servi\u00e7os funcionando, contas em dia \u2014 do que levantando bandeiras de transforma\u00e7\u00e3o radical.",
    pos: { PT: 1, PSB: 1, PDT: 2, PSOL: -2 },
    just: "\u00c9 a tese-s\u00edntese do PDT fluminense, com Niter\u00f3i (Rodrigo Neves) como vitrine. PT/PCdoB e PSB equilibram gest\u00e3o e bandeira. O PSOL inverte a ordem: sem disputar o rumo da sociedade, governar bem seria administrar o problema."
  },
  {
    eixo: "Movimentos sociais", escopo: "ambos",
    texto: "Ocupa\u00e7\u00f5es de terrenos e pr\u00e9dios abandonados por movimentos de moradia s\u00e3o formas leg\u00edtimas de press\u00e3o pol\u00edtica.",
    ctx: "O Rio tem milhares de im\u00f3veis vazios em \u00e1reas centrais e um d\u00e9ficit habitacional grande \u2014 da\u00ed as ocupa\u00e7\u00f5es organizadas.",
    pos: { PT: 1, PSB: 0, PDT: 0, PSOL: 2 },
    just: "O PSOL nasceu e vive junto desses movimentos. O PT/PCdoB \u00e9 aliado hist\u00f3rico, moderado pelo exerc\u00edcio do governo. PSB e PDT mant\u00eam dist\u00e2ncia institucional."
  },
  {
    eixo: "Economia \u00b7 Setor privado", escopo: "ambos",
    texto: "Parcerias com empresas privadas \u2014 concess\u00f5es e PPPs \u2014 s\u00e3o bem-vindas para tocar servi\u00e7os e obras p\u00fablicas.",
    ctx: "Na PPP (parceria p\u00fablico-privada), a empresa constr\u00f3i ou opera o servi\u00e7o e o governo paga ou concede a explora\u00e7\u00e3o por contrato.",
    pos: { PT: 0, PSB: 2, PDT: 1, PSOL: -2 },
    just: "O PSB \u00e9 o mais amig\u00e1vel ao setor privado do campo (a agenda industrial de Alckmin \u00e9 o s\u00edmbolo). O PDT usa o instrumento em Niter\u00f3i. O PT aceita caso a caso. O PSOL v\u00ea privatiza\u00e7\u00e3o disfar\u00e7ada e prefere o servi\u00e7o 100% p\u00fablico."
  },
  {
    eixo: "Estilo de mandato", escopo: "ambos",
    texto: "Prefiro deputados que estejam nas ruas com os movimentos e fa\u00e7am barulho a deputados discretos que negociam nos bastidores.",
    pos: { PT: 0, PSB: -1, PDT: 0, PSOL: 2 },
    just: "O mandato-ativista \u00e9 a assinatura do PSOL carioca (Tarc\u00edsio Motta, Tal\u00edria Petrone, Renata Souza \u2014 e o legado de Marielle Franco). O PSB cultiva o perfil t\u00e9cnico-institucional. PT/PCdoB e PDT combinam os dois registros."
  },
  {
    eixo: "Rio 2026 \u00b7 Governo do estado", escopo: "estadual",
    texto: "Apoiar Eduardo Paes para governador \u00e9 o caminho certo para a esquerda fluminense em 2026.",
    ctx: "Paes \u00e9 do PSD, partido de centro. PT/PCdoB e PDT est\u00e3o oficialmente no bloco dele; o PSOL lan\u00e7a candidatura pr\u00f3pria; o PSB ficou fora da chapa majorit\u00e1ria.",
    pos: { PT: 2, PSB: 0, PDT: 2, PSOL: -2 },
    just: "O diret\u00f3rio do PT aprovou o apoio por unanimidade, com Benedita da Silva na chapa ao Senado. O PDT est\u00e1 no mesmo bloco. O PSOL v\u00ea a\u00ed diluição do projeto de esquerda e disputa por fora. O PSB negocia sem lugar definido."
  },
  {
    eixo: "Seguran\u00e7a \u00b7 Opera\u00e7\u00f5es", escopo: "estadual",
    texto: "Grandes opera\u00e7\u00f5es policiais em favelas \u2014 com blindados e helic\u00f3pteros \u2014 devem ser fortemente restringidas, porque matam inocentes e n\u00e3o desmontam o crime.",
    ctx: "Uma a\u00e7\u00e3o no STF conhecida como \u201cADPF das Favelas\u201d, apresentada pelo PSB, imp\u00f4s condi\u00e7\u00f5es a essas opera\u00e7\u00f5es no Rio.",
    pos: { PT: 1, PSB: 2, PDT: 0, PSOL: 2 },
    just: "PSB (autor da ADPF) e PSOL (que fez do controle da letalidade uma raz\u00e3o de exist\u00eancia no Rio) convergem no ponto mais alto. O PT/PCdoB acompanha via PEC da Seguran\u00e7a. O PDT de Martha Rocha, ex-chefe da Pol\u00edcia Civil, aceita opera\u00e7\u00f5es \u2014 desde que guiadas por intelig\u00eancia."
  },
  {
    eixo: "Seguran\u00e7a \u00b7 Pol\u00edcias", escopo: "estadual",
    texto: "Aumentar sal\u00e1rio, equipamento e apoio aos policiais deve ser prioridade t\u00e3o importante quanto punir abusos.",
    pos: { PT: 1, PSB: 0, PDT: 2, PSOL: -1 },
    just: "\u00c9 a linha Martha Rocha (PDT): valorizar a carreira policial e investir em per\u00edcia e investiga\u00e7\u00e3o. O PSOL n\u00e3o nega sal\u00e1rios, mas prioriza desmilitariza\u00e7\u00e3o e controle externo \u2014 outra ordem de urg\u00eancias."
  },
  {
    eixo: "Educa\u00e7\u00e3o \u00b7 Marca de governo", escopo: "estadual",
    texto: "O pr\u00f3ximo governo do estado deveria fazer da escola p\u00fablica em tempo integral \u2014 na linha dos antigos CIEPs \u2014 sua marca principal.",
    ctx: "Os CIEPs (\u201cBrizol\u00f5es\u201d) foram escolas de turno integral criadas nos governos Brizola, com projeto de Darcy Ribeiro e Niemeyer.",
    pos: { PT: 1, PSB: 0, PDT: 2, PSOL: 1 },
    just: "\u00c9 o patrim\u00f4nio simb\u00f3lico m\u00e1ximo do PDT fluminense. PT/PCdoB e PSOL apoiam o tempo integral por outras vias; o PSB p\u00f5e a \u00eanfase federal em ci\u00eancia e tecnologia."
  }
];

/* ------------------------------ estado ---------------------------------- */

const estado = {
  atual: 0,
  respostas: QUESTOES.map(() => null) // null | {tipo:"valor", valor, peso} | {tipo:"branco"}
};

/* ------------------------------ elementos ------------------------------- */

const $ = (id) => document.getElementById(id);

const vistas = {
  inicio: $("view-inicio"),
  quiz: $("view-quiz"),
  resultado: $("view-resultado")
};

const ui = {
  contador: $("urna-contador"),
  eixo: $("urna-eixo"),
  escopo: $("urna-escopo"),
  afirmacao: $("urna-afirmacao"),
  contexto: $("urna-contexto"),
  opcoes: Array.from(document.querySelectorAll(".opcao")),
  peso: $("urna-peso"),
  confirma: $("btn-confirma"),
  corrige: $("btn-corrige"),
  branco: $("btn-branco"),
  barra: $("progresso-barra")
};

let selecaoAtual = null;

/* ------------------------------ navegação ------------------------------- */

function mostrarVista(nome) {
  Object.entries(vistas).forEach(([chave, el]) => {
    el.hidden = chave !== nome;
  });
  window.scrollTo({ top: 0 });
}

function renderQuestao() {
  const i = estado.atual;
  const q = QUESTOES[i];
  const total = QUESTOES.length;

  ui.contador.textContent =
    "Pergunta " + String(i + 1).padStart(2, "0") + "/" + total;
  ui.eixo.textContent = q.eixo;
  ui.escopo.textContent = ESCOPO_ROTULO[q.escopo];
  ui.afirmacao.textContent = q.texto;
  ui.contexto.textContent = q.ctx || "";
  ui.contexto.hidden = !q.ctx;

  const salva = estado.respostas[i];
  selecaoAtual = salva && salva.tipo === "valor" ? salva.valor : null;
  ui.peso.checked = !!(salva && salva.tipo === "valor" && salva.peso === 2);

  ui.opcoes.forEach((btn) => {
    const v = Number(btn.dataset.valor);
    btn.classList.toggle("selecionada", selecaoAtual === v);
  });

  ui.confirma.disabled = selecaoAtual === null;
  ui.corrige.disabled = i === 0;
  ui.barra.style.width = ((i / total) * 100).toFixed(1) + "%";
}

function avancar() {
  if (estado.atual < QUESTOES.length - 1) {
    estado.atual += 1;
    renderQuestao();
  } else {
    renderResultados();
    mostrarVista("resultado");
  }
}

/* ------------------------------ interações ------------------------------ */

ui.opcoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    selecaoAtual = Number(btn.dataset.valor);
    ui.opcoes.forEach((b) => b.classList.toggle("selecionada", b === btn));
    ui.confirma.disabled = false;
  });
});

ui.confirma.addEventListener("click", () => {
  if (selecaoAtual === null) return;
  estado.respostas[estado.atual] = {
    tipo: "valor",
    valor: selecaoAtual,
    peso: ui.peso.checked ? 2 : 1
  };
  avancar();
});

ui.branco.addEventListener("click", () => {
  estado.respostas[estado.atual] = { tipo: "branco" };
  avancar();
});

ui.corrige.addEventListener("click", () => {
  if (estado.atual > 0) {
    estado.atual -= 1;
    renderQuestao();
  }
});

$("btn-comecar").addEventListener("click", () => {
  mostrarVista("quiz");
  renderQuestao();
});

$("btn-refazer").addEventListener("click", () => {
  estado.atual = 0;
  estado.respostas = QUESTOES.map(() => null);
  mostrarVista("quiz");
  renderQuestao();
});

document.addEventListener("keydown", (ev) => {
  if (vistas.quiz.hidden) return;
  const mapa = { "1": 2, "2": 1, "3": 0, "4": -1, "5": -2 };
  if (mapa[ev.key] !== undefined) {
    const alvo = ui.opcoes.find((b) => Number(b.dataset.valor) === mapa[ev.key]);
    if (alvo) alvo.click();
  } else if (ev.key === "Enter" && !ui.confirma.disabled) {
    ev.preventDefault();
    ui.confirma.click();
  } else if (ev.key === "Backspace") {
    ev.preventDefault();
    ui.corrige.click();
  } else if (ev.key.toLowerCase() === "b") {
    ui.branco.click();
  }
});

/* ------------------------------ cálculo --------------------------------- */

function calcularAfinidade(escopos) {
  const somas = { PT: 0, PSB: 0, PDT: 0, PSOL: 0 };
  let pesoTotal = 0;
  let respondidas = 0;

  QUESTOES.forEach((q, i) => {
    if (!escopos.includes(q.escopo)) return;
    const r = estado.respostas[i];
    if (!r || r.tipo !== "valor") return;
    respondidas += 1;
    pesoTotal += r.peso;
    Object.keys(PARTIDOS).forEach((chave) => {
      const prox = (4 - Math.abs(r.valor - q.pos[chave])) / 4;
      somas[chave] += prox * r.peso;
    });
  });

  if (pesoTotal === 0) return { respondidas: 0, ranking: [] };

  const ranking = Object.keys(PARTIDOS)
    .map((chave) => ({ chave, sigla: PARTIDOS[chave].sigla, pct: (somas[chave] / pesoTotal) * 100 }))
    .sort((a, b) => b.pct - a.pct);

  return { respondidas, ranking };
}

/* ------------------------------ resultados ------------------------------ */

function renderRanking(elLista, elN, resultado) {
  elLista.innerHTML = "";
  if (resultado.respondidas === 0) {
    elN.textContent = "";
    const li = document.createElement("li");
    li.textContent =
      "Sem respostas suficientes neste escopo — refaça o teste respondendo ao menos uma afirmação correspondente.";
    li.style.fontSize = "0.9rem";
    elLista.appendChild(li);
    return;
  }
  elN.textContent = "base: " + resultado.respondidas + " respostas";

  resultado.ranking.forEach((item, idx) => {
    const cor = PARTIDOS[item.chave].cor;
    const li = document.createElement("li");
    li.className = "ranking__item";
    li.innerHTML =
      '<div class="ranking__linha">' +
      '  <span class="ranking__nome">' +
      '    <span class="ranking__pos mono">' + (idx + 1) + "º</span>" +
      '    <span class="ranking__sigla">' + item.sigla + "</span>" +
      "  </span>" +
      '  <span class="ranking__pct mono">' + item.pct.toFixed(1) + "%</span>" +
      "</div>" +
      '<div class="ranking__trilho"><div class="ranking__barra barra--' + cor + '"></div></div>';
    elLista.appendChild(li);
    const barra = li.querySelector(".ranking__barra");
    requestAnimationFrame(() => {
      barra.style.width = item.pct.toFixed(1) + "%";
    });
  });
}

function fraseValor(v) {
  return { "2": "concordou totalmente", "1": "concordou em parte", "0": "ficou neutro(a)", "-1": "discordou em parte", "-2": "discordou totalmente" }[String(v)];
}

function codigo(v) {
  return v > 0 ? "+" + v : String(v);
}

function renderDetalhes() {
  const alvo = $("detalhes-lista");
  alvo.innerHTML = "";
  QUESTOES.forEach((q, i) => {
    const r = estado.respostas[i];
    const div = document.createElement("div");
    div.className = "item-detalhe";

    const chips = Object.keys(PARTIDOS)
      .map((chave) =>
        '<span class="posicao posicao--' + PARTIDOS[chave].cor + '">' +
        PARTIDOS[chave].sigla + " " + codigo(q.pos[chave]) + "</span>")
      .join("");

    const resposta =
      r && r.tipo === "valor"
        ? "Você " + fraseValor(r.valor) + ' <span class="mono">(' + codigo(r.valor) + ")</span>" +
          (r.peso === 2 ? " · peso dobrado" : "")
        : "Você pulou esta afirmação — fora do cálculo.";

    div.innerHTML =
      '<p class="item-detalhe__meta">' + String(i + 1).padStart(2, "0") + " · " + q.eixo + " · " + ESCOPO_ROTULO[q.escopo].replace("Vale para: ", "") + "</p>" +
      '<p class="item-detalhe__texto">' + q.texto + "</p>" +
      '<p class="item-detalhe__resposta">' + resposta + "</p>" +
      '<div class="posicoes">' + chips + "</div>" +
      '<p class="item-detalhe__just">' + q.just + "</p>";

    alvo.appendChild(div);
  });
}

let ultimoResumo = "";

function renderResultados() {
  const fed = calcularAfinidade(["federal", "ambos"]);
  const est = calcularAfinidade(["estadual", "ambos"]);

  renderRanking($("ranking-federal"), $("n-federal"), fed);
  renderRanking($("ranking-estadual"), $("n-estadual"), est);

  const leitura = $("leitura-resultado");
  if (fed.respondidas > 0 && est.respondidas > 0) {
    const lf = fed.ranking[0];
    const le = est.ranking[0];
    const iguais = lf.chave === le.chave;
    const margemFed = (lf.pct - fed.ranking[1].pct).toFixed(1);
    leitura.textContent = iguais
      ? "Sua maior afinidade nas duas câmaras é com " + lf.sigla +
        " (margem de " + margemFed + " ponto(s) sobre o segundo colocado no ranking federal). " +
        "Entre partidos do mesmo campo, margens estreitas são esperadas: nesses casos, compare os candidatos das legendas empatadas, não apenas as legendas."
      : "Seus rankings divergem entre as câmaras: " + lf.sigla + " lidera no federal e " +
        le.sigla + " no estadual — plausível, já que os temas fluminenses (apoio a Paes, operações policiais, modelo de gestão) dividem a esquerda de outro jeito que os nacionais. " +
        "Margens estreitas pedem comparação de candidatos, não apenas de legendas.";
  } else {
    leitura.textContent = "";
  }

  renderDetalhes();

  const linha = (r) =>
    r.ranking.map((x, i) => (i + 1) + "º " + x.sigla + " " + x.pct.toFixed(1) + "%").join(" · ");
  ultimoResumo =
    "Teste de afinidade — esquerdas RJ 2026 (PT/PCdoB, PSB, PDT, PSOL)\n" +
    "Deputado federal:  " + (fed.respondidas ? linha(fed) : "sem respostas") + "\n" +
    "Deputado estadual: " + (est.respondidas ? linha(est) : "sem respostas") + "\n" +
    "Posições codificadas com corte em 20/07/2026. Ferramenta informativa; não é recomendação de voto.";
}

$("btn-copiar").addEventListener("click", async (ev) => {
  const btn = ev.currentTarget;
  const original = btn.firstChild.textContent;
  try {
    await navigator.clipboard.writeText(ultimoResumo);
    btn.firstChild.textContent = "Copiado!";
  } catch (e) {
    window.prompt("Copie o resumo:", ultimoResumo);
  }
  setTimeout(() => { btn.firstChild.textContent = original; }, 1600);
});

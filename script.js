/* ==========================================================================
   Teste de afinidade partidária — RJ 2026 · PT, PSB, PDT, PSD
   Posições codificadas pelo autor a partir do guia comparativo
   (corte informativo: 20/07/2026). Escala: −2 a +2.
   Escopo de cada afirmação: "federal", "estadual" ou "ambos".
   Tudo roda localmente; nenhum dado sai do navegador.
   ========================================================================== */

"use strict";

const PARTIDOS = {
  PT:  { nome: "Partido dos Trabalhadores",       cor: "pt"  },
  PSB: { nome: "Partido Socialista Brasileiro",   cor: "psb" },
  PDT: { nome: "Partido Democrático Trabalhista", cor: "pdt" },
  PSD: { nome: "Partido Social Democrático",      cor: "psd" }
};

const ESCOPO_ROTULO = {
  federal: "Vale para: deputado federal",
  estadual: "Vale para: deputado estadual",
  ambos: "Vale para: as duas câmaras"
};

const QUESTOES = [
  {
    eixo: "Economia", escopo: "ambos",
    texto: "O Estado deve ser o principal indutor do desenvolvimento econômico, mesmo que isso exija mais gasto público e empresas estatais fortes.",
    pos: { PT: 2, PSB: 2, PDT: 2, PSD: -1 },
    just: "PT, PSB e PDT são variações de uma mesma família desenvolvimentista. O PSD é liberal-pragmático em doutrina — ainda que governista na prática."
  },
  {
    eixo: "Economia", escopo: "ambos",
    texto: "Prefiro partidos comprometidos com disciplina fiscal e com a redução do tamanho do Estado.",
    pos: { PT: -2, PSB: -1, PDT: -2, PSD: 2 },
    just: "Entre os quatro, só o PSD (sobretudo sua direção nacional) está genuinamente à direita do consenso econômico; o PDT é o mais refratário ao ajuste."
  },
  {
    eixo: "Economia · Indústria", escopo: "federal",
    texto: "Reindustrializar o país com política industrial, crédito público e metas de inovação deve ser prioridade nacional.",
    pos: { PT: 2, PSB: 2, PDT: 1, PSD: 0 },
    just: "A neoindustrialização (agenda Alckmin/MDIC) é a marca econômica do PSB; o PT converge. A ênfase do PSD está em agro e energia."
  },
  {
    eixo: "Ambiente · Economia", escopo: "federal",
    texto: "Agronegócio e expansão da produção de energia — incluindo petróleo — merecem prioridade e menos entraves regulatórios.",
    pos: { PT: -1, PSB: -2, PDT: 1, PSD: 2 },
    just: "O polo pró-exploração do governo está no PSD (Minas e Energia); o PSB é o mais ambientalista; o PT racha; o PDT é desenvolvimentista clássico."
  },
  {
    eixo: "Ambiente", escopo: "federal",
    texto: "A exploração de petróleo na Foz do Amazonas deveria ser barrada por precaução ambiental, mesmo com perda de receitas.",
    pos: { PT: 0, PSB: 1, PDT: -1, PSD: -2 },
    just: "A licença saiu de um ministério do PSD, num governo do PT dividido entre a ala ambientalista e a desenvolvimentista. O programa do PSB pende ao clima."
  },
  {
    eixo: "Política social", escopo: "ambos",
    texto: "Transferência de renda, cotas e políticas afirmativas devem ser mantidas e ampliadas.",
    pos: { PT: 2, PSB: 2, PDT: 1, PSD: 0 },
    just: "É o núcleo identitário do PT, com o PSB ao lado. O PDT converge no discurso; o PSD adere sem protagonismo programático."
  },
  {
    eixo: "Educação", escopo: "ambos",
    texto: "A prioridade máxima da educação deve ser a escola pública em tempo integral, na linha dos CIEPs.",
    pos: { PT: 1, PSB: 1, PDT: 2, PSD: 0 },
    just: "Bandeira fundadora do PDT (Brizola e Darcy Ribeiro), com memória forte no Rio. PT e PSB convergem por outras vias; o PSD trata educação como gestão."
  },
  {
    eixo: "Trabalho · Previdência", escopo: "federal",
    texto: "Proteger as aposentadorias e a valorização do salário mínimo deve vir antes do ajuste fiscal.",
    pos: { PT: 2, PSB: 1, PDT: 2, PSD: -1 },
    just: "É a doutrina trabalhista do PDT — hoje em tensão com o desgaste do caso INSS, ocorrido sob gestão do partido na pasta. O PT converge; o PSD prioriza o fiscal em tese."
  },
  {
    eixo: "Segurança pública", escopo: "federal",
    texto: "A segurança pública precisa de coordenação nacional, com padrões para as polícias e controle de letalidade (linha da PEC da Segurança).",
    pos: { PT: 2, PSB: 2, PDT: 1, PSD: -1 },
    just: "Doutrina federal-coordenadora de PT e PSB (legado Dino/Lewandowski). No PSD, governadores como Caiado resistem à federalização; a bancada é reticente."
  },
  {
    eixo: "Segurança pública", escopo: "ambos",
    texto: "Prefiro priorizar investigação, perícia e inteligência policial a operações ostensivas de confronto.",
    pos: { PT: 1, PSB: 1, PDT: 2, PSD: -1 },
    just: "É a linha técnico-investigativa associada a Martha Rocha (PDT). No PSD, as vitrines de Caiado e Ratinho vão no sentido ostensivo; Paes fica entre a tecnologia e a guarda armada."
  },
  {
    eixo: "Segurança pública", escopo: "estadual",
    texto: "No Rio, enfrentar o crime organizado exige endurecimento: mais operações ostensivas e apoio irrestrito às forças policiais.",
    pos: { PT: -2, PSB: -2, PDT: -1, PSD: 1 },
    just: "A doutrina do confronto pertence ao campo bolsonarista, fora deste teste — mas, entre os quatro, o PSD é o que mais abriga defensores da linha dura."
  },
  {
    eixo: "Costumes e direitos", escopo: "federal",
    texto: "Pautas como a descriminalização das drogas e do aborto devem avançar no Congresso.",
    pos: { PT: 1, PSB: 1, PDT: 0, PSD: -1 },
    just: "Os programas de PT e PSB são progressistas, com cúpulas cautelosas nesses dois temas. O PDT não tem linha unificada; a bancada do PSD é com frequência conservadora."
  },
  {
    eixo: "Democracia", escopo: "federal",
    texto: "Sou contra qualquer anistia aos condenados pelos atos do 8 de Janeiro.",
    pos: { PT: 2, PSB: 2, PDT: 2, PSD: 0 },
    just: "O campo \u201csem anistia\u201d une PT, PSB e PDT. O PSD é ambíguo por desenho: parte da bancada flerta com a pauta, parte a rejeita."
  },
  {
    eixo: "Polarização", escopo: "federal",
    texto: "O Brasil precisa de uma alternativa de centro-direita que supere a polarização entre lulismo e bolsonarismo.",
    pos: { PT: -2, PSB: -2, PDT: -1, PSD: 2 },
    just: "É exatamente a aposta da chapa Caiado–Kassab (PSD). PT, PSB e PDT estão no palanque da reeleição de Lula."
  },
  {
    eixo: "Estilo de coalizão", escopo: "ambos",
    texto: "Prefiro um partido que negocie e participe de qualquer governo para garantir influência a um partido de posições rígidas.",
    pos: { PT: -1, PSB: 0, PDT: 0, PSD: 2 },
    just: "O governismo estrutural — estar em todos os campos ao mesmo tempo — é o método do PSD. O PT é o mais programático dos quatro."
  },
  {
    eixo: "Coesão de bancada", escopo: "ambos",
    texto: "No voto proporcional, quero garantia de que a bancada votará unida, conforme o programa do partido.",
    pos: { PT: 2, PSB: 1, PDT: 0, PSD: -2 },
    just: "A pergunta decisiva do voto de legenda: a coesão do PT é a mais alta; a \u201cloteria interna\u201d do PSD é a mais ampla — por desenho, não por acidente."
  },
  {
    eixo: "Peso das figuras", escopo: "ambos",
    texto: "Voto na pessoa, não na legenda — mesmo que o partido abrigue de tudo.",
    pos: { PT: -2, PSB: -1, PDT: 0, PSD: 2 },
    just: "Quem vota em figuras convive melhor com a dispersão do PSD (confederação de projetos pessoais). Quem vota em programa encontra no rótulo do PT a maior garantia."
  },
  {
    eixo: "Alerj · Fiscalização", escopo: "estadual",
    texto: "Na próxima Alerj, quero deputados com independência para fiscalizar duramente o governador — mesmo sendo da base dele.",
    pos: { PT: 0, PSB: 1, PDT: 0, PSD: -2 },
    just: "Com Paes favorito, o PSD tende a ser o partido do governador — o menos vocacionado à fiscalização. O PSB ficou fora da chapa majoritária; PT e PDT são sócios com identidade própria."
  },
  {
    eixo: "Alerj · Modelo de gestão", escopo: "estadual",
    texto: "A gestão de Niterói — planejamento de longo prazo e serviços bem avaliados — é um modelo para o estado do Rio.",
    pos: { PT: 1, PSB: 0, PDT: 2, PSD: 1 },
    just: "Niterói é a vitrine executiva do PDT fluminense (Rodrigo Neves), à frente de uma coalizão ampla que incluiu PT e PSD."
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
  const somas = { PT: 0, PSB: 0, PDT: 0, PSD: 0 };
  let pesoTotal = 0;
  let respondidas = 0;

  QUESTOES.forEach((q, i) => {
    if (!escopos.includes(q.escopo)) return;
    const r = estado.respostas[i];
    if (!r || r.tipo !== "valor") return;
    respondidas += 1;
    pesoTotal += r.peso;
    Object.keys(PARTIDOS).forEach((sigla) => {
      const prox = (4 - Math.abs(r.valor - q.pos[sigla])) / 4;
      somas[sigla] += prox * r.peso;
    });
  });

  if (pesoTotal === 0) return { respondidas: 0, ranking: [] };

  const ranking = Object.keys(PARTIDOS)
    .map((sigla) => ({ sigla, pct: (somas[sigla] / pesoTotal) * 100 }))
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
    const cor = PARTIDOS[item.sigla].cor;
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
      .map((sigla) =>
        '<span class="posicao posicao--' + PARTIDOS[sigla].cor + '">' +
        sigla + " " + codigo(q.pos[sigla]) + "</span>")
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
    const iguais = lf.sigla === le.sigla;
    const margemFed = (lf.pct - fed.ranking[1].pct).toFixed(1);
    leitura.textContent = iguais
      ? "Sua maior afinidade nas duas câmaras é com o " + lf.sigla +
        " (margem de " + margemFed + " ponto(s) sobre o segundo colocado no ranking federal). " +
        "Margens estreitas indicam que vale comparar candidatos das legendas empatadas, não apenas as legendas."
      : "Seus rankings divergem entre as câmaras: " + lf.sigla + " lidera no federal e " +
        le.sigla + " no estadual — um resultado plausível, já que os temas fluminenses (Alerj, segurança, modelo de gestão) pesam diferente dos nacionais. " +
        "Margens estreitas indicam que vale comparar candidatos, não apenas legendas.";
  } else {
    leitura.textContent = "";
  }

  renderDetalhes();

  const linha = (r) =>
    r.ranking.map((x, i) => (i + 1) + "º " + x.sigla + " " + x.pct.toFixed(1) + "%").join(" · ");
  ultimoResumo =
    "Teste de afinidade partidária — RJ 2026 (PT, PSB, PDT, PSD)\n" +
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

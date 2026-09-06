/* =====================================================================
   Outerdle — conteúdo (versão legível)
   Edite AQUI e depois rode:  node tools/build.js
   Esse comando valida os campos e gera js/data.js (codificado).
   ===================================================================== */
window.OUTERDLE_DATA = (() => {
  "use strict";

  /* ---------------------------------------------------------------
     LOCAIS
     tipo    : categoria do lugar (Planeta, Lua, Cidade, Acampamento...)
     corpo   : corpo celeste onde fica (ou que orbita). Corpos = eles mesmos.
     orbita  : posição do corpo a partir do Sol (0 = Sol, null = varia)
     nomai   : "Sim" (estrutura importante), "Ruínas" (só vestígios), "Não"
     perigo  : principal ameaça no lugar
     viajante: quem acampa ali (Nenhum se ninguém)
     dicas   : 5 registros de diário, do mais vago ao mais específico.
               O modo Locais usa o 2º e o 4º como dicas extras.
     dlc     : true = só aparece com "Echoes of the Eye" ligado
     --------------------------------------------------------------- */
  const LOCAIS = [
    /* ======================= SOL ======================= */
    { id:"sol", nome:"Sol", alias:["Sun","The Sun","O Sol"],
      tipo:"Estrela", corpo:"Sol", orbita:0, nomai:"Não", perigo:"Calor", viajante:"Nenhum",
      desc:"A estrela do sistema. Está velha, inchada e prestes a fazer algo dramático.",
      dicas:["Sem mim, nada por aqui estaria girando.","Ando maior e mais vermelho do que deveria.","Construíram uma estação bem perto de mim, e não era pra me admirar de longe.","Chert já percebeu que tem algo errado comigo.","No fim de cada ciclo, eu explodo."] },
    { id:"sun-station", nome:"Estação Solar", alias:["Sun Station"],
      tipo:"Estação", corpo:"Sol", orbita:1, nomai:"Sim", perigo:"Calor", viajante:"Nenhum",
      desc:"Estação Nomai em órbita rasante do Sol, construída pra um experimento que nunca funcionou.",
      dicas:["Nada aqui saiu como o planejado.","Fico onde nenhuma nave deveria conseguir chegar.","Você só chega em mim por um caminho que não é a sua nave.","Fui construída pra forçar o Sol a fazer algo que ele ainda não estava pronto pra fazer.","Pye escreveu nas minhas paredes que eu era um fracasso."] },

    /* ======================= EMBER TWIN ======================= */
    { id:"ember-twin", nome:"Gêmeo Cálido", alias:["Gêmea de Brasa","Gêmea de Brasas","Ember","Ember Twin"],
      tipo:"Planeta", corpo:"Gêmeo Cálido", orbita:2, nomai:"Sim", perigo:"Areia", viajante:"Chert",
      desc:"A gêmea que recebe areia. Cavernas, uma cidade escondida e Chert no topo.",
      dicas:["Meu vizinho está me enchendo. Literalmente.","Tem uma cidade escondida onde o sol não bate.","Minhas cavernas ficam mais apertadas conforme o ciclo avança.","Um astrônomo acampa no meu topo tocando tambor.","A Cidade Sem Sol e o Laboratório de Alta Energia ficam em mim."] },
    { id:"chert-camp", nome:"Acampamento de Chert", alias:["Chert's Camp","Acampamento do Chert"],
      tipo:"Acampamento", corpo:"Gêmeo Cálido", orbita:2, nomai:"Não", perigo:"Nenhum", viajante:"Chert",
      desc:"Uma cratera no polo norte do Gêmeo Cálido, com um telescópio, um tambor e um astrônomo cada vez mais nervoso.",
      dicas:["Fico numa cratera no topo de um planeta que só piora com o tempo.","Tenho um telescópio apontado pro céu e um tambor.","A coluna de areia do vizinho passa bem do meu lado.","Quem acampa aqui vai ficando menos animado conforme o ciclo passa.","Chert está aqui."] },
    { id:"sunless-city", nome:"Cidade do Ocaso", alias:["Sunless City","Cidade sem sol","Cidade Sem Sol"],
      tipo:"Cidade", corpo:"Gêmeo Cálido", orbita:2, nomai:"Sim", perigo:"Areia", viajante:"Nenhum",
      desc:"A cidade Nomai escavada num cânion do Gêmeo Cálido, longe do calor do Sol. A areia acaba tomando tudo.",
      dicas:["Fui construída onde o sol nunca chega.","Casas de pedra em camadas, dentro de um cânion.","A areia vai me enchendo ao longo do ciclo.","Tenho um santuário dedicado a estudar a lua que some.","Fico embaixo da superfície do Gêmeo Cálido."] },
    { id:"high-energy-lab", nome:"Laboratório de Alta Energia", alias:["High Energy Lab","Lab de Alta Energia"],
      tipo:"Laboratório", corpo:"Gêmeo Cálido", orbita:2, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Onde os Nomai provaram que algo pode chegar antes de sair. Pye trabalhou aqui.",
      dicas:["Foi aqui que se provou que uma coisa pode chegar antes de partir.","Um buraco negro e um buraco branco pequenos, feitos de propósito.","Pye trabalhou aqui.","Fico num cânion perto do equador de um planeta de areia.","Fico no Gêmeo Cálido, e a cidade fica logo ao lado."] },
    { id:"lakebed-cave", nome:"Caverna do Fundo do Lago", alias:["Lakebed Cave","Cavernas Quânticas","Caverna do Leito do Lago","Caverna do Lago Seco"],
      tipo:"Caverna", corpo:"Gêmeo Cálido", orbita:2, nomai:"Ruínas", perigo:"Areia", viajante:"Nenhum",
      desc:"Um lago que secou há eras. Lá dentro, uma pedra que muda de lugar quando ninguém olha.",
      dicas:["Um lago que secou há muito tempo.","Lá dentro tem uma pedra que muda de lugar quando ninguém olha.","Coleus sumiu aqui.","Aqui se aprende a primeira regra quântica.","Fico no Gêmeo Cálido e encho de areia rápido."] },
    { id:"escape-pod-2", nome:"Pod de Fuga 2", alias:["Escape Pod 2","Pod 2","Cápsula de Fuga 2"],
      tipo:"Ruína", corpo:"Gêmeo Cálido", orbita:2, nomai:"Ruínas", perigo:"Areia", viajante:"Nenhum",
      desc:"O pod que teve o pouso mais violento. Quem estava dentro sobreviveu por pouco.",
      dicas:["Caí com força e fiquei de lado.","Quem estava dentro sobreviveu, mas por pouco.","Filix saiu daqui pra explorar.","Sou um de três, e o que mais sofreu na chegada.","Fico no Gêmeo Cálido, meio enterrado."] },
    { id:"quantum-moon-locator", nome:"Localizador da Lua Quântica", alias:["Quantum Moon Locator","Localizador Quântico"],
      tipo:"Estrutura", corpo:"Gêmeo Cálido", orbita:2, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Um mapa Nomai que mostra em qual planeta a Lua Quântica está agora.",
      dicas:["Fico de olho em algo que muda de lugar.","Sou um mapa do sistema com uma marca que anda sozinha.","Mostro em qual planeta a lua está agora.","Fui feito pelos Nomai pra planejar peregrinações.","Fico na superfície do Gêmeo Cálido, perto do polo norte."] },

    /* ======================= ASH TWIN ======================= */
    { id:"ash-twin", nome:"Gêmeo Cinzento", alias:["Gêmea de Cinzas","Ash","Ash Twin"],
      tipo:"Planeta", corpo:"Gêmeo Cinzento", orbita:2, nomai:"Sim", perigo:"Areia", viajante:"Nenhum",
      desc:"A gêmea que perde areia. Torres de dobra e um projeto secreto no núcleo.",
      dicas:["Vou embora aos poucos, grão por grão.","Minhas torres levam pra cada um dos outros mundos.","Uma coluna de areia me liga ao meu gêmeo.","O que guardo no meu núcleo é a razão de você lembrar de tudo.","O projeto que leva meu nome fica bem no meu centro."] },
    { id:"ash-twin-project", nome:"Projeto do Gêmeo Cinzento", alias:["Ash Twin Project","Projeto Gêmea de Cinzas","ATP","Projeto Ash Twin"],
      tipo:"Laboratório", corpo:"Gêmeo Cinzento", orbita:2, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"O maior segredo dos Nomai, escondido no centro do Gêmeo Cinzento. É por causa dele que você lembra de tudo.",
      dicas:["Fico no centro de um planeta que está esvaziando.","Recebo energia de algo muito maior que eu.","Guardo a memória de tudo que você já viveu.","Só se entra em mim quando a areia libera o caminho.","Fui o maior segredo dos Nomai."] },
    { id:"ash-twin-towers", nome:"Torres do Gêmeo Cinzento", alias:["Ash Twin Towers","Torres de Teletransporte","Torres de Dobra"],
      tipo:"Torre", corpo:"Gêmeo Cinzento", orbita:2, nomai:"Sim", perigo:"Areia", viajante:"Nenhum",
      desc:"Torres alinhadas no equador do Gêmeo Cinzento. Cada uma tem a forma do mundo pra onde leva.",
      dicas:["Cada uma de nós tem a forma do lugar pra onde leva.","Pisar em cima na hora certa te leva pra outro mundo.","Ficamos alinhadas no equador de um planeta.","A areia nos cobre e descobre ao longo do ciclo.","Ficamos no Gêmeo Cinzento."] },

    /* ======================= TIMBER HEARTH ======================= */
    { id:"timber-hearth", nome:"Recanto Lenhoso", alias:["Timber","Timber Hearth"],
      tipo:"Planeta", corpo:"Recanto Lenhoso", orbita:3, nomai:"Ruínas", perigo:"Matéria fantasma", viajante:"Nenhum",
      desc:"Casa. Gêiseres, pinheiros, uma vila na cratera e uma plataforma de lançamento.",
      dicas:["Pra você, tudo começa aqui.","Gêiseres, pinheiros e uma cratera com uma vila.","Meu museu acabou de receber uma estátua que não para de olhar pra você.","Slate, Hornfels e Gossan moram aqui.","Sua nave decola da minha vila."] },
    { id:"vila", nome:"Vila", alias:["Village","Vila Hearthiana","Aldeia"],
      tipo:"Cidade", corpo:"Recanto Lenhoso", orbita:3, nomai:"Não", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Casas de madeira numa cratera, uma árvore enorme no meio e todo mundo que você conhece.",
      dicas:["Casas de madeira dentro de uma cratera.","Tenho uma árvore enorme no meio, que Marl quer derrubar.","Crianças brincam de esconde-esconde por aqui.","É daqui que sua nave decola.","É onde os Hearthianos moram."] },
    { id:"museu", nome:"Museu", alias:["Museum","Observatório do Recanto Lenhoso","Observatório"],
      tipo:"Observatório", corpo:"Recanto Lenhoso", orbita:3, nomai:"Não", perigo:"Matéria fantasma", viajante:"Nenhum",
      desc:"O observatório da vila, com uma exposição de tudo que a Outer Wilds Ventures já achou. Hal cuida dele.",
      dicas:["Guardo uma pedra que dá pra segurar mas não dá pra entender.","Tenho uma amostra de algo invisível que mata, dentro de uma caixa.","Hal cuida de mim.","Uma estátua recém-chegada abre os olhos pra você aqui.","Fico no alto da vila."] },
    { id:"zero-g-cave", nome:"Caverna de Gravidade Zero", alias:["Zero-G Cave","Caverna Gravidade Zero","Caverna de gravidade"],
      tipo:"Caverna", corpo:"Recanto Lenhoso", orbita:3, nomai:"Não", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Onde os novatos aprendem a flutuar e a consertar coisas antes de sair pro espaço.",
      dicas:["Aqui você flutua.","Sirvo pra treinar antes de sair pro espaço.","Você conserta uma nave de mentira aqui antes de pilotar a de verdade.","Gossan te espera na entrada.","Fico embaixo da vila."] },
    { id:"minas-nomai", nome:"Minas Nomai", alias:["Nomai Mines","Mina","Minas"],
      tipo:"Caverna", corpo:"Recanto Lenhoso", orbita:3, nomai:"Ruínas", perigo:"Matéria fantasma", viajante:"Nenhum",
      desc:"Escavações Nomai que os Hearthianos reaproveitaram e depois fecharam. Tem algo invisível lá dentro.",
      dicas:["Ninguém da vila deveria entrar aqui.","Os Hearthianos me usaram e depois me fecharam.","Tem algo invisível lá dentro que mata.","Os Nomai começaram a escavar aqui muito antes.","Fico na cratera do Recanto Lenhoso, longe da vila."] },
    { id:"radio-tower", nome:"Torre de Rádio", alias:["Radio Tower"],
      tipo:"Torre", corpo:"Recanto Lenhoso", orbita:3, nomai:"Não", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Uma das poucas construções Hearthianas fora da cratera, do outro lado do planeta.",
      dicas:["Fico bem longe da vila, do outro lado do planeta.","Fui construída pra ouvir sinais de longe.","Sou uma das poucas construções Hearthianas fora da cratera.","Dá pra ver a lua bem de perto daqui.","Fico no Recanto Lenhoso."] },
    { id:"launch-pad", nome:"Plataforma de Lançamento", alias:["Launch Pad","Plataforma"],
      tipo:"Estrutura", corpo:"Recanto Lenhoso", orbita:3, nomai:"Não", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Uma torre de madeira com um elevador. Sua nave está lá em cima, e Slate lá embaixo.",
      dicas:["Foi de onde tudo começou, pra você.","Um elevador de madeira leva até o meu topo.","Slate fica na minha base, sempre mexendo em algo.","Sua nave está estacionada em mim, se você ainda não decolou.","Fico na vila."] },

    /* ======================= ATTLEROCK ======================= */
    { id:"attlerock", nome:"Pedra da Lia", alias:["Lua do Recanto Lenhoso","Attlerock","Pedra de Lia"],
      tipo:"Lua", corpo:"Pedra da Lia", orbita:3, nomai:"Ruínas", perigo:"Nenhum", viajante:"Esker",
      desc:"A lua do Recanto Lenhoso. Pequena, cinzenta e com um único morador.",
      dicas:["Pequena, cinzenta e cheia de crateras.","Tenho um posto de observação apontado pra um sinal distante.","Meu único morador assobia pra passar o tempo.","Fico girando em volta da sua casa.","Esker mora aqui e reclama que ninguém visita."] },
    { id:"esker-camp", nome:"Acampamento de Esker", alias:["Esker's Camp","Posto Lunar","Lunar Lookout"],
      tipo:"Acampamento", corpo:"Pedra da Lia", orbita:3, nomai:"Não", perigo:"Nenhum", viajante:"Esker",
      desc:"O posto de observação lunar. Tem um telescópio de sinais e alguém assobiando.",
      dicas:["Sou o acampamento mais perto de casa.","Tenho um telescópio de sinais pra ouvir todo mundo.","Alguém fica aqui assobiando, esperando visita.","Fico numa lua cinzenta.","Esker mora aqui."] },

    /* ======================= BRITTLE HOLLOW ======================= */
    { id:"brittle-hollow", nome:"Vale Incerto", alias:["Brittle","Brittle Hollow"],
      tipo:"Planeta", corpo:"Vale Incerto", orbita:4, nomai:"Sim", perigo:"Buraco negro", viajante:"Riebeck",
      desc:"Um planeta desmoronando num buraco negro, com uma cidade pendurada sob a crosta.",
      dicas:["Tenho um buraco no meio. Literalmente.","Pedaços do meu chão somem de vez em quando.","Uma cidade foi construída pendurada sob a minha crosta.","Riebeck acampa perto das minhas ruínas, morrendo de medo de voar de volta.","A Cidade Suspensa e a Forja do Buraco Negro ficam em mim."] },
    { id:"hanging-city", nome:"Cidade Dependurada", alias:["Hanging City","Cidade Pendurada","Cidade Suspensa"],
      tipo:"Cidade", corpo:"Vale Incerto", orbita:4, nomai:"Sim", perigo:"Buraco negro", viajante:"Nenhum",
      desc:"A cidade Nomai pendurada de cabeça pra baixo sob a crosta do Vale Incerto, dividida em distritos.",
      dicas:["Fui construída pendurada, de cabeça pra baixo.","Tenho um elevador que sobe pelos meus distritos.","Fico embaixo da crosta de um planeta que está desabando.","Daz cresceu aqui.","A Forja pode ser içada até mim."] },
    { id:"black-hole-forge", nome:"Usina de Buracos Negros", alias:["Black Hole Forge","Forja","Forja do Buraco Negro"],
      tipo:"Estrutura", corpo:"Vale Incerto", orbita:4, nomai:"Sim", perigo:"Buraco negro", viajante:"Nenhum",
      desc:"Onde os Nomai forjavam núcleos de dobra, pendurada bem em cima do buraco negro.",
      dicas:["Foi aqui que os núcleos de dobra eram feitos.","Fico pendurada perto do centro de um planeta.","Preciso ser içada pra você entrar.","Você me aciona na Cidade Suspensa.","Fico sob o Vale Incerto, logo acima do buraco negro."] },
    { id:"tower-quantum-knowledge", nome:"Torre do Conhecimento Quântico", alias:["Tower of Quantum Knowledge","Torre Quântica"],
      tipo:"Torre", corpo:"Vale Incerto", orbita:4, nomai:"Sim", perigo:"Buraco negro", viajante:"Nenhum",
      desc:"A torre no polo sul do Vale Incerto que guarda a terceira regra quântica. Uma hora ela cai.",
      dicas:["Ensino a terceira regra.","Fico no polo sul de um planeta frágil.","Uma hora eu caio.","Depois de cair, dá pra entrar em mim por outro lado.","Explico como visitar o lugar que a lua não mostra."] },
    { id:"southern-observatory", nome:"Observatório do Sul", alias:["Southern Observatory","Observatório Sul"],
      tipo:"Observatório", corpo:"Vale Incerto", orbita:4, nomai:"Sim", perigo:"Buraco negro", viajante:"Nenhum",
      desc:"De onde os Nomai olharam pra um sinal que não conseguiam ver. Tem um modelo do sistema inteiro.",
      dicas:["Fico na ponta de baixo de um planeta.","Foi daqui que os Nomai olharam pra um sinal que não conseguiam enxergar.","Tenho um modelo do sistema que mostra o que a sonda deveria achar.","Fico perto de um cruzamento de caminhos Nomai.","Fico no polo sul do Vale Incerto."] },
    { id:"old-settlement", nome:"Assentamento Antigo", alias:["Old Settlement","Assentamento"],
      tipo:"Ruína", corpo:"Vale Incerto", orbita:4, nomai:"Ruínas", perigo:"Buraco negro", viajante:"Nenhum",
      desc:"O primeiro lugar onde os Nomai se instalaram depois de cair. Uma criança escreveu numa parede aqui.",
      dicas:["Fui o primeiro lugar onde eles se instalaram.","Casas pequenas de pedra, na superfície.","Uma criança escreveu numa parede aqui.","Fico perto de onde o primeiro pod caiu.","Fico no Vale Incerto."] },
    { id:"escape-pod-1", nome:"Pod de Fuga 1", alias:["Escape Pod 1","Pod 1","Cápsula de Fuga 1"],
      tipo:"Ruína", corpo:"Vale Incerto", orbita:4, nomai:"Ruínas", perigo:"Nenhum", viajante:"Nenhum",
      desc:"O pod que teve sorte: caiu num lugar onde o chão aguentou. Annona e Daz vieram nele.",
      dicas:["Fui o primeiro dos três a cair.","Quem saiu de mim teve sorte: o chão aguentou.","Annona e Daz vieram em mim.","Fico perto do assentamento antigo.","Fico na superfície do Vale Incerto."] },
    { id:"gravity-cannon-bh", nome:"Canhão de Gravidade", alias:["Gravity Cannon","Canhão de gravidade do Vale Incerto"],
      tipo:"Estrutura", corpo:"Vale Incerto", orbita:4, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Lança e chama de volta ônibus Nomai. Tem um estacionado que pode te levar até a Lua Quântica.",
      dicas:["Disparo naves, não sondas.","Chamo um ônibus de volta de muito longe.","Existe um igual a mim em outro planeta.","Um ônibus Nomai estacionado aqui pode te levar até a lua que some.","Fico no Vale Incerto."] },
    { id:"riebeck-camp", nome:"Acampamento de Riebeck", alias:["Riebeck's Camp","Acampamento do Riebeck"],
      tipo:"Acampamento", corpo:"Vale Incerto", orbita:4, nomai:"Não", perigo:"Buraco negro", viajante:"Riebeck",
      desc:"Uma fogueira embaixo da crosta, um banjo e alguém que não quer voar de volta.",
      dicas:["Fico embaixo da crosta, num pedaço que ainda não caiu.","Um banjo toca aqui.","Quem acampa em mim não quer voltar voando.","Fico perto de um cruzamento de caminhos Nomai.","Riebeck está aqui."] },

    /* ======================= HOLLOW'S LANTERN ======================= */
    { id:"hollows-lantern", nome:"Luzeiro do Vale", alias:["Hollows Lantern","Lanterna","Hollow's Lantern","Lanterna do Vale"],
      tipo:"Lua", corpo:"Luzeiro do Vale", orbita:4, nomai:"Não", perigo:"Lava", viajante:"Nenhum",
      desc:"Lua vulcânica que bombardeia o Vale Incerto enquanto encolhe.",
      dicas:["Estou encolhendo.","Fico jogando pedras quentes no vizinho.","Sou uma lua, mas ninguém acampa em mim. Quente demais.","É por minha causa que o chão do planeta ao lado vive desabando.","Orbito o Vale Incerto."] },

    /* ======================= GIANT'S DEEP ======================= */
    { id:"giants-deep", nome:"Profundezas do Gigante", alias:["Giants Deep","Giant","Giant's Deep"],
      tipo:"Planeta", corpo:"Profundezas do Gigante", orbita:5, nomai:"Sim", perigo:"Ciclones", viajante:"Gabbro",
      desc:"Oceano sem fim, ilhas que voam e ciclones. Gabbro aprova.",
      dicas:["Minhas ilhas não ficam paradas no lugar.","Meus ciclones jogam tudo pro alto, inclusive você.","Pra chegar ao meu centro é preciso vencer uma corrente que empurra tudo pra fora.","Gabbro fica numa rede olhando as minhas ondas.","Um canhão Nomai orbita em volta de mim."] },
    { id:"gabbro-island", nome:"Ilha de Gabbro", alias:["Gabbro's Island","Ilha do Gabbro"],
      tipo:"Ilha", corpo:"Profundezas do Gigante", orbita:5, nomai:"Não", perigo:"Ciclones", viajante:"Gabbro",
      desc:"Uma ilha com uma rede e uma flauta. De vez em quando vai parar no espaço.",
      dicas:["Uma ilha com uma rede.","De vez em quando, vou parar no espaço.","Uma flauta toca aqui.","Quem mora em mim também lembra dos loops.","Fico nas Profundezas do Gigante."] },
    { id:"statue-island", nome:"Ilha da Estátua", alias:["Statue Island","Oficina de Estátuas","Statue Workshop"],
      tipo:"Ilha", corpo:"Profundezas do Gigante", orbita:5, nomai:"Sim", perigo:"Ciclones", viajante:"Nenhum",
      desc:"A oficina onde os Nomai faziam máscaras de pedra que gravam memórias. Uma delas está no museu.",
      dicas:["Aqui se faziam máscaras de pedra que gravam memórias.","Tenho uma oficina inteira dedicada a estátuas.","Foi daqui que veio a estátua do museu.","Tenho uma estátua enorme quebrada na costa.","Fico nas Profundezas do Gigante."] },
    { id:"construction-yard", nome:"Ilha do Estaleiro", alias:["Construction Yard","Estaleiro","Estaleiro de Construção"],
      tipo:"Ilha", corpo:"Profundezas do Gigante", orbita:5, nomai:"Sim", perigo:"Ciclones", viajante:"Nenhum",
      desc:"A ilha onde o Canhão de Sonda foi construído. Cassava e Mallow discutiram muito aqui.",
      dicas:["Aqui se construiu algo pra ser lançado.","Cassava e Mallow discutiram por minha causa.","Sou uma ilha com guindastes e um espaço vazio no meio.","O que foi feito aqui está em órbita agora.","Fico nas Profundezas do Gigante."] },
    { id:"bramble-island", nome:"Ilha do Espinheiro", alias:["Bramble Island","Ilha Bramble"],
      tipo:"Ilha", corpo:"Profundezas do Gigante", orbita:5, nomai:"Não", perigo:"Peixe-pescador", viajante:"Nenhum",
      desc:"Uma ilha com uma semente do Abrolho Sombrio que cresceu demais. Por dentro, é outro mundo.",
      dicas:["Uma ilha com algo que não deveria estar aqui.","Uma semente cresceu demais em mim.","Por dentro, é como estar em outro planeta.","Dá pra usar pra chegar num lugar cheio de névoa sem levar a nave.","Fico nas Profundezas do Gigante."] },
    { id:"quantum-island", nome:"Torre dos Julgamentos Quânticos", alias:["Tower of Quantum Trials","Ilha Quântica","Quantum Island","Torre das Provações Quânticas"],
      tipo:"Torre", corpo:"Profundezas do Gigante", orbita:5, nomai:"Sim", perigo:"Ciclones", viajante:"Nenhum",
      desc:"Uma torre numa ilha que às vezes não está lá. Ensina o básico sobre coisas que somem.",
      dicas:["Ensino a primeira lição sobre coisas que somem.","Fico numa ilha que às vezes não está lá.","Tenho um santuário pra fazer as coisas mudarem de lugar.","Minha ilha vai e volta, como a lua.","Fico nas Profundezas do Gigante."] },
    { id:"probe-tracking-module", nome:"Módulo de Rastreamento da Sonda", alias:["Probe Tracking Module","Módulo de Rastreamento"],
      tipo:"Estrutura", corpo:"Profundezas do Gigante", orbita:5, nomai:"Sim", perigo:"Correnteza", viajante:"Nenhum",
      desc:"Caiu do canhão e afundou até o núcleo. Guarda o registro de milhões de disparos.",
      dicas:["Caí do céu e afundei.","Guardo o registro de milhões de disparos.","Mostro onde a sonda finalmente achou o que procurava.","Estou no fundo do oceano, dentro do núcleo.","Fico nas Profundezas do Gigante."] },
    { id:"ocean-core", nome:"Núcleo das Profundezas do Gigante", alias:["Ocean Core","Núcleo do Oceano","Núcleo"],
      tipo:"Núcleo", corpo:"Profundezas do Gigante", orbita:5, nomai:"Não", perigo:"Correnteza", viajante:"Nenhum",
      desc:"O centro oco do oceano, protegido por uma corrente que empurra tudo pra fora. Águas-vivas ajudam a passar.",
      dicas:["Uma corrente forte empurra tudo pra longe de mim.","Uma água-viva serve de escudo pra chegar aqui.","Tenho corais gigantes e uma escuridão molhada.","Nada elétrico funciona direito perto das minhas guardiãs.","Fico no fundo das Profundezas do Gigante."] },
    { id:"probe-cannon", nome:"Canhão de Sonda Orbital", alias:["Canhão de Sonda","Probe Cannon","Cannon","Orbital Probe Cannon"],
      tipo:"Estação", corpo:"Profundezas do Gigante", orbita:5, nomai:"Sim", perigo:"Vácuo", viajante:"Nenhum",
      desc:"Canhão Nomai em órbita das Profundezas do Gigante. Dispara uma vez por ciclo e se parte no processo.",
      dicas:["Disparo uma vez por ciclo.","Uma parte minha já se desprendeu.","Fui construído pra achar um lugar que ninguém conseguia ver.","Orbito o planeta oceânico.","Meu Módulo de Rastreamento afundou no oceano lá embaixo."] },

    /* ======================= DARK BRAMBLE ======================= */
    { id:"dark-bramble", nome:"Abrolho Sombrio", alias:["Bramble","Dark Bramble","Espinheiro Sombrio"],
      tipo:"Planeta", corpo:"Abrolho Sombrio", orbita:6, nomai:"Ruínas", perigo:"Peixe-pescador", viajante:"Feldspar",
      desc:"Névoa, raízes e peixes-pescadores. Maior por dentro do que por fora.",
      dicas:["Meus sons viajam longe demais.","Quem entra em mim raramente sai.","Sou maior por dentro do que por fora.","Desligue os motores e fique em silêncio ao passar pelos meus moradores.","Feldspar se perdeu aqui dentro."] },
    { id:"feldspar-camp", nome:"Acampamento de Feldspar", alias:["Feldspar's Camp","Acampamento do Feldspar"],
      tipo:"Acampamento", corpo:"Abrolho Sombrio", orbita:6, nomai:"Não", perigo:"Peixe-pescador", viajante:"Feldspar",
      desc:"Uma fogueira dentro de um lugar sem tamanho, com uma gaita tocando baixinho.",
      dicas:["Fico dentro de um espaço que não obedece o tamanho de fora.","Uma gaita toca bem baixinho aqui.","Quem acampa em mim foi dado como morto.","Pra chegar, é preciso seguir o som certo.","Feldspar está aqui."] },
    { id:"escape-pod-3", nome:"Pod de Fuga 3", alias:["Escape Pod 3","Pod 3","Cápsula de Fuga 3"],
      tipo:"Ruína", corpo:"Abrolho Sombrio", orbita:6, nomai:"Ruínas", perigo:"Peixe-pescador", viajante:"Nenhum",
      desc:"O pod que não teve sorte. Caiu num lugar de onde ninguém sai, e quem saiu deixou uma trilha de luz.",
      dicas:["Fui o que não teve tanta sorte.","Caí num lugar de onde ninguém consegue sair.","Quem saiu de mim foi a pé, no escuro, e deixou uma trilha de luz.","Bells estava aqui.","Fico no Abrolho Sombrio."] },
    { id:"nomai-grave", nome:"Túmulo Nomai", alias:["Nomai Grave","Sepultura Nomai"],
      tipo:"Ruína", corpo:"Abrolho Sombrio", orbita:6, nomai:"Ruínas", perigo:"Peixe-pescador", viajante:"Nenhum",
      desc:"O fim da trilha de luzes que sai do Pod 3. Um lugar silencioso, cheio de ossos e um registro importante.",
      dicas:["Sou o fim de uma trilha de luzes.","Um lugar silencioso, cheio de ossos.","Um registro aqui mostra de onde eles vieram.","Não sou bem um túmulo, mas foi onde ficaram.","Fico no Abrolho Sombrio."] },
    { id:"vessel", nome:"Hospedeiro", alias:["Vessel","Nave Nomai","A Nave","The Vessel","O Hospedeiro"],
      tipo:"Nave", corpo:"Abrolho Sombrio", orbita:6, nomai:"Sim", perigo:"Peixe-pescador", viajante:"Nenhum",
      desc:"A nave Nomai que trouxe todos pra cá, presa nas raízes do Abrolho Sombrio.",
      dicas:["Estou parada há muito, muito tempo.","Trouxe um povo inteiro até este sistema.","Estou presa em raízes, cercada de névoa.","Meu núcleo de dobra queimou e nunca mais decolei.","Escall e a tripulação atenderam por mim a um sinal mais antigo que o universo."] },

    /* ======================= THE INTERLOPER ======================= */
    { id:"interloper", nome:"Xereta", alias:["Cometa","O Intruso","The Interloper","Interloper"],
      tipo:"Cometa", corpo:"Xereta", orbita:7, nomai:"Ruínas", perigo:"Matéria fantasma", viajante:"Nenhum",
      desc:"Cometa gelado com um passageiro mortal escondido no núcleo.",
      dicas:["Sou só um visitante de passagem.","Tenho gelo por fora e algo bem pior por dentro.","Minha órbita é longa e me leva quase até o Sol.","Carreguei a razão de um povo inteiro ter sumido.","Dois Nomai vieram me investigar e não voltaram."] },
    { id:"interloper-core", nome:"Núcleo do Xereta", alias:["Interloper Core","Núcleo do Cometa","Fissura do Xereta"],
      tipo:"Núcleo", corpo:"Xereta", orbita:7, nomai:"Ruínas", perigo:"Matéria fantasma", viajante:"Nenhum",
      desc:"O interior do cometa, só acessível quando o gelo derrete perto do Sol. Dois Nomai congelados esperam lá.",
      dicas:["Só se chega em mim quando o gelo derrete, perto do Sol.","Dois Nomai congelados esperam aqui.","É de mim que saiu a coisa que matou todo mundo.","Tenho uma fissura por onde tudo escapou.","Fico dentro do cometa."] },
    { id:"nomai-shuttle", nome:"Ônibus Nomai do Xereta", alias:["Nomai Shuttle","Ônibus Nomai","Shuttle"],
      tipo:"Nave", corpo:"Xereta", orbita:7, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"O veículo que Poke e Clary usaram pra chegar ao cometa. Continua estacionado lá.",
      dicas:["Sou um veículo pequeno, estacionado num visitante gelado.","Fui trazido por dois cientistas curiosos.","Dá pra me chamar de volta com um canhão de gravidade.","Estou parado na superfície de um cometa.","Poke e Clary vieram em mim."] },

    /* ======================= WHITE HOLE ======================= */
    { id:"white-hole-station", nome:"Estação do Buraco Branco", alias:["Estação Buraco Branco","White Hole","White Hole Station"],
      tipo:"Estação", corpo:"Estação do Buraco Branco", orbita:8, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"Onde você aparece depois de cair no buraco negro. Tem caminho de volta.",
      dicas:["Você provavelmente chegou aqui sem querer.","Estou do outro lado de um buraco.","Fico no limite do sistema, longe de tudo.","Sirvo de rota de volta pra quem caiu.","Meu núcleo de dobra te devolve pro Vale Incerto."] },

    /* ======================= QUANTUM MOON ======================= */
    { id:"quantum-moon", nome:"Lua Quântica", alias:["Quantum","Quantum Moon"],
      tipo:"Lua", corpo:"Lua Quântica", orbita:null, nomai:"Sim", perigo:"Nenhum", viajante:"Solanum",
      desc:"A lua que só existe onde alguém observa. Solanum espera lá.",
      dicas:["Só estou onde alguém está olhando.","Visito cinco lugares, e um sexto que ninguém vê.","Tenho um santuário no meu polo sul.","Alguém ainda está aqui em cima esperando visita.","Solanum mora aqui."] },
    { id:"quantum-shrine", nome:"Santuário Quântico", alias:["Quantum Shrine","Santuário"],
      tipo:"Estrutura", corpo:"Lua Quântica", orbita:null, nomai:"Sim", perigo:"Nenhum", viajante:"Nenhum",
      desc:"O santuário no polo sul da Lua Quântica. Feche a porta, apague a luz e olhe de novo.",
      dicas:["Sirvo pra viajar sem sair do lugar.","Feche a porta, apague a luz e olhe de novo.","Fico no polo sul de uma lua que anda.","Sou a chave pra chegar ao sexto lugar.","Fico na Lua Quântica."] },

    /* ======================= DLC ======================= */
    { id:"stranger", nome:"O Estranho", alias:["Stranger","Forasteiro","The Stranger","O Desconhecido","Estranho"], dlc:true,
      tipo:"Nave", corpo:"O Estranho", orbita:9, nomai:"Não", perigo:"Escuridão", viajante:"Nenhum",
      desc:"Um anel escondido na luz do Sol, cheio de água, escuridão e segredos. (Echoes of the Eye)",
      dicas:["Você não me vê, mas eu estou lá.","Por fora sou só uma sombra no Sol. Por dentro, um rio inteiro.","Meus habitantes vieram de longe pra silenciar um sinal.","Meus moradores dormem e sonham num lugar sem luz.","Cheguei junto com a expansão Echoes of the Eye."] }
  ];

  /* Colunas da grade do modo Locais.
     type "num"  → compara números e mostra seta
     near        → grupos de valores que contam como "parcial" */
  const COLS_LOCAIS = [
    { k:"tipo",     l:"Tipo" },
    { k:"corpo",    l:"Corpo",  title:"Corpo celeste onde fica",
      near:[["Recanto Lenhoso","Pedra da Lia"],["Gêmeo Cálido","Gêmeo Cinzento"],["Vale Incerto","Luzeiro do Vale"],["Profundezas do Gigante"],["Sol"]] },
    { k:"orbita",   l:"Órbita", type:"num", title:"Posição do corpo a partir do Sol" },
    { k:"nomai",    l:"Nomai",  near:[["Sim","Ruínas"]] },
    { k:"perigo",   l:"Perigo" },
    { k:"viajante", l:"Viajante" }
  ];

  /* ---------------------------------------------------------------
     PERSONAGENS
     especie    : Hearthiano, Nomai, Outro
     local      : corpo celeste onde a pessoa é encontrada (nome de um LOCAL)
     papel      : o que faz
     instrumento: só os viajantes (e Gneiss) tocam algo
     status     : Vivo / Morto (no começo do ciclo)
     dicas      : 2 dicas, liberadas junto com as dicas extras
     --------------------------------------------------------------- */
  const PERSONAGENS = [
    /* ---- Hearthianos ---- */
    { id:"slate", nome:"Slate", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Engenharia", instrumento:"Nenhum", status:"Vivo",
      desc:"Construiu a sua nave (e quase todas as outras) e garante que o para-brisa aguenta.",
      dicas:["Fica perto da plataforma de lançamento, sempre mexendo em alguma coisa.","Se algo quebrar na sua nave, a culpa é de quem construiu."] },
    { id:"hornfels", nome:"Hornfels", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Liderança", instrumento:"Nenhum", status:"Vivo",
      desc:"Comanda a Outer Wilds Ventures do alto do observatório.",
      dicas:["Fica no observatório, orgulhoso da exposição.","Coordena todo o programa espacial da vila."] },
    { id:"gossan", nome:"Gossan", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Instrução", instrumento:"Nenhum", status:"Vivo",
      desc:"Te ensinou a pilotar e ainda te lembra de usar o cinto.",
      dicas:["Fica ao lado da caverna de gravidade zero.","Foi quem te ensinou a voar."] },
    { id:"hal", nome:"Hal", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Curadoria", instrumento:"Nenhum", status:"Vivo",
      desc:"Cuida do museu e é seu melhor amigo desde criança.",
      dicas:["Passa o dia no museu, empolgado com a peça nova.","Fica ao lado da estátua Nomai que acabou de chegar."] },
    { id:"gneiss", nome:"Gneiss", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Música", instrumento:"Banjo", status:"Vivo",
      desc:"Fez os instrumentos de todos os viajantes e toca perto da fogueira.",
      dicas:["Toca na parte alta da vila, perto de uma fogueira.","Construiu o banjo, a flauta, o tambor e a gaita dos exploradores."] },
    { id:"chert", nome:"Chert", especie:"Hearthiano", local:"Gêmeo Cálido", papel:"Viajante", instrumento:"Tambor", status:"Vivo",
      desc:"Astrônomo do grupo. Acampa no topo do Gêmeo Cálido e percebe que as estrelas estão morrendo.",
      dicas:["Acampa numa cratera no topo de um planeta de areia.","Observa as estrelas com uma preocupação que só cresce."] },
    { id:"esker", nome:"Esker", especie:"Hearthiano", local:"Pedra da Lia", papel:"Viajante", instrumento:"Assobio", status:"Vivo",
      desc:"Cuida do posto de observação lunar e reclama que ninguém visita.",
      dicas:["É o único morador de uma lua.","Não precisa de instrumento: assobia."] },
    { id:"riebeck", nome:"Riebeck", especie:"Hearthiano", local:"Vale Incerto", papel:"Viajante", instrumento:"Banjo", status:"Vivo",
      desc:"Ama arqueologia Nomai. Odeia voar.",
      dicas:["Acampou embaixo da crosta de um planeta que está desabando.","Adora ruínas, mas morre de medo da viagem de volta."] },
    { id:"gabbro", nome:"Gabbro", especie:"Hearthiano", local:"Profundezas do Gigante", papel:"Viajante", instrumento:"Flauta", status:"Vivo",
      desc:"Deitado numa rede, olhando as ondas. Também lembra dos loops, mas não se estressa.",
      dicas:["Fica numa rede, numa ilha que não para no lugar.","É a única outra pessoa que lembra do que aconteceu no ciclo anterior."] },
    { id:"feldspar", nome:"Feldspar", especie:"Hearthiano", local:"Abrolho Sombrio", papel:"Viajante", instrumento:"Gaita", status:"Vivo",
      desc:"Primeira pessoa a voar. Sumiu há anos, mas segue firme lá dentro.",
      dicas:["Todo mundo na vila acha que morreu.","Acampou dentro de um lugar cheio de névoa e raízes."] },
    { id:"tephra", nome:"Tephra", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Comanda a brincadeira de esconde-esconde na vila.",
      dicas:["Te desafia a achar os amigos escondidos.","Fica perto da entrada da vila."] },
    { id:"galena", nome:"Galena", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Está escondida em algum lugar da vila. Boa sorte.",
      dicas:["Participa do esconde-esconde.","Você só acha com o telescópio de sinais."] },
    { id:"mica", nome:"Mica", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Te empresta uma nave de brinquedo pra treinar pouso.",
      dicas:["Tem um brinquedo que voa de verdade.","Fica perto da plataforma de lançamento."] },
    { id:"moraine", nome:"Moraine", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Fica no alto com o telescópio de sinais, ouvindo a música dos viajantes.",
      dicas:["Adora ouvir os viajantes de longe.","Fica num ponto alto da vila com um telescópio de sinais."] },
    { id:"arkose", nome:"Arkose", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Mais uma criança escondida pela vila.",
      dicas:["Participa do esconde-esconde.","Se esconde num lugar alto."] },
    { id:"marl", nome:"Marl", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Quer derrubar a árvore gigante no meio da vila. Ninguém deixa.",
      dicas:["Anda com um machado e um plano.","Tem uma opinião forte sobre a árvore da vila."] },
    { id:"spinel", nome:"Spinel", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Pesca ao lado da vila e não pega muita coisa.",
      dicas:["Fica com uma vara na mão, perto da água.","A paciência é maior que o resultado."] },
    { id:"porphy", nome:"Porphy", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Faz uma bebida com seiva da árvore e insiste pra você provar.",
      dicas:["Produz algo com seiva de árvore.","Fica perto de barris na vila."] },
    { id:"tektite", nome:"Tektite", especie:"Hearthiano", local:"Recanto Lenhoso", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Trabalha na mina e sabe onde tem matéria fantasma.",
      dicas:["Fica na entrada de uma mina.","Avisa sobre um perigo invisível lá dentro."] },

    /* ---- Nomai ---- */
    { id:"solanum", nome:"Solanum", especie:"Nomai", local:"Lua Quântica", papel:"Peregrina", instrumento:"Nenhum", status:"Vivo",
      desc:"A última Nomai que você pode encontrar. Se olhar no lugar certo.",
      dicas:["Está esperando visita num lugar que muda de lugar.","Conversa com você escrevendo no chão."] },
    { id:"poke", nome:"Poke", especie:"Nomai", local:"Gêmeo Cinzento", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Projetou os núcleos de dobra e o Projeto do Gêmeo Cinzento.",
      dicas:["Especialista em dobra espacial.","Foi investigar o cometa junto com Clary."] },
    { id:"pye", nome:"Pye", especie:"Nomai", local:"Estação Solar", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Direta ao ponto: se o Sol não coopera, a gente ajuda ele a explodir.",
      dicas:["Trabalhou no Laboratório de Alta Energia.","Escreveu com raiva que a Estação Solar era um fracasso."] },
    { id:"clary", nome:"Clary", especie:"Nomai", local:"Estação Solar", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Trabalhou na Estação Solar e foi investigar o cometa com Poke.",
      dicas:["Ajudou a construir a Estação Solar.","Ficou congelada dentro de um cometa."] },
    { id:"cassava", nome:"Cassava", especie:"Nomai", local:"Profundezas do Gigante", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Trabalhou no Canhão de Sonda e tinha certeza de que Mallow ia explodir tudo.",
      dicas:["Se preocupava com a potência de um disparo.","Trabalhou no Estaleiro de Construção."] },
    { id:"mallow", nome:"Mallow", especie:"Nomai", local:"Profundezas do Gigante", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Queria disparar o canhão na potência máxima. Conseguiu.",
      dicas:["Discutiu com Cassava sobre o canhão.","Ganhou a discussão. O canhão perdeu um pedaço."] },
    { id:"daz", nome:"Daz", especie:"Nomai", local:"Vale Incerto", papel:"Criança", instrumento:"Nenhum", status:"Morto",
      desc:"Chegou no pod de fuga ainda criança e cresceu vendo a cidade ser construída.",
      dicas:["Escreveu na parede do assentamento antigo quando era criança.","Veio no primeiro pod de fuga."] },
    { id:"coleus", nome:"Coleus", especie:"Nomai", local:"Gêmeo Cálido", papel:"Criança", instrumento:"Nenhum", status:"Morto",
      desc:"Sumiu de vista ao apagar a luz numa caverna quântica. E descobriu uma regra.",
      dicas:["Desapareceu numa caverna quando a luz apagou.","Ajudou a descobrir como se mover junto com uma pedra quântica."] },
    { id:"melorae", nome:"Melorae", especie:"Nomai", local:"Gêmeo Cálido", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Estudou as cavernas quânticas ao lado de Coleus.",
      dicas:["Pesquisou pedras que mudam de lugar.","Registrou o que aconteceu com Coleus."] },
    { id:"escall", nome:"Escall", especie:"Nomai", local:"Hospedeiro", papel:"Liderança", instrumento:"Nenhum", status:"Morto",
      desc:"Comandava a nave que respondeu ao sinal do Olho. Nunca saiu do Abrolho Sombrio.",
      dicas:["Decidiu seguir um sinal mais antigo que o universo.","Ficou na nave depois que os pods de fuga partiram."] },
    { id:"filix", nome:"Filix", especie:"Nomai", local:"Gêmeo Cálido", papel:"Exploração", instrumento:"Nenhum", status:"Morto",
      desc:"Sobreviveu ao pouso do Pod 2 e abriu caminho pelas cavernas.",
      dicas:["Veio no segundo pod de fuga.","Explorou cavernas de areia em busca de um lugar seguro."] },
    { id:"annona", nome:"Annona", especie:"Nomai", local:"Vale Incerto", papel:"Liderança", instrumento:"Nenhum", status:"Morto",
      desc:"Veio no Pod 1 e organizou os sobreviventes no assentamento antigo.",
      dicas:["Guiou os sobreviventes do primeiro pod.","Se preocupava com quem estava no terceiro pod."] },
    { id:"bells", nome:"Bells", especie:"Nomai", local:"Abrolho Sombrio", papel:"Exploração", instrumento:"Nenhum", status:"Morto",
      desc:"Saiu do Pod 3 a pé, no escuro, deixando uma trilha de luzes pra quem viesse depois.",
      dicas:["Veio no pod que caiu no pior lugar possível.","Deixou um caminho de luzes pra guiar os outros."] },

    /* ---- DLC ---- */
    { id:"prisioneiro", nome:"Prisioneiro", alias:["Prisoner","The Prisoner","O Prisioneiro"], especie:"Outro", local:"O Estranho", papel:"Prisioneiro", instrumento:"Nenhum", status:"Vivo", dlc:true,
      desc:"Trancado há eras por ter feito o que achou certo. (Echoes of the Eye)",
      dicas:["Está preso há mais tempo do que qualquer um consegue lembrar.","Se comunica sem palavras, com uma lanterna."] }
  ];

  const COLS_PERSONAGENS = [
    { k:"especie",     l:"Espécie" },
    { k:"local",       l:"Local" },
    { k:"papel",       l:"Papel" },
    { k:"instrumento", l:"Instrumento" },
    { k:"status",      l:"Status" }
  ];

  return { LOCAIS, COLS_LOCAIS, PERSONAGENS, COLS_PERSONAGENS };
})();

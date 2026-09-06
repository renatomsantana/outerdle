/* =====================================================================
   Outerdle — dados
   Tudo que é conteúdo (locais, personagens, colunas) mora aqui.
   Para adicionar um item novo, basta seguir o formato dos existentes.
   ===================================================================== */
window.OUTERDLE_DATA = (() => {
  "use strict";

  /* ---------------------------------------------------------------
     LOCAIS
     orbita  : posição a partir do Sol (0 = o próprio Sol, null = varia)
     nomai   : "Sim" (estrutura importante), "Ruínas" (só vestígios), "Não"
     viajante: Hearthiano acampado no local
     dicas   : 5 entradas de diário, da mais vaga à mais específica.
               O modo Locais usa a 2ª e a 4ª como dicas extras.
     dlc     : true = só aparece com "Echoes of the Eye" ligado
     --------------------------------------------------------------- */
  const LOCAIS = [
    { id:"sol", nome:"Sol", alias:["Sun","The Sun","O Sol"], emoji:"☀️",
      tipo:"Estrela", orbita:0, atm:"Não", perigo:"Calor", nomai:"Não", viajante:"Nenhum",
      desc:"A estrela do sistema. Está velha, inchada e prestes a fazer algo dramático.",
      dicas:[
        "Sem mim, nada por aqui estaria girando.",
        "Ando maior e mais vermelho do que deveria.",
        "Construíram uma estação bem perto de mim, e não era pra me admirar de longe.",
        "Chert já percebeu que tem algo errado comigo.",
        "No fim de cada ciclo, eu explodo."
      ] },

    { id:"sun-station", nome:"Sun Station", alias:["Estação Solar"], emoji:"🛰️",
      tipo:"Estação", orbita:1, atm:"Não", perigo:"Calor", nomai:"Sim", viajante:"Nenhum",
      desc:"Estação Nomai em órbita rasante do Sol, construída pra um experimento que nunca funcionou.",
      dicas:[
        "Nada aqui saiu como o planejado.",
        "Fico onde nenhuma nave deveria conseguir chegar.",
        "Você só chega em mim por um caminho que não é a sua nave.",
        "Fui construída pra forçar o Sol a fazer algo que ele ainda não estava pronto pra fazer.",
        "Pye escreveu nas minhas paredes que eu era um fracasso."
      ] },

    { id:"ember-twin", nome:"Ember Twin", alias:["Gêmea de Brasa","Gêmea de Brasas","Ember"], emoji:"🏜️",
      tipo:"Planeta", orbita:2, atm:"Sim", perigo:"Areia", nomai:"Sim", viajante:"Chert",
      desc:"A gêmea que recebe areia. Cavernas, uma cidade escondida e Chert no topo.",
      dicas:[
        "Meu vizinho está me enchendo. Literalmente.",
        "Tem uma cidade escondida onde o sol não bate.",
        "Minhas cavernas ficam mais apertadas conforme o ciclo avança.",
        "Um astrônomo acampa no meu topo tocando tambor.",
        "A Cidade Sem Sol e o Laboratório de Alta Energia ficam aqui."
      ] },

    { id:"ash-twin", nome:"Ash Twin", alias:["Gêmea de Cinzas","Ash"], emoji:"⏳",
      tipo:"Planeta", orbita:2, atm:"Sim", perigo:"Areia", nomai:"Sim", viajante:"Nenhum",
      desc:"A gêmea que perde areia. Torres de dobra e um projeto secreto no núcleo.",
      dicas:[
        "Vou embora aos poucos, grão por grão.",
        "Minhas torres levam pra cada um dos outros mundos.",
        "Uma coluna de areia me liga ao meu gêmeo.",
        "O que guardo no meu núcleo é a razão de você lembrar de tudo.",
        "O projeto que leva meu nome fica bem no meu centro."
      ] },

    { id:"timber-hearth", nome:"Timber Hearth", alias:["Timber"], emoji:"🌲",
      tipo:"Planeta", orbita:3, atm:"Sim", perigo:"Matéria fantasma", nomai:"Ruínas", viajante:"Nenhum",
      desc:"Casa. Gêiseres, pinheiros, uma vila na cratera e uma plataforma de lançamento.",
      dicas:[
        "Pra você, tudo começa aqui.",
        "Gêiseres, pinheiros e uma cratera com uma vila.",
        "Meu museu acabou de receber uma estátua que não para de olhar pra você.",
        "Slate, Hornfels e Gossan moram aqui.",
        "Sua nave decola da minha vila."
      ] },

    { id:"attlerock", nome:"Attlerock", alias:["Lua de Timber Hearth"], emoji:"🌑",
      tipo:"Lua", orbita:3, atm:"Não", perigo:"Nenhum", nomai:"Ruínas", viajante:"Esker",
      desc:"A lua de Timber Hearth. Pequena, cinzenta e com um único morador.",
      dicas:[
        "Pequena, cinzenta e cheia de crateras.",
        "Tenho um posto de observação apontado pra um sinal distante.",
        "Meu único morador assobia pra passar o tempo.",
        "Fico girando em volta da sua casa.",
        "Esker mora aqui e reclama que ninguém visita."
      ] },

    { id:"brittle-hollow", nome:"Brittle Hollow", alias:["Brittle"], emoji:"🕳️",
      tipo:"Planeta", orbita:4, atm:"Sim", perigo:"Buraco negro", nomai:"Sim", viajante:"Riebeck",
      desc:"Um planeta desmoronando num buraco negro, com uma cidade pendurada sob a crosta.",
      dicas:[
        "Tenho um buraco no meio. Literalmente.",
        "Pedaços do meu chão somem de vez em quando.",
        "Uma cidade foi construída pendurada sob a minha crosta.",
        "Riebeck acampa perto das minhas ruínas, morrendo de medo de voar de volta.",
        "A Cidade Suspensa e a Forja do Buraco Negro ficam aqui."
      ] },

    { id:"hollows-lantern", nome:"Hollow's Lantern", alias:["Hollows Lantern","Lanterna"], emoji:"🌋",
      tipo:"Lua", orbita:4, atm:"Não", perigo:"Lava", nomai:"Não", viajante:"Nenhum",
      desc:"Lua vulcânica que bombardeia Brittle Hollow enquanto encolhe.",
      dicas:[
        "Estou encolhendo.",
        "Fico jogando pedras quentes no vizinho.",
        "Sou uma lua, mas ninguém acampa em mim. Quente demais.",
        "É por minha causa que o chão do planeta ao lado vive desabando.",
        "Orbito Brittle Hollow."
      ] },

    { id:"giants-deep", nome:"Giant's Deep", alias:["Giants Deep","Giant"], emoji:"🌊",
      tipo:"Planeta", orbita:5, atm:"Sim", perigo:"Ciclones", nomai:"Sim", viajante:"Gabbro",
      desc:"Oceano sem fim, ilhas que voam e ciclones. Gabbro aprova.",
      dicas:[
        "Minhas ilhas não ficam paradas no lugar.",
        "Meus ciclones jogam tudo pro alto, inclusive você.",
        "Pra chegar ao meu centro é preciso vencer uma corrente que empurra tudo pra fora.",
        "Gabbro fica numa rede olhando as minhas ondas.",
        "Um canhão Nomai orbita em volta de mim."
      ] },

    { id:"probe-cannon", nome:"Orbital Probe Cannon", alias:["Canhão de Sonda","Canhão de Sonda Orbital","Probe Cannon","Cannon"], emoji:"🎯",
      tipo:"Estação", orbita:5, atm:"Não", perigo:"Vácuo", nomai:"Sim", viajante:"Nenhum",
      desc:"Canhão Nomai em órbita de Giant's Deep. Dispara uma vez por ciclo e se parte no processo.",
      dicas:[
        "Disparo uma vez por ciclo.",
        "Uma parte minha já se desprendeu.",
        "Fui construído pra achar um lugar que ninguém conseguia ver.",
        "Orbito o planeta oceânico.",
        "Meu Módulo de Rastreamento afundou no oceano lá embaixo."
      ] },

    { id:"dark-bramble", nome:"Dark Bramble", alias:["Bramble"], emoji:"🌿",
      tipo:"Planeta", orbita:6, atm:"Sim", perigo:"Peixe-pescador", nomai:"Ruínas", viajante:"Feldspar",
      desc:"Névoa, raízes e peixes-pescadores. Maior por dentro do que por fora.",
      dicas:[
        "Meus sons viajam longe demais.",
        "Quem entra em mim raramente sai.",
        "Sou maior por dentro do que por fora.",
        "Desligue os motores e fique em silêncio ao passar pelos meus moradores.",
        "Feldspar se perdeu aqui dentro."
      ] },

    { id:"vessel", nome:"The Vessel", alias:["Vessel","Nave Nomai","A Nave"], emoji:"🚀",
      tipo:"Nave", orbita:6, atm:"Não", perigo:"Peixe-pescador", nomai:"Sim", viajante:"Nenhum",
      desc:"A nave Nomai que trouxe todos pra cá, presa nas raízes de Dark Bramble.",
      dicas:[
        "Estou parada há muito, muito tempo.",
        "Trouxe um povo inteiro até este sistema.",
        "Estou presa em raízes, cercada de névoa.",
        "Meu núcleo de dobra queimou e nunca mais decolei.",
        "Escall e a tripulação atenderam por mim a um sinal mais antigo que o universo."
      ] },

    { id:"interloper", nome:"The Interloper", alias:["Interloper","Cometa","O Intruso"], emoji:"☄️",
      tipo:"Cometa", orbita:7, atm:"Não", perigo:"Matéria fantasma", nomai:"Ruínas", viajante:"Nenhum",
      desc:"Cometa gelado com um passageiro mortal escondido no núcleo.",
      dicas:[
        "Sou só um visitante de passagem.",
        "Tenho gelo por fora e algo bem pior por dentro.",
        "Minha órbita é longa e me leva quase até o Sol.",
        "Carreguei a razão de um povo inteiro ter sumido.",
        "Dois Nomai vieram me investigar e não voltaram."
      ] },

    { id:"white-hole-station", nome:"White Hole Station", alias:["Estação Buraco Branco","Estação do Buraco Branco","White Hole"], emoji:"⚪",
      tipo:"Estação", orbita:8, atm:"Não", perigo:"Nenhum", nomai:"Sim", viajante:"Nenhum",
      desc:"Onde você aparece depois de cair no buraco negro. Tem caminho de volta.",
      dicas:[
        "Você provavelmente chegou aqui sem querer.",
        "Estou do outro lado de um buraco.",
        "Fico no limite do sistema, longe de tudo.",
        "Sirvo de rota de volta pra quem caiu.",
        "Meu núcleo de dobra te devolve pra Brittle Hollow."
      ] },

    { id:"quantum-moon", nome:"Quantum Moon", alias:["Lua Quântica","Quantum"], emoji:"🌗",
      tipo:"Lua", orbita:null, atm:"Sim", perigo:"Nenhum", nomai:"Sim", viajante:"Solanum",
      desc:"A lua que só existe onde alguém observa. Solanum espera lá.",
      dicas:[
        "Só estou onde alguém está olhando.",
        "Visito cinco lugares, e um sexto que ninguém vê.",
        "Tenho um santuário no meu polo sul.",
        "Alguém ainda está aqui em cima esperando visita.",
        "Solanum mora aqui."
      ] },

    { id:"stranger", nome:"The Stranger", alias:["Stranger","O Estranho","Forasteiro"], emoji:"👁️", dlc:true,
      tipo:"Nave", orbita:9, atm:"Sim", perigo:"Escuridão", nomai:"Não", viajante:"Nenhum",
      desc:"Um anel escondido na luz do Sol, cheio de água, escuridão e segredos. (Echoes of the Eye)",
      dicas:[
        "Você não me vê, mas eu estou lá.",
        "Por fora sou só uma sombra no Sol. Por dentro, um rio inteiro.",
        "Meus habitantes vieram de longe pra silenciar um sinal.",
        "Meus moradores dormem e sonham num lugar sem luz.",
        "Cheguei junto com a expansão Echoes of the Eye."
      ] }
  ];

  /* Colunas da grade do modo Locais.
     type "num"  → compara números e mostra seta
     near        → grupos de valores que contam como "parcial" */
  const COLS_LOCAIS = [
    { k:"tipo",     l:"Tipo" },
    { k:"orbita",   l:"Órbita",    type:"num", title:"Posição a partir do Sol" },
    { k:"atm",      l:"Atmosfera" },
    { k:"perigo",   l:"Perigo" },
    { k:"nomai",    l:"Nomai",     near:[["Sim","Ruínas"]] },
    { k:"viajante", l:"Viajante" }
  ];

  /* ---------------------------------------------------------------
     PERSONAGENS
     especie    : Hearthiano, Nomai, Outro
     local      : onde a pessoa é encontrada / mais associada
     papel      : o que faz
     instrumento: só os viajantes (e Gneiss) tocam algo
     status     : Vivo / Morto (no começo do ciclo)
     dicas      : 2 dicas, liberadas na 3ª e na 5ª tentativa
     --------------------------------------------------------------- */
  const PERSONAGENS = [
    /* ---- Hearthianos ---- */
    { id:"slate", nome:"Slate", especie:"Hearthiano", local:"Timber Hearth", papel:"Engenharia", instrumento:"Nenhum", status:"Vivo",
      desc:"Construiu a sua nave (e quase todas as outras) e garante que o para-brisa aguenta.",
      dicas:["Fica perto da plataforma de lançamento, sempre mexendo em alguma coisa.","Se algo quebrar na sua nave, a culpa é de quem construiu."] },
    { id:"hornfels", nome:"Hornfels", especie:"Hearthiano", local:"Timber Hearth", papel:"Liderança", instrumento:"Nenhum", status:"Vivo",
      desc:"Comanda a Outer Wilds Ventures do alto do observatório.",
      dicas:["Fica no observatório, orgulhoso da exposição.","Coordena todo o programa espacial da vila."] },
    { id:"gossan", nome:"Gossan", especie:"Hearthiano", local:"Timber Hearth", papel:"Instrução", instrumento:"Nenhum", status:"Vivo",
      desc:"Te ensinou a pilotar e ainda te lembra de usar o cinto.",
      dicas:["Fica ao lado da caverna de gravidade zero.","Foi quem te ensinou a voar."] },
    { id:"hal", nome:"Hal", especie:"Hearthiano", local:"Timber Hearth", papel:"Curadoria", instrumento:"Nenhum", status:"Vivo",
      desc:"Cuida do museu e é seu melhor amigo desde criança.",
      dicas:["Passa o dia no museu, empolgado com a peça nova.","Fica ao lado da estátua Nomai que acabou de chegar."] },
    { id:"gneiss", nome:"Gneiss", especie:"Hearthiano", local:"Timber Hearth", papel:"Música", instrumento:"Banjo", status:"Vivo",
      desc:"Fez os instrumentos de todos os viajantes e toca perto da fogueira.",
      dicas:["Toca na parte alta da vila, perto de uma fogueira.","Construiu o banjo, a flauta, o tambor e a gaita dos exploradores."] },
    { id:"chert", nome:"Chert", especie:"Hearthiano", local:"Ember Twin", papel:"Viajante", instrumento:"Tambor", status:"Vivo",
      desc:"Astrônomo do grupo. Acampa no topo da Ember Twin e percebe que as estrelas estão morrendo.",
      dicas:["Acampa numa cratera no topo de um planeta de areia.","Observa as estrelas com uma preocupação que só cresce."] },
    { id:"esker", nome:"Esker", especie:"Hearthiano", local:"Attlerock", papel:"Viajante", instrumento:"Assobio", status:"Vivo",
      desc:"Cuida do posto de observação lunar e reclama que ninguém visita.",
      dicas:["É o único morador de uma lua.","Não precisa de instrumento: assobia."] },
    { id:"riebeck", nome:"Riebeck", especie:"Hearthiano", local:"Brittle Hollow", papel:"Viajante", instrumento:"Banjo", status:"Vivo",
      desc:"Ama arqueologia Nomai. Odeia voar.",
      dicas:["Acampou embaixo da crosta de um planeta que está desabando.","Adora ruínas, mas morre de medo da viagem de volta."] },
    { id:"gabbro", nome:"Gabbro", especie:"Hearthiano", local:"Giant's Deep", papel:"Viajante", instrumento:"Flauta", status:"Vivo",
      desc:"Deitado numa rede, olhando as ondas. Também lembra dos loops, mas não se estressa.",
      dicas:["Fica numa rede, numa ilha que não para no lugar.","É a única outra pessoa que lembra do que aconteceu no ciclo anterior."] },
    { id:"feldspar", nome:"Feldspar", especie:"Hearthiano", local:"Dark Bramble", papel:"Viajante", instrumento:"Gaita", status:"Vivo",
      desc:"Primeira pessoa a voar. Sumiu há anos, mas segue firme lá dentro.",
      dicas:["Todo mundo na vila acha que morreu.","Acampou dentro de um lugar cheio de névoa e raízes."] },
    { id:"tephra", nome:"Tephra", especie:"Hearthiano", local:"Timber Hearth", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Comanda a brincadeira de esconde-esconde na vila.",
      dicas:["Te desafia a achar os amigos escondidos.","Fica perto da entrada da vila."] },
    { id:"galena", nome:"Galena", especie:"Hearthiano", local:"Timber Hearth", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Está escondida em algum lugar da vila. Boa sorte.",
      dicas:["Participa do esconde-esconde.","Você só acha com o telescópio de sinais."] },
    { id:"mica", nome:"Mica", especie:"Hearthiano", local:"Timber Hearth", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Te empresta uma nave de brinquedo pra treinar pouso.",
      dicas:["Tem um brinquedo que voa de verdade.","Fica perto da plataforma de lançamento."] },
    { id:"moraine", nome:"Moraine", especie:"Hearthiano", local:"Timber Hearth", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Fica no alto com o telescópio de sinais, ouvindo a música dos viajantes.",
      dicas:["Adora ouvir os viajantes de longe.","Fica num ponto alto da vila com um telescópio de sinais."] },
    { id:"arkose", nome:"Arkose", especie:"Hearthiano", local:"Timber Hearth", papel:"Criança", instrumento:"Nenhum", status:"Vivo",
      desc:"Mais uma criança escondida pela vila.",
      dicas:["Participa do esconde-esconde.","Se esconde num lugar alto."] },
    { id:"marl", nome:"Marl", especie:"Hearthiano", local:"Timber Hearth", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Quer derrubar a árvore gigante no meio da vila. Ninguém deixa.",
      dicas:["Anda com um machado e um plano.","Tem uma opinião forte sobre a árvore da vila."] },
    { id:"spinel", nome:"Spinel", especie:"Hearthiano", local:"Timber Hearth", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Pesca ao lado da vila e não pega muita coisa.",
      dicas:["Fica com uma vara na mão, perto da água.","A paciência é maior que o resultado."] },
    { id:"porphy", nome:"Porphy", especie:"Hearthiano", local:"Timber Hearth", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Faz uma bebida com seiva da árvore e insiste pra você provar.",
      dicas:["Produz algo com seiva de árvore.","Fica perto de barris na vila."] },
    { id:"tektite", nome:"Tektite", especie:"Hearthiano", local:"Timber Hearth", papel:"Ofício", instrumento:"Nenhum", status:"Vivo",
      desc:"Trabalha na mina e sabe onde tem matéria fantasma.",
      dicas:["Fica na entrada de uma mina.","Avisa sobre um perigo invisível lá dentro."] },

    /* ---- Nomai ---- */
    { id:"solanum", nome:"Solanum", especie:"Nomai", local:"Quantum Moon", papel:"Peregrina", instrumento:"Nenhum", status:"Vivo",
      desc:"A última Nomai que você pode encontrar. Se olhar no lugar certo.",
      dicas:["Está esperando visita num lugar que muda de lugar.","Conversa com você escrevendo no chão."] },
    { id:"poke", nome:"Poke", especie:"Nomai", local:"Ash Twin", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Projetou os núcleos de dobra e o Projeto Ash Twin.",
      dicas:["Especialista em dobra espacial.","Foi investigar o cometa junto com Clary."] },
    { id:"pye", nome:"Pye", especie:"Nomai", local:"Sun Station", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Direta ao ponto: se o Sol não coopera, a gente ajuda ele a explodir.",
      dicas:["Trabalhou no Laboratório de Alta Energia.","Escreveu com raiva que a Estação Solar era um fracasso."] },
    { id:"clary", nome:"Clary", especie:"Nomai", local:"Sun Station", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Trabalhou na Estação Solar e foi investigar o cometa com Poke.",
      dicas:["Ajudou a construir a Estação Solar.","Ficou congelada dentro de um cometa."] },
    { id:"cassava", nome:"Cassava", especie:"Nomai", local:"Giant's Deep", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Trabalhou no Canhão de Sonda e tinha certeza de que Mallow ia explodir tudo.",
      dicas:["Se preocupava com a potência de um disparo.","Trabalhou no Estaleiro de Construção."] },
    { id:"mallow", nome:"Mallow", especie:"Nomai", local:"Giant's Deep", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Queria disparar o canhão na potência máxima. Conseguiu.",
      dicas:["Discutiu com Cassava sobre o canhão.","Ganhou a discussão. O canhão perdeu um pedaço."] },
    { id:"daz", nome:"Daz", especie:"Nomai", local:"Brittle Hollow", papel:"Criança", instrumento:"Nenhum", status:"Morto",
      desc:"Chegou no pod de fuga ainda criança e cresceu vendo a cidade ser construída.",
      dicas:["Escreveu na parede do assentamento antigo quando era criança.","Veio no primeiro pod de fuga."] },
    { id:"coleus", nome:"Coleus", especie:"Nomai", local:"Ember Twin", papel:"Criança", instrumento:"Nenhum", status:"Morto",
      desc:"Sumiu de vista ao apagar a luz numa caverna quântica. E descobriu uma regra.",
      dicas:["Desapareceu numa caverna quando a luz apagou.","Ajudou a descobrir como se mover junto com uma pedra quântica."] },
    { id:"melorae", nome:"Melorae", especie:"Nomai", local:"Ember Twin", papel:"Cientista", instrumento:"Nenhum", status:"Morto",
      desc:"Estudou as cavernas quânticas ao lado de Coleus.",
      dicas:["Pesquisou pedras que mudam de lugar.","Registrou o que aconteceu com Coleus."] },
    { id:"escall", nome:"Escall", especie:"Nomai", local:"The Vessel", papel:"Liderança", instrumento:"Nenhum", status:"Morto",
      desc:"Comandava a nave que respondeu ao sinal do Olho. Nunca saiu de Dark Bramble.",
      dicas:["Decidiu seguir um sinal mais antigo que o universo.","Ficou na nave depois que os pods de fuga partiram."] },
    { id:"filix", nome:"Filix", especie:"Nomai", local:"Ember Twin", papel:"Exploração", instrumento:"Nenhum", status:"Morto",
      desc:"Sobreviveu ao pouso do Pod 2 e abriu caminho pelas cavernas.",
      dicas:["Veio no segundo pod de fuga.","Explorou cavernas de areia em busca de um lugar seguro."] },
    { id:"annona", nome:"Annona", especie:"Nomai", local:"Brittle Hollow", papel:"Liderança", instrumento:"Nenhum", status:"Morto",
      desc:"Veio no Pod 1 e organizou os sobreviventes no assentamento antigo.",
      dicas:["Guiou os sobreviventes do primeiro pod.","Se preocupava com quem estava no terceiro pod."] },

    /* ---- DLC ---- */
    { id:"prisioneiro", nome:"Prisioneiro", alias:["Prisoner","The Prisoner","O Prisioneiro"], especie:"Outro", local:"The Stranger", papel:"Prisioneiro", instrumento:"Nenhum", status:"Vivo", dlc:true,
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

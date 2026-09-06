# Outerdle

Um desafio por dia baseado em **Outer Wilds**, no estilo Wordle. Feito por fãs, sem afiliação com a Mobius Digital.

## Como rodar

Abra `index.html` no navegador. Não precisa de servidor.

Se mudou algo em `src/dados.js`, gere o arquivo codificado antes de abrir:

```
node tools/build.js
```

## Publicar (passo a passo)

### Opção 1: GitHub Pages (grátis, com endereço `seu-usuario.github.io/outerdle`)

1. Crie um repositório no GitHub chamado `outerdle` (público).
2. Na pasta do projeto:
   ```
   git remote add origin https://github.com/renatomsantana/outerdle.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages** e em *Source* escolha **GitHub Actions**.
4. Pronto. O workflow em `.github/workflows/pages.yml` gera os dados e publica só os arquivos do site (a pasta `src/` com o conteúdo legível fica de fora). Cada `git push` republica.

### Opção 2: Netlify ou Cloudflare Pages (grátis, arraste e solte)

1. Rode `node tools/build.js`.
2. Arraste a pasta do projeto para o painel do Netlify Drop ou conecte o repositório.
3. Se conectar o repositório, configure o comando de build `node tools/build.js` e a pasta de publicação `.` (raiz). Adicione `src/` e `tools/` na lista de exclusão, ou apague-os do deploy.

O arquivo `_headers` já traz os cabeçalhos de segurança para essas plataformas.

### Antes de divulgar

- [x] Endereço final (`https://renatomsantana.github.io/outerdle/`) já está no `index.html` (canonical, `og:url`, `og:image`, `twitter:image`). Se mudar de domínio, troque lá.
- [ ] Teste a prévia em [opengraph.xyz](https://www.opengraph.xyz) ou mandando o link pra você mesmo no WhatsApp.
- [ ] Se quiser contar visitas, siga o comentário no fim do `index.html` (GoatCounter é grátis e não exige aviso de cookies).
- [ ] Ao publicar mudanças grandes, aumente a versão em `sw.js` (`outerdle-v6` → `v7`) para os celulares atualizarem o cache.

### Para o jogo espalhar

- O resultado compartilhado sai com o quadro de emojis, `#Outerdle #OuterWilds` e o link do site.
- O card de vitória tem botões diretos para WhatsApp, X e Telegram.
- Bons lugares para divulgar: r/outerwilds, servidores de Discord do jogo, grupos de Telegram e a comunidade brasileira no X. Poste seu próprio resultado do dia, não só o link.

## Modos

| Modo | Como funciona |
| --- | --- |
| **Locais** | Chute um corpo celeste. Cada coluna (tipo, órbita, atmosfera, perigo, Nomai, viajante) mostra se bate com o alvo. Tentativas ilimitadas; dicas extras na 3ª e na 5ª. |
| **Personagens** | Mesma mecânica com Hearthianos e Nomai: espécie, local, papel, instrumento e status. |
| **Diário** | Você recebe um registro do diário de bordo e tem 6 tentativas. Cada erro revela um registro mais específico. |

Cada modo tem um alvo diário próprio, sorteado de forma determinística: o mesmo dia mostra o mesmo alvo pra todo mundo. O dia vira à meia-noite no horário do jogador, e a página troca sozinha, sem recarregar. Um relógio no card mostra quanto falta.

**Repetições:** dentro de um ciclo de N dias (N = quantidade de itens) nenhum item se repete, e na virada de ciclo os itens que saíram nos últimos N/4 dias não podem aparecer nos primeiros N/4 dias do ciclo seguinte. Com os 51 locais atuais, o intervalo mínimo entre repetições é de 13 dias e o típico é de 51. Locais e Diário nunca sorteiam o mesmo lugar no mesmo dia. Quanto mais itens em `src/dados.js`, mais tempo até repetir.

O **modo livre** sorteia alvos aleatórios, quantos quiser, sem afetar as estatísticas.

O **arquivo** (ícone de calendário) deixa jogar qualquer dia desde o lançamento. Dias anteriores ficam salvos, mas só o de hoje entra nas estatísticas.

Nos modos de grade, um contador abaixo das tentativas mostra quantas opções ainda são compatíveis com todas as respostas.

## Instalar no celular / offline

Publicada em `https://`, a página pode ser instalada como app (manifesto em `manifest.webmanifest`) e funciona offline graças ao `sw.js`. O service worker tenta a rede primeiro e usa o cache só quando não há conexão, então atualizações chegam normalmente. Abrindo direto do arquivo (`file://`), nada disso é usado e o jogo funciona do mesmo jeito.

## Estrutura

```
index.html      página
css/style.css   estilos (tema escuro, alto contraste, responsivo)
js/app.js       motor do jogo: modos, sorteio diário, arquivo, estatísticas, modais
js/data.js      conteúdo CODIFICADO, gerado por tools/build.js (não edite à mão)
src/dados.js    conteúdo legível: locais, personagens e colunas (edite aqui)
tools/build.js  valida src/dados.js e gera js/data.js
assets/         arte oficial do jogo: logo.png, wallpaper.jpg (fogueira), campfire.jpg e riebeck.jpg (press kit), village.jpg (404)
icon-512.png, icon-192.png, apple-touch-icon.png, favicon-32.png   ícones (recorte da fogueira do wallpaper)
og.jpg          imagem de prévia para redes sociais (logo + wallpaper)
tools/og.html, tools/icon.html   fontes das composições acima (a og.jpg atual foi gerada com Pillow)
manifest.webmanifest  manifesto PWA
sw.js           service worker (offline)
404.html, robots.txt, _headers, .nojekyll   arquivos de hospedagem
.github/workflows/pages.yml   publicação automática no GitHub Pages
outerdle.md     versão original (arquivo único), mantida como referência
```

## Arte oficial e política de fãs

O logo, o wallpaper e as imagens de personagens vêm dos materiais públicos da Mobius Digital (CDN da Steam e press kit em mobiusdigitalgames.com/press). O uso segue a [Política de Conteúdo de Fãs da Mobius](https://www.mobiusdigitalgames.com/fan-content-policy.html), que em resumo pede:

- o conteúdo deve ser gratuito e não pode se apresentar como oficial ou aprovado pela Mobius;
- nada de venda em massa, crowdfunding, NFT ou cripto;
- incluir o aviso "This work is unofficial Fan Content created under permission from the Mobius Digital Fan Content Policy" (está no rodapé, em português e inglês);
- a Mobius pode pedir a remoção a qualquer momento.

Se um dia quiser monetizar o site, troque a arte por material próprio antes.

## Segurança e "inspecionar elemento"

O jogo roda inteiro no navegador, então não existe como esconder a resposta de alguém disposto a decodificar o código. O que está feito é tirar a resposta do caminho fácil:

- O conteúdo em `js/data.js` fica codificado e só é decodificado em memória. Não aparece em nenhuma variável global (`window`), então digitar o nome dos dados no console não devolve nada.
- A resposta do dia nunca vai para o HTML. Só entram na página as tentativas feitas e as dicas já liberadas.
- A fonte legível (`src/dados.js`) não é publicada pelo workflow do GitHub Pages.
- Uma política de conteúdo (CSP) no `index.html` bloqueia scripts de outras origens e injetados, e o `_headers` adiciona cabeçalhos de segurança onde a hospedagem suporta.
- Não há servidor, banco, login nem coleta de dados: não existe o que invadir além do próprio navegador do jogador.

## Dificuldade

Por padrão as dicas extras só aparecem na 4ª e na 6ª tentativa, a lista de sugestões não mostra atributos dos itens e o contador de candidatos fica desligado. Nas configurações há o **Modo difícil ★** (sem dicas extras, Diário com 4 tentativas, resultado marcado com ★) e o contador de candidatos para quem quiser facilitar.

## Adicionando conteúdo

Tudo que é conteúdo mora em `src/dados.js`. Depois de editar, rode `node tools/build.js`; ele valida os campos e gera `js/data.js`.

- **Local novo:** adicione um objeto em `LOCAIS` com `id` único, os atributos das colunas (`tipo`, `corpo`, `orbita`, `nomai`, `perigo`, `viajante`) e exatamente 5 `dicas` (da mais vaga à mais específica). O modo Locais usa a 2ª e a 4ª como dicas extras. Vale tanto para corpos celestes quanto para lugares dentro deles (cidades, acampamentos, ilhas, ruínas).
- **Personagem novo:** adicione em `PERSONAGENS` com os 5 atributos e 2 `dicas`. O campo `local` deve ser o `nome` de um local existente.
- **Conteúdo de DLC:** marque com `dlc: true`. Só aparece com *Echoes of the Eye* ligado nas configurações e nunca é alvo do desafio diário.
- **Apelidos:** o campo `alias` aceita nomes alternativos pra busca (ex.: "Ash Twin" e "Gêmea de Cinzas" para Gêmeo Cinzento). Os nomes principais seguem a tradução oficial do jogo em pt-BR (Recanto Lenhoso, Gêmeo Cálido, Vale Incerto, Abrolho Sombrio, Xereta etc.); os nomes em inglês ficam como apelidos.

Atenção: mudar a quantidade de itens de um modo altera a sequência de alvos diários daquele modo.

## Dados salvos

Tudo fica no `localStorage` do navegador, com prefixo `outerdle:`: tentativas do dia por modo, estatísticas por modo, modo atual e configurações. As configurações têm um botão para apagar tudo.

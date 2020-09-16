// Biblioteca do Twitter.
const Twit = require("twit");

// Arquivo de configuração.
const twit = new Twit(require("./config.js"));

// Pesquisa os ultimos tweets com '#GIF'.
const mediaArtsSearch = { q: "#GIF", count: 100, result_type: "recent" };

// Encontra o ultimo com a hashtag e retweeta.
const retweetLatest = () => {
  twit.get("search/tweets", mediaArtsSearch, (error, data) => {
    // desconecta de erros e respostas
    console.log(error, data);
    // Se a pesquisa no servidor não apresentar erros...
    if (!error) {
      // salvar o ID do tweet...
      let retweetId = data.statuses[0].id_str;
      // mostrar para o Twitter o que queremos retweetar
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
        if (response) {
          console.log(
            "Opa, lá vai mais um!"
          );
        }
        // se houver erros com o twitter.
        if (error) {
          console.log("Parece que tive algum problema com o Twitter :(", error);
        }
      });
    }
    // Se houver erro com a pesquisa...
    else {
      console.log("There was an error with your hashtag search:", error);
    }
  });
}

// tentativa
retweetLatest();
// intervalo em MS...
setInterval(retweetLatest, 1000 * 60 * 30);
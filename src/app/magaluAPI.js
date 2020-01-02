const axios = require("axios");

module.exports = resposta => {
  return new Promise((resolve, reject) => {
    var stringSearch = '';

    resposta.map(function(product, i) {
      if(i == 0)
      {
        stringSearch += "?id=" + product;
      }
      else
      {
        stringSearch += "&id=" + product;
      }
    });

    axios
      .get("https://praice.magazineluiza.com.br/items/" + stringSearch)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(console.error);
  });
};

var Crawler = require("../app/crawler");
var magaluAPI = require("../app/magaluAPI");

module.exports = (termo, parentClass, site) => {
  return new Promise((resolve, reject) => {
    switch (site) {
      case "MagazineLuiza":
        Crawler(termo, parentClass, site).then(resposta => {
          magaluAPI(resposta).then(response => {
            var products = [];
            var product = [];

            response.data.map(function(element) {
              if (element.price != undefined) {
                product.push(element.id);
                product.push(element.price);

                products.push(product);
                product = [];
              }
            });

            products = products.sort(function(a, b) {
              return a[1] - b[1];
            });

            resolve({ "Marketplace": "Magazine Luiza", "ID": products[0][0], "Price": products[0][1] });
          });
        });
        break;

      case "Amazon":
        Crawler(termo, parentClass, site).then(resposta => {
          var products = [];
          var product = [];
          resposta.map(function(element) {
              product.push(element[0]);
              product.push(element[2]);

              products.push(product);
              product = [];
          });

          products = products.sort(function(a, b) {
            return a[1] - b[1];
          });

          resolve({ "Marketplace": "Amazon", "ID": products[0][0], "Price": products[0][1]});
        }).catch(console.error);
        break;
    }
  });
};

const express = require("express");
const app = express();
var Crawler = require("../app/crawler");
var magaluAPI = require("../app/magaluAPI");

var pesquisa = "Galaxy+A70";
var rangePreco = "1500:3000";
var queue = `https://busca.magazineluiza.com.br/busca?q=${pesquisa}&sort=5&range_filter%5B2%5D=${rangePreco}:3&results_per_page=200`;
var id;

Crawler(
  queue,
  "li.nm-product-item",
  "id",
  "h2.nm-product-name",
  "div.nm-price-container"
).then(resposta => {
    magaluAPI(resposta.id.substring(11)).then(console.log);
});

https: module.exports = app;

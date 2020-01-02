const express = require("express");
const app = express();
var montaPesquisa = require("../app/montaPesquisa");
var getProduto = require("../app/getProduto");

var termo = "32PHG581378";
var rangePreco = "800:1500";
var categoria = "";
var results = [];

const p1 = getProduto(
    montaPesquisa(termo, rangePreco, categoria, "MagazineLuiza"),
    "li.nm-product-item",
    "MagazineLuiza"
  );

const p2 = getProduto(
  montaPesquisa(termo, rangePreco, categoria, "Amazon"),
  "div.s-result-item",
  "Amazon"
);

Promise.all([p1,p2]).then(values => {
    console.log(values)
});

https: module.exports = app;

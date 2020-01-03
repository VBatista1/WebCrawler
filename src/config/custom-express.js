const express = require("express");
const app = express();
var montaPesquisa = require("../app/montaPesquisa");
var getProduto = require("../app/getProduto");
const Crawler = require("crawler");
var db = require("../db");

/*var termo = "32PHG581378";
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
});*/

let termo = `https://www.magazineluiza.com.br/smartphone/celulares-e-smartphones/s/te/tcsp?page=1`;

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      $("a[name ='linkToProduct']").each((i, element) => {
          try{
            const cheerioElement = $(element);
          let script = cheerioElement.find("script");
          script = JSON.parse(script.text());
          var Smartphones = db.Mongoose.model('smartphones', db.smartphoneSchema, 'smartphones');
          var smartphone = new Smartphones({ 
            "@context": script["@context"], 
            "@type": script["@type"],
            "name": script["name"],
            "image": script["image"][0],
            "brand": [{"@type": script["brand"]["@type"], "name": script["brand"]["name"]}],
            "aggregateRating": [{"@type": script["aggregateRating"]["@type"], "ratingValue": script["aggregateRating"]["ratingValue"], "ratingCount": script["aggregateRating"]["ratingCount"]}],
            "sku": script["sku"],
            "description": script["description"]});
          smartphone.save(function (err) {
            if (err) {
              console.log("Error! " + err.message);
              return err;
            }
            else {
              console.log("smartphone saved");
            }
          });
          }
          catch (e){
  
          }
      });
    }
    done();
  }
});

// Queue just one URL, with default callback
c.queue(termo);

https: module.exports = app;

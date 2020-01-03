const express = require("express");
const app = express();
//var montaPesquisa = require("../app/montaPesquisa");
//var getProduto = require("../app/getProduto");
const Crawler = require("crawler");
//var db = require("../db");

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

let termos = [];

for (let i = 0; i < 300; i++) {
  termos.push(
    `https://www.magazineluiza.com.br/smartphone/celulares-e-smartphones/s/te/tcsp?page=${i}&sort=type%3Aprice%2Corientation%3Aasc`
  );
}

var c = new Crawler({
  rateLimit: 1000,
  // This will be called for each crawled page
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      var url = $("link[rel='alternate']").attr("href");
      console.log(url.substring(31, 41));
      if (url.substring(31, 41) == "smartphone") {
        $("a[data-css-rx7mj]").each((i, element) => {
          if ($(element).parents("ul[data-css-iabqk5]").length) {
            try {
              const cheerioElement = $(element);
              let script = cheerioElement.find("script");
              script = JSON.parse(script.text());
              console.log(script);
              /*var Smartphones = db.Mongoose.model('smartphones', db.smartphoneSchema, 'smartphones');
          var smartphone = new Smartphones({ 
            "name": script["name"],
            "image": script["image"][0],
            "brand": [{"name": script["brand"]["name"]}],
            "offers": [{"lowPrice": script["offers"]["lowPrice"], "highPrice": script["offers"]["highPrice"], "priceCurrency": script["offers"]["priceCurrency"], "offerCount": script["offers"]["offerCount"]}],
            "sku": script["sku"],
            "description": script["description"]});
          smartphone.save(function (err) {
            if (err) {
              console.log("Error! " + err.message);
              return err;
            }
            else {
              console.log(`smartphone ${smartphone["sku"]} saved`);
            }
          });*/
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    }
    done();
  }
});

// Queue just one URL, with default callback
c.queue(termos);

https: module.exports = app;

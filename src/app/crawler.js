const Crawler = require("crawler");

module.exports = (queue, parentClass, site) => {
  return new Promise((resolve, reject) => {
    switch (site) {
      case "MagazineLuiza":
        var products = [];
        var product = [];
        var c = new Crawler({
          maxConnections: 10,
          // This will be called for each crawled page
          callback: function (error, res, done) {
            if (error) {
              console.log(error);
            } else {
              var $ = res.$;
              $(parentClass).each((i, element) => {
                const cheerioElement = $(element);
                product.push(cheerioElement.attr("id").substring(11));

                products.push(product);
                product = [];
              });
              resolve(products);
            }
            done();
          }
        });

        // Queue just one URL, with default callback
        c.queue(queue);
        break;

      case "Amazon":
        var products = [];
        var product = [];
        var c = new Crawler({
          maxConnections: 10,

          callback: function (error, res, done) {
            if (error) {
              console.log(error);
            } else {
              var $ = res.$;
              $(parentClass).each((i, element) => {

                const cheerioElement = $(element);
                const asin = cheerioElement.attr("data-asin");
                const title = cheerioElement.find(
                  "span.a-size-medium.a-color-base.a-text-normal"
                );
                var priceWhole = cheerioElement.find("span.a-price-whole");
                const priceFraction = cheerioElement.find("span.a-price-fraction");
                if(priceWhole == '')
                {
                  priceWhole = cheerioElement
                    .find("span.a-color-base:not(.a-text-normal)");
                  priceWhole = priceWhole.text().substring(2);
                  priceWhole = priceWhole.split(".").join("");
                  priceWhole = priceWhole.split(",").join(".");
                  product.push(asin);
                  product.push(title.text());
                  product.push(priceWhole);
                }
                else
                {
                  priceWhole = priceWhole.text() + priceFraction.text();
                  priceWhole = priceWhole.split(".").join("");
                  priceWhole = priceWhole.split(",").join(".");
                  product.push(asin);
                  product.push(title.text());
                  product.push(priceWhole);
                }

                products.push(product);
                product = [];
              });
              resolve(products);
            }
            done();
          }
        });

        // Queue just one URL, with default callback
        c.queue(queue);
        break;
        default:
    }
  });
};


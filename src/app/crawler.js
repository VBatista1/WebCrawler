const Crawler = require("crawler");

module.exports = (queue, parentClass, idClass, titleClass, priceClass) => {
    return new Promise((resolve, reject) => {
        var products = [];
        var product;
      var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function(error, res, done) {
          if (error) {
            console.log(error);
          } else {
            var $ = res.$;
            $(parentClass).each((i, element) => {
              if (i === 0) {
                const cheerioElement = $(element);
                product["id"] = cheerioElement.attr(idClass);
                product["title"] = cheerioElement.find(titleClass);
                product["price"] = cheerioElement.find(priceClass);

                products.push()
                resolve({
                  id: id,
                  title: title.text(),
                  price: price.text()
                });
              }
            });
          }
          done();
        }
      });

      // Queue just one URL, with default callback
      c.queue(queue);
    });
};



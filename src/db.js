var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Magalu');

var smartphoneSchema = new mongoose.Schema({
    "id": String,
    "@context": String,
    "@type": String,
    "name": String,
    "image": String,
    "brand": [{"@type": String, "name": String,}],
    "aggregateRating": [{"@type": String, "ratingValue": String, "ratingCount": String,}],
    "sku": String,
    "description": String,
}, { collection: 'smartphones' }
);

module.exports = { Mongoose: mongoose, smartphoneSchema: smartphoneSchema }

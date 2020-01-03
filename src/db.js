var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Magalu');

var smartphoneSchema = new mongoose.Schema({
    "id": String,
    "name": String,
    "image": String,
    "brand": [{"name": String,}],
    "offers": [{"lowPrice": String, "highPrice": String, "priceCurrency": String, "offerCount": String}],
    "sku": { type: String, index: { unique: true }},
    "description": String,
}, { collection: 'smartphones' }
);

module.exports = { Mongoose: mongoose, smartphoneSchema: smartphoneSchema }

const axios = require('axios');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
    axios
      .get("https://praice.magazineluiza.com.br/items/?id=" + id)
      .then(function(response) {
        resolve(response.data); // ex.: { user: 'Your User'}
      });  
    });
}
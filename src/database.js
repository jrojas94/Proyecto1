const mongoose = require('mongoose');

const URI = 'mongodb://localhost/Protecto1MERN';

mongoose.connect(URI)
  .then(db => console.log('DB conectada'))
  .catch(error => console.error(error));

module.exports = mongoose;

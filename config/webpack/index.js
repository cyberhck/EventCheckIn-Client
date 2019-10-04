'use strict';
const utils = require('../utils');

if (process.env.NODE_ENV === 'production')
{
  module.exports = require('./prod');
}
else
{
  module.exports = require('./dev');
}
utils.copySyncIfDoesntExist('./config/main.js', './config/main.local.js');
utils.createIfDoesntExist('./build');
utils.createIfDoesntExist('./build/public');
utils.createIfDoesntExist('./build/public/images');
utils.createIfDoesntExist('./build/public/images/agojis');
utils.copySync('./src/index.html', './build/index.html');
utils.copySync('./src/favicon.ico', './build/public/favicon.ico', true);
for (let i = 1; i <= 50; i++) {
  utils.copySync(`./src/app/images/agojis/${i}.png`, `./build/public/images/agojis/${i}.png`);
}

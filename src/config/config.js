var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'Proyecto1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/data/db'
  },

  test: {
//    baseUrl: "/nodeapp/",
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'blog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/nodeapp'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
  }
};

module.exports = config[env];

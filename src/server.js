const express = require('express');
const morgan = require('morgan');
const path = require('path');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const config = require('./config/config');
const glob = require('glob');

//Init
const { mongoose } = require('./database');
const app = express();

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

//Settings
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view-engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/comments', require('./routes/routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

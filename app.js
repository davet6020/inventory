require('dotenv').config();
var express = require('express');
var cons = require('consolidate');
var http = require('http');
var expressControllers = require('express-controller');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var router = express.Router();
var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.set('port', process.env.PORT || 1337);
app.use(favicon(path.join(__dirname,'img','favicon.ico')))
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(router);

// Load dirs for external files so the app can use them.
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

// Load the controller files in /controllers
expressControllers
  .setDirectory(__dirname + '/controllers')
  .bind(router);

app.get('*', function(req, res) {
  res.status(404).send('Sorry, that page does not exist.');
});

http.createServer(app).listen(app.get('port'), function()  {
  console.log('Running Inventory Control on port ' + app.get('port'));
});

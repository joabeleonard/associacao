var nedb = require('nedb');
var db = new nedb({filename: __dirname + '/tempDB', autoload: true});

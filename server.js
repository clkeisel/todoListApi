var express = require('express')
var mongoose = require('mongoose');
var secrets = require('./secrets');
var Task = require('./api/models/todoListModel');
var bodyParser = require('body-parser');

var app = express()
var port = process.env.port || 3000;

var dbPath = `mongodb://sandbox-to-do:${secrets.private}@ds121331.mlab.com:21331/true_solutions_todo_list`;
mongoose.connect(dbPath);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found.'});
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
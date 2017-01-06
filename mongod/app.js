var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express.createServer();
mongoose.connect('mongodb://localhost/mySeconddb');

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

var api = require('api.js');
app.post('/thread', api.post);
app.get('/thread/:title.:format?', api.show);
app.get('/thread', api.list);

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
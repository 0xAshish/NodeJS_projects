var express = require('express');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MySeconddb', function (error) {
    if (error) {
        console.log(error);
    }
});
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

var User = mongoose.model('users', UserSchema);

var app = express();

app.get('/', function (req, res) {
    res.send("<a href='/users'>Show Users</a>");
});

app.get('/data', function (req, res) {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
});


// Start the server
app.listen(8080);


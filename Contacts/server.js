'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'); // "express-handlebars"
var app = express();
var mongoose = require('mongoose');

//cookie session 
var cookieSession = require('cookie-session');
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

//database schema 
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

var User = mongoose.model('users', UserSchema);

//handlebar engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://localhost/emp', function (error) {
    if (error) {
        console.log(error);
    }
});

//express routing 
app.use('/',(req,res,next)=>{
console.log("middlware ");
next();
});
app.get('/', function (req, res) {

    var msg = req.session.data1;
    req.session.data1 = null;
    res.render('main', { msg: msg });

});

app.get('/users', function (req, res) {
    User.find({}, function (err, docs) {
        if (req.session.data1 != null & req.session.data1 !== undefined) {
            console.log(req.session.data1);
        }
        if (!err) {
            var D = {
                doc: docs,
                msg: req.session.data1 || null
            }
            res.render('users', { D: D });
            req.session.data1 = null;
        } else {
            console.log("data not found");
            res.send(500);
            res.end("Nothing to show ");
        }
    });
});

app.get('/delete', (req, res) => {
    var email = req.query.email;
    console.log(email);

    User.findOneAndRemove({ "email": email }, function (err, data) {
        console.log(data);
        if (err || !data) {
            req.session.data1 = "Please check your email ";
        } else {
            req.session.data1 = "Contact removed Successfully=>" + email;
        }
        res.redirect('/users');
    });
});

app.get('/data', function (req, res) {
    var username = req.query.firstname;
    var last_name = req.query.lastname;
    var email = req.query.email;
    var sc = new User();
    sc.first_name = username;
    sc.last_name = last_name;
    sc.email = email;
    if (username !== "" && email !== "") {
        sc.save((err, data) => {
            if (!err) {
                console.log(data);
            } else {
                console.log(err);
            }
        });
        req.session.data1 = "Contact "+email+" saved Successfully";
        res.redirect('/');
    } else {
        req.session.data1 = "firstname or|and email can't be null"
        res.redirect('/');
    }

});

app.listen(3000, function () {
    console.log('server listening on: 3000 Press Ctrl-C to Exit');
});

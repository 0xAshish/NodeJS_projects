'use strict';
var express = require('express');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var app = express();
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')


app.use(session({
    secret: 'Secret1'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//database schema 
var Schema = mongoose.Schema;

//user contacts schema
var contactSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile: Number,
    uid: String
});
//registration login  Schema 
var userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile: Number,
    password: String
});

var Contacts = mongoose.model('contacts', contactSchema);
var User = mongoose.model('login', userSchema);

mongoose.connect('mongodb://localhost/Contact', function (error) {
    if (error) {
        console.log(error);
    }
});

// //passportjs validation of user
function validate(req, res, next) {
    console.log(req.session.passport.user);
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("" + username + " " + password);
        User.findOne({
            'email': username,
            'password': password
        }, (err, data) => {
            if (data != null && data !== undefined) {
                console.log(data);
                console.log("Done");
                //req.session.data=data['_id'];
                return done(null, data);
            } else {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
        });

    }));

passport.serializeUser(function (data, cb) {
    console.log("user_c" + data);
    cb(null, data['_id']);
});

passport.deserializeUser(function (id, cb) {
    console.log("deserializeUser");
    User.findOne({
        '_id': id
    }, function (err, user) {
        if (err) {
            return cb(err);
        }
        console.log("user" + user);
        cb(null, user);
    });
});

app.use('/user/ragister', (req, res, next) => {

    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var email = req.query.email;
    var mobile = req.query.mobile;
    var password = req.query.password;
    if (first_name !== "" && last_name !== "" && email !== "" && password !== "") {
        User.findOne({
            'email': email
        }, (err, data) => {
            if (data != null && data !== undefined) {
                console.log(data);
                console.log("email already exists");
                req.session.data1 = "email already exists";
                //  req.session.passport.user="";
                res.send('email already exists');
            } else {
                console.log("ragisteration process");
                next();
            }
        });
        console.log("validation complete ");
        //next();
    } else {
        req.session.data1 = "validation error";
        console.log("reg validation failed ");
        res.send('registration validation failed');
    }
    req.session.data1 = "";

});


app.use('/user/login', (req, res, next) => {
    var email = req.body.username;
    var password = req.body.password;
    console.log("email" + email + "password" + password);
    if (email !== "" && password !== "" && email !== undefined && password !== undefined && email !== null && password !== null) {
        console.log("login validated");
        next();
    } else {
        console.log("login validation failed");
        res.send('fail');
    }
});

app.use(express.static(__dirname));
app.use(bodyParser.json());


app.get('/app/contacts', validate, function (req, res) {
    //res.send("response");
    var uid = req.session.passport.user;
    Contacts.find({
        'uid': uid
    }, function (err, docs) { //
        if (!err) {
            var data = {}
            var i = 0;
            console.log("length " + docs.length);

            console.log("dataaa" + docs);
            res.send({
                data: docs
            });
        } else {
            console.log("data not found");
            res.send(500);
            res.end("Nothing to show ");
        }
    });
});
app.post('/app/add', validate, function (req, res) {
    console.log("in profile" + req.body.email);
    // console.log("in profile"+req.query.email);
    var sc = new Contacts();
    sc.first_name = req.body.first_name;
    sc.last_name = req.body.last_name;
    sc.email = req.body.email;
    sc.mobile = req.body.mobile;
    sc.uid = req.session.passport.user;
    console.log(sc);
    sc.save((err, data) => {
        if (!err) {
            res.send(sc);
        } else {
            console.log(err);
            console.log("error in app/Contacts");
            req.session.data1 = "Error saving data";
            res.send('error in saving data');
        }
    });
});
app.delete('/app/delete/:id', validate, (req, res) => {
    var id = req.params.id;
    //var uid = req.session.passport.user;
    console.log("id->>" + id);
    Contacts.findOneAndRemove({
        "_id": id
    }, function (err, data) {
        console.log(data);
        if (err || !data) {
            req.session.data1 = "Please check your email ";
        } else {
            req.session.data1 = "Contact removed Successfully=>" + data.email;
        }
        res.send(req.session.data1);
        req.session.data1 = "";
    });
});

app.post('/user/ragister', function (req, res) {

    var sc = new User();
    sc.first_name = req.body.first_name;
    sc.last_name = req.body.last_name;
    sc.email = req.body.email;
    sc.mobile = req.body.mobile;
    sc.password = req.body.password;
    console.log(sc.email);
    sc.save((err, data) => {
        if (!err) {
            req.session.data1 = "User " + sc.email + " saved Successfully";
            res.send(req.session.data1);
            req.session.data1 = "";
            console.log("saved ok");
        } else {
            console.log(err);
            req.session.data1 = "Error saving data";
            res.send(201, req.session.data1);
        }
    });
    req.session.data1 = "";
});
//req by jq to validate on each request/refresh
app.get('/app/valid', validate, (req, res) => {
    res.send(200, "valid");
});

app.get('/app/check', (req, res) => {
    console.log("res", req.query.msg);
    res.send(req.query.msg);

});
app.post('/user/login',
    passport.authenticate('local', {
        successRedirect: '/app/check?msg=valid',
        failureRedirect: '/app/check?msg=fail',
    }));

app.get('/app/logout', function (req, res) {
    req.logout();
    console.log("logout ok");
    res.send('logout ok');

});

app.listen(3005, function () {
    console.log('server listening on: 3005 Press Ctrl-C to Exit');
});

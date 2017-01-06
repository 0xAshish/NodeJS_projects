var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var app = express();
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

app.use(session({secret: 'Secret'}));
app.use(passport.initialize());
app.use(passport.session());
var mongoose = require('mongoose');

//database schema 
var Schema = mongoose.Schema;
//registration login  Schema 
var userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  mobile: Number,
  password: String
});

var User = mongoose.model('login', userSchema);

mongoose.connect('mongodb://localhost/Contact', function (error) {
  if (error) {
    console.log(error);
  }
});
function validate(req, res, next) {
    console.log(req.session.passport.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("error");
  }
}

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log("hello");
    User.findOne({ 'email': username, 'password': password }, (err, data) => {
      if (data != null && data !== undefined) {
        console.log(data);
        console.log("Done");
        return done(null, data);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });

  })
);

passport.serializeUser(function (data, cb) {
  console.log("user_c" + data);
  cb(null, data['_id']);
});

passport.deserializeUser(function (id, cb) {
  console.log("deserializeUser");
  User.findOne({ '_id': id }, function (err, user) {
    if (err) { return cb(err); }
    console.log("user" + user);
    cb(null, user);
  });
});

app.get('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }), function (req, res) {

    console.log('/users/' + req.user);
  });

app.get('/', (req, res) => {
  res.send("welcome home");

})
app.get('/home', validate, (req, res) => {
  res.send("welcome home/hmoe");

})
var server = app.listen(3000, () => {
   var port = server.address().port;
  console.log("app listning on port: ", port);
})


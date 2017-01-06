'use strict';
var express = require('express'),
    exphbs = require('express-handlebars'); // "express-handlebars"
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var app = express();
var assert=require('assert');
var ObjectId=require('mongodb').ObjectId;
var mongoose = require('mongoose');
 var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session') 
var bcrypt=require('bcrypt-nodejs');
var path=require('path');
app.use(session({secret: 'Secret1'}));
app.use(passport.initialize());
app.use(passport.session());
//handlebar engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname+'/public')));
//database schema 
var Schema = mongoose.Schema;
//user contacts schema
var contactSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile: Number,
    uid:String
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
       console.log(""+username+" "+password);
    User.findOne({ 'email': username}, (err, data) => {
      if (data != null && data !== undefined) {
        console.log(data);
        console.log("Done");
       if(bcrypt.compareSync(password, data['password'])){
               return done(null, data);
           }else{
              return done(null, false, { message: 'Incorrect password.' });       
           }
        
        
      } else {
        return done(null, false, { message: 'No User match found.' });
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

//middleware 
/*
app.use('/',(req,res,next)=>{
    if(req.isAuthenticated){
        console.log("not allowed");
        res.redirect('/app/users');
    }else{
        console.log("allowed");
        next();
    }
    
})
*/
app.use('/user/ragister', (req, res, next) => {
    
      var first_name = req.query.first_name;
      var last_name = req.query.last_name;
      var email = req.query.email;
      var  mobile=req.query.mobile;
      var password=req.query.password; 
      if(first_name!==""&&last_name!==""&&email!==""&&password!==""){
           User.findOne({'email':email}, (err, data) => {
            if (data!=null&&data!==undefined) {
            console.log(data);
            console.log("email already exists");
            req.session.data1 = "email already exists";
          //  req.session.passport.user="";
            res.redirect('/');
            } else {
                console.log("ragisteration process");
            next();
            }
         });
        console.log("validation complete ");
        //next();
      }else{
          req.session.data1="validation error";
           console.log("reg validation failed ");
          res.redirect('/');
      }
      req.session.data1="";

});


app.use('/user/login', (req, res, next) => {
    var email = req.query.username;
    var password=req.query.password; 
    console.log("email"+email+"password"+password);
   if(email!==""&&password!==""&&email!==undefined&&password!==undefined&&email!==null&&password!==null){
    console.log("login validated");
    next();
   }else{
       console.log("login validation failed");
       res.redirect('/');
   }
});



app.get('/app/users',validate, function (req, res) {
    var uid=req.session.passport.user;
    Contacts.find({'uid':uid}, function (err, docs) {
        if (!err) {
            var D = {
                doc: docs,
                msg: req.session.data1 || null
            }
            console.log(D.doc);
            res.render('users', { D: D });
            req.session.data1 = "";
        } else {
            console.log("data not found");
            res.send(500);
            res.end("Nothing to show ");
        }
    });
});
app.get('/app/profile', validate,function (req, res) {
console.log("in profile");
    var sc = new Contacts();
    sc.first_name = req.query.first_name;
    sc.last_name = req.query.last_name;
    sc.email = req.query.email;
    sc.mobile = req.query.mobile;
     sc.uid=req.session.passport.user;
     console.log(sc);
     sc.save((err, data) => {
        if (!err) {
            req.session.data1 = "Contact " + sc.email + " saved Successfully";
            console.log(req.session.data1);
            res.redirect('/app/users');
        } else {
            console.log(err);
            console.log("error in app/profile");
            req.session.data1 = "Error saving data";
            res.redirect('/app/profile ');
        }
    });
});
app.get('/app/delete', validate,(req, res) => {
    var email = req.query.email;
    var uid =req.session.passport.user;
    console.log(email);
    Contacts.findOneAndRemove({ "email": email ,"uid":uid}, function (err, data) {
        console.log(data);
        if (err || !data) {
            req.session.data1 = "Please check your email ";
        } else {
            req.session.data1 = "Contact removed Successfully=>" + email;
        }
        res.redirect('/app/users');
        req.session.data1="";
    });
});
app.get('/', (req, res) => {

var msg=req.session.data1;
            res.render('home',{msg:msg});
            req.session.data1="";
    
});

app.get('/user/ragister', function (req, res) {

    var sc = new User();
    var hash = bcrypt.hashSync(req.query.password);
    sc.password=hash;
       console.log("hash generated"+hash);
    sc.first_name = req.query.first_name;
    sc.last_name = req.query.last_name;
    sc.email = req.query.email;
    sc.mobile = req.query.mobile;
    console.log("data saved in variable");
   // sc.password = ;

    sc.save((err, data) => {
        if (!err) {
            req.session.data1 = "User " + sc.email + " saved Successfully";
            res.redirect('/');
            req.session.data1="";
        } else {
            console.log(err);
            req.session.data1 = "Error saving data";
            res.redirect('/');
        }
    });
    req.session.data1="";
});


app.get('/user/login',
  passport.authenticate('local', { successRedirect: '/app/users',
                                   failureRedirect: '/',
                                    }));

app.get('/logout', function (req, res) {
//  req.session.passport.user="";
 //req.session.data="";
 req.logout();
  console.log("logout ok");
  res.redirect('/');  

});

app.listen(3000, function () {
  console.log('server listening on: 3000 Press Ctrl-C to Exit');
});
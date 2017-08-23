'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'); // "express-handlebars"
var app = express();
const fs= require('fs');
const exec=require('child_process').exec;
const execFile=require('child_process').execFile;

//handlebar engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/ex',(req,res)=>{
        var cmd ="code1"
       exec(cmd,(err,stdout,stderr)=>{
           if(!err){
               console.log(stdout);
           }else{
               console.log(err);
           }
       })
})
 
app.get('/code', function (req, res) {
   console.log(req.query.code2);
fs.writeFile('a.c',req.query.code2,(err)=>{
    if(!err){
       var cmd="gcc a.c -o code12";
       exec(cmd,null,(err,stdout,stderr)=>{
           if(!stderr){
           console.log("output:");
          var child = execFile("./code12",null,(err,stdout,stderr)=>{
           if(!err){
               console.log(stdout);

           }else{
               console.log(err+stderr+"sout"+stdout);
           res.render('home',{out:stdout})
           }
       })}else{
               console.log(stderr);
           }
       })

    }else{
       console.log("err"+err+"child"+child);
       //res.redirect('/');
    }
});
 

  // res.redirect('/');
});

  

app.listen(3000, function () {
    console.log('server listening on: 3000 Press Ctrl-C to Exit');
});

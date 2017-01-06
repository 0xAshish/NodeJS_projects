var express=require('express');
var app=express();
var MongoClient=require('mongodb').MongoClient;
var assert=require('assert');
var ObjectId=require('mongodb').ObjectId;
var url='mongodb://localhost:27017/MySeconddb';

app.get('/', (req ,res)=>{
    console.log("it's get req for homepage ");
    var username=req.query.username;
    var pass=req.query.pass;
    console.log("username:"+username+"pass:" + pass);
    if(username=="admin"&&pass=="admin"){
    console.log("Welcome admin");
    res.send("Welcome admin");
     }
    else if(pass=="guest"){
        var output='Welcome '+username+' to guest account';
        console.log(output);
        res.send(output);
    }
    else{
      var output='Sorry'+username+" authantication  failed ";
    res.send(stringify(output));  
    }
})
app.post('/', (req,res)=>{
    console.log("it's post req for homepage");
    res.send("Hello post");
})
app.delete('/del_user' , (req ,res)=>{
    console.log("delete req for del_user");
    res.send("delete");
})
app.get('/abcd', (req ,res)=>{
    console.log("it's get req for abcd page ");
    res.send("Abcd");  
})
app.get('/about', (req ,res)=>{
    console.log("it's get req for about page ");
    res.send("About us");  
})
var server= app.listen(3000,()=>{
    var host=server.address().address;
    var port=server.address().port;
    console.log("app listning on http://%s:%s",host,port);
})
var insertDocument=function(db,data,callback){
    db.collection('MySeconddb').insertOne(data);
}
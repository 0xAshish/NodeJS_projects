var express=require('express');
var app =express();
app.get('/', (req,res)=>{
res.send('hello express');})
var server =app.listen(3000, ()=>{
var host= server.address().adress;
var port=server.address().port;
console.log("express app on port 3000 ");
})

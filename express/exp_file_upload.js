var express= require('express');
var app=express();
var fs=require('fs');
var bodyParser=require('body-parser');
var multer =require('multer');



app.use(express.static('public'));
app.get(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp'}));

app.get('/index.html',(req,res)=>{
res.sendFile(__dirname+"/public/"+"index.html");

})
app.post('/file_upload',(req,res)=>{
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
   
    var file=__dirname+"/"+req.files.file.name;
   
    fs.readFile(req.files.path ,(err,data)=>{
        fs.writeFile(file,data,(err)=>{
            if(err){
                console.log("ERROR!"+err);
            }else{
                response={
                    message:'File Uploded',
                    filename:req.files.file.name
                };

            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

var server=app.listen(8081,()=>{
console.log("server running at http://%s:%s",server.address().address,server.address().port);


})
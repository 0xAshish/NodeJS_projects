'use strict'
const http=require('http');
const url=require('url');
const  fs=require('fs');
const path=require('path');
let mimes={
'.htm':'text/html',
'.css':'text/css',
'.js':'text/javascript'
}
function fileAccess(filepath){
    return new Promise((resolve,reject)=>{
        fs.access(filepath,fs.F_OK,error=>{
            if(!error){
                resolve(filepath);
            }else{
                reject(error);
            }
        });
    });
}
function fileReader(filepath){
    return new Promise((resolve,reject)=>{
fs.readFile(filepath,(err,data)=>{
    if(!err){
        resolve(data);
    }else reject(err);
});
    });
}




function webserver(req,res){
let baseURI=url.parse(req.url);
let filePath=__dirname+(baseURI.pathname==='/'?'/index.html':baseURI.pathname);
let contentType=mimes[path.extname(filePath)];
fileAccess(filePath)
    .then(fileReader)
    .then(data=>{
        res.writeHead(200,{'content-type':contentType});
        res.end(data,'utf-8');
    }).catch(errr=>{
        res.writeHead(404);
        res.end("bad data request")
    });

}


http.createServer(webserver).listen(3000,()=>{
console.log("webserver running on port 3000");

});

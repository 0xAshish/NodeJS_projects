'use strict';
var  fs=require('fs');
const http =require('http');
http.createServer(router).listen(3000,()=>{console.log("server running on 3000");});
function router(req,res){

res.writeHead(200,{'content-type':'video/mp4'});

var img=fs.createReadStream('video.mp4');
img.pipe(res);
}


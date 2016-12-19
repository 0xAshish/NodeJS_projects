'use strict'
var fs= require('fs');
var events=require('events');
var eventEmitter=events.EventEmitter();
var data ='';//new Buffer("abcdefghijklmnop");
var writerStream=fs.createWriteStream('a.txt');
var rs=fs.createReadStream('x.txt');
rs.on('data',(chunk)=>{
data+=chunk;
});
console.log(data);
rs.on('error',(error)=>{
console.log(error.stack);});
//writerStream.write(data,'UTF8');

//writerStream.write(data.toString(),'UTF8');
//writerStream.on('finish',()=>{
//console.log('write Complete');});
//writerStream.on('error',(error)=>{
//onsole.log(error.stack);});

//writerStream.end();

console.log('end of code !!');



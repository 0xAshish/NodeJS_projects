
'use strict'

var fs = require('fs');
//var xml2js = require('xml2js');
var write1=fs.createWriteStream('a.json'); 
var parser = require('xml2json');
fs.readFile(__dirname + '/index.xml', function(err, data) {
var json=parser.toJson(data);
console.log(json);
    
write1.write(json);

write1.end();
write1.on('finish', function(){
    console.log('Data Copied ');});
write1.on('error', function(err){
    console.log(err.stack);
});
});
    
    console.log('Done');
    


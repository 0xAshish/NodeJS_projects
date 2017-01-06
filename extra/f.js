var fs = require('fs');
var writes = fs.createWriteStream('a.txt');
var reads = fs.createReadStream('index.xml');
var reads2 = fs.createReadStream('index.xml');var data = new Buffer(256);
var p=require('xml2js');
var parser =new p.Parser();
data.fill(0);

reads.on('data', function(chunk){
    data+=chunk;
});
var x = data.length;
data.slice(0,x);
reads.on('error', function(err){
    console.log(err.stack);
});//Data Write to output file


data.fill(0);

reads2.on('data', function(chunk){
    data+=chunk;
});var x = data.length;
data.slice(0,x);
reads2.on('end', function(){
    console.log(data);
//var buf=new Buffer(data);
parser.parseString(data,(err,result)=>{
console.dir(result);

});
/*writes.write(data, 'UTF8');

writes.end();
writes.on('finish', function(){
    console.log('Data Copied to other File!');
    console.log('\nData Write to Output File terminated\n');});
writes.on('error', function(err){
    console.log(err.stack);
});*/
 console.log('\nData Read terminated from Output File\n');
});
reads2.on('error', function(err){
    console.log(err.stack);
});

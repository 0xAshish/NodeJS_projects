console.time("getting data");
var fs=require('fs');
var rs=fs.createReadStream('x.txt');
var ws=fs.createWriteStream('a.txt');
rs.pipe(ws);
console.log('end');
console.timeEnd("getting data");

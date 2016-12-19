var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('a.txt').pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('input.txt.gz'));
  
   
console.log("File Compressed.");

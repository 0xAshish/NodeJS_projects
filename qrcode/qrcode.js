'use strict'
const qr=require('qr-image');
const fs=require('fs');
let dataToConvert=process.argv[2];
let outPut=process.argv[3]||null;
if(dataToConvert!==null&&outPut!==null){
qr.image(dataToConvert,{type:'png',size:20})
.pipe(fs.createWriteStream(outPut));
console.log("QR code file %s generated",outPut)
}

var fs=require('fs');
fs.readFile('a.txt',(err,data)=>{
if(err){
console.log(err.stack);}
console.log(data.toString())
});
console.log("huh");

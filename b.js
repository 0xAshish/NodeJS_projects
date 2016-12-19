'use strict'
var fs=require("fs");

fs.readFile("a.txt",(err,data)=>{
	if(err) return console.error(err);
	console.log(data.toString());
});


console.log("huh");
console.log(26666+2254561);

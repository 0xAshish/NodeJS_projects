var exec=require("child_process").exec;
var execF=require("child_process").execFile;

  var cmd="gcc a.c -o code";
       exec(cmd,(err,stdout,stderr)=>{
           if(!stderr){
           console.log("output:");
            cmd ="./code"
       var child=execF(cmd,null,(err,stdout,stderr)=>{
	if(stdout){               
	console.log(stdout);
           }
	child.on('close', function(code) {
    	console.log('closing code: ' + code);
		})
if(err!=null){
console.log("errorrrrrr"+err);
}
       })
        }else{
               console.log(stderr);
           }
       })

 

var events =require ('events');
var eventEmitter =new events.EventEmitter();

var connectHandler=function connected(){
console.log('connection succesful.');
//eventEmitter.emit('data_received');
}

eventEmitter.on('connection',connectHandler);

eventEmitter.on('data_received',()=>{
console.log("data recived ");
eventEmitter.emit('connection');
});


eventEmitter.emit('data_received');

console.log("program ended");

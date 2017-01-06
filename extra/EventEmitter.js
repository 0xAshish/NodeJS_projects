'use strict'
var events = require('events');
var eventEmitter = new events.EventEmitter();
var fs = require('fs');
var rs = fs.createReadStream('x.txt');
var data = '';
var writerStream = fs.createWriteStream('a.txt');
eventEmitter.on('data_read', function () {
    rs.setEncoding('UTF8');
    rs.on('data', (chunk) => {
        data += chunk;
    });
    rs.on('end', () => {
        eventEmitter.emit('data_write'); 
        console.log(data);

    });
    rs.on('error', (error) => { 
        console.log(error.stack);
    });
});

eventEmitter.on('data_write', function () {
    writerStream.write(data, 'UTF8');
    writerStream.end();

    writerStream.on('finish', () => {
        console.log('write Complete');
    });

    writerStream.on('error', (error) => {
        console.log(error.stack);
    });

});

eventEmitter.emit('data_read');
console.log("end of code");

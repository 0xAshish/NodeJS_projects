const speedTest = require('speedtest-net');
const notifier = require('node-notifier');

const test = speedTest({maxTime: 5000});

test.on('data', data => {
  console.dir(data);
  notifier.notify({
  'title': 'Your Internet speed',
  'message': 'UP:'+round(data.speeds.upload)+'Down'+round(data.speeds.download)
});

});

function round(number)  { return parseFloat(number).toPrecision(4) }

test.on('error', err => {
  console.error(err);
});

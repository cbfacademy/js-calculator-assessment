var Mocha = require('mocha');
var mocha = new Mocha({});

// a 'coderbyte-tests' folder is required for unit tests to properly run on our platform
mocha.addFile('./src/coderbyte-tests/test.js');

mocha.run()
  .on('test', function(test) {
    console.log('Test started: ' + test.title);
  })
  .on('test end', function(test) {
    console.log('Test complete: ' + test.title);
  })
  .on('pass', function(test) {
    console.log('Test passed');
  })
  .on('fail', function(test, err) {
    console.log('Test fail');
  })
  .on('end', function() {
    console.log('All done');
  });
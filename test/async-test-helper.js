module.exports = function(done, testToRun) {
  setTimeout(function() {
    try {
      testToRun();
      done();
    } catch(e) {
      console.log('caught error!');
      done(e);
    }
  }, 100);
}

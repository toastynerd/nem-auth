module.exports = function(app) {
  app.post('/signup', function(req, res, next) {
    res.send('hello world, the future site of some auth magic');
    return next();
  });

  app.get('/signin', function(req, res ,next) {
    res.send('hello world, the future site of some auth magic');
    return next();
  });
} 

function clear_cookie(req, res) {
  console.log("Clearing all cookies.")
  for (cookie in req.cookies) {
    if (req.cookies.hasOwnProperty(cookie)) {
      res.clearCookie(cookie);
    }
  }
}

module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      clear_cookie(req, res);
      res.render('index');
    });

    app.get('/index', function (req, res) {
      clear_cookie(req, res);
      res.render('index');
    });


    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });
  }
};

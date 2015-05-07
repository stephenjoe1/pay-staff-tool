function clear_session(req) {
  console.log("Clearing the session.")
  delete req.session
}

module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      clear_session(req);
      res.render('index');
    });

    app.get('/index', function (req, res) {
      clear_session(req);
      res.render('index');
    });


    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });


    app.post('/start-flow', function(req, res) {
      res.redirect('/service-before');
    });
    // add your routes here

  }
};

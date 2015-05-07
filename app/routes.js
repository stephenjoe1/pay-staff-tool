module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      console.log("Clearing the session.")
      delete req.session
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

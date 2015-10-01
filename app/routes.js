var defaults = require(__dirname + '/defaults.js'),
    merge = require('merge');

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

    app.get('/borchester-home', function (req, res) {
      clear_cookie(req, res);
      res.render('borchester-home');
    });


    app.get('/index', function (req, res) {
      clear_cookie(req, res);
      res.render('index');
    });

    app.get('/borchester-permit-debit-card-payment', function(req, res) {
      var newReviewCount =  parseInt(req.query.error) + 1 || 1;

      var nextUrl;
      var authFailure = true;
      if ( newReviewCount == 1) {
        authFailure = false;
        nextUrl = '/borchester-permit-debit-card-payment?error=' + newReviewCount
      } else if ( newReviewCount <= 3) {
        nextUrl = '/borchester-permit-debit-card-payment?error=' + newReviewCount
      } else {
        nextUrl = '/borchester-permit-card-payment-3-errors'
      }

      res.render('borchester-permit-debit-card-payment', merge(true, defaults, req.cookies, {nextUrl: nextUrl, authFailure: authFailure}), function(err, html) {

        if (err) {
          console.log(err);
          res.send(404);
        } else {
          res.end(html);
        }
      });
    });


    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });
  }
};

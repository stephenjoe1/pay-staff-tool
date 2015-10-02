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

    function trimmed(str) {
      return (str || "").trim();
    }

    function squashed(str) {
      return (str || "").replace(/\s/g, "");
    }


    function validateCardDetails(req, res, errorView) {
      var errors = {};

      if (squashed(req.body['card-number']) !== "4111123456781111") {
        errors["error-card-number"] = true;
      }

      if (trimmed(req.body['full-name']) === "") {
        errors["error-full-name"] = true;
      }
      if (squashed(req.body['exp-month']) !== "03" && squashed(req.body['exp-month']) !== "3") {
        errors["error-expiry-date"] = true;
      }
      if (squashed(req.body['exp-year']) !== "18") {
        errors["error-expiry-date"] = true;
      }
      if (squashed(req.body['security-number']) !== "123") {
        errors["error-csc"] = true;
      }
      if (trimmed(req.body['building-and-street-1']) === "") {
        errors["error-billing-address"] = true;
      }
      if (trimmed(req.body['town-or-city']) === "") {
        errors["error-billing-address"] = true;
      }
      if (trimmed(req.body['postcode']) === "") {
        errors["error-billing-address"] = true;
      }
      console.log(errors);
      if (Object.keys(errors).length > 0) {
        res.render(errorView, merge(true, req.body, errors));
        return false;
      }
      return true ;
    }

    app.post('/borchester-permit-debit-card-payment', function(req, res) {
      if (!validateCardDetails(req, res, 'borchester-permit-debit-card-payment')) {
        return;
      }
      res.redirect(req.originalUrl);
    });

    app.post('/borchester-penalty-debit-card-payment-review', function(req, res) {
      if (!validateCardDetails(req, res, 'borchester-penalty-debit-card-payment')) {
        return;
      }
      res.redirect(req.originalUrl);
    });

    app.post('/borchester-council-tax-debit-card-payment-review', function(req, res) {
      if (!validateCardDetails(req, res, 'borchester-council-tax-debit-card-payment')) {
        return;
      }
      res.redirect(req.originalUrl);
    });

    app.post('/borchester-penalty-debit-card-provider-down', function(req, res) {
      if (!validateCardDetails(req, res, 'borchester-penalty-debit-card-failing-payment')) {
        return;
      }
      res.redirect(req.originalUrl);
    });

    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });
  }
};

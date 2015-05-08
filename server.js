var path = require('path'),
    express = require('express'),
    session = require('express-session')
    merge = require('merge'),
    routes = require(__dirname + '/app/routes.js'),
    form_to_session = require(__dirname + '/lib/form_to_session.js'),
    helpers = require(__dirname + '/lib/helpers'),
    app = express(),
    port = (process.env.PORT || 3000)
    Hogan = require('hogan.js')

// Grab environment variables specified in Procfile or as Heroku config vars
    username = process.env.USERNAME,
    password = process.env.PASSWORD,
    env = process.env.NODE_ENV || 'development',
    defaults = {};

// Authenticate against the environment-provided credentials, if running
// the app in production (Heroku, effectively)
if (env === 'production') {
  if (!username || !password) {
    console.log('Username or password is not set, exiting.');
    process.exit(1);
  }
  app.use(express.basicAuth(username, password));
}

// Application settings
app.engine('html', require(__dirname + '/lib/template-engine.js').__express);
app.set('view engine', 'html');
app.set('vendorViews', __dirname + '/govuk_modules/govuk_template/views/layouts');
app.set('views', __dirname + '/app/views');

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));

app.use(express.favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images','favicon.ico')));

// Register view helpers.
app.locals(helpers);

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals({'assetPath': '/public/'});
  next();
});

app.use(express.urlencoded());

// Set up the session

var session_options = {
  secret: 'uZyJIxbeJRTDaNK3',
  cookie: {},
  unset: 'destroy'
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies in prod
}

app.use(session(session_options));
app.use(form_to_session());

// routes (found in app/routes.js)

routes.bind(app);

// DEFAULT values:
defaults.amount = 2500;
defaults.flow = "Volcano insurance";

// auto render any view that exists

app.get(/^\/([^.]+)$/, function (req, res) {

	var path = (req.params[0]);

	res.render(path, merge(true, defaults, req.session), function(err, html) {
		if (err) {
			console.log(err);
			res.send(404);
		} else {
			res.end(html);
		}
	});

});

app.post(/^\/([^.]+)$/, function (req, res) {
	var path = (req.params[0]);
  res.redirect(path);
});


// start the app

app.listen(port);
console.log('');
console.log('Listening moop on port ' + port);
console.log('');

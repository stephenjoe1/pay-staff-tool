var merge = require('merge'),
    util = require('util')

module.exports = function() {
  return function(req, res, next) {
    if (req.method=="POST") {
      console.log("Automatically adding " + util.inspect(req.body) + " to the session.")
      merge(req.session, req.body);
    }
    next();
  }
}

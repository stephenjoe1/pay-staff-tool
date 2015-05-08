var util = require('util')

module.exports = function() {
  return function(req, res, next) {
    if (req.method=="POST") {
      console.log("Automatically adding " + util.inspect(req.body) + " to the cookies.")
      for (key in req.body) {
        res.cookie(key, req.body[key]);
      }
    }
    next();
  }
}

var util = require('util')

module.exports = function(presenters) {
  return function(req, res, next) {
    if (req.method=="POST") {
      console.log("Automatically adding " + util.inspect(req.body) + " to the cookies.")
      for (key in req.body) {
        if (req.body.hasOwnProperty(key) && req.body[key]) {
          var raw_value = req.body[key]
          var value = presenters[key] ? presenters[key](raw_value) : raw_value
          console.log(key + ", " + presenters[key] + ", " + value)
          res.cookie(key, value);
        }
      }
    }
    next();
  }
}

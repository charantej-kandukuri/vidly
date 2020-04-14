const { expressExceptionsLogger } = require("../loggers/loggers");

module.exports = function (err, req, res, next) {
  expressExceptionsLogger.error(err.message, err);
  res.status(500).send("Somthing wrong.");
};

// ALL EXAMPLES
// https://github.com/jstevenperry/IBM-Developer/tree/master/Node.js/Course/Unit-10

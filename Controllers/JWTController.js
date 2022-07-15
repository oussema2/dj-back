const jsonwebtoken = require("jsonwebtoken");

exports.JWTChecker = (req, res, next) => {
  if (req.headers && req.headers.authorization.split(" ")[0] === "Bearer") {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        console.log(decode);
        if (err) req.dj = undefined;
        req.dj = decode;
        next();
      }
    );
  } else {
    req.doctor = undefined;

    next();
  }
};

const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let accessToken = req.cookies.jwt;
  console.log("hello");
  //if there is no token in the cookies, request is unauthorized
  if (!accessToken) {
    return res.status(403).json({
      error: "Pas authorisé !",
    });
  }

  let payload;
  try {
    //verify the token jwt.verify
    //throw an error if token has expired or has an invalid signature
    payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req._id = payload._id;

    next();
  } catch (e) {
    //return req unauthorized error
    return res.status(403).json({
      error: "Non authorisé !",
    });
  }
};

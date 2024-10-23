const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const excludedRoutes = ["/api/appointments/:id/files/:filename"];
  console.log(req.path);

  const isExcluded = excludedRoutes.some((route) => {
    const regex = new RegExp(route.replace(/:[^\s/]+/g, "([^/]+)"));
    return regex.test(req.path);
  });

  if (isExcluded) {
    return next();
  }

  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

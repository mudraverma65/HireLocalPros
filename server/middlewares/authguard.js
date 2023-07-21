const jwt = require("jsonwebtoken");

const authGuard = async (req, res, next) => {
  const token =
    req.headers?.authorization || req.query?.token || req.cookies?.AccessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized.", loginNeeded: true });
  }
  try {
    const decoded = jwt.verify(token, "localservicemarketplace");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid Token.", loginNeeded: true });
  }
};

module.exports = authGuard;

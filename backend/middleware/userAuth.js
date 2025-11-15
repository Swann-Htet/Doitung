const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  // Check for token in cookies first
  let token = req.cookies?.token;
  
  // If no token in cookies, check Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = userAuth;

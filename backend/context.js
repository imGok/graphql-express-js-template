const jwt = require("jsonwebtoken");

const context = ({ req }) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return undefined;

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return {
      loggedInUser: decoded.username,
    };
  } catch (error) {
    throw new Error("You're not logged in!");
  }
};

module.exports = context;

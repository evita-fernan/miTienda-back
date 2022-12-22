const { decodeToken } = require("../helper/generateToken");
const { User } = require("../database/models");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const auth = await req.headers["authorization"];
    if (!auth) throw new Error("Token do not exist", 404);
    const token = auth.split(" ")[1];
    const decoded = decodeToken(token);
    const user = await User.findByPk(decoded.id);
    if (decoded.id === user.id || decoded.role === "admin") {
      return next();
    } else {
      throw new Error("Not authorizated", 403);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = checkRoleAuth;

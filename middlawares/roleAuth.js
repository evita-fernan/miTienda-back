const { verifyToken } = require("../utils/generateToken");
const { User } = require("../models");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("SOY EL TOKEN DE CHECKAUTHROLE", token);
    const tokenData = await verifyToken(token);
    if (!tokenData.id) {
      return res.status(401).json({ error: "Usted no está autorizado" });
    }
    const user = await User.findOne({ where: { id: tokenData.id } });
    if ([].concat(roles).includes(user.role)) {
      next();
    } else {
      return res.status(401).json({ error: "Usted no está autorizado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = checkRoleAuth;

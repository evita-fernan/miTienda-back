const { decodeToken, verifyToken } = require("../helper/generateToken");
const { User } = require("../database/models");

const authentication = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) throw new Error("Token do not exist", 404);
    const token = auth.split(" ")[1];
    const decoded = decodeToken(token);
    const verified = verifyToken(token);
    const { id } = decoded;
    const user = await User.findByPk(id, { raw: true });
    if (!user || !verified) throw new Error("Invalid token", 403);
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = authentication;

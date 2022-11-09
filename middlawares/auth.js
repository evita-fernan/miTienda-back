const { verifyToken } = require("../utils/generateToken");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("SOY EL TOKEN DE CHECKAUTH", token);
    const tokenData = await verifyToken(token);
    if (!tokenData.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = checkAuth;

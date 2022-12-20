const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  tokenSign: (user) => {
    return jwt.sign({ id: user.id, role: user.role }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });
  },
  decodeToken: (token) => {
    const decoded = jwt.decode(token);
    if (!decoded) throw new Error("Invalid token", 400);
    return decoded;
  },
  //Se verifica si el token ha sido generado por nosotros
  verifyToken: (token) => {
    return jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (decoded) return true;
      return false;
    });
  },
};

const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const tokenSign = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, authConfig.secret, {
    expiresIn: authConfig.expires,
  });
};

//Se verifica si el token ha sido generado por nosotros
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, authConfig.secret);
  } catch {
    (error) => {
      return null;
    };
  }
};

module.exports = { tokenSign, verifyToken };

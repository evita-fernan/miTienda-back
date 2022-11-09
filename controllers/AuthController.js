const User = require("../models/User");
const bcrypt = require("bcrypt");
const { tokenSign } = require("../utils/generateToken");
const {
  sendEmailResetPassword,
  sendEmailRegister,
  sendEmailPassSuccessfully
} = require("../utils/sendEmail");
require("dotenv").config();

module.exports = {
  //Registar un usuario
  register: async (req, res) => {
    //Contraseña encriptada
    const password = bcrypt.hashSync(req.body.password, 10);
    const { fName, lName, dni, email } = req.body;
    //Crear usuario
    try {
      const user = await User.create({
        fName,
        lName,
        dni,
        email,
        password,
      });
      sendEmailRegister(user);
      res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Loguear un usuario
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const token = tokenSign(user);
        res
          .status(200)
          .json({ fName: user.fName, email: user.email, token: token });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Recuperar una contraseña por medio de un link
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      console.log("SOY USER DE FORGOT", user);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
      const token = tokenSign(user);
      console.log("SOY TOKEN DE FORGOT", token);
      sendEmailResetPassword(user, token);
      res.status(200).json({ msg: "Email enviado exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  
  //Cambiar la contraseña
  newPassword: async (req, res) => {
    const { email, newPassword, repeatNewPassword } = req.body;
    if (newPassword != repeatNewPassword) {
      res.status(403).json({ msg: "Las contraseñas no coinciden" });
    }
    try {
      const user = await User.findOne({ where: { email: email } });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      const userUpdated = await User.update(
        { password: newPasswordHash },
        { where: { email: email } }
      );
      sendEmailPassSuccessfully(user)
      res.status(200).json({ msg: "Contraseña actualizada exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

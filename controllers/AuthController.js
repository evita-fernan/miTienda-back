const { User } = require("../database/models");
const bcrypt = require("bcrypt");
const { tokenSign } = require("../helper/generateToken");
const {
  sendEmailResetPassword,
  sendEmailRegister,
  sendEmailPassSuccessfully,
} = require("../helper/sendEmail");
require("dotenv").config();

module.exports = {
  //Registar un usuario
  register: async (req, res) => {
    //Contraseña encriptada
    const password = bcrypt.hashSync(req.body.password, 10);
    //Crear usuario
    const { firstName, lastName, email, role } = req.body;
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      console.log(user);
      sendEmailRegister(user);
      res.status(201).json({ user });
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
        return res.status(404).json({ error: "User not found" });
      }
      console.log("SOY PASSWORD puesta en login", password);
      console.log("SOY PASSWORD guardada", user.password);
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Password incorrect" });
      }
      const token = tokenSign(user);
      res
        .status(200)
        .json({ fName: user.fName, email: user.email, token: token });
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
        return res.status(404).json({ msg: "User not found" });
      }
      const token = tokenSign(user);
      console.log("SOY TOKEN DE FORGOT", token);
      sendEmailResetPassword(user, token);
      res.status(200).json({ msg: "Email sent successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Cambiar la contraseña
  newPassword: async (req, res) => {
    const { email, newPassword, repeatNewPassword } = req.body;
    if (newPassword != repeatNewPassword) {
      res.status(403).json({ msg: "Passwords do not match" });
    }
    try {
      const user = await User.findOne({ where: { email: email } });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      await User.update(
        { password: newPasswordHash },
        { where: { email: email } }
      );
      sendEmailPassSuccessfully(user);
      res.status(200).json({ msg: "Password update successful" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

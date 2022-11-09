const transport = require("../config/emailer");
const {
  htmlTemplateReset,
  htmlTemplateRegister,
  htmlTemplatePassSuccessfully,
} = require("../config/html");

const sendEmailRegister = (user) => async (req, res) => {
  const info = {
    from: "info@mitienda.com",
    to: `${user.email}`,
    subject: `Hola ${user.fName[0].toUpperCase()}${user.fName.substring(
      1
    )}, bienvenid@ a miTienda`,
    text: "Muchas gracias por utilizar nuestro servicio",
    html: htmlTemplateRegister(user),
  };
  transport.sendMail(info, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ msg: "El correo fue enviado exitosamente" });
    }
  });
};

const sendEmailResetPassword = (user, token) => {
  const info = {
    from: "info@mitienda.com",
    to: `${user.email}`,
    subject: `Hola ${user.fName[0].toUpperCase()}${user.fName.substring(
      1
    )}, bienvenid@ a miTienda`,
    text: "Muchas gracias por utilizar nuestro servicio",
    html: htmlTemplateReset(token),
  };

  transport.sendMail(info, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ msg: "El correo fue enviado exitosamente" });
    }
  });
};

const sendEmailPassSuccessfully = (user) => {
  const info = {
    from: "info@mitienda.com",
    to: `${user.email}`,
    subject: `Hola ${user.fName[0].toUpperCase()}${user.fName.substring(
      1
    )}, bienvenid@ a miTienda`,
    text: "Muchas gracias por utilizar nuestro servicio",
    html: htmlTemplatePassSuccessfully,
  };

  transport.sendMail(info, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ msg: "El correo fue enviado exitosamente" });
    }
  });
};

module.exports = {
  sendEmailResetPassword,
  sendEmailRegister,
  sendEmailPassSuccessfully,
};

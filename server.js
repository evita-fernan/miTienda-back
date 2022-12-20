const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const models = require("./database/models");
const routes = require("./routes/index.js");

//Leer las variables de entorno
require("dotenv").config();

//Permiso cors
app.use(cors());

//Capturar el body - middlaware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Importación de las rutas
app.use("/api", routes);

//Middlaware
app.use(morgan("tiny"));

//Variables invocadas
const PORT = process.env.PORT || 3000;

//Conexión a la base de datos

app.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}`);
});

const express = require("express")
const app = express()
const db= require("./config/db")
const morgan = require("morgan")
const cors = require ("cors")
const bodyParser = require("body-parser")
const models = require("./models/index.js")
const routes = require("./routes/index.js")

//Leer las variables de entorno
require("dotenv").config()

//Capturar el body - middlaware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Permiso cors
app.use(cors())

//Importación de las rutas
app.use("/api", routes)

//Middlaware
app.use(morgan("tiny"))

//Variables invocadas
const PORT = process.env.PORT || 3000

//Conexión a la base de datos
db.sync({ force: false}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Corriendo en el puerto ${PORT}`);
    })
})
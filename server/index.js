const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());

//puerto
const PORT = process.env.PORT || 5500;

// Cors

app.use(cors());

// Importar rutas
const TodoItemRoute = require('./routes/todoItems');


// Conexion a MongoDB
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Base de datos conectada"))
.catch(err => console.log(err))

app.use('/', TodoItemRoute);

// Agregar puerto y conectar
app.listen(PORT, ()=> console.log("Servidor conectado"));
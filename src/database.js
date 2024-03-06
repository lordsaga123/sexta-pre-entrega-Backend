const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://luisjaimevaz:Oliver2017@cluster0.qhzsnxj.mongodb.net/e-commerce?retryWrites=true&w=majority")
.then(()=> console.log("Conectado a la Base de Datos E-Commerce"))
.catch(()=> console.log("Error al conectarse a la base de Datos E-Commerce"))
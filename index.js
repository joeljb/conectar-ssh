
const express  		= require('express');
const app         = express();
const serveStatic = require('serve-static');
const server      = require('http').Server(app);

var prueba = require("./prueba_conexion")


app.get('/',async (req,res)=>{
	var datosConexion = {
		host:"host",
		user:"user",
		password:"password"
	}
	var conexion = await prueba.conectar(datosConexion)
	var datos = await prueba.ejecutar(conexion,"ls /home")
	console.log(datos)
	return res.json({datos})
});


server.listen(3000,()=>{
	console.log('Corriendo en el puerto: '+3000);
});



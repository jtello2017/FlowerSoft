var amqp = require('amqplib/callback_api');

exports.insert= function (producto){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha ingresado "+producto;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}

exports.update= function (producto){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha actualizado "+producto;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}


exports.delete= function (id){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha eliminado el producto "+ id;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}

exports.vaciar_carro= function (id_usuario){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha vaciado el carro del usuario"+ id_usuario;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}

exports.delete_carro= function (id_usuario, id_producto){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha eliminado el producto" +id_producto+"del usuario"+ id_usuario;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}

exports.insert_carro= function (id_producto, nombre_producto){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha ingresado "+nombre_producto+"con id"+id_producto+ "al carro";

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}

exports.update_carro= function (producto, id){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'peticiones';
	    var msg = process.argv.slice(2).join(' ') || "Se ha actualizado "+producto+ "con id"+ id;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}

exports.new_user= function (req, res, next){
	//id, rut, nombre,apellido, rol, password
	id=req.body.id;
	rut=req.body.rut;
	nombre=req.body.nombre;
	apellido=req.body.apellido;
	rol=req.body.rol;
	password=req.body.password;
	
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var q = 'usuarios';
	    var msg = process.argv.slice(2).join(' ') || "Se ha agregado un nuevo usuario con "+ id + rut+ nombre+ apellido+ rol+ password;

	    ch.assertQueue(q, {durable: true});
	    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	    console.log(" [x] Sent '%s'", msg);
	  });
	  setTimeout(function() { conn.close(); process.exit(0) }, 500);
	});
}
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
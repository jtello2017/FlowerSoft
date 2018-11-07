var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	//Rosa debe poblar esta vista con los productos
  res.render('dashboard', { title: 'Dashboard' });
});


router.get('/pedidos/', function(req, res, next){
	request('http://localhost:8080/pedidos/', function(error, response, body) {
		var pedidos = JSON.parse(body);
        res.render('pedidos', {title: 'Lista de pedidos', pedidos: pedidos.data});
    });
	//res.render('inicio', {title: 'Inicio', pedidos: array.data});
});

router.get('/pedido/delete/:id', function(req, res, next){
	var id = req.params.id;
	request.delete('http://localhost:8080/pedidos/'+id, 
		function optionalCallback(err, httpResponse, body){
			if (err) {
    		return console.error('Delete failed:', err);
  			}
  			console.log('Delete successful!  Server responded with:', body);	
		}
	);
	res.redirect('/dashboard/pedidos');
}); //Funcionando

router.get('/pedido/edit/:id', function(req, res, next){
	var id = req.params.id;
	request('http://localhost:8080/pedidos/'+id, function(error, response, body) {
		var pedido = JSON.parse(body);
        res.render('edit_pedido', {pedido: pedido.data});
    });
});

router.post('/pedido/update', function(req, res, next){
	var id = req.body.id;
	var detalle = req.body.detalle;
	var fecha = req.body.fecha;
	var total = req.body.total;
	var id_cliente = req.body.id_cliente;
	var cliente = req.body.cliente;

	request.put('http://localhost:8080/pedidos/'+id).form({"total" : total, "detalle":detalle, "fecha" :fecha, "cliente" : cliente}), 
	function optionalCallback(err, httpResponse, body) {
  		if (err) {
    		return console.error('upload failed:', err);
  		}
  		console.log('Upload successful!  Server responded with:', body);
	};
	res.redirect('/dashboard/pedidos');
})

router.get('/crearPedido', function(req, res, next) {
	//Rosa debe poblar esta vista con los productos
  res.render('crear_pedido', { title: 'Crear Pedido' });
});

router.post('/crearPedido', function(req, res, next){
	var total = req.body.total;
	var id_cliente = req.body.id_cliente;
	var cliente = req.body.cliente;
	var detalle = req.body.detalle;
	var fecha = req.body.fecha;
	request.post('http://localhost:8080/pedidos/').form({"total":total, "detalle":detalle, "fecha" :fecha, "ID_CLIENTE" : id_cliente, "nombre_cliente" : cliente}), 
	function optionalCallback(err, httpResponse, body) {
  		if (err) {
    		return console.error('upload failed:', err);
  		}
  		console.log('Upload successful!  Server responded with:', body);
	};
	res.redirect('/dashboard/pedidos');
});


module.exports = router;
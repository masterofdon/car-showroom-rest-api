var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

app.use(bodyParser.json());

Car = require("./node_modules/cars");
Showroom = require("./node_modules/showrooms")
// Connect to mongoose

mongoose.connect('mongodb://localhost/carshowroom');

var db = mongoose.connection;

app.get('/',function(req,res){
	res.send("Hello World!");
});

app.get('/api/cars',function(req,res){
	Car.getCars(function(err,cars){
		if(err){
			throw err;
		}
		res.json(cars);
	});
});

app.get('/api/showrooms',function(req,res){
	Showroom.getShowrooms(function(err,showrooms){
		if(err){
			throw err;
		}
		res.json(showrooms);
	});
});

app.get('/api/cars/:_id',function(req,res){
	Car.getCarById(req.params._id,function(err,car){
		if(err){
			throw err;
		}
		res.json(car);
	});
});

app.get('/api/showrooms/:_id',function(req,res){
	Showroom.getShowroomById(req.params._id,function(err,showroom){
		if(err){
			throw err;
		}
		res.json(showroom);
	});
});



app.post('/api/showrooms',function(req,res){
	var showroom = req.body;
	Showroom.addShowroom(showroom,function(err,showroom){
		if(err){
			throw err;
		}
		res.json(showroom);
	});
});

app.post('/api/showrooms/:_id/cars',function(req,res){
	var car = req.body;
	Showroom.addCarToShowroom(req.params._id,car,function(err,showroom){
		if(err){
			throw err;
		}
		res.json(showroom);
	});
});

app.put('/api/showrooms/:_id',function(req,res){
	var incShowroom = req.body;
	Showroom.updateShowroom(req.params._id,incShowroom,function(err,showroom){
		if(err){
			throw err;
		}
		res.json(showroom);
	});
});



app.listen(3333);

console.log("Running on port 3333");
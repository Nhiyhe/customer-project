 var express = require('express');
 var _ = require('underscore');
 var bodyParser = require('body-parser');
 var app = express();
 
 var db = require('./db');

app.use(bodyParser.json());
 
 var port = process.env.PORT || 3000;
 var customers = [{id:1,name:'James', lastname:'Scott'},{id:2,name:'Rob',lastname:'Hunter'},{id:3,name:'Peter',lastname:'Simon'}];
 var customerid = 4;
 app.get('/',function(req,res){
	 res.send('Welcome to Customer API Home Page!!!');
 });
 
 app.get('/customers',function(req,res){
	 var predicate = {}
	 var query = req.query;
	 if(query.hasOwnProperty('q') && query.q.trim().length > 0){
		 predicate.name = {
			$like: '%'+ query.q + '%'
		 }	
	 };
	 
	 if(query.hasOwnProperty('lastname') && query.lastname.trim().length > 0){
		  predicate.lastname = {
			  $like: '%'+ query.lastname + '%'
		  }
     };
	 
	db.customer.findAll({where: predicate}).then(function(cust){
		res.json(cust);
	},function(error){
		res.status(500).send();
	});
 });
 
 app.get('/customers/:id',function(req,res){
	 
	var passedId = parseInt(req.params.id,10);
		db.customer.findById(passedId).then(function(customer){
			if(!!customer){
				res.json(customer.toJSON())
			}else{
				res.status(404).json({"Error":"Item Not Found"});
			}
		},function(error){
			res.status(500).send();
		});
	
 });
 
 app.post('/customers', function(req,res){
	 
	 var body = req.body;
	 body = _.pick(body,'name','lastname');
	 
	if(!_.isString(body.name) || !_.isString(body.lastname) || body.name.trim() === 0 || body.lastname.trim() === 0){
		return res.status(400).send();
	};	 
			
	db.customer.create(body).then(function(cust){
		res.json(cust.toJSON());
	},function(e){
		res.status(400).json(e.toJSON());
	});
 });
 
 app.delete('/customers/:id',function(req, res){
	  
	 var customerToDeleteID = parseInt(req.params.id, 10);
	 db.customer.destroy({where:{id:customerToDeleteID}}).then(function(custCount){
		 if(custCount === 0){
			 res.status(404).json({"Error":"Item Not Found"});
		 }else{
			 res.status(204).send()
		 }
		 
	 },function(error){
		res.status(500).send(); 
	 });
 });
 
 app.put('/customers/:id',function(req,res){
	var customerId =  parseInt(req.params.id,10);
	var customerObj =_.findWhere(customers,{id:customerId});
	var body = req.body;
	body = _.pick(body,'name','lastname');
	var validAttributes ={};
	if(!customerObj){
		return res.status(404).send();
	}
	 if(body.hasOwnProperty('name') && _.isString(body.name) && body.name.trim().length !== 0){
		 validAttributes.name = body.name;
	 }else if(body.hasOwnProperty('name')){
		 return res.status(400).send();
	 }
	 
	 if(body.hasOwnProperty('lastname') && _.isString(body.lastname) && body.lastname.trim().length !== 0){
		 validAttributes.lastname = body.lastname;
	 }else if(body.hasOwnProperty('lastname')){
		 return res.status(400).send();
	 }
	 
	 _.extend(customerObj,validAttributes);
	 res.json(customerObj);
 });
 
 
 db.sequelize.sync().then(function(){
		app.listen(port,function(){
		console.log('Server is running on port ' + port);
	});
 });



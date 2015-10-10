 var express = require('express');
 var _ = require('underscore');
 var bodyParser =require('body-parser');
 var app = express();

app.use(bodyParser.json());
 
 var port = process.env.PORT || 3000;
 var customers = [{id:1,name:'James', lastname:'Scott'},{id:2,name:'Rob',lastname:'Hunter'},{id:3,name:'Peter',lastname:'Simon'}];
 var customerid = 4;
 app.get('/',function(req,res){
	 res.send('Welcome to Customer API Home Page!!!');
 });
 
 app.get('/customers',function(req,res){
	res.json(customers); 
 });
 
 app.get('/customers/:id',function(req,res){
	 var matchedItem;
	var passedId = parseInt(req.params.id,10);
	/*customers.forEach(function(item){
		if(passedId == item.id){
			matchedItem = item;
		}
	});*/
	
	matchedItem = _.findWhere(customers,{id:passedId});
	if(!matchedItem){
		return res.status(404).send();
	}else{
		res.json(matchedItem);
	}
	
 });
 
 app.post('/customers', function(req,res){
	  var body = req.body;
	 body = _.pick(body,'name','lastname');
	 
	if(!_.isString(body.name) || !_.isString(body.lastname) || body.name.trim() === 0 || body.lastname.trim() === 0){
		return res.status(400).send();
	}	 
	 body.id = customerid++;	
	 
	 customers.push(body);
	 res.json(body);
 });
 
 app.delete('/customers/:id',function(req, res){
	 var customerToDeleteID = parseInt(req.params.id, 10);
	 var customerToDelete = _.findWhere(customers,{id:customerToDeleteID});
	 if(!customerToDelete){
		 res.status(404).json({"Error:":"Customer not Found"});	
	 }else{
	 customers = _.without(customers,customerToDelete);
	 res.json(customerToDelete);
	 }
 });
 
 app.listen(port,function(){
	 console.log('Server is running on port ' + port);
 });
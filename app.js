 var express = require('express');
 
 var app = express();
 
 var port = process.env.PORT || 3000;
 var customers = [{id:1,name:'James', lastname:'Scott'},{id:2,name:'Rob',lastname:'Hunter'},{id:3,name:'Peter',lastname:'Simon'}];
 
 app.get('/',function(req,res){
	 res.send('Welcome to Customer API Home Page!!!');
 });
 
 app.get('/customers',function(req,res){
	res.json(customers); 
 });
 
 app.get('/customers/:id',function(req,res){
	 var matchedItem;
	var passedId = parseInt(req.params.id,10);
	customers.forEach(function(item){
		if(passedId == item.id){
			matchedItem = item;
		}
	});
	if(!matchedItem){
		return res.status(404).send();
	}else{
		res.json(matchedItem);
	}
	
 });
 
 
 app.listen(port,function(){
	 console.log('Server is running on port ' + port);
 });
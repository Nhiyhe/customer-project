module.exports = function(sequelize,dataTypes){
	return sequelize.define('customer',{
		name:{
			type:dataTypes.STRING,
			notEmpty:true
			
		},
		lastname:{
			type:dataTypes.STRING,
			notEmpty:true
		}
	})
}

db.customer.create(body).then(function(cus){
	res.json(cus.toJSON());
},function(error){
	res.status(404).send();
});

db.customer.findById(customerId).thne(function(customer){
	res.json(customer.toJSON());
},function(error){
	res.status(404).send();
});

db.customer.destroy()

db.customer.findAll().then(function(a){
	res.json(a);
},function(error){
	res.status(404).send();
})

db.customer.findById(customerId).then(function(customer){
	if(customer){
		customer.update().then(function(cus){
			res.json(cus);
		},function(error){
			res.status(400).send()
		})
	}else{
		res.status(404).send();
	}
},function(error){
	res.status(500).send();
})
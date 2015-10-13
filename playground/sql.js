var Sequilize = require('sequelize');
var sequilize = new Sequilize(undefined, undefined, undefined,{
	'dialect':'sqlite',
	'storage':'sqlite-database.sqlite'
});

var Customer = sequilize.define('customer',{
	name:{
		type:Sequilize.STRING,
		allowNull:false,
		validate:{
			notEmpty:true
			
		}
	},
	lastname:{
		type:Sequilize.STRING,
		allowNull:false
	}
})

sequilize.sync().then(function(){
	console.log('Everything is synced');
	
	Customer.create({
		name:'Funke',
		lastname:'Nubi'
	}).then(function(cust){
		console.log('Finished');
		console.log(cust);
	});
});
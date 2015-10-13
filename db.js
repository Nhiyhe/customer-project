var Sequelize = require('sequelize');

var sequelize = new Sequelize(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage': __dirname + '/data/customer-api.sqlite'
});


var customer = sequelize.import(__dirname + '/models/customer.js');
var sequelize = sequelize;
var Sequelize = Sequelize;


module.exports = {
	customer:customer,
	sequelize:sequelize,
	Sequelize:Sequelize	
}
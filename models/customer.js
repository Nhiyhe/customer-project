module.exports = function(sequelize, DataTypes){
	return sequelize.define('customer',{
	name:{
		type:DataTypes.STRING,
		allowNull:false,
		validate:{
			notEmpty:true
			
		}
	},
	lastname:{
		type:DataTypes.STRING,
		allowNull:false
	}
})
};
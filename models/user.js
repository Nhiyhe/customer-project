module.exports = function(sequelize, dataTypes){
	return sequelize.define('users',{
		email:{
			type:dataTypes.STRING,
			unique:true,
			allowNull:false,
			validate:{
				isEmail:true
			}
		},
		
		password:{
			type:dataTypes.STRING,
			allowNull:false,
			validate:{
				len:[7,100]
			}
		}
	})
};
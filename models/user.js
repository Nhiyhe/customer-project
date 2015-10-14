var bcrypt = require('bcryptjs');
var _ = require('underscore');

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
			type:dataTypes.VIRTUAL,
			allowNull:false,
			validate:{
				len:[7,100]
			},
			
			set:function(value){
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value,salt);
				this.setDataValue('password',value);
				this.setDataValue('salt',salt);
				this.setDataValue('password_hash',hashedPassword);
			}
		},
		salt:{
			type:dataTypes.STRING
		},
		
		password_hash:{
			type:dataTypes.STRING
		}
	},
	{
		hooks:{
			beforeValidate:function(user,option){
				if(typeof user.email === 'string'){
					user.email = user.email.toLowerCase();
				}
			}
		},
		instanceMethods:{
			toPublicJSON:function(){
				var json = this.toJSON();
				return _.pick(json,'email','updatedAt','createdAt');
			}
		}
	}
	)
};
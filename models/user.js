var bcrypt = require('bcryptjs');
var _ = require('underscore');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes){
	var user = sequelize.define('users',{
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
		classMethods:{
		authenticate:function(body){
			return new Promise(function(resolve,reject){
				if(typeof body.email !== 'string' || typeof body.password !== 'string'){
								return reject();
							}
							user.findOne({where:{
								email:body.email
							}}).then(function(user){
								if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
									reject();
								}else{
									resolve(user);
								}
							},function(error){
								return reject();
							})
				
			});
		}
		},
		instanceMethods:{
			toPublicJSON:function(){
				var json = this.toJSON();
				return _.pick(json,'email','updatedAt','createdAt');
			},
			generateToken:function(type){
				if(!_.isString(type)){
					return undefined;
				}
				try{
					var stringData = JSON.stringify({id:this.get('id'), type:type});
					var encryptedData = crypto.AES.encrypt(stringData,'pass12£$').toString();
					var token = jwt.sign({token:encryptedData},'jwt123@');
					return token;
				}catch(e){
					return undefined;
				}
				
			}
		}
	}
	)
	
	return user;
};
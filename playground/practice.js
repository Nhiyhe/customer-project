function getData(data){
	return new Promise(function(resolve,reject){
		if(typeof data === 'string'){
			resolve('Expected input accepted');
		}else{
			reject('Oops soemthing is wrong');
		}
		
	})
}

var a ='Hello';
var b = function(){
	console.log('Whats goin on here');
}
getData(b).then(function(data){
	console.log(data);
},function(error){
	console.log(error);
})
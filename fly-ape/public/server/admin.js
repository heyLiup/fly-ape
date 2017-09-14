
var MongoClient=require('mongodb').MongoClient;
var address="mongodb://localhost:27017/login";

var admin={
	login:function(req,res){
		var qstr="";
		req.addListener("data",function(dataPart){
			qstr+=dataPart;
		});
		req.addListener("end",function(){
			MongoClient.connect(address,function(err,db){
				if(err) return;
				var collection=db.collection('admin');
				var obj=JSON.parse(qstr);
				collection.find(obj).toArray(function(err,result){
					console.log(result);
					if(err) return;				
					if(result==""){
						res.write("0");
						db.close();
						res.end();
					}else{
						res.write("2");
						db.close();
						res.end();
					}
				})
			})
		})
	}
}
module.exports=admin;
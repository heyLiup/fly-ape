var key="userKey";
var client={
	save:function(item,newkey){
		key=newkey?newkey:key;
		window.localStorage.setItem(key,JSON.stringify(item));
	},
	fetch:function(newkey){
		key=newkey?newkey:key;
		console.log(key);
		return JSON.parse(window.localStorage.getItem(key)||'[]')
	},
	clear:function(){
		window.localStorage.clear();
	}
}
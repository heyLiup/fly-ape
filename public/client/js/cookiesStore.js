//设置cookie
var cookie = {
	//dayToLive 设置有效期（天数）
	//js的全局核心函数encodeURLComponent用于编码   decodeURIComponent 解码
	setCookie:function(name , value , dayToLive ){
		//监测cookies 是否启用
		//console.log(navigator.cookieEnabled);

		// var cookie =name +"="+encodeURIComponent(value);
		// var cookie=document.cookie;
		var cookie =name +"="+encodeURIComponent(value);
		if(typeof dayToLive==="number"){
			cookie+="; max-age="+(dayToLive*24*3600);
		}
		document.cookie=cookie;
		console.log(document.cookie);
	},

	//得到cookie 
	getCookie:function(){
		var cookie={}; //初始化最后要返回的对象
		var all=document.cookie;
		// console.log(all);
		if(all==="")
			 return cookie;
		var list=all.split("; " );  //分离出键值对
		for(var i=0;i<list.length;i++){
			var cookie=list[i];
			var p=cookie.indexOf("=");  //获取第一个等号的下标
			var name=cookie.substring(0,p);  //用substring截取字符
			var value=cookie.substring(p+1);
			value=decodeURIComponent(value);  //解码

			cookie[name]=value;
		}

		return cookie;
	},

	removecookie:function(){

	}

}
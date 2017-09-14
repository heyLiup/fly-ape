var login=Vue.extend({
	template:"#login",
	components:{err:err,toptitle:toptitle,alert:alert},
	data:function(){
		return {
			usename:"",
			isLogin:true, //判断用户是否登录
			password:"",
			toggle:true,   //切换登录或者注册
			code:"",  //验证码					
			isAdmin:true,  //用户登录或者管理员登录
			isAdminMsg:"用户/管理登陆",
			isAdminPop:"username",
			isAdminSend:"user", //发送用户登录或者管理员登录信息
			registFileds:{
				registName:"",
				registPassword:"",
				registRePassword:"",
				inputCode:"",
			},
			errMessage:[
				{nameErr:"用户名格式错误",reg:/\w{2,12}/,isFalse:false},
				{passwordErr:"密码格式错误",reg:/\w{4,12}/,isFalse:false},
				{reNameErr:"用户名大于2位小于12位",reg:/\w{2,12}/,isFalse:false},
				{rePassword:"密码大于4位小于12位",reg:/\w{4,12}/,isFalse:false},
				{rerePassword:"两次输入密码不一致",reg:/\w{4,12}/,isFalse:false},
				{codeErr:"验证码输入错误",reg:/\w{4,12}/,isFalse:false},
			]
		}
	},
	created:function(){
		this.createCode();
		if(client.fetch()==""){
			this.isLogin=true;
		}else{
			this.isLogin=false;
			// console.log(client.fetch().usename)
			this.usename=client.fetch().usename;
		}
	},
	methods:{
		send:function(){
			if(this.usename==""){
				this.$store.commit("alert/show","请输入用户名");
				return;
			}
			var TT=this.isAdminPop;
			this.$http({
				url:"http://localhost:8080/"+this.isAdminSend+"/login/",
				method:"POST",
				data:JSON.stringify({
					[TT]:this.usename,
					password:this.password
				})
			}).then(function(res){  //返回promise对象
				if(res.data=='1'){
					// alert("登录成功");
					var obj={usename:this.usename,password:this.password};
					client.save(obj);
					this.isLogin=false;
					window.location.href="index.html";

					//
				}else if(res.data=='2'){
					var obj={usename:this.usename,password:this.password};
					client.save(obj,"adminkey");
					window.location.href="lh_index.html";							
				}
				else if(res.data=="0"){
					// alert("账号或密码错误")
					// this.alertMsg="账号或密码错误";
					// this.alertshow=true;
					// console.log(this.$store);
					this.$store.commit("alert/show","账号或密码错误");
					

				}
			},function(){})
		},
		// adminSend:function(){

		// },
		change:function(){
			for(var i in this.registFileds){
				this.registFileds[i]="";
			}
			this.toggle=!this.toggle;
		},
		createRandom:function(length){   //创建随机数
			return Math.floor(Math.random()*length);
		},
		togoAdmin:function(){
			this.isAdminSend="admin";
			this.isAdmin=false;
			this.isAdminPop="adminname";
		},
		togoUser:function(){
			this.isAdminSend="user";
			this.isAdmin=true;
			this.isAdminPop="username";
		},
		createCode:function(){   //生成验证码
			this.code="";
			// console.log(546);
			var arr=[1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','o'];
			var codeLength=4; //验证码长度
			for(var i=0;i<codeLength;i++){
				this.code+=arr[this.createRandom(arr.length)];
			}
		},
		quit:function(){ //退出登录
			if(confirm("确认退出？")){
				this.isLogin=true;
				client.clear();
				window.location.href="index.html"
			}else return;
		
		},
		registComplete:function(){
			var that=this;
			if(this.registFileds.registName==''){
				this.$store.commit("alert/show","用户名不能为空");
				return;
			}else if(this.registFileds.registPassword!=this.registFileds.registRePassword){
				this.$store.commit("alert/show","密码格式错误");	
				return;
			}else if(this.registFileds.inputCode!=this.code){
				this.$store.commit("alert/show","验证码输入错误");	
				return;
			}else if(this.registFileds.inputCode==this.code&&
				this.registFileds.registPassword==this.registFileds.registRePassword){
				this.$http({
					url:"http://localhost:8080/user/regist/",
					method:"POST",
					data:JSON.stringify({
						username:this.registFileds.registName,
						password:this.registFileds.registPassword
					})
				}).then(function(res){
					if(res.data=="0"){
						this.$store.commit("alert/show","用户名重复");	
						return;
					}else if(res.data=="1"){
						for(var i in this.registFileds){   //清空注册栏
								// this.registFileds[i]="";
							}
						this.$store.commit("alert/show","注册成功！");				
						setTimeout(function(){
							that.alertshow=false;
							that.toggle=true;
						},1000);			
					}
				},function(){})
			}
		}
	}
})
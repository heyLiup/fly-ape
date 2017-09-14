
var alertModule={

	namespaced:true,
	state:{
		msg:"",
		alertshow:false,
		isChoose:true,

	},
	getters:{

	},
	mutations:{
		show:function(state,msg){
			state.alertshow=true;
			state.msg=msg;
		},
		cancel:function(state){
			state.alertshow=false;
		},
		sure:function(state){		
			state.alertshow=false;

		}
	},
	actions:{

	}
}
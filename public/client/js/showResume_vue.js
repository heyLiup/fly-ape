// 新闻news组件
// var news=Vue.extend({
// 	template:"#news",
// 	data:function(){
// 		return {
// 			content:contents,
// 			limit:166//显示字数
// 		}
// 	},
// 	created:function(){
// 		for(var i=0;i<this.content.length;i++){
// 			var charNumbers=this.content[i].text.length;//总字数
// 			if(charNumbers>this.limit){
// 				this.content[i].orgText=this.content[i].text;//原始文本
// 				this.content[i].showText=this.content[i].text.substring(0,this.limit)+" ...";
// 				this.content[i].text=this.content[i].showText;
// 				this.content[i].isShow=1;
// 			}else{
// 				this.content[i].isShow=0;
// 			}
// 		}
// 	},
// 	methods:{
// 		show:function(index){
// 			if(this.content[index].cur_status=="less"){
// 				this.content[index].text=this.content[index].orgText;
// 				this.content[index].switch="收起";
// 				this.content[index].cur_status="more";
// 			}else{
// 				this.content[index].text=this.content[index].showText;
// 				this.content[index].switch="展开";
// 				this.content[index].cur_status="less";
// 			}
// 		}
// 	}
// });
// // 全局注册news
// Vue.component("news",news);

// var vm=new Vue({
// 	el:"#content"
// });
// var datas={
// 	imgUrl:"images/head-portrait.png",	
// 	Aname:'张三',
// 	Asex:"男",
// 	Aphone:"12345678999",
// 	Aemail:"1234544664@qq.com",
// 	Bschool:"江西农业大学",
// 	Bobject:"软件工程",
// 	Bcurtrul:"本科",
// 	Bgraduate:"2018",
// 	Cexperience:"这是一些工作经历这是一些工作经历这是一些工作经历这是一些工作经历",
// 	Dpost:"前端工程师",
// 	Dtime:"全职",
// 	Dlocation:"深圳",
// 	Dsalary:"10000+",
// 	Eend:"我的技能有好多我的技能有好多我的技能有好多我的技能有好多我的技能有好多",
// 	Fself:"我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒\
// 	我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒我很棒"
// }
var contentdata=Vue.extend({
	template:"#contentdata",
	data:function(){
		return {
			datas:"",
			hasresume:true,
		}
	},
	computed:{
		currentUser:function(){
			return client.fetch().usename;
		}
	},
	created:function(){
		this.getDatas();
	},
	methods:{
		getDatas:function(){
			this.$http({
				url:"http://localhost:8080/resume/getAll/",
				method:"POST",
				data:JSON.stringify(this.currentUser)
			}).then(function(res){
				if(res.data=="0"){
					this.hasresume=false;
				}else{
					this.datas=res.data[0];
				}
				// this.datas=res.data[0];
			},function(){})
		}
	}
});

Vue.component("contentdata",contentdata);


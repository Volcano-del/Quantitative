var app = new Vue({
    el: "#app",
    data: {
      checkListen:[],
      last_step_data:[]
    },
    created() {
        // sessionStorage获取value
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        console.log(quantObj)
        //如果操作数据缓存不存在，重新开始实验
        if(null==quantObj){
          this.$alert('操作超时，请重新开始', '超时提醒', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.href="./s_tep1.html";
            }
          }); 
        } else{
          this.last_step_data=quantObj.quant_ct;
        }
    },
    methods: {
      goBack(){
        window.history.go(-1);	             
      },
      godownten(){
        var flag=false;
        if(this.last_step_data!=''){
          flag=true;
        }
        
        if(this.checkListen.length==0 && !flag){
          this.$message.error("请至少选择行情直指标或技术指标因子中的一项");
         return
       }
       var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
       if(null!=this.checkListen[0]){
        quantObj.sell_index=this.checkListen[0];
       } 
        sessionStorage.setItem("quantObj", JSON.stringify(quantObj)); 
        window.location.href="./s_tep10.html"
      }
    }
  });
  
var app = new Vue({
    el: "#app",
    data: {
      checkListli:[],
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
        this.last_step_data=quantObj.quant_cs;
      }
    },
    methods: {
      goBack(){
        window.history.go(-1);	             
      },
      docu(){
        
        var flag=false;
          if(this.last_step_data!=''){
            flag=true;
          }
          
        

        if(this.checkListli.length==0 && !flag){
          this.$message.error("请至少选择行情直指标或技术指标因子中的一项");
          return
        }
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        if(null!=this.checkListli[0]){
          quantObj.buy_index=this.checkListli[0];
        }  
        sessionStorage.setItem("quantObj", JSON.stringify(quantObj)); 
        window.location.href="./s_tep7.html"
      },
    }
  });
  
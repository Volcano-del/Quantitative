var app = new Vue({
    el: "#app",
    data: {
      radio:"",
      checkList:[]
    },
    created() {
      // sessionStorage获取value
      var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
      //如果操作数据缓存不存在，重新开始实验
      if(null==quantObj){
        this.$alert('操作超时，请重新开始', '超时提醒', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.href="./s_tep1.html";
          }
        }); 
      } else{
        this.radio=quantObj.dataType;
      }
    },
    methods: {
      goBack(){
        window.history.go(-1);	             
      },
     
      //选择radio回调
      changeRadio(val){
        this.radio=val;
      },
      godown(){
        if(this.checkList.length==0){
          this.$message.error("请至少选择一项数据类型");
          return
        }
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        //step3###############
          //数据类型
        quantObj.dataType=this.radio;//高频:high;日线：day;周线:week;月线:month;
        sessionStorage.setItem("quantObj", JSON.stringify(quantObj)); 
        window.location.href="./s_tep4.html"
      }
    }
  });
  
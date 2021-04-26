var app = new Vue({
    el: "#app",
    data: {
      radio: 'open',
      checkedsell:true
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
        } 
    },
    methods: {
      goBack(){
        window.history.go(-1);	             
      },
      
      // s_step10点击下一步
      sell_way(){
        console.log(this.checkedsell);
        if(this.checkedsell!=true){
          this.$message.error("请选择卖出方式");
          return
        }
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        quantObj.sell_way=this.radio;
       //sessionStorage存储value
       sessionStorage.setItem("quantObj", JSON.stringify(quantObj));
        window.location.href="./s_tepend.html"
      },
      change(val){
        this.checkedsell=val;
      }
    }
  });
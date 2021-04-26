var app = new Vue({
    el: "#app",
    data: {
      radio: 'open',
      checkList: ['1'],
      checked:true
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
      // s_step7点击下一步
      go(){
        console.log(this.checked);
        if(this.checked!=true){
          this.$message.error("请选择买入方式");
          return
        }
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        quantObj.buy_way=this.radio;
       //sessionStorage存储value
       sessionStorage.setItem("quantObj", JSON.stringify(quantObj));
        window.location.href="./s_tep8.html"
      },
      change(val){
        this.checked=val;
      }
    }
  });
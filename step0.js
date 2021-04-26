var app = new Vue({
  el: "#app",
  data: {
    radio: '1',
    checkList: ['选中且禁用','复选框 A'],
  },
  created() {
    
  },
  methods: {
    goBack(){
      window.history.go(-1);	             
    },
    jump:function(){
      var ko=document.querySelector(".chose_icon > div > .is-checked");
      // console.log(ko);
      if(ko==null || ko==''){
        this.$alert('请选择一种买入方式', '提示', {
          confirmButtonText: '确定',
        });
      }else{
        window.open('./step1.html');
      }
    },
    godown(){
      // console.log(this.checkList.length);
      if(this.checkList.length==0){
        this.$message.error("请至少选择一项数据类型");
        return
      }
      window.location.href="./s_tep4.html"
    },
    docu(){
      if(this.checkListli.length==0){
        this.$message.error("请至少选择一项数据类型");
        return
      }
      window.location.href="./s_tep7.html"
    },
    godownten(){
      if(this.checkListen.length==0){
        this.$message.error("请至少选择一项技术指标因子");
        return
      }
      window.location.href="./s_tep10.html"
    }
  }
});


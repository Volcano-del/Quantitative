var app = new Vue({
    el: "#app",
    data: {
      quant_ct:{
        y_close:{
          "condition":"",
          "value":"",
        },
        y_deal:{
          "condition":"",
          "value":"",
        },
        y_hl:{
          "condition":"",
          "value":"",
        },
        y_p:{
          "condition":"",
          "value":"",
        },
      },
      disabled1:true,
      disabled2:true,
      disabled3:true,
      disabled4:true
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
      change(index){
        if(index==1){
          if(this.quant_ct.y_close.condition!=""){
            this.disabled1=false;
          }else{
            this.quant_ct.y_close.value="";
            this.disabled1=true;
          }
        }else if(index==2){
          if(this.quant_ct.y_deal.condition!=""){
            this.disabled2=false;
          }else{
            this.quant_ct.y_deal.value="";
            this.disabled2=true;
          }
        }else if(index==3){
          if(this.quant_ct.y_hl.condition!=""){
            this.disabled3=false;
          }else{
            this.quant_ct.y_hl.value="";
            this.disabled3=true;
          }
        }else if(index==4){
          if(this.quant_ct.y_p.condition!=""){
            this.disabled4=false;
          }else{
            this.quant_ct.y_p.value="";
            this.disabled4=true;
          }
        }
        
      },
      goBack(){
        window.history.go(-1);	             
      },
      godown9(){
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        //step5###############
        if(this.quant_ct.y_close.value=="" && this.quant_ct.y_deal.value=="" && this.quant_ct.y_hl.value=="" && this.quant_ct.y_p.value==""){
          quantObj.quant_ct="";
        }else{
          quantObj.quant_ct=this.quant_ct;
        }
        
        sessionStorage.setItem("quantObj", JSON.stringify(quantObj)); 
        
         //window.location.href="./s_tep6.html";
         window.location.href="./s_tep9.html";
      }
    }
  });
  
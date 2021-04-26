var app = new Vue({
  el: "#app",
  data: {
    isline_step:false,
    loading:false,
    strategy_type:""//menu:菜单，code：代码
  },
  created() {
    //step1###############
     // sessionStorage获取value
     var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
     console.log(quantObj)
     //如果操作数据缓存不存在，重新开始实验
     if(null==quantObj){
	   //设置存储的对象
           quantObj={
            "code":"",//绩效标准的编码
            "start_time":"",//开始时间
            "end_time":"",//结束时间
            "initial_funding":"", //初始资金
            "data_type":"",//数据类型 //高频:high;日线：day;周线:week;月线:month;
            "stock_list":[
            ],//选择的股票编号数组
            "buy_way":"", //买入方式 //开盘价：open；收盘价:close;最低成交价：low；最高成交价：high；
            "sell_way":"",//卖出方式 //开盘价：open；收盘价:close;最低成交价：low；最高成交价：high；
            "strategy_type":"",//策略类型
            "quant_cs":"",//量化控股
            "quant_ct":"",//择时控股
            "buy_ index":"",//KDJ
            "sell_ index":""//KDJ
      };
      // sessionStorage存储value
      sessionStorage.setItem("quantObj", JSON.stringify(quantObj));
     } else{
        if( quantObj.strategy_type=='menu'){
          this.isline_step=true;
          this.loading=false;
          this.strategy_type='menu'
        }else if(quantObj.strategy_type=='code'){
          this.loading=true;
          this.isline_step=false;
          this.strategy_type='code'
        }
     }

    
     
     
  },
  methods: {
    line(obj){
      console.log(obj)
      if(obj){
        this.isline_step=true;
        this.loading=false;
        this.strategy_type='menu'
      }else{
        this.loading=true;
        this.isline_step=false;
        this.strategy_type='code'
      }
    },
    jump:function(){
      var ko=document.querySelector(".line_step0_change");
      // console.log(ko)
      if(this.isline_step==false){
        setTimeout(()=>{ 
          this.$alert('请选择一种策略类型', '提示', {
          confirmButtonText: '确定',
        });
        }, 30);
      }else{
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        quantObj.strategy_type=this.strategy_type;
       //sessionStorage存储value
       sessionStorage.setItem("quantObj", JSON.stringify(quantObj));
        window.location.href='./s_tep2.html';
      }
    },
  }
});


var app = new Vue({
  el: "#app",
  
  data() {
    let _this=this;
    return{
      value1: '',
      value2: '',
      contr:'', //初始资金
      sampleStocks:[],
      code:"",
      data_picker_status:true,
      start_time:"",
      end_time:"",
      ab_start_time:"",
      ab_end_time:"",
      form:{
        time:[]
      },
      // 回测时间区间
      pickerOptions: {
        　　disabledDate (time) {
          　　　　let t = new Date();
          　　　　t= t+' 00:00:00'
          　　　　let myDate = new Date(_this.ab_start_time)
          　　　　let year = myDate.getFullYear()
          　　　　let month = myDate.getMonth()
          　　　　let date = myDate.getDate()
          　　　　if(_this.ab_end_time){
          　　　　　　if(new Date(year, month, date).getTime() < new Date(t).getTime()){
          　　　　　　　　return time.getTime() > new Date(_this.ab_end_time).getTime() || time.getTime() < new Date(t).getTime()
          　　　　　　}
          　　　　　　return time.getTime() > new Date(_this.ab_end_time).getTime() || time.getTime() < new Date(year, month, date).getTime()
          　　　　}else {
          　　　　　　if(new Date(year, month, date).getTime() < new Date(t).getTime()){
          　　　　　　　　return time.getTime() < new Date(t).getTime()
          　　　　　　}
          　　　　　　return time.getTime() < new Date(year, month, date).getTime()
          　　　　}
          　　}
      },
  }
  },
  created() {
      // sessionStorage获取value
      var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
      console.log(quantObj)
      this.sampleStock();
      //如果操作数据缓存不存在，重新开始实验
      if(null==quantObj){
        this.$alert('操作超时，请重新开始', '超时提醒', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.href="./s_tep1.html";
          }
        }); 
      }else{
        this.code=quantObj.code;
        this.contr=quantObj.initial_funding;
        this.value1=quantObj.start_time;
        this.value2=quantObj.end_time;
        if(null!=this.contr && this.contr!='')
        $('#fund').find('option[value='+this.contr+']').attr('selected','selected');
      }
    
    
  },
  methods: {
    // 样本股字典
    sampleStock(){
      var _this = this;
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.findSampleStock,//样本股字典
          data: { },
          cbk: function cbk(res) {
            console.log(res);
            if (res.code == 200 && res.msg == "success") {
              // _this.code=res.data.code;
              // _this.sample_stock_name=res.data.sample_stock_name;
              // _this.id=res.data.id;
              // for(var i=0;i<data.length;i++){
              //   var item=data[i];
              // }
              _this.sampleStocks=res.data;
              $('#stock').find('option[value='+_this.code+']').attr('selected','selected');
              _this.changeUstock();
               
            }
          }
        });
    },
    // 股票时间区间
    changeUstock(){
      if(null==this.code || this.code==""){
        this.data_picker_status=true;
      }else{
        this.data_picker_status=false;
        var _this = this;
        pub._InitAxios({
          _url: pub._url, //公共接口
          ur: pub._DetailApi.findStockTZ,//股票时间区间
          data: { "code":_this.code },
          cbk: function cbk(res) {
            console.log(res);
            if (res.code == 200 && res.msg == "success") {
              if(res.data){
                _this.ab_start_time=res.data.start_time;
                _this.ab_end_time=res.data.end_time;
              }else{
                _this.data_picker_status=true;
                _this.ab_start_time="";
                _this.ab_end_time="";
              }
               

            }
          }
        })
      }
    },
    // 选择开始日期
    changeStartTime(){
      if(null==this.value1)
      this.value1=""
      if(null==this.value2)
      this.value2=""
      if(new Date(this.value1).getTime() >new Date(this.value2).getTime()){
        this.value1="";
        this.$message.error('开始时间不能大于结束时间！');
      }
    },
    // 选择结束日期
    changeEndTime(){
      
      if(null==this.value1)
      this.value1=""
      if(null==this.value2)
      this.value2=""
      if(new Date(this.value1).getTime() >new Date(this.value2).getTime()){
        this.value2="";
        this.$message.error('结束时间不能小于开始时间！');
      }
    },
    // 做非空验证
    godown(){
     console.log(this.code,this.contr,this.value1,this.value2)
     if(null==this.code || this.code==''){
      this.$message.error('请选择绩效基准的内容');
      return;
     };
     if(this.value1=='' || this.value1==null){
      this.$message.error('请选择开始的日期');
      return;
     };
     if(this.value2=='' || this.value2==null){
      this.$message.error('请选择结束的日期');
      return;
     };
     if(this.contr==''){
      this.$message.error('请确认初始资金的金额');
      return;
     };
    
      //step2###############
       // 获取存储的对象
       var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
    
       console.log(quantObj)
       //绩效标准的编码
       quantObj.code=this.code;
       //开始时间
       quantObj.start_time=this.value1.substring(0,10);
       //结束时间
       quantObj.end_time=this.value2.substring(0,10);
       //初始资金
       quantObj.initial_funding=this.contr;
       //每步结束重新set一次
       sessionStorage.setItem("quantObj", JSON.stringify(quantObj));
       
       window.location.href="./s_tep3.html"
    },
  }
});

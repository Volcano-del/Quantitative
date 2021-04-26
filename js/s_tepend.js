var app = new Vue({
    el: "#app",
    data: {
      f1:1,
      f2:0,
      f3:0,
      input:'',
      tableData1: [],
      stock_name:"",
      progressNum: 0,//进度条
      startTimer: '',
      experiment_id:"",

      finished_status:"",
      start_time:"",
      end_time:"",
      total_income:"",
      echart_list:[],

      unitday:10,
      times:1,
      Timer:'',
      addTimer:'',
      interval_time:2000,
      experiment_id:"",
      user_id:""
      
    },
    created() {
      var that=this;
      var experiment_id=getQueryVariable("experiment_id");
      if(null!=experiment_id && experiment_id!=""){
        sessionStorage.setItem("experiment_id",experiment_id);
      }
      
      this.experiment_id=experiment_id;
      console.log(experiment_id)
      var user_id=sessionStorage.getItem("user_id")  
      this.user_id=user_id;
      if(null==experiment_id || experiment_id==""){
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
        } 
      }
      
      if (window.performance.navigation.type == 1) {
        console.log("页面被刷新")
        $('.date').css('visibility','hidden');
        if(null==experiment_id || experiment_id==""){
          experiment_id=sessionStorage.getItem("experiment_id");
          this.experiment_id=experiment_id;
        }

       }else{
        console.log("首次被加载")
        sessionStorage.removeItem('experiment_id');
       }
       
      if(null==experiment_id || experiment_id==""){
        console.log(11)
        this.experiment();
      }else{
        this.StockECDate(experiment_id);
        this.progressNum=100;
      }
      // this.stockdeal();
    },
    methods: {
      // 左侧导航栏
      changeactive(num){
        if(num==1){
          this.$set(this,'f1',1);
          this.$set(this,'f2',0);
          this.$set(this,'f3',0)
        }
        if(num==2){
          this.$set(this,'f1',0);
          this.$set(this,'f2',1);
          this.$set(this,'f3',0)
        }
        if(num==3){
          this.$set(this,'f1',0);
          this.$set(this,'f2',0);
          this.$set(this,'f3',1);
        }
      },

      // 创建实验信息
      experiment(){
        // sessionStorage获取value
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        var user_id=sessionStorage.getItem("user_id");
        quantObj.user_id=user_id;
        console.log(quantObj)
        var _this = this;
        pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.createNewExperiment,// 创建实验信息接口
            data: quantObj,
            cbk: function cbk(res) {
              // console.log(2222,res);
              if (res.code == 200 && res.msg == "success") {
                myChart.setOption(option);
                 var experiment_id=res.data.experiment_id;
                 _this.experiment_id=experiment_id;
                 sessionStorage.setItem("experiment_id",experiment_id);
                 _this.analysis(experiment_id);

                 _this.progress(experiment_id);
                 

                 
              }
            }
        });
      },

      // 实验量化分析
      analysis(experiment_id){
        console.log("实验量化分析")
        // sessionStorage获取value
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        console.log(quantObj)
        var _this = this;
        pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.quantitativeAnalysis,// 实验量化分析接口
            data: {"experiment_id":experiment_id},
            cbk: function cbk(res) {
              // console.log(111111,res);
              if (res.code == 200 && res.msg == "success") {
                _this.finished_status="success";
              }
            }
        });
      },

      // 量化分析完成率
      progress(experiment_id){
        console.log("完成率")
        $('.date').css('visibility','hidden');
        this.startTimer = setInterval(()=>{
          // sessionStorage获取value
          var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
          var _this = this;
          pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.findDealStockProgress,// 量化分析完成率接口
            data: {"experiment_id":experiment_id},
            cbk: function cbk(res) {
              
              if (res.code == 200 && res.msg == "success") {
                //1-100
                  var rate=res.data.progress
                  _this.progressNum=rate;
                  if(rate==100 && _this.finished_status=='success'){
                    //关掉定时器
                    clearInterval(_this.startTimer);
                    //调用数据生成图
                    _this.StockECDate(experiment_id);
                  }
              }
            }
          });
        },500);      
      },

      //查询股票图表数据
      StockECDate(experiment_id){
        console.log("查询股票图表数据:",experiment_id)
        // sessionStorage获取value
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        console.log(quantObj)
        var _this = this;
        pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.findStockECDate,// 查询股票图表数据接口
            data: {"experiment_id":experiment_id},
            cbk: function cbk(res) {
              console.log(22222,res);
              if (res.code == 200 && res.msg == "success") {
                // 开始时间-结束时间 总收益
                _this.start_time=res.data.start_time;
                _this.end_time=res.data.end_time;
                _this.total_income=res.data.total_income;

                option.title[0].subtext=res.data.strategic_income+"%";//策略收益
                option.title[1].subtext=res.data.benchmark_icome+"%";//基础收益
                option.title[2].subtext=res.data.day_income+"%";//日平均收益
                option.title[3].subtext=res.data.year_income+"%";//年收益率

                // console.log(option.title[0].subtext)
                // console.log(option)
                var list=res.data.echartsList;
                console.log(123456,list);
                // 资产收益
                _this.echart_list=list;
                _this.createEchart();
                _this.Timer=setInterval(_this.createEchart, _this.interval_time); 
                $('.date').css('visibility','visible');
              }
            }
        });
      },
      // 折线图
      createEchart(){
        var _this=this;
        var list=this.echart_list;
        for(var i=0;i<(_this.unitday*_this.times);){
          var item=list[i];
          // console.log(item);
          option.xAxis.data[i]=item.date;
          option.series[0].data[i]=item.strategic_income;
          option.series[1].data[i]=item.benchmark_icome;
          i++;
          if(i==list.length){
            console.log('清除定时器1')
            clearInterval(_this.Timer);
            break;
          }
        }
        // console.log(111)
        _this.times++;
        // console.log(_this.times)
        myChart.setOption(option);
      },

      // 加速
      add(){
        console.log('加速')
        this.interval_time=1000;
        clearInterval(this.Timer);
        this.createEchart();
        this.Timer=setInterval(this.createEchart, this.interval_time);
      },
      // 减速
      reduce(){
        console.log('减速')
        this.interval_time=4000;
        clearInterval(this.Timer);
        this.createEchart();
        this.Timer=setInterval(this.createEchart, this.interval_time);
      },
      //提交试验
      getImage(){
        var _this=this;
        var base64String=myChart.getDataURL();
        //这里对base64串进行操作，去掉url头，并转换为byte
        var bytes = window.atob(base64String.split(',')[1]);    
        var array = [];
        for(var i = 0; i < bytes.length; i++){
            array.push(bytes.charCodeAt(i));
        }
        var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        var fd = new FormData();
        fd.append('file',blob, Date.now() + '.png');
        fd.append('experiment_id',this.experiment_id)
        fd.append('user_id',this.user_id)
        console.log(fd)
        //TDOD Ajax或者其他方式上传FormData对象
        $.ajax({
          　　type:"post",
          　　url:pub._url+pub._DetailApi.uploadExperimentInfo,//上传实验信息
          　　data:fd,
          　　//是否预处理,默认值为true,这里改成false
          　　processData:false,
              dataType:"json",
              async: false,
              cache: false,
          　　//是否设置内容,默认值为true,这里改成false
          　　contentType:false,
              processData: false,
          　　success:function(res){
                 if(res.code=='200'){
                  _this.$message({
                    message: '上传成功',
                    type: 'success',
                  });
                 }else{
                  _this.$message.error(res.msg);
                 }
                  
                  
          　　},
          　　error:function(data){
              
                  _this.$message.error('上传失败');
          　　}
          });
      },

      // 查询股票交易记录
      stockdeal(){
        var _this = this;
        pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.findStockDealRecord,// 查询股票交易记录接口
            data: { "stock_name": _this.stock_name, "experiment_id": _this.experiment_id },
            cbk: function cbk(res) {
              console.log(111111,res);
              if (res.code == 200 && res.msg == "success") {
                // 查询股票交易记录
                _this.tableData1=res.data;
                // console.log(222222,_this.tableData1);
              }
            }
        });
      },

      // 调查询股票交易记录
      deal(){
        this.stockdeal();
      },
      //导出数据表格
      excel(type){
        console.log(11)
        
        window.location.href=pub._url+pub._DetailApi.excel+"?type="+type+"&experiment_id="+this.experiment_id;
      }

    },
});
  
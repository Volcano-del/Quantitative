var app = new Vue({
    el: "#app",
    data: {
         radio: '1',
      tabledata: [],
      code:"",
      pageNum:1,
      pageSize:10,
      totalPage: 0,
      totalCount: 0,
      tableData1: [],
      value:[],
      val:'',
      multipleSelection: [],
      line_chi:''
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
      this.code=quantObj.code;
  
      this.stockpick();
    },
    methods: {
      // 查询股票选择列表
      stockpick(){
        var _this = this;
        pub._InitAxios({
            _url: pub._url, //公共接口
            ur: pub._DetailApi.findStockPick,// 查询股票选择列表接口
            data: { "code": _this.code, "pageSize": _this.pageSize, "pageNum": _this.pageNum },
            cbk: function cbk(res) {
                // console.log(12345678,res);
                if (res.code == 0 && res.msg == "success") {
                    // 分页
                    _this.totalCount = res.data.totalCount;
                    _this.totalPage = res.data.totalPage;
  
                    var list = res.data.list;
                    // console.log(1111111,list)
                    _this.tabledata = list;
                    console.log(22222222,_this.tabledata)
                }
            }
        });
      },
      rowCode(row){
        return row.code;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
  
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
        this.value=val;
        this.tableData1=val
      },
      //删除选择
      deleteRow(index, rows) {
        var aa=rows[index].code;
        // this.tabledata.splice(index,1);
        var i=0;
        for(;i<this.multipleSelection.length;i++){
          console.log(this.multipleSelection[i].code)
            if(this.multipleSelection[i].code==aa){
              break;
            }
        }
        this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[i]);
        rows.splice(index, 1);
      },
      gitint(){
        console.log(this.value[0])
        this.tableData1=this.value[0]
      },
      
      godown(){
        console.log(this.tableData1)
        var datalength=this.tableData1.length;
        if(datalength<=0){
          this.$message.error('请至少选择一种股票');
          return;
        
        }
        // sessionStorage获取value
        var quantObj=JSON.parse(sessionStorage.getItem("quantObj"));
        //定义选择的股票数据
        var stockList=[];
        //将选择的股票编号封装
        for(var i=0;i<this.multipleSelection.length;i++){
          stockList[i]=this.multipleSelection[i].code;
        }
        //放入数据中
        quantObj.stock_list=stockList;
        console.log(quantObj)
        //sessionStorage存储value
        sessionStorage.setItem("quantObj", JSON.stringify(quantObj));

        window.location.href="./s_tep5.html";
      },
  
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.stockpick();
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageNum=val;
          this.stockpick();
      }
    }
  });
  
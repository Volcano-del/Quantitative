var app = new Vue({
    el: "#app",
    data() {
        return {
          dialogVisible: false,
          score: '',
          textarea:'',
          tableData:[{
            content: '1. 初始条件选择是否正确、合理（10分）',
          },{
            content: '2. 量化选股策略理解程度（10分）',
          },{
            content: '3. 量化择时策略理解程度（10分）',
          },{
            content: '4. 实验结果是否合理（30分）',
          },{
            content: '5. 实验目的、原理、步骤和结果是否完整充分（30分）',
          },{
            content: '6. 心得体会是否认真、深刻（10分）',
          }
        ]
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
        },
        // 确认按钮
        open(){
          var _this=this;
          // var obj=document.getElementsByClassName("input");
          // console.log(1111,obj);
          if(_this.score == '' && _this.textarea == ''){
            _this.$message.error('未填写任何内容');
          }else if(_this.score == ''){
            _this.$message.error('未打分');
          }else if(_this.textarea == ''){
            _this.$message.error('未写评语');
          }else{
              _this.score='';
              _this.textarea='';
              _this.$message({
                  message: '评分提交成功',
                  type: 'success'
              });
              return;
          }
        }
    },
})
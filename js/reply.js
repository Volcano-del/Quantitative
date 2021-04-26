var app = new Vue({
    el: "#app",
    data() {
        return {
          dialogVisible: false,
          dialogFormVisible:false,
          reply:'',
          title:''
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
      
        open() {
            if(this.reply == ''){
                this.$message.error('未填写任何内容');
            }else{
                this.reply = '';
                 this.$message({
                    message: '回复提交成功',
                    type: 'success'
                });
                return;
            }
        }
    },
})
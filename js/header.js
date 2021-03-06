var app = new Vue({
    el: "#head",
    data: {
        user_id:"",
        head_portrait:"",
        student_name:"",
        onLogin:false,
        downLogin:true
    },
    created(){
        // var user_id=getQueryVariable('user_id');
        var user_id=sessionStorage.getItem("user_id")
        console.log('user_id:'+user_id)
        
        this.user_id=user_id;
        if (null==user_id || user_id==""){
            this.downLogin=true;
            this.$alert('请先登录', '登录提醒', {
                confirmButtonText: '确定',
                callback: action => {
                  window.location.href="./html/log.html";
                }
              });
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            this.judgeLog();
        }  
    },
    methods: {
        // 查询学生信息
        judgeLog(){
            var _this = this;
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.studentInfo,//查询学生信息接口
                    data: {"user_id":_this.user_id },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            _this.head_portrait=baseL + res.data.head_portrait;
                            _this.student_name=res.data.student_name;
                            console.log(_this.head_portrait);
                        }
                    }
            });
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            console.log(2222222)
            if(command=='a'){
                console.log(this.user_id)
                window.location.href = './html/usecenter.html';
            }else{
                this.user_id="";
                sessionStorage.clear()
                window.location.href = './index.html';
            }
          },

        // 点击跳转登录注册页面
        lo(){
            window.location.href = '../html/log.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },          
    }
})


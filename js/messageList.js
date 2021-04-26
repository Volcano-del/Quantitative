var app = new Vue({
    el: "#message",
    data: {
        show1: false,
        currentPage3: 1,
        tabledata: [],
        title: '',
        count: '',
        pageSize: 5,
        currPage: 1,
        totalPage: 0,
        totalCount: 0,
        message_id: 10,
        user_id: "",
        head_portrait:"",
        student_name:"",
        onLogin:false,
        downLogin:true
    },
    created() {
        
        // var user_id=getQueryVariable('user_id');
        var user_id=sessionStorage.getItem("user_id");
        console.log('user_id:'+user_id)
        if (null==user_id || user_id==""){
            this.downLogin=true;
            window.location.href = '../html/log.html';
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            this.judgeLog();
            this.getinit();
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
                window.location.href = '../html/usecenter.html';
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
          },

        // 点击跳转登录注册页面
        lo(){
            window.location.href = '../html/log.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currPage = val;
            this.getinit();
        },
        //留言列表
        getinit() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listNewMessagePage,
                data: { "pageSize": _this.pageSize, "pageNum": _this.currPage, "user_id": _this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 0 && res.msg == "success") {
                        // 分页
                        _this.totalCount = res.data.totalCount;
                        _this.totalPage = res.data.totalPage;

                        var list = res.data.list;
                        console.log(list)
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            item.head_portrait = baseL + item.head_portrait;
                            //新消息提醒
                            if (item.new_message_status == 'Y') {
                                item.new_message_status = true;
                            } else {
                                item.new_message_status = false;
                            }
                        }
                        _this.tabledata = list;
                        _this.view();

                    }
                }
            });
        },
        // 解除留言提醒
        remove(message_id) {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.removeNewMessage,
                data: { "message_id": message_id ,"user_id":_this.user_id},
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200) {
                        window.location.href = '../html/read.html?message_id=' + message_id+"&aim=me";
                    }
                }
            });
        },
        addup(index, likenum) {
            var addup = Number(this.tabledata[index].likenum);
            this.$set(this.tabledata[index], 'likenum', addup + 1);
            console.log(this.tabledata)
            var addown = Number(this.tabledata[index].likenum)
        },
        update() {
            console.log(this.title, this.count)
            var _this = this;
            if (_this.title == '') {
                this.$message.error('未提交留言标题');
            } else if (_this.count == '') {
                this.$message.error('未提交留言内容');
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.departmentList,
                    data: { "title": this.title, "content": this.count, "user_id": _this.user_id },
                    cbk: function cbk(res) {
                        // console.log(res);
                        if (res.code == "200" && res.msg == "success") {
                            _this.title == '';
                            _this.count == '';
                            _this.$message({
                                message: '留言提交成功',
                                type: 'success'
                            });
                            return;
                        }
                        return this.$message.error('留言提交失败，请检查网络设置');
                    }
                });
            }

        },
    },
})
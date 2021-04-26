var app =new Vue({
    el:'#app',
    data:{
        user_id:"",
        head_portrait:"",
        view_head_portrait:"",
        iphone:"",
        eidtIphone:"",
        password:"",//验证密码
        student_name:"",
        sex:"",
        isos:"",
        onLogin:false,
        downLogin:true,
        errStatus:false,
        errMsg:"",
        editPassword:{
            errorStatus:false,
            errorMsg:"",
            old_password:"",
            new_password:"",
            confirm_password:"",
        },
        tableData: [],
        experiment_id:"",
        // levelList:[]
        contentDialogVisible:false,
        ex_1:"",
        ex_2:"",
        ex_3:"",
        ex_4:"",
        ex_5:"",
        ex_6:""

    },
    created(){
        var user_id=sessionStorage.getItem("user_id")
        console.log('user_id:'+user_id)
        this.user_id=user_id;
        if (null==user_id || user_id==""){
            this.downLogin=true;
            window.location.href = '../html/log.html';
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            this.centerLog();
        }
        this.centerLog();
        this.record();
    },
    methods:{
        // 查询学生实验记录
        record(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findExprimentRecord,//查询学生实验记录接口
                data: {"user_id":_this.user_id },
                cbk: function cbk(res) {
                    // console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                       var data=res.data;
                    //    console.log(data);
                       _this.tableData = data;
                    }
                }
            });
        },

        // 上传附件
        uploadRecord(){
            var _this=this;
            var filesList = document.querySelector('#uploadFile').files;
            if(filesList.length==0){ //如果取消上传，则改文件的长度为0         
                return;
            }else{  
            //如果有文件上传，这在这里面进行
                // 获取文件并上传
                var formFile = new FormData();
            　　var upfile = document.querySelector('#uploadFile');//获取input
            　　var file = upfile.files[0]; //获取文件对象
            　　formFile.append("file", file); //加入文件对象
                $.ajax({
                　　type:"post",
                　　url:pub._url+pub._DetailApi.uploadFile,//上传文件
                　　data:formFile,
                　　//是否预处理,默认值为true,这里改成false
                　　processData:false,
                    dataType:"json",
                    async: false,
                    cache: false,
                　　//是否设置内容,默认值为true,这里改成false
                　　contentType:false,
                    processData: false,
                　　success:function(res){
                        console.log(123123,res);
                　　　　 var src=res.data.src;

                        // var src=baseL+res.data.src;
                        console.log(src);
                        // _this.head_portrait=res.data.src;
                        // _this.view_head_portrait=src;
                        _this.$message({
                            message: '上传成功',
                            type: 'success',
                        });
                        event.target.value="";
                　　},
                　　error:function(data){
                    console.log(data);
                        _this.$message.error('上传失败');
                　　}
                });
            }
        },

       

        // 跳转消息中心
        messCenter(){
            window.location.href="../html/messageList.html";
        },
        
        // 基本信息
        centerLog(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.studentInfo,//查询学生信息接口
                data: {"user_id":_this.user_id },
                cbk: function cbk(res) {
                    // console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        // var user_id=res.data.user_id;
                        // sessionStorage.user_id=user_id;
                        // console.log(2222)
                        _this.head_portrait=res.data.head_portrait;
                        _this.view_head_portrait=baseL + res.data.head_portrait;
                        _this.student_name=res.data.student_name;
                        if(null!=res.data.iphone && res.data.iphone!=""){
                            var str=res.data.iphone.split('');
                            for(var i=0;i<str.length;i++){
                                if (i === 3 | i === 4 | i === 5 | i === 6) {
                                    str[i] = '*'
                                }   
                            }
                            _this.iphone=str.join('');
                        }else{
                            _this.iphone="";
                        }
                        
                        _this.sex=res.data.sex;
                        var isosStatus=res.data.isos;
                        // console.log(_this.head_portrait);
                        if(_this.sex==0){
                            $('#nv').attr('class','value');

                        }else{
                            $('#nan').attr('class','value');
                        }
                        if(isosStatus== 'os'){
                            _this.isos='本校学生';
                        }else{
                            _this.isos='外校学生';
                        }
                    }
                }
            });
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            console.log(2222222)
            if(command=='a'){
                console.log(this.user_id)
                window.location.href = '../html/usecenter.html?user_id='+this.user_id;
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
          },

        // 修改密码
        subEditPwd(){
            var _this = this;
            // console.log(_this.editPassword)
            if(_this.editPassword.old_password==""){
                // console.log(1)
                _this.editPassword.errorStatus=true;
                _this.editPassword.errorMsg="旧密码不能为空";
                return;
            }else if(_this.editPassword.new_password==""){
                // console.log(2)
                _this.editPassword.errorStatus=true;
                _this.editPassword.errorMsg="新密码不能为空";
                return;
            }else if(_this.editPassword.confirm_password==""){
                // console.log(3)
                _this.editPassword.errorStatus=true;
                _this.editPassword.errorMsg="确认密码不能为空";
                return;
            }else{
                _this.editPassword.errorStatus=false;
                _this.editPassword.errorMsg="";
                // console.log(111)
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.editPassword,//学生修改密码接口
                    data: {"old_password":_this.editPassword.old_password, "new_password":_this.editPassword.new_password, "confirm_password":_this.editPassword.confirm_password, "user_id":_this.user_id},
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            $(".password").css("display","none");
                            $(".p_result").css("display","block");
                            // _this.user_id="";
                            sessionStorage.removeItem('user_id');
                            // location.reload();
                        }else{
                            _this.editPassword.errorStatus=true;
                            _this.editPassword.errorMsg=res.msg;
                        }
                    }
                });
            }
        },
        delet(){
            this.editPassword.old_password='';
            this.editPassword.new_password='';
            this.editPassword.confirm_password='';
            this.password='';
            this.eidtIphone='';
        },

        // 修改手机号
        Editphone(){
            var _this = this;
            if(_this.password==""){
                console.log(1,_this.password)
                
                _this.errStatus=true;
                _this.errMsg="验证密码不能为空";
            }else if(_this.eidtIphone==""){
                console.log(3,_this.eidtIphone)
                _this.errStatus=true;
                _this.errMsg="修改手机号不能为空";
                return;
            }else{
                _this.errStatus=false;
                _this.errMsg="";
                console.log(111)
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.editStudentIphone,//修改手机号接口
                    data: {"password":_this.password, "iphone":_this.eidtIphone, "user_id":_this.user_id},
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            console.log(5555)
                            $(".password").css("display","none");
                            $(".p_result").css("display","block");
                                _this.centerLog();
                                // location.reload();
                        }else{
                            _this.errStatus=true;
                            _this.errMsg=res.msg;
                        }
                    }
                });
            }
        },

        //修改学生信息
        saveStudent(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.editStudent,//修改学生信息接口
                data: {"student_name":_this.student_name, "sex":_this.sex, "head_portrait":_this.head_portrait, "user_id":_this.user_id},
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                }
            });
        },
        
        // 通过ajax上传头像
        uploadPic(){
            var _this=this;
            var filesList = document.querySelector('#uploadImg').files;
                if(filesList.length==0){    //如果取消上传，则改文件的长度为0         
                    return;
                }else{  
                //如果有文件上传，这在这里面进行
                    // 获取头像并上传
                    var formFile = new FormData();
                　　var imgfile = document.querySelector('#uploadImg');//获取input
                　　var file = imgfile.files[0]; //获取文件对象
                　　formFile.append("file", file); //加入文件对象
                    $.ajax({
                    　　type:"post",
                    　　url:pub._url+pub._DetailApi.uploadPic,//上传图片
                    　　data:formFile,
                    　　//是否预处理,默认值为true,这里改成false
                    　　processData:false,
                        dataType:"json",
                    　　//是否设置内容,默认值为true,这里改成false
                    　　contentType:false,
                    　　success:function(res){
                        console.log(res);
                    　　　　
                            var src=baseL+res.data.src;
                            console.log(src);
                            _this.head_portrait=res.data.src;
                            _this.view_head_portrait=src;
                            _this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                    　　},
                    　　error:function(data){
                        console.log(data);
                            _this.$message.error('上传失败');
                    　　}
                    });
                }
            
        },

        // 点击登录注册的跳转
        lo(){
            window.location.href = '../html/log.html';
        },
        re(){
            window.location.href = '../html/reg.html';
        },

        // 重新登录跳转
        reLogin(){
            window.location.href = '../html/log.html';
        },

        // 选择男或者女
        nan(){
            this.sex="1";
            $('#nv').removeClass('value');
            $('#nan').attr('class','value');
        },
        nv(){
            this.sex="0";
            $('#nan').removeClass('value');
            $('#nv').attr('class','value');
        },
        // 学生成绩的查看、下载按钮
        // 查看实验报告
        handleEdit(index, row) {
            console.log(00000,index, row.experiment_id);
            window.location.href = '../s_tepend.html?experiment_id='+row.experiment_id;
        },
         //下载实验报告
        download() {
            var _this=this;
            this.findExperimentRecordContent();
            this.contentDialogVisible=true; 
        },
        findExperimentRecordContent(){
            var _this=this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findExperimentRecordContent,//
                data: { "user_id":_this.user_id},
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        var data=res.data;
                        _this.ex_1=data.ex_1;
                        _this.ex_2=data.ex_2;
                        _this.ex_3=data.ex_3;
                        _this.ex_4=data.ex_4;
                        _this.ex_5=data.ex_5;
                        _this.ex_6=data.ex_6;
                    }else{
                        _this.$message.error(res.msg);
                    }
                }
            });
        },
        saveExperimentContent(type){
            var _this=this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.saveExperimentRecordContent,//
                data: { "ex_1":_this.ex_1,
                        "ex_2":_this.ex_2,
                        "ex_3":_this.ex_3,
                        "ex_4":_this.ex_4,
                        "ex_5":_this.ex_5,
                        "ex_6":_this.ex_6,
                        "user_id":this.user_id},
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {

                        if(type==2){
                            _this.contentDialogVisible=false;
                            _this.downExperimentRecord();
                        }
                        
                    }else{
                        _this.$message.error(res.msg);
                    }
                }
            });
        },
        downExperimentRecord(){
            var _this=this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.downExperimentReportRequest,//下载实验报告请求
                data: { "user_id":_this.user_id},
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        console.log(_this.user_id)
                        window.location.href = pub._url+pub._DetailApi.downExperimentReport +'?user_id=' + _this.user_id; 
                    }else{
                        _this.$message.error(res.msg);
                    }
                }
            });
        }
    }
})




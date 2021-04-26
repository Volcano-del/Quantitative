var app = new Vue({
    el: "#app",
    data: {
        account_num:"",
        password:"",
        errorStatus:"",
        errorMsg:"",
        user_id:""
    },
    created(){
        // console.log('账号：'+this.account_num+',密码：'+this.password);
    },
    methods: {
        judgeLog(){
            var _this = this;
            if(_this.account_num==""){
                _this.errorStatus=true;
                _this.errorMsg="账号不能为空";
                return;
            }else if(_this.password==""){
                _this.errorStatus=true;
                _this.errorMsg="密码不能为空";
                return;
            }else if(_this.account_num!="" && _this.password.Length != ""){
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.login,
                    data: { "account_num": _this.account_num,"password":_this.password },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            var user_id=res.data.user_id;
                            sessionStorage.user_id=user_id;
                            _this.errorStatus=false;
                            _this.errorMsg="";
                            sessionStorage.setItem("user_id",user_id);
                            window.location.href = '../index.html';
                        }else{
                            _this.errorStatus=true;
                            _this.errorMsg=res.msg;
                        }
                    }
                });
            }
        },
    },
    
directives: {
    // 输入框获取焦点以及失去焦点时value值得变化以及父元素样式的变化
    'code': {
        inserted: function (el) {
            var el = document.getElementsByTagName("input");  
            var parent  = document.getElementsByClassName("msg");
            console.log(parent)
            el.onfocus = function () {
                parent.style.bordercolor = '#4182fa'
            }
            el.onblur = function () {
                parent.style.bordercolor = '#eeeeee'
            }
        }
    }
},
})
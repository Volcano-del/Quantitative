"use strict";

function _axios() {
    var para = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        url: url,
        json: json,
        fn: fn
    };

    $.ajax({
        type: "POST",
        url: para.url,
        contentType: "application/json",
        cache: true,
        async: true,
        data: para.json,
        dataType: 'json',
        success: function success(res) {
            if (para.fn) {
                para.fn(res);
            }
        },
        error: function error(err) {
            //请求出错处理
            console.error(err.statusText);
            // alert("出情况了");
        }
    });
}

//oracle版本

var baseL = "http://39.96.165.101/";
//  var baseL = "http://192.168.2.124:8081/";
var projectName = "quant/";
var baseURL = baseL + projectName;
// var webSocket_url = baseURL
// var url = baseURL
var pub = {
    // 公共接口地址
    _url: baseURL,
    _ul: baseL,
    // 详细接口api地址
    _DetailApi: {
        // 非实验部分
        departmentList: "quant/createMessage", //创建留言
        getList: "quant/listMessagePage", //留言分页列表
        listNewMessagePage: "quant/listNewMessagePage", //查看留言消息分页列表
        removeNewMessage: "quant/removeNewMessage", //解除留言提醒
        findReplyList: "quant/findReplyList" ,//查询评论详情
        listReply: "quant/listReply" ,//留言回复详情列表
        userReply: "quant/userReply", //用户回复
        login:"quant/login",//账号登录
        reg:"quant/reg",//账号注册
        studentInfo:"quant/studentInfo",//查询学生信息
        editPassword:"quant/editPassword",//学生修改密码
        uploadPic:"quant/uploadPic",//上传图片
        editStudent:"quant/editStudent",//修改学生信息
        editStudentIphone:"quant/editStudentIphone",//修改手机号
        findUserMessageExist:"quant/findUserMessageExist",//查询用户留言是否存在
        // 实验部分
        findSampleStock:"quant/findSampleStock",//样本股字典
        findStockTZ:"quant/findStockTZ",//股票时间区间
        findStockPick:"quant/findStockPick",//查询股票选择列表
        findStockDealRecord:"quant/findStockDealRecord",//查询股票交易记录
        quantitativeAnalysis:"quant/quantitativeAnalysis",//实验量化分析
        findDealStockProgress:"quant/findDealStockProgress",// 量化分析完成率
        createNewExperiment:"quant/createNewExperiment",//创建实验信息
        findStockECDate:"quant/findStockECDate",//查询股票图表数据
        findExprimentRecord:"quant/findExprimentRecord",//查询学生实验记录
        uploadFile:"quant/uploadFile",//上传附件
        downExperimentReportRequest:"quant/downExperimentReportRequest",//下载实验报告请求
        downExperimentReport:"quant/downExperimentReport",//下载实验报告
        uploadExperimentInfo:"quant/uploadExperimentInfo",//上传实验信息
        excel:"quant/excel",//导出实验数据
        saveExperimentRecordContent:"quant/saveExperimentRecordContent",//保存学生实验报告内容
        findExperimentRecordContent:"quant/findExperimentRecordContent"//查询学生实验报告内容
    },

    /**
     * op 形参
     * @param {*} that this指向
     * @param {*} _url 公共接口地址
     * @param {*} ur 具体接口地址
     * @param {*} data 形参
     * @param {*} cbk 回调
     */
    _InitAjax(op) {
        $.ajax({
            type: "POST",
            // timeout : 1000, //超时时间设置，单位毫秒
            contentType: "application/json",
            url: op._url + op.ur,
            data: JSON.stringify(op.data),
            error: function(request) {

            },
            success: function(res) {
                op.cbk(res);
            },

            fail: function(r) {


            }
        });
    },
    _InitAxios(op) {
        var _op = op;
        axios({
                url: op._url + op.ur,
                method: "post",
                data: JSON.stringify(op.data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function(res) {
                _op.cbk(res.data);
            })
            .catch(function(cat) {

            });
    },

    /**
     *  截取页面链接中的参数
     *  window.location
     *  window的location对象
     *  search
     *  得到的是url中query部分
     *  substr()
     *  返回一个从指定位置开始的指定长度的子字符串
     *  这里设置为1，是为了把url中的?号去掉
     *  split()
     *  将一个字符串分割为子字符串，然后将结果作为字符串数组返回
     *  这里就是把query部分以&为分割符，分割
     */
    _LinkParm: function(variable) {
        var query = window.location.search.substring(1); //截取查询字符串?后面的参数
        // console.log(variable);
        var vars = query.split("&"); // 用&符号将其分割起来
        // console.log(vars);
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // console.log(pair);
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
        var query1 = window.location.search.s;
    },

    /**
     * @param {*} event 输入框的值
     * @param {*} tgt 输入框绑定的值
     */
    _CheckPhone(event, tgt) {

        var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phone.test(tgt)) {
            alert("输入正确的手机号！");
            tgt = "";
        }
    },

    /**
     * 数组转对象
     */
    _change_obj(arr) {
        var _obj = {};
        for (var it = 0; it < arr.length; it++) {
            for (var item in arr[it]) {
                _obj[item] = arr[it][item];
            }
        }
        return _obj;
    },

    /**
     *
     * @param {*} old_r 原有数组
     * @param {*} new_r 新数组 需要连接到原有数组之上
     */
    _Arr_concat(old_r, new_r) {
        var arr = old_r;
        var _r = new_r;
        var _c = arr.concat(_r);
        old_r = _c;

        return old_r;
    },

    /**
     * 判断是否为空字符串
     * @param {*} obj  传入形参 即需要判断的字符串
     */
    _isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    }

};
//获取URL参数
function getQueryVariable(variable) {
    var index;
    var query = window.location.search.substring(1);

    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        if (pair[0] == variable) { index = i }
    }

    if (index >= 0) {
        return vars[index].split("=")[1];
    } else {
        return "";
    }
}
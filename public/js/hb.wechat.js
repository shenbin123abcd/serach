
hb.wechat=(function(){
    "use strict";
    var default_data = {
        title: '幻熊在线学院免费版',
        desc: '500位行业大咖，2000小时在线视频，完全免费的幻熊在线学院，婚礼人学习必备！',
        link: window.location.href.split('#')[0],
        img: 'http://7xopel.com2.z0.glb.qiniucdn.com/College/images/college_cover3.jpg?imageView/1/w/150/h/150'
    };
    var init = function(share,callback) {
        //console.log('init');

        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger"){
            return ;
        }

        $.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function(data, textStatus) {
            if (textStatus == 'success') {
                act(typeof share != 'undefined' ? share : default_data,callback);
            }
        });
    };

    function act(data,callback) {


        //var obj = $resource('/api/getWechat?url=' + encodeURIComponent($location.absUrl().split('#')[0]));
        //console.log('act');
        var url=window.location.href.split('#')[0];
        //var url='http://aien.halobear.cn/qingjian/1/';
        $.get('/api/getWechat?url=' + encodeURIComponent(url))
        .done(function(ret) {
            console.log(ret);
            //console.log($.extend({
            //    debug: 0,
            //    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ']
            //}, ret));
            wx.config($.extend({
                debug: 0,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ']
            }, ret));

            wx.ready(function() {
                if(callback){
                    callback();
                }
                wx.onMenuShareTimeline({
                    title: data.desc,
                    desc: data.desc,
                    link:  data.link,
                    imgUrl:  data.img,
                    dataUrl: '',
                    success: function(res) {},
                    cancel: function() {}
                });
                wx.onMenuShareAppMessage({
                    title: data.title,
                    desc: data.desc,
                    link:  data.link,
                    imgUrl:  data.img,
                    dataUrl: '',
                    success: function(res) {},
                    cancel: function() {}
                });
                wx.onMenuShareQQ({
                    title: data.title,
                    desc: data.desc,
                    link:  data.link,
                    imgUrl:  data.img,
                    dataUrl: '',
                    success: function(res) {},
                    cancel: function() {}
                });







                //document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
                //    alert("WeixinJSBridgeReady");
                //
                //});
            });
        });
    }

    return {
        init:init
    }
}());






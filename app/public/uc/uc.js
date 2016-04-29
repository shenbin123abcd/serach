(function(){
    "use strict";
    angular.module('halo', [
        'ngResource',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'blueimp.fileupload'
    ]);


    /*


    $('#fileupload').fileupload({
        //dataType: 'json',
        url:'http://up.qiniu.com',
        //url:'http://10.0.1.29:1111/file/upload',
        formData:{
            token:hb.Cookies.getJSON('avatar_token')||'m_bQ6vCqK-1n_myddynLMQxg0rxw3YqRptv5D7_i:vCIekJzZo2aWArOxYqBgPdStgrw=:eyJzY29wZSI6ImhhbG9hdmF0YXIiLCJkZWFkbGluZSI6MTQ2MzI4NjkzNywic2F2ZUtleSI6ImF2YXRhclwvdGVtcFwvJCh5ZWFyKSQobW9uKVwvJHtkYXl9XC8kKGV0YWcpJChzdWZmaXgpIiwiY2FsbGJhY2tVcmwiOiJodHRwOlwvXC9jb2xsZWdlLmhhbG9iZWFyLmNvbVwvYXBpXC9xaW5pdVVwbG9hZCIsImNhbGxiYWNrQm9keSI6ImtleT0kKGtleSkmdz0kKGltYWdlSW5mby53aWR0aCkmaD0kKGltYWdlSW5mby5oZWlnaHQpJmZuYW1lPSQoZm5hbWUpJmZzaXplPSQoZnNpemUpJmZpbGV0eXBlPSR7eDpmaWxldHlwZX0mY29kZT0ke3g6Y29kZX0mbW9kdWxlPWF2YXRhclwvdGVtcCJ9'
        },
        singleFileUploads:true,
        done: function (e, data) {
            console.log('done',e, data);

        },
        fail: function (e, data) {
            console.log('fail',e, data);

        },
        progressall: function (e, data) {
            //var progress = parseInt(data.loaded / data.total * 100, 10);
            console.log('progressall',parseInt(data.loaded / data.total * 100, 10));
        },
        //always:function (e, data) {
        //    console.log('always',e, data);
        //},
        //processstart:function (e) {
        //    console.log('processstart',e);
        //},
        //process:function (e, data) {
        //    console.log('process',parseInt(data.loaded / data.total * 100, 10));
        //},

    });

    */
}());
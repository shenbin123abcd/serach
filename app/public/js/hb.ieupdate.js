(function (window, document) {
    "use strict";
    var css = "*{\n        margin: 0;\n        padding: 0;\n    }\n    .icon-ieupdate{\n        display: inline-block;\n        *zoom:1;\n        float: left;\n        cursor: pointer;\n    }\n    .ieupdate-icon-wrapper{\n        display: inline-block;\n        *zoom:1;\n        height: 90px;\n        line-height: 1;\n        cursor: pointer;\n    }\n    .icon-ieupdate_360_8 {\n        background-image: url(http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png);\n        background-position: 0px 0px;\n        width: 89px;\n        height: 88px;\n    }\n    .icon-ieupdate_360se_8 {\n        background-image: url(http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png);\n        background-position: -178px -82px;\n        width: 77px;\n        height: 81px;\n    }\n    .icon-ieupdate_chrome_8 {\n        background-image: url(http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png);\n        background-position: -178px 0px;\n        width: 82px;\n        height: 82px;\n    }\n    .icon-ieupdate_firefox_8 {\n        background-image: url(http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png);\n        background-position: 0px -88px;\n        width: 86px;\n        height: 85px;\n    }\n    .icon-ieupdate_ie_8 {\n        background-image: url(http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png);\n        background-position: -86px -88px;\n        width: 87px;\n        height: 80px;\n    }\n    .icon-ieupdate_sougou_8 {\n        background-image: url(http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png);\n        background-position: -89px 0px;\n        width: 89px;\n        height: 86px;\n    }\n\n    .ieupdate-img{\n        border: none;\n    }\n    .ieupdate-page-wraper{\n        width: 960px;\n        margin: 0 auto;\n        color: #333;\n        line-height: 1.5;\n    }\n    .ieupdate-h1{\n        font-size: 18px;\n        margin-top: 30px;\n    }\n    .ieupdate-h2{\n        font-size: 14px;\n        margin-top: 20px;\n        font-weight: normal;\n    }\n    .ieupdate-ul{\n        margin-top: 30px;\n        list-style: none;\n        zoom:1;\n    }\n    .ieupdate-li{\n        float: left;\n        margin-right: 30px;\n        text-align: center;\n    }\n    .ieupdate-li a{\n        color: #333333;\n        text-decoration: none;\n        display: block;\n    }\n    .ieupdate-li a:hover{\n        color: #333333;\n        text-decoration: underline;\n    }\n    .ieupdate-h6{\n        font-weight: normal;\n        font-size: 12px;\n        margin-top: 4px;\n    }";
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    var htmlStr = "\n\n\n<div class=\"ieupdate-page-wraper\">\n    <div id=\"ie\">\n        <h1 class=\"ieupdate-h1\">\u62B1\u6B49\uFF0C\u60A8\u4F7F\u7528\u7684ie\u6D4F\u89C8\u5668\u7248\u672C\u592A\u4F4E</h1>\n        <h2 class=\"ieupdate-h2\">\u4F4E\u7248\u672Cie\u6D4F\u89C8\u5B58\u5728\u5B89\u5168\u6F0F\u6D1E\uFF0C\u5E76\u4E14\u5FAE\u8F6F\u5B98\u65B9\u5DF2\u7ECF\u505C\u6B62\u5BF9\u5176\u652F\u6301\u7EF4\u62A4\uFF0C\u8BF7\u5BF9\u6D4F\u89C8\u5668\u5347\u7EA7\u6216\u8005\u6539\u7528\u5176\u4ED6\u6D4F\u89C8\u5668\u3002</h2>\n    </div>\n    <div id=\"iec\" style=\"display:none;\">\n        <h1 class=\"ieupdate-h1\">\u770B\u8D77\u6765\u60A8\u7684IE\u6D4F\u89C8\u5668\u8BBE\u7F6E\u4E86\u517C\u5BB9\u6A21\u5F0F</h1>\n        <h2 class=\"ieupdate-h2\">\u60A8\u53EF\u4EE5\u70B9\u51FB\u5DE5\u5177-\u517C\u5BB9\u6027\u89C6\u56FE\u8BBE\u7F6E\u4E2D\uFF0C\u53D6\u6D88\u52FE\u9009'\u5728\u517C\u5BB9\u6027\u89C6\u56FE\u4E2D\u663E\u793A\u6240\u6709\u7F51\u7AD9',\u6216\u8005\u5728\u4EE5\u4E0B\u5217\u8868\u4E2D\u4E0B\u8F7D\u4E00\u6B3E\u73B0\u4EE3\u6D4F\u89C8\u5668</h2>\n    </div>\n    <ul class=\"ieupdate-ul\">\n        <li  class=\"ieupdate-li\">\n            <a href=\"http://rj.baidu.com/soft/detail/14744.html\" target=\"_blank\">\n                <span class=\"ieupdate-icon-wrapper\"><span class=\"icon-ieupdate icon-ieupdate_chrome_8\"></span></span>\n                <h6 class=\"ieupdate-h6\">\u8C37\u6B4C\u6D4F\u89C8\u5668</h6>\n            </a>\n        </li>\n        <li class=\"ieupdate-li\">\n            <a href=\"http://chrome.360.cn\" target=\"_blank\">\n                <span class=\"ieupdate-icon-wrapper\"><i class=\"icon-ieupdate icon-ieupdate_360_8\"></i></span>\n                <h6 class=\"ieupdate-h6\">360\u6781\u901F\u6D4F\u89C8\u5668</h6>\n            </a>\n        </li>\n        <li class=\"ieupdate-li\" id=\"xp\">\n            <a href=\"http://windows.microsoft.com/zh-cn/internet-explorer/download-ie\" target=\"_blank\">\n                <span class=\"ieupdate-icon-wrapper\"><i class=\"icon-ieupdate icon-ieupdate_ie_8\"></i></span>\n                <h6 class=\"ieupdate-h6\">\u6700\u65B0ie\u6D4F\u89C8\u5668</h6>\n            </a>\n        </li>\n        <li class=\"ieupdate-li\">\n            <a href=\"http://se.360.cn/\" target=\"_blank\">\n                <span class=\"ieupdate-icon-wrapper\"><i class=\"icon-ieupdate icon-ieupdate_360se_8\"></i></span>\n                <h6 class=\"ieupdate-h6\">360\u5B89\u5168\u6D4F\u89C8\u5668</h6>\n            </a>\n        </li>\n        <li class=\"ieupdate-li\">\n            <a href=\"http://ie.sogou.com/\" target=\"_blank\">\n                <span class=\"ieupdate-icon-wrapper\"><i class=\"icon-ieupdate icon-ieupdate_sougou_8\"></i></span>\n                <h6 class=\"ieupdate-h6\">\u641C\u72D7\u6D4F\u89C8\u5668</h6>\n            </a>\n        </li>\n    </ul>\n</div>\n\n\n    ";
    function renderDom() {
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        //document.getElementsByTagName("html")[0].appendChild(document.createElement('body'));
        //document.createElement('body');
        if (document.getElementsByTagName("body")[0]) {
            document.getElementsByTagName("body")[0].innerHTML = htmlStr;
            showIeGuide();
        }
        else {
            document.getElementsByTagName("html")[0].appendChild(document.createElement('body'));
            setTimeout(function () {
                document.getElementsByTagName("body")[0].innerHTML = htmlStr;
                showIeGuide();
            }, 0);
        }
        function showIeGuide() {
            function IECompatibility() {
                var agentStr = navigator.userAgent;
                this.IsIE = false;
                this.IsOn = undefined; //defined only if IE
                this.Version = undefined;
                if (agentStr.indexOf("MSIE 7.0") > -1) {
                    this.IsIE = true;
                    this.IsOn = true;
                    if (agentStr.indexOf("Trident/6.0") > -1) {
                        this.Version = 'IE10';
                    }
                    else if (agentStr.indexOf("Trident/5.0") > -1) {
                        this.Version = 'IE9';
                    }
                    else if (agentStr.indexOf("Trident/4.0") > -1) {
                        this.Version = 'IE8';
                    }
                    else {
                        this.IsOn = false; // compatability mimics 7, thus not on
                        this.Version = 'IE7';
                    }
                } //IE 7
            }
            var iev = new IECompatibility();
            //  alert(iev.Version);
            var ie = document.getElementById("ie");
            var iec = document.getElementById("iec");
            if (iev.Version) {
                if (iev.Version != 'ie7' || iev.Version != 'ie8') {
                    ie.style.display = "none";
                    iec.style.display = "block";
                }
            }
            function hideIeWhenXp() {
                var xp = document.getElementById("xp");
                xp.style.display = "none";
            }
            function detectOS() {
                var sUserAgent = navigator.userAgent;
                //alert(sUserAgent);
                var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
                if (isWin) {
                    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                    if (isWin2K) {
                        hideIeWhenXp();
                    }
                    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                    if (isWinXP) {
                        hideIeWhenXp();
                    }
                    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                    if (isWin2003) {
                        hideIeWhenXp();
                    }
                }
                return "other";
            }
            detectOS();
        }
    }
    document.execCommand("Stop");
    var bgImg = new Image();
    bgImg.src = 'http://7xopel.com2.z0.glb.qiniucdn.com/serarch/ieupdate_s.png';
    var isOloadbgImg = false;
    bgImg.onload = function () {
        isOloadbgImg = true;
        renderDom();
        if (window._hmt) {
            window._hmt.push(['_trackPageview', '/ieupdate']);
        }
    };
    //while (!isOloadbgImg){
    //    //nothing
    //    alert('11')
    //    setInterval(function(){
    //        alert('dd')
    //    }, 3000);
    //}
}(window, document));

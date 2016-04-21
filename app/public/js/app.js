(function(){
    "use strict";
    window.app=(function(){
        function getStaticData(){
            //console.log(hb.Cookies.getJSON("statisticData"));
            if(hb.Cookies.getJSON("statisticData")){
                render(hb.Cookies.getJSON("statisticData"));
            }else{
                app.service.getStaticData().then(function(res){
                    //console.log(res)
                    hb.Cookies.set('statisticData', res, { expires: 1/12});
                    render(res)
                });
            }

            function render(res){
                $("#total-case").text(hb.util.formatNumber(res.case));
                $("#total-company").text(hb.util.formatNumber(res.company));
                $("#total-image").text(hb.util.formatNumber(res.image));
            }
        }
        function ieUpdate(){
            //console.log(hb.Cookies.getJSON("statisticData"));
            //alert(hb.Cookies.get("isShowIeUpdate"));

            if(hb.Cookies.get("isShowIeUpdate")){
                $("#ie-update").hide();
            }else{
                $("#ie-update").show();
            }
            $("#ie-update-close").on('click',function(){
                hb.Cookies.set('isShowIeUpdate', true);
                $("#ie-update").hide();
            });
        }
        return {
            getStaticData:getStaticData,
            ieUpdate:ieUpdate,
        };
    }());

    moment.locale('zh-cn', {
        meridiem : function (hour, minute, isLowercase) {
            if (hour < 9) {
                return "早上";
            } else if (hour < 11 && minute < 30) {
                return "上午";
            } else if (hour < 13 && minute < 30) {
                return "中午";
            } else if (hour < 18) {
                return "下午";
            } else {
                return "晚上";
            }
        }
    });
}());









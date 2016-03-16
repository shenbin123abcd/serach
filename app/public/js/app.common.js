app.common=(function(){
    "use strict";
    var companyDesc=function(){
        var init=function(){
            var imgHeight=$(".company-img").css("height");
            $(".company-desc").css("height",imgHeight);
        }
        init();
        $(window).resize(function() {
            init();
        });
    };
    var verticalMiddle=function(WrapperIndex,InnerIndex){
        var WrapperHeight=parseInt($("."+WrapperIndex).css("height"));
        var innerHeight=parseInt($("."+InnerIndex).css("height"));
        var num=((WrapperHeight-innerHeight)/2);
        $("."+InnerIndex).css("position","relative").css("top",num);
    };
    var commitForm=function(){
        $("textarea").on("input",function(){
            var num = 500-parseInt($(this).val().length);
            $(".num").text(num);
        })
    };
    var alignCenter=function(wrapper,inner){
        var wrapperWidth=parseInt($("."+wrapper).css("width"));
        var innerWidth=parseInt($("."+inner).css("width"));
        var num=((wrapperWidth-innerWidth)/2);
        $("."+inner).css("position","relative").css("left",num);
    };
    return {
        companyDesc:companyDesc,
        verticalMiddle:verticalMiddle,
        commitForm:commitForm,
        alignCenter:alignCenter,
    }
}());
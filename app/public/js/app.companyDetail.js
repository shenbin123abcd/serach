app.companyDetail=(function(){
    "use strict";
    var uiHeight=function(){
        var height = $(".desc-pic").css("height");
        $(".desc-p").css("height",height);

    };
    var verticalMiddle=function(WrapperIndex,InnerIndex){
        var WrapperHeight=parseInt($("."+WrapperIndex).css("height"));
        var innerHeight=parseInt($("."+InnerIndex).css("height"));
        var num=((WrapperHeight-innerHeight)/2);
        $("."+InnerIndex).css("position","relative").css("top",num);
    };
    var alignCenter=function(wrapper,inner){
        var wrapperWidth=parseInt($("."+wrapper).css("width"));
        var innerWidth=parseInt($("."+inner).css("width"));
        var num=((wrapperWidth-innerWidth)/2);
            $("."+inner).css("position","relative").css("left",num);
    }
    return {
        uiHeight: uiHeight,
        verticalMiddle:verticalMiddle,
        alignCenter:alignCenter
    }
}());
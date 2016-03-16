app.companyDetail=(function(){
    "use strict";
    var uiHeight=function(){
        var height = $(".desc-pic").css("height");
        $(".desc-p").css("height",height);

    };
    function omit(){
        var desc_title_text = $(".p-title").text().substr(0,8)+"...";
        $(".p-title").text(desc_title_text);
    };
    return {
        uiHeight: uiHeight,
        omit:omit,
    }
}());
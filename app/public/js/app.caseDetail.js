app.caseDetail=(function(){
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
    function omit(){
        var desc_title_text = $(".desc_title").text().substr(0,8)+"...";
        $(".desc_title").text(desc_title_text);
        var desc_company_text = $(".desc_company").text().substr(0,8)+"...";
        $(".desc_company").text(desc_company_text);
    }
    return {
        companyDesc:companyDesc,
        verticalMiddle:verticalMiddle,
        commitForm:commitForm,
        omit:omit,
    }
}());
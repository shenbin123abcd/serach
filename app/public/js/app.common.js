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
        $(window).load(function(){
            var WrapperHeight=parseInt($("."+WrapperIndex).css("height"));
            var innerHeight=parseInt($("."+InnerIndex).css("height"));
            var num=((WrapperHeight-innerHeight)/2);
            $("."+InnerIndex).css("position","relative").css("top",num);
        });
    };
    var commitForm=function(){
        $("textarea").on("input",function(){
            var num = 500-parseInt($(this).val().length);
            $(".num").text(num);
            if(num<0){
                $("textarea").val($("textarea").val().substr(0,499));
                $(".num").text(0);
            }
        })
    };
    var alignCenter=function(wrapper,inner){
        $(window).load(function(){
            var wrapperWidth=parseInt($("."+wrapper).css("width"));
            var innerWidth=parseInt($("."+inner).css("width"));
            var num=((wrapperWidth-innerWidth)/2);
            $("."+inner).css("position","relative").css("left",num);
        })
    };
    function omit(Newtext,num){
        $(window).load(function() {
            var text = $("." + Newtext).text()
            $("." + Newtext).text(text.substr(0, num) + "...");
        })
    }
    function resizeLogo(elementStr,oHeight){

        var normalHeight;
        detectHeight(resizeLogo);

        function resizeLogo(){
            $(elementStr).on('load',function(){
                //console.log($(this).naturalHeight());
                if($(this).naturalHeight()<oHeight){
                    $(this).outerHeight(normalHeight);
                }

            });
        }

        function detectHeight(callback){
            var cancel=false;
            $(elementStr).on('load',function(){
                //console.log($(this).naturalHeight());
                if(cancel){return;}
                if($(this).naturalHeight()==oHeight){
                    normalHeight=$(this).height();
                    if(callback){
                        callback();
                    }
                    cancel=true;
                }
            });
        }

    }
    return {
        companyDesc:companyDesc,
        verticalMiddle:verticalMiddle,
        commitForm:commitForm,
        alignCenter:alignCenter,
        omit:omit,
        resizeLogo:resizeLogo,
    }
}());
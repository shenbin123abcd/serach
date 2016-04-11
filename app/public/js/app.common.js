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
            if(num<=0){
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
                //if($(this).naturalHeight()<oHeight){
                    $(this).outerHeight(normalHeight);
                //}

            });
        }

        function detectHeight(callback){
            var cancel=false;
            $(elementStr).on('load',function(){
                //console.log($(this).naturalHeight());
                if(cancel){return;}
                if($(this).naturalHeight()==oHeight){
                    normalHeight=$(this).outerHeight();
                    if(callback){
                        callback();
                    }
                    cancel=true;
                }
            });
        }
    }
    function sameHeight(){
        $(window).load(function(){
            var fatherHeight = $('.company-left-box').css('height');
            var sonHeight = $('.company-right-box').css('height');
            /*var init=function(){
                var sonHeight = $('.'+son).css('height',fatherHeight);
            }*/
            if(fatherHeight>sonHeight){
                $('.company-right-box').removeClass('border-right');
                $('.company-left-box').addClass('border-left');
            }else{
                $('.company-left-box').removeClass('border-left');
                $('.company-right-box').addClass('border-right');
            }
        })
    }
    function navScroll(){
        $(window).on("scroll", function() {
            if ($(window).scrollTop() > 40) {
                $("#search-main-nav").addClass("nav-fixed");
            } else {
                $("#search-main-nav").removeClass("nav-fixed");
            }
        });
    }
    return {
        companyDesc:companyDesc,
        verticalMiddle:verticalMiddle,
        commitForm:commitForm,
        alignCenter:alignCenter,
        omit:omit,
        resizeLogo:resizeLogo,
        sameHeight:sameHeight,
        navScroll:navScroll,
    }
}());
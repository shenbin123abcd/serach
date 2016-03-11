app.searchIndex=(function(){
    "use strict";
    return {
        searchForm:function(){
            $('.drop').on('click', function() {
                if($('.drop-list').hasClass('act')){
                    $(this).find('.drop-list').removeClass('act');
                    $(this).find('span').slideUp(300);
                }else{
                    $('.drop span').slideUp(300);
                    $(this).find('.drop-list').addClass('act');
                    $(this).find('span').slideDown(300);
                }
                return false;
            });
            $('.drop span button').on('click', function() {
                $(".drop").find('b').text($(this).text()).css("color","#333");
                $('.drop').find('span').slideUp(300);
            });
            $('body').not($(".search-name ")).on("click",function(){
                $('.drop').find('span').hide();
                $('.drop-list').removeClass('act');
            })
        },
        reponsiveGrid:function(){
            var init=function(){
                var height = $(".block-special-item-pic>img").css("height");
                var xolHeight=$("#xol-md-4").css("height");
                $(".block-special-item-desc").css("height",height);
                $("#xol-md-2-height").css("height",xolHeight);
            }
            init();
            $(window).resize(function() {
                init();
            });
        },
        reponsivePad:function(){
            var bIsIpad = navigator.userAgent.toLowerCase().match(/ipad/i) == "ipad";
            var width= document.documentElement.clientWidth||document.body.clientWidth;
            if(bIsIpad){
                if(width>990){
                    var padText=$(".item-desc-middle > p").text().substr(0,9)+"...";
                    $(".item-desc-middle > p").text(padText);
                }
            }else{
                var pcText= $(".item-desc-middle > p").text().substr(0,26)+"...";
                $(".item-desc-middle > p").text(pcText);
            }
        }
    }
}());
app.searchIndex=(function(){
    "use strict";
    return {
        searchForm:function(){
            var val1="";
            var val2="";
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
                var txt=$(this).text();
                $(".drop").find('b').text(txt).css("color","#333");
                $('.drop').find('span').slideUp(300);
                if(txt=="婚礼案例"){
                    val1="/case";
                    val2="tag";
                }else if(txt=="婚礼图片"){
                    val1="/picture";
                    val2="tag";
                }else if(txt=="婚礼公司"){
                    val1="/company";
                    val2="keywords";
                }
                $('form').attr("action",val1);
                $('input').attr("name",val2);
            });
            $('body').not($(".search-name ")).on("click",function(){
                $('.drop').find('span').hide();
                $('.drop-list').removeClass('act');
            })
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
        },
        sameHeight:function(father,son){
            $(window).load(function(){
                var init=function(){
                    var fatherHeight = $('.'+father).css('height');
                    $('.'+son+' img').css('height',fatherHeight);
                }
                init();
                $(window).on('orientationchange resize',function(){
                    init();
                })
            })
        },
    }
}());
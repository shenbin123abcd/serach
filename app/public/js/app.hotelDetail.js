/**
 * Created by Administrator on 2016/3/16.
 */
app.hotelDetail = (function () {
    "use strict";

    function swiper(galleryTop,galleryThumbs) {
        var galleryTop = new Swiper(galleryTop, {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 5,
            initialSlide :0,
            loop:true,
            mousewheelControl:true,
            loopedSlides: 5, //looped slides should be the same
        });
        var galleryThumbs = new Swiper(galleryThumbs, {
            spaceBetween: 5,
            slidesPerView: 5,
            initialSlide :0,
            touchRatio: 0.2,
            loop:true,
            loopedSlides: 5, //looped slides should be the same
            slideToClickedSlide: true,
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    };

    function slick(galleryTop,galleryThumbs){

        $(galleryTop).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: galleryThumbs,
            infinite:false,
            touchMove:true,
        });
        $(galleryThumbs).slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: galleryTop,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            infinite:false,
            touchMove:true,
        });
    };

    function seeMore(){
        $(window).on("load",function(){
            var height=parseInt($("#moreText").css("height"));
            if(height<=175){
                $("#seeMore").remove();
                $("#moreText").css("height","auto");
            }else{
                $("#moreText").css("height",175);
                $("#seeMore").on('click',function(){
                    $("#moreText").animate({height:height},400);
                    $("#seeMore").remove();
                });
            }
        });
    };

    function buttonIn(){
        $(window).on("load",function() {
            function init() {
                var swiperWidth = parseInt($("[swiper-slide-img]").css("width"));
                $("[swiper-thumbs]").css("left", swiperWidth + 5);
                $("[button-in]").css("width", swiperWidth);
            };
            $(window).on("resize", function () {
                init();
            });
            init();
        })
    };

    function panoPic(){
        $(window).on("load",function(){
            click();

            function click(){
                $(".swiper-thumbs a.swiper-slide.slick-slide").on("click",function(event){
                    event.preventDefault();
                });
                /*$("a.swiper-slide.slick-current").off("click");*/
               $(".swiper-thumbs a.swiper-slide.slick-slide.slick-current.slick-active").on('click',function(){
                    var href=$(this).attr("href");
                    window.open(href);
                    //alert(href)
                });
            }
        });
    }

    function noIe9(){
        var DIALOG=window.app.index.DIALOG;
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){
            $("#ie-update").show();
            $(".swiper-tip").on("click",function(event){
                event.preventDefault();
                DIALOG.error("浏览器版本过低，无法观看全景图，请更换浏览器");
            })
        }
    }

    return {
        swiper: swiper,
        seeMore:seeMore,
        buttonIn:buttonIn,
        panoPic:panoPic,
        slick:slick,
        noIe9:noIe9,
    }


}());
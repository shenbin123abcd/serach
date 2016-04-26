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
            $("[swiper-thumbs]").on("click mousedown",function(){
                click();
            });
            function click(){
                $("a.swiper-slide").on("click",function(event){
                    event.preventDefault();
                });
                $("a.swiper-slide.swiper-slide-active").off("click");
                $(".gallery-thumbs a.swiper-slide.swiper-slide-active").on('click',function(){
                    var href=$(this).attr("href");
                    window.open(href);
                })
            }
        });
    }

    return {
        swiper: swiper,
        seeMore:seeMore,
        buttonIn:buttonIn,
        panoPic:panoPic,
    }


}());
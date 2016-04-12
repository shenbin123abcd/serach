/**
 * Created by Administrator on 2016/3/16.
 */
app.hotelDetail = (function () {
    "use strict";

    function swiper(galleryTop,galleryThumbs) {
        var galleryTop = new Swiper(galleryTop, {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
            initialSlide :1,
            loop:true,
            mousewheelControl:true,
            loopedSlides: 5, //looped slides should be the same
        });
        var galleryThumbs = new Swiper(galleryThumbs, {
            spaceBetween: 5,
            slidesPerView: 5.5,
            initialSlide :1,
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
    }
    return {
        swiper: swiper,
        seeMore:seeMore,
        buttonIn:buttonIn,
    }


}());
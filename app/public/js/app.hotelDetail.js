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
            loop:true,
            loopedSlides: 5, //looped slides should be the same
        });
        var galleryThumbs = new Swiper(galleryThumbs, {
            spaceBetween: 5,
            slidesPerView: 5.5,
            touchRatio: 0.2,
            loop:true,
            loopedSlides: 5, //looped slides should be the same
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }
    return {
        swiper: swiper,
    }

}());
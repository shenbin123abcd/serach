(function() {
    //Modernizr.addTest('ios', function () {
    //    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
    //});
    Modernizr.addTest('weixin', function () {
        return navigator.userAgent.match(/(MicroMessenger)/g) ? true : false
    });

}());
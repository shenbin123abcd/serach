
//jquery plugin
(function($){
    $.fn.oldToggle = function(oddfun,evenfun) {
        var ele = this;
        ele.data('clickState', false);
        ele.on('click',function() {
            if (ele.data('clickState')) {
                evenfun();
            }
            else {
                oddfun();
            }
            ele.data('clickState', !ele.data('clickState'));
        });
    };
})(jQuery);
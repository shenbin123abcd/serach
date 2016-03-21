
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


/**
 * http://www.jacklmoore.com/notes/naturalwidth-and-naturalheight-in-ie/
 *
 *  // Example usage:
 *  var nWidth = $('img#example').naturalWidth(),
 *  nHeight = $('img#example').naturalHeight();
 *
 *
 */

// adds .naturalWidth() and .naturalHeight() methods to jQuery
// for retreaving a normalized naturalWidth and naturalHeight.
(function($) {
    var props = ['Width', 'Height'],
        prop;

    while (prop = props.pop()) {
        (function(natural, prop) {
            $.fn[natural] = (natural in new Image()) ?
                function() {
                    return this[0][natural];
                } :
                function() {
                    var
                        node = this[0],
                        img,
                        value;

                    if (node.tagName.toLowerCase() === 'img') {
                        img = new Image();
                        img.src = node.src,
                            value = img[prop];
                    }
                    return value;
                };
        }('natural' + prop, prop.toLowerCase()));
    }
}(jQuery));

/**
 * 多行省略
 *
 * 匹配中文标点符号：
            String str="[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]"
            该表达式可以识别出： 。 ；  ， ： “ ”（ ） 、 ？ 《 》 这些标点符号。
 * 匹配中文汉字
            String str="[\u4e00-\u9fa5]";
             该表达式可以识别出任何汉字。
 *
 *
 */
(function($) {



    $.fn.ellipsis = function(options) {
        var defaults={};

        if(!options){
            defaults.height='';
        } else if(typeof options=='number'){
            defaults.height=options;

        }else{

            defaults = {
                height: "auto",
                before: function(){},
            };

        }


        var settings = $.extend( {}, defaults, options );

        return this.each(function(){


            var $textContanier = $(this);

            $textContanier.css('height',settings.height)

            $textContanier.wrapInner("<div class=''></div>");


            var $textTarget = $textContanier.children();


            var textContanierHeight = $textContanier.height();

//            var textTargetHeight = $textTarget.outerHeight(); while 需要用动态

            while ( $textTarget.outerHeight() > textContanierHeight) {
                $textTarget.text($textTarget.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };


            $textTarget.text($textTarget.text().replace(/[?-\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]\.\.\.$/, "..."));
            //$textTarget.text($textTarget.text().replace(/[@"\p{P}"]\.\.\.$/, "..."));

            //var str='refger?？！!';
            //console.log(str.replace(/[?？！!]/g, "符号们"));




        });

    };
})(jQuery);
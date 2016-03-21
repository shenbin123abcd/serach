/*
 * 0.0.2
 *
 *
 */

(function(window,document){
    "use strict";
    var haloBear=(function(){
        return {};
    }());

/*
*
*
* https://github.com/filamentgroup/loadCSS
* 修改
*onloadCSS
*loadCSS
*  为
* hb.onloadCSS
* hb.loadCSS
*
 */

(function(window,document){
    "use strict";
    var w=window;

    var loadCSS = function( href, before, media ){
        // Arguments explained:
        // `href` [REQUIRED] is the URL for your CSS file.
        // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
        // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
        // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
        var doc = w.document;
        var ss = doc.createElement( "link" );
        var newMedia = media || "all";
        var ref;
        if( before ){
            ref = before;
        }
        else {
            var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
            ref = refs[ refs.length - 1];
        }

        var sheets = doc.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
        ss.media = "only x";

        // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
        function ready( cb ){
            if( doc.body ){
                return cb();
            }
            setTimeout(function(){
                ready( cb );
            });
        }
        // Inject link
        // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
        // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
        ready( function(){
            ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
        });
        // A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
        var onloadcssdefined = function( cb ){
            var resolvedHref = ss.href;
            var i = sheets.length;
            while( i-- ){
                if( sheets[ i ].href === resolvedHref ){
                    return cb();
                }
            }
            setTimeout(function() {
                onloadcssdefined( cb );
            });
        };

        // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
        if( ss.addEventListener ){
            ss.addEventListener( "load", function(){
                this.media = newMedia;
            });
        }
        ss.onloadcssdefined = onloadcssdefined;
        onloadcssdefined(function() {
            if( ss.media !== newMedia ){
                ss.media = newMedia;
            }
        });
        return ss;
    };
    haloBear.loadCSS=loadCSS;
}(window,document,undefined));

    /*
     * lib onloadCSS
     */

(function(window,document){
    "use strict";
    /*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */
    /* https://github.com/filamentgroup/loadCSS */
    /* global navigator */
    /* exported onloadCSS */
    function onloadCSS( ss, callback ) {
        var called;
        function newcb(){
            if( !called && callback ){
                called = true;
                callback.call( ss );
            }
        }
        if( ss.addEventListener ){
            ss.addEventListener( "load", newcb );
        }
        if( ss.attachEvent ){
            ss.attachEvent( "onload", newcb );
        }

        // This code is for browsers that don’t support onload
        // No support for onload (it'll bind but never fire):
        //	* Android 4.3 (Samsung Galaxy S4, Browserstack)
        //	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
        //	* Android 2.3 (Pantech Burst P9070)

        // Weak inference targets Android < 4.4
        if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
            ss.onloadcssdefined( newcb );
        }
    }
    haloBear.onloadCSS=onloadCSS;
}(window,document,undefined));

    /*
     * lib
     */
    (function(window,document){
        "use strict";
        var lib=(function(){
            return{};
        }());
        haloBear.lib=lib;
    }(window,document,undefined));


    /*
     * weiui
     */
    (function(window,document,undefined){
        "use strict";
        var weui=(function(){
            var _alert=function(options){
                if(typeof options=="string"){
                    var defaults = {
                        title:'提示',
                        content:options
                    };
                }else{
                    var defaults = {
                        title:'提示',
                        content:'提示内容'
                    };
                }
                var settings = $.extend( {},defaults, options );


                var alertHtmlStr='' +
                    '<div class="weui_dialog_alert" >'+
                    '<div class="weui_mask"></div>'+
                    '<div class="weui_dialog" style="display: none;" >'+
                    '<div class="weui_dialog_hd"><strong class="weui_dialog_title">'+
                    settings.title+
                    '</strong></div>' +
                    '<div class="weui_dialog_bd">'+
                    settings.content +
                    '</div>' +
                    '<div class="weui_dialog_ft">' +
                    '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
                    '</div>' +
                    ' </div>' +
                    ' </div>' +
                    '';
                var $alertHtml=$(alertHtmlStr);
                $("body").append($alertHtml);
                $alertHtml.find(".weui_dialog").fadeIn(200);
                var $confirmBt=$alertHtml.find(".weui_btn_dialog");
                $confirmBt.on('click',function(){
                    $alertHtml.remove();
                });
            };

            var _confirm=function(options){
                var deferred = $.Deferred();
                if(typeof options=="string"){
                    var defaults = {
                        title:'提示',
                        content:options
                    };
                }else{
                    var defaults = {
                        title:'提示',
                        content:'提示内容'
                    };
                }

                var settings = $.extend( {},defaults, options );
                var confirmHtmlStr='' +
                    '<div class="weui_dialog_confirm">' +
                    '<div class="weui_mask"></div>' +
                    '<div class="weui_dialog">' +
                    '<div class="weui_dialog_hd"><strong class="weui_dialog_title">'+settings.title+'</strong></div>' +
                    '<div class="weui_dialog_bd">'+settings.content+'</div>' +
                    '<div class="weui_dialog_ft">' +
                    '<a href="javascript:;" class="weui_btn_dialog default">取消</a>' +
                    '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '';

                var $confirmHtml=$(confirmHtmlStr);
                $("body").append($confirmHtml);
                $confirmHtml.find(".weui_dialog").fadeIn(200);
                var $confirmBt=$confirmHtml.find(".weui_btn_dialog.primary");
                $confirmBt.on('click',function(){
                    $confirmHtml.remove();
                    deferred.resolve(true);
                });
                var $cancelBt=$confirmHtml.find(".weui_btn_dialog.default");
                $cancelBt.on('click',function(){
                    $confirmHtml.remove();
                    deferred.reject(false);
                });
                return deferred.promise();

            };



            var loading=(function(){
                var loadingHtmlStr='' +
                    '<div id="loadingToast" class="weui_loading_toast" >' +
                    '<div class="weui_mask_transparent"></div>' +
                    '<div class="weui_toast">' +
                    '<div class="weui_loading">' +
                    '<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
                    '</div>' +
                    '<p class="weui_toast_content">数据加载中</p>' +
                    '</div>' +
                    '</div>' +
                    '';
                var $loadingHtml=$(loadingHtmlStr);
                var show=function(){
                    $("body").append($loadingHtml);
                };
                var hide=function(){
                    $loadingHtml.remove();
                };

                return{
                    show:show,
                    hide:hide
                }
            }());

            var guideShare=(function(){

                var imgBase64="data:image/png;base64,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";

                var loadingHtmlStr=`
                    <div style="position: fixed;z-index: 99999;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.8);">
                        <img style='position: absolute;width: 138px;top: 5px;right: 20px;' src="${imgBase64}">
                    </div>
                `;
                var $loadingHtml=$(loadingHtmlStr);



                var show=function(){
                    $("body").append($loadingHtml);
                    $loadingHtml.on('click touchmove',function(){
                        $loadingHtml.remove();
                    });
                };

                var hide=function(){
                    $loadingHtml.remove();
                };

                return{
                    show:show,
                    hide:hide
                }
            }());


            var toast=function(msg){
                var toastHtmlStr='' +
                    '<div class="weui_msg_toast" >' +
                    '<div class="weui_mask_transparent"></div>' +
                    '<div class="weui_toast">' +
                    '<i class="weui_icon_toast"></i>' +
                    '<p class="weui_toast_content">'+msg+'</p>' +
                    '</div>' +
                    '</div>' +
                    '';
                var $toastHtml=$(toastHtmlStr);
                $("body").append($toastHtml);
                var $weui_toast=$toastHtml.find(".weui_toast");
                $weui_toast.fadeIn(200);
                var hideToast=function(){
                    $toastHtml.fadeOut(400).remove();
                };
                setTimeout(hideToast,600);
            };



            return{
                alert:_alert,
                confirm:_confirm,
                loading:loading,
                toast:toast,
                guideShare:guideShare
            };
        }());

        haloBear.lib.weui=weui;
    }(window,document));



    /*
     *
     * color
     */

(function(window,document){
    "use strict";
    var color=(function(){
        return{};
    }());
    haloBear.color=color;
}(window,document,undefined));

    /*
     *
     * 16进制色值转rgb
     */
(function(window,document){
    "use strict";
    function hexToRgb(hex,isString) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if(!isString){
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }else{
            return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
             : null;
        }

    }

    haloBear.color.hexToRgb=hexToRgb;
}(window,document,undefined));


    /*
     *
     * util
     */
    (function(window,document){
    "use strict";
    var util=(function(){
        return{};
    }());
    haloBear.util=util;
}(window,document,undefined));

    /*
     *
     * 反序列化数据
     * a=1&b=2  =》 {a:1,b:2}
     *
     *
     */
    (function(window,document,undefined) {
        "use strict";
        var QueryStringToHash = function QueryStringToHash (query) {
            if(!query){
                return {};
            }
            var query_string = {};
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                pair[0] = decodeURIComponent(pair[0]);
                pair[1] = decodeURIComponent(pair[1]);
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = pair[1];
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [ query_string[pair[0]], pair[1] ];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(pair[1]);
                }
            }
            return query_string;
        };

        haloBear.util.deParam=QueryStringToHash;
    })(window, document);


    /*
     *
     * 隐藏虚拟键盘
     */
    (function(window,document,undefined) {
        "use strict";
        var hideKeyboard = function() {
            document.activeElement.blur();
            $("input").blur();
        };
        haloBear.util.hideKeyboard=hideKeyboard;
    })(window, document);
    /*
     *
     * 数字加逗号
     */
    (function(window,document,undefined) {
        "use strict";
        /*
         *
         * 数字加逗号

         */
        var formatNumber = function(n) {
            var numberWithCommas,wanN;
            if(n>9999){
                wanN=n/10000
            }

            numberWithCommas=function(x) {
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                parts[1]&&(parts[1]=parts[1].substr(0,1));
                return parts.join(".");
            };

            //if(n>9999){
            //    //console.log(numberWithCommas(wanN),'万');
            //
            //
            //    return numberWithCommas(wanN)+'万';
            //}

            return numberWithCommas(n)

        };
        haloBear.util.formatNumber=formatNumber;
    })(window, document);

    /*
     hb.util.loading
     require spin.js
     */
    (function(window,document,undefined) {
        "use strict";

        var loading=(function(){
            var loadingHtmlStr=`
            <div style="position: fixed;z-index: 9999999;width: 100%;height: 100%;left: 0;top: 0;background: rgba(0,0,0,0.2);"></div>
            `;
            var $loadingHtml=$(loadingHtmlStr);

            var target = $loadingHtml.get()[0];
            var spinner = new Spinner().spin(target);

            var show=function(){
                $("body").append($loadingHtml);
            };
            var hide=function(){
                $loadingHtml.remove();
            };

            return{
                show:show,
                hide:hide
            }
        }());
        haloBear.util.loading=loading;
    })(window, document);


/*
 hb.location
 */
(function(window,document,undefined){
    "use strict";
    var location=(function(){
        return{};
    }());
    haloBear.location=location;
}(window,document));

/*
 hb.location.hash.get()
 */
(function(window,document,undefined) {
    "use strict";
    var hash = (function() {

        var fromHash = function() {
            var params = window.location.hash ? window.location.hash.substr(1).split("&") : [],
                paramsObject = {};

            for(var i = 0; i < params.length; i++) {
                var a = params[i].split("=");
                paramsObject[a[0]] =  decodeURIComponent(a[1]);
            }
            return paramsObject;
        };

        var toHash = function(params) {
            var str = [];
            for(var p in params) {
                str.push(p + "=" + encodeURIComponent(params[p]));
            }
            window.location.hash = str.join("&");
        };

        return {
            get: function(param) {
                var params = fromHash();
                if (param) {
                    return params[param];
                } else {
                    return params;
                }
            },
            set: function(param) {
                toHash(param);
            },
            add: function(newParams,removeParams) {
                var removeParams=removeParams||[];
                removeParams=[].concat(removeParams);
                var params = fromHash();
                var paramsAfterRemove = {};
                removeParams.forEach(function(n,i){
                    for (var p in params) {
                        if(n!=p){
                            paramsAfterRemove[p] = params[p];
                        }
                    }

                });


                for (var p in newParams) {
                    //params[p] = newParams[p];
                    paramsAfterRemove[p] = newParams[p];
                }
                //toHash(params);
                //console.log(paramsAfterRemove);
                toHash(paramsAfterRemove);
            },
            remove: function(removeParams) {
                removeParams = (typeof(removeParams)=='string') ? [removeParams] : removeParams;
                var params = fromHash();
                for (var i = 0; i < removeParams.length; i++) {
                    delete params[removeParams[i]];
                }
                toHash(params);
            },
            clear: function() {
                toHash({});
            }
        };
    })();
    haloBear.location.hash=hash;
})(window, document);


/*
 修改自 js-url#2.1.0
 "homepage": "https://github.com/websanova/js-url",
 替换了全局变量
 url换成 hb.location.url
 */
(function(window, undefined) {
    var url = (function() {
        function _t() {
            return; new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);
        }

        function _d(s) {
            return decodeURIComponent(s.replace(/\+/g, ' '));
        }

        function _i(arg, str) {
            var sptr = arg.charAt(0),
                split = str.split(sptr);

            if (sptr === arg) { return split; }

            arg = parseInt(arg.substring(1), 10);

            return split[arg < 0 ? split.length + arg : arg - 1];
        }

        function _f(arg, str) {
            var sptr = arg.charAt(0),
                split = str.split('&'),
                field = [],
                params = {},
                tmp = [],
                arg2 = arg.substring(1);

            for (var i in split) {
                field = split[i].match(/(.*?)=(.*)/);

                // TODO: regex should be able to handle this.
                if ( ! field) {
                    field = [split[i], split[i], ''];
                }

                if (field[1].replace(/\s/g, '') !== '') {
                    field[2] = _d(field[2] || '');

                    // If we have a match just return it right away.
                    if (arg2 === field[1]) { return field[2]; }

                    // Check for array pattern.
                    tmp = field[1].match(/(.*)\[([0-9]+)\]/);

                    if (tmp) {
                        params[tmp[1]] = params[tmp[1]] || [];

                        params[tmp[1]][tmp[2]] = field[2];
                    }
                    else {
                        params[field[1]] = field[2];
                    }
                }
            }

            if (sptr === arg) { return params; }

            return params[arg2];
        }

        return function(arg, url) {
            var _l = {}, tmp, tmp2;

            if (arg === 'tld?') { return _t(); }

            url = url || window.location.toString();

            if ( ! arg) { return url; }

            arg = arg.toString();

            if (tmp = url.match(/^mailto:([^\/].+)/)) {
                _l.protocol = 'mailto';
                _l.email = tmp[1];
            }
            else {

                // Hash.
                if (tmp = url.match(/(.*?)#(.*)/)) {
                    _l.hash = tmp[2];
                    url = tmp[1];
                }

                // Return hash parts.
                if (_l.hash && arg.match(/^#/)) { return _f(arg, _l.hash); }

                // Query
                if (tmp = url.match(/(.*?)\?(.*)/)) {
                    _l.query = tmp[2];
                    url = tmp[1];
                }

                // Return query parts.
                if (_l.query && arg.match(/^\?/)) { return _f(arg, _l.query); }

                // Protocol.
                if (tmp = url.match(/(.*?)\:?\/\/(.*)/)) {
                    _l.protocol = tmp[1].toLowerCase();
                    url = tmp[2];
                }

                // Path.
                if (tmp = url.match(/(.*?)(\/.*)/)) {
                    _l.path = tmp[2];
                    url = tmp[1];
                }

                // Clean up path.
                _l.path = (_l.path || '').replace(/^([^\/])/, '/$1').replace(/\/$/, '');

                // Return path parts.
                if (arg.match(/^[\-0-9]+$/)) { arg = arg.replace(/^([^\/])/, '/$1'); }
                if (arg.match(/^\//)) { return _i(arg, _l.path.substring(1)); }

                // File.
                tmp = _i('/-1', _l.path.substring(1));

                if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
                    _l.file = tmp[0];
                    _l.filename = tmp[1];
                    _l.fileext = tmp[2];
                }

                // Port.
                if (tmp = url.match(/(.*)\:([0-9]+)$/)) {
                    _l.port = tmp[2];
                    url = tmp[1];
                }

                // Auth.
                if (tmp = url.match(/(.*?)@(.*)/)) {
                    _l.auth = tmp[1];
                    url = tmp[2];
                }

                // User and pass.
                if (_l.auth) {
                    tmp = _l.auth.match(/(.*)\:(.*)/);

                    _l.user = tmp ? tmp[1] : _l.auth;
                    _l.pass = tmp ? tmp[2] : undefined;
                }

                // Hostname.
                _l.hostname = url.toLowerCase();

                // Return hostname parts.
                if (arg.charAt(0) === '.') { return _i(arg, _l.hostname); }

                // Domain, tld and sub domain.
                if (_t()) {
                    tmp = _l.hostname.match(_t());

                    if (tmp) {
                        _l.tld = tmp[3];
                        _l.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
                        _l.sub = tmp[1] || undefined;
                    }
                }

                // Set port and protocol defaults if not set.
                _l.port = _l.port || (_l.protocol === 'https' ? '443' : '80');
                _l.protocol = _l.protocol || (_l.port === '443' ? 'https' : 'http');
            }

            // Return arg.
            if (arg in _l) { return _l[arg]; }

            // Return everything.
            if (arg === '{}') { return _l; }

            // Default to undefined for no match.
            return undefined;
        };
    })();
    haloBear.location.url=url;
})(window);

/*
 validation

 */
(function(window, document,undefined){
    "use strict";
    var validation=(function(){
        return{};
    }());
    haloBear.validation=validation;
}(window, document));

/*
 hb.location.validation.checkPhone(string)
 return boolean
 */
(function(window, document,undefined){
    "use strict";
    var checkPhone=function(num){
        //表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(num))){
            return false;
        }else{
            return true;
        }
    };
    haloBear.validation.checkPhone=checkPhone;
}(window, document));



/*
 *  Cookies
 *  修改covert，window 改hb,默认编码改为 encodeURIComponent，
 *  hb.Cookies
 *
 *
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(window, document,undefined){
    "use strict";


    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define(factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        } else {
            var _OldCookies = haloBear.Cookies;
            var api = haloBear.Cookies = factory();
            api.noConflict = function () {
                haloBear.Cookies = _OldCookies;
                return api;
            };
        }
    }(function () {
        function extend () {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[ i ];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        }

        function init (converter) {
            function api (key, value, attributes) {
                var result;

                // Write

                if (arguments.length > 1) {
                    attributes = extend({
                        path: '/'
                    }, api.defaults, attributes);

                    if (typeof attributes.expires === 'number') {
                        var expires = new Date();
                        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                        attributes.expires = expires;
                    }

                    try {
                        result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {}

                    if (!converter.write) {
                        value = encodeURIComponent(String(value))
                            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                    } else {
                        value = converter.write(value, key);
                    }

                    key = encodeURIComponent(String(key));
                    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    key = key.replace(/[\(\)]/g, escape);

                    return (document.cookie = [
                        key, '=', value,
                        attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                        attributes.path    && '; path=' + attributes.path,
                        attributes.domain  && '; domain=' + attributes.domain,
                        attributes.secure ? '; secure' : ''
                    ].join(''));
                }

                // Read

                if (!key) {
                    result = {};
                }

                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all. Also prevents odd result when
                // calling "get()"
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                var rdecode = /(%[0-9A-Z]{2})+/g;
                var i = 0;

                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split('=');
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    var cookie = parts.slice(1).join('=');

                    if (cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }

                    try {
                        cookie = converter.read ?
                            converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                        if (this.json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) {}
                        }

                        if (key === name) {
                            result = cookie;
                            break;
                        }

                        if (!key) {
                            result[name] = cookie;
                        }
                    } catch (e) {}
                }

                return result;
            }

            api.get = api.set = api;
            api.getJSON = function () {
                return api.apply({
                    json: true
                }, [].slice.call(arguments));
            };
            api.defaults = {};

            api.remove = function (key, attributes) {
                api(key, '', extend(attributes, {
                    expires: -1
                }));
            };

            api.withConverter = init;

            return api;
        }

        return init(function () {});
    }));

    haloBear.Cookies.withConverter({
        write: function (value) {
            return encodeURIComponent(value);
        },
        read: function (value) {
            return decodeURIComponent(value);
        }
    });


}(window, document));


/*
 browser

 */
(function(window, document,undefined){
    "use strict";
    var agent=(function(){
        return{};
    }());
    haloBear.agent=agent;
}(window, document));


/*
 hb.browser

 */
(function(window, document,undefined){
    "use strict";
    var device = function(){
        var u = window.navigator.userAgent,app = window.navigator.appVersion;
        switch (true){
            case (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1):
                return "android";
                break;
            case (u.indexOf('iPhone') > -1):
                return "iPhone";
                break;
            case (u.indexOf('iPad') > -1):
                return "iPad";
                break;
            default:
                return "unknown-device";
        }
    };
    var isMobile = function(){
        var u = window.navigator.userAgent;
        //console.log(u);
        if(u.match(/Android|iPhone|iPad|iPod|IEMobile|BlackBerry/i)){
            return true;
        }
        else {
            return false;
        }
    };

    var browser = function(){
        var u = window.navigator.userAgent, app = window.navigator.appVersion;
        switch (true){
            case (u.indexOf('MicroMessenger') > -1) :
                return "weixin";
                break;
            default:
                return "unknown-browser";
        }
    };

    haloBear.agent.device=device;
    haloBear.agent.isMobile=isMobile;
    haloBear.agent.browser=browser;
}(window, document));






    window.hb=window.haloBear=haloBear;
}(window,document,undefined));




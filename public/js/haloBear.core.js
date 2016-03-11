(function(window,document){
    "use strict";
    var haloBear=(function(){
        return {};
    }());
    window.hb=window.haloBear=haloBear;
}(window,document,undefined));


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
    window.haloBear.loadCSS=loadCSS;
}(window,document,undefined));


(function(window,document){
    "use strict";
    /*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */
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
    window.haloBear.onloadCSS=onloadCSS;
}(window,document,undefined));





(function(window,document){
    "use strict";
    var util=(function(){
        return{};
    }());
    window.haloBear.util=util;
}(window,document,undefined));


(function(window,document,undefined){
    "use strict";
    var loading=(function(){
        var loadingHtmlStr='' +
            '<div class="preloader haloBear-util-loading">' +
            '<div class="container-fluid">' +
            '<div class="spinner">' +
            '<span class="ball-1"></span>' +
            '<span class="ball-2"></span>' +
            '<span class="ball-3"></span>' +
            '<span class="ball-4"></span>' +
            '</div>' +
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
    window.haloBear.util.loading=loading;
}(window,document));



(function(window,document,undefined){
    "use strict";
    var loading=(function(){
        var loadingHtmlStr='' +
            '<div class="preloader haloBear-util-loading">' +
            '<div class="container-fluid">' +
            '<div class="spinner">' +
            '<span class="ball-1"></span>' +
            '<span class="ball-2"></span>' +
            '<span class="ball-3"></span>' +
            '<span class="ball-4"></span>' +
            '</div>' +
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
    window.haloBear.util.loading=loading;
}(window,document));


(function(window,document,undefined){
    "use strict";
    var location=(function(){
        return{};
    }());
    window.haloBear.location=location;
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
    window.haloBear.location.hash=hash;
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
    window.haloBear.location.url=url;
})(window);

/*
 validation

 */
(function(window, document,undefined){
    "use strict";
    var validation=(function(){
        return{};
    }());
    window.haloBear.validation=validation;
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
    window.haloBear.validation.checkPhone=checkPhone;
}(window, document));



/*
 browser

 */
(function(window, document,undefined){
    "use strict";
    var browser=(function(){
        return{};
    }());
    window.haloBear.browser=browser;
}(window, document));


/*
 hb.browser

 */
(function(window, document,undefined){
    "use strict";
    var device = function(){
        var u = window.navigator.userAgent,app = $window.navigator.appVersion;
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

    window.haloBear.browser.device=device;
    window.haloBear.browser.isMobile=isMobile;
}(window, document));



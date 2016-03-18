(function(){
    "use strict";
    window.app=(function(){
        function getStaticData(){
            app.service.getStaticData().then(function(res){
                //console.log(res)
                $("#total-case").text(hb.util.formatNumber(res.case));
                $("#total-company").text(hb.util.formatNumber(res.company));
                $("#total-image").text(hb.util.formatNumber(res.image));
            });
        }

        return {
            getStaticData:getStaticData,
        };
    }());
}());









app.caseIndex=(function(){
    "use strict";
    var searchPara = hb.location.url("?") || {};
    var tab=function(){
        $("a.category").on("click",function(event){
            var id=$(this).attr("id");
            event.preventDefault();
            $("a.category").removeClass("active");
            $(this).addClass("active");
            $(".tab-list-content").removeClass("show");
            if(id=="tab-list-color"){
                $("#list-content-color").addClass("show");
            }else if(id=="tab-list-style"){
                $("#list-content-style").addClass("show");
            }
        })
    };
    function pagActive(){
        $('#pagination').twbsPagination({
            totalPages: 15,
            visiblePages: 5 ,
            first : '<<',
            prev :'<',
            next :'>',
            last:'>>',
            href: `?tag=${searchPara.tag||''}&page={{number}}` ,
        });
    }
    function omit(){
        var padText=$("h4.omit").text().substr(0,9)+"...";
        $("h4.omit").text(padText);
    }
    return {
        tab:tab,
        pagActive:pagActive,
        omit:omit,
    }
}());
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
        //$(".pagination-item>li>a").on("click",function(event){
        //
        //    event.preventDefault();
        //    $(".pagination-item>li>a").removeClass("active");
        //    $(this).addClass("active");
        //})
        var totalPages=Math.ceil(appData.total/appData.per_page);
        //console.log(totalPages);
        //console.log((searchPara.sort?'&sort='+searchPara.sort:''),(searchPara.tag?'&tag='+searchPara.tag:''));
        //console.log(encodeURIComponent('新娘捧花'));
        $('#pagination').twbsPagination({
            totalPages: totalPages||1,
            visiblePages: (function(){
                if(totalPages>7){
                    return 7;
                }else{
                    return totalPages||1;
                }
            }()) ,
            first : '<<',
            prev :'<',
            next :'>',
            last:'>>',
            //href: `?tag=${searchPara.tag||''}&page={{number}}` ,
            href: '?page={{number}}'+(searchPara.sort?'&sort='+searchPara.sort:'')+ (searchPara.tag?'&tag='+encodeURIComponent(searchPara.tag):'')+"#tab",
            //href: '?page={{number}}'+'&sort='+searchPara.sort,
            //href: '?page={{number}}'+'&sort=1&tag=%E6%96%B0%E5%A8%98%E6%8D%A7%E8%8A%B1',
        });
    }
    return {
        tab:tab,
        pagActive:pagActive,
    }
}());
app.topicIndex=(function(){
    "use strict";
    var searchPara = hb.location.url("?") || {};
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
    return{
        pagActive:pagActive
    }
}())
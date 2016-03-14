app.topicIndex=(function(){
    "use strict";
    function pagActive(){
        $('#pagination').twbsPagination({
            totalPages: 15,
            visiblePages: 5 ,
            first : '<<',
            prev :'<',
            next :'>',
            last:'>>',
            href: `?keyword=${searchPara.keyword||''}&page={{number}}` ,
        });
    }
    return{
        pagActive:pagActive
    }
}())
app.pictureIndex=(function(){
    "use strict";
    var searchPara=hb.location.url('?')||{};
    //console.log(searchPara)

    var tab=function(){
        $("a.category").on("click",function(event){
            var id=$(this).attr("id");
            event.preventDefault();
            $("a.category").removeClass("active");
            $(this).addClass("active");
            $(".tab-list-content").removeClass("show");
            if(id=="category-color"){
                $("#content-color").addClass("show");
            }else if(id=="category-element"){
                $("#content-element").addClass("show");
            }else if(id=="category-classify") {
                $("#content-classify").addClass("show");
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

        $('#pagination').twbsPagination({
            totalPages: 15,
            visiblePages: 5 ,
            first : '<<',
            prev :'<',
            next :'>',
            last:'>>',
            href: `?tag=${searchPara.keyword||''}&page={{number}}` ,
        });
    }

    return {
        tab:tab,
        pagActive:pagActive,
    };

}());
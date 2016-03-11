app.caseIndex=(function(){
    "use strict";
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
    }
    return {
        tab:tab
    }
}());
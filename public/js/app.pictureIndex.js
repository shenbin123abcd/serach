app.pictureIndex=(function(){
    "use strict";
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
    return {
        tab:tab
    };

}());
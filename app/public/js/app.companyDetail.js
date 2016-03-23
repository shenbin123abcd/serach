app.companyDetail=(function(){
    "use strict";

    function toggleCases(){

        $('#rest-cases-toggle__bt').on('click', function () {
            $("#rest-cases-toggle__bt").remove();
            $("#expand-more").show(300);

        });


        $('#expand-more').on('shown.bs.collapse', function () {
            //$("#rest-cases-toggle__bt").remove();

            //$("#rest-cases-toggle__bt").html(`
            //<span class="text">收起</span> <i class="glyphicon glyphicon-menu-up"></i>
            //`);
        });

        $('#expand-more').on('hidden.bs.collapse', function () {
            //$("#rest-cases-toggle__bt").html(`
            //<span class="text">展开</span> <i class="glyphicon glyphicon-menu-down"></i>
            //`);
        });
    }



    return {
        toggleCases:toggleCases,
    }
}());
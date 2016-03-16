app.caseDetail=(function(){
    "use strict";
    function omit(){
        var desc_title_text = $(".desc_title").text().substr(0,8)+"...";
        $(".desc_title").text(desc_title_text);
        var desc_company_text = $(".desc_company").text().substr(0,8)+"...";
        $(".desc_company").text(desc_company_text);
    };
    return{
        omit:omit,
    }
}());
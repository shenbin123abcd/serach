app.topicList=(function(){
    var alignCenter=function(wrapper,inner){
        var wrapperWidth=parseInt($("."+wrapper).css("width"));
        var innerWidth=parseInt($("."+inner).css("width"));
        var num=((wrapperWidth-innerWidth)/2);
        $("."+inner).css("position","relative").css("left",num);
    };
    return{
        alignCenter:alignCenter,

    }
}());
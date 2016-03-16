app.haloAuth=(function(){
    "use strict";

    var setUser=function(data){
        window.localStorage.setItem('user', JSON.stringify(data));
    };
    var getUser=function(){
        return JSON.parse(window.localStorage.getItem('user'));
    };

    var setToken=function(data){
        window.localStorage.setItem('token', JSON.stringify(data));
    };
    var getToken=function(){
        return JSON.parse(window.localStorage.getItem('token'));
    };
    var removeToken=function(){
        window.localStorage.removeItem('token');
    };
    var removeUser=function(){
        window.localStorage.removeItem('user');
    };
    var _clear=function(){
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
    };





    return{
        setUser:setUser,
        getUser:getUser,
        removeUser:removeUser,
        setToken:setToken,
        getToken:getToken,
        removeToken:removeToken,
        clear:_clear
    }
}());

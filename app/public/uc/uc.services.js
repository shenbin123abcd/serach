(function(){
    "use strict";
    angular.module('halo')
    .factory('authInterceptor', ["$q", "$rootScope", "$window", "$location",
        function($q, $rootScope, $window, $location){
            return {
                'request': function(config){
                    config.headers = config.headers || {};

                    if (typeof config.headers.Authorization == 'undefined' || config.headers.Authorization.length == 0) {//$location.$$path !== '/data/caseAdd'
                        var token = app.index.haloAuth().getToken();


                        if (token) {
                            //console.log(token,config,config.url.indexOf('.html')>-1);
                            if(config.url.indexOf('.html')>-1){

                            }else{
                                //alert(token)
                                //alert(config.url)

                                config.headers.Authorization = 'Bearer ' + token;
                                //config.headers.dddd = 'Bearer ' + token;
                                //alert(config.headers.Authorization)
                            }
                        }else{
                            window.location.href='/';
                        }
                    }

                    return config;
                },
                'responseError': function(response){
                    if (response.status == 500 || response.status == 504) {
                        $rootScope.$broadcast('network-timeout');
                    } else if (response.status == 404) {
                        $rootScope.$broadcast('not-found');
                    }
                    return $q.reject(response);
                }
            };
        }])
        .factory('companyService', ["$q", "$rootScope", "$window", "$location","$resource", function($q, $rootScope, $window, $location,$resource){
            function search(data){
                var deferred = $q.defer();
                var resource = $resource('/api/company');
                switch (true){
                    case hb.validation.isEmpty(data.keywords):
                        deferred.reject('请输入搜索关键字');
                        break;
                    case data.keywords.length<2:
                        deferred.reject('请输入至少两个字符');
                        break;
                    default:
                        sendXhr();
                }
                function sendXhr(){
                    getList(data).then(function(res){
                        deferred.resolve(res);
                    },function(res){
                        deferred.reject(res.info);
                    });
                }
                return deferred.promise;
            }
            function getList(data){
                var deferred = $q.defer();
                var resource = $resource('/api/company');
                switch (true){
                    default:
                        sendXhr();
                }
                function sendXhr(){
                    resource.get(data, function(res){
                        //console.log(data,res);
                        if(res.iRet==1){
                            deferred.resolve(res);
                        }else{
                            deferred.reject(res.info);
                        }
                    }, function(error){
                        //console.log(res);
                        deferred.reject('网络繁忙请稍候再试');
                    });
                }

                return deferred.promise;
            }
            function getInfo(id){
                var deferred = $q.defer();
                var resource = $resource('/api/company/:id');
                switch (true){
                    default:
                        sendXhr();
                }
                function sendXhr(){
                    resource.get({id:id}, function(res){
                        //console.log(data,res);
                        if(res.iRet==1){
                            deferred.resolve(res);
                        }else{
                            deferred.reject(res.info);
                        }
                    }, function(error){
                        //console.log(res);
                        deferred.reject('网络繁忙请稍候再试');
                    });
                }

                return deferred.promise;
            }


            return{
                getList:getList,
                search:search,
                getInfo:getInfo,
            };
        }])
        .factory('regionService', ["$q", "$rootScope", "$window", "$location","$resource", function($q, $rootScope, $window, $location,$resource){
            function getChildren(data){
                var deferred = $q.defer();
                var resource = $resource('/api/region');
                switch (true){
                    default:
                        sendXhr();
                }
                function sendXhr(){
                    resource.get(data, function(res){
                        //console.log(data,res);
                        if(res.iRet==1){
                            deferred.resolve(res);
                        }else{
                            deferred.reject(res.info);
                        }
                    }, function(error){
                        //console.log(res);
                        deferred.reject('网络繁忙请稍候再试');
                    });
                }

                return deferred.promise;
            }


            return{
                getChildren:getChildren
            };
        }])
        .factory('jcropModal', ['$resource', '$q','$sce','$uibModal','$window',
            function($resource, $q,$sce,$uibModal,$window){
                //var modalInstance;
                //$window.localStorage.setItem('aaa', JSON.stringify('asd'));
                //console.log(JSON.parse($window.localStorage.getItem('aaa')));
                //$window.localStorage.removeItem('aaa');
                var ctrlFunction=function($scope,$uibModalInstance,jcropModalData){
                    var vm;
                    $scope.vm=vm={};
                    vm.dynamic=undefined;
                    vm.imgData=undefined;
                    function init(){
                    }
                    vm.options={
                        uptoken: hb.Cookies.getJSON('avatar_token')||'m_bQ6vCqK-1n_myddynLMQxg0rxw3YqRptv5D7_i:vCIekJzZo2aWArOxYqBgPdStgrw=:eyJzY29wZSI6ImhhbG9hdmF0YXIiLCJkZWFkbGluZSI6MTQ2MzI4NjkzNywic2F2ZUtleSI6ImF2YXRhclwvdGVtcFwvJCh5ZWFyKSQobW9uKVwvJHtkYXl9XC8kKGV0YWcpJChzdWZmaXgpIiwiY2FsbGJhY2tVcmwiOiJodHRwOlwvXC9jb2xsZWdlLmhhbG9iZWFyLmNvbVwvYXBpXC9xaW5pdVVwbG9hZCIsImNhbGxiYWNrQm9keSI6ImtleT0kKGtleSkmdz0kKGltYWdlSW5mby53aWR0aCkmaD0kKGltYWdlSW5mby5oZWlnaHQpJmZuYW1lPSQoZm5hbWUpJmZzaXplPSQoZnNpemUpJmZpbGV0eXBlPSR7eDpmaWxldHlwZX0mY29kZT0ke3g6Y29kZX0mbW9kdWxlPWF2YXRhclwvdGVtcCJ9',
                        domain: 'http://7kttnj.com2.z0.glb.qiniucdn.com/',
                        max_file_size: '5mb',
                        init: {
                            'FilesAdded': function(up, files) {
                                $scope.$apply(function(){
                                    vm.imgData=undefined;
                                });
                                //console.log('FilesAdded',up, files);
                                //plupload.each(files, function(file) {

                                    // 文件添加进队列后,处理相关的事情
                                //});


                            },
                            'UploadProgress': function(up, file) {
                                //console.log('[UploadProgress]', 'File:', file, "Total:", up.total);
                                //console.log('UploadProgress',up.total.percent);
                                $scope.$apply(function(){
                                    vm.progress=up.total.percent;
                                });
                                //var progress = parseInt(data.loaded / data.total * 100, 10);
                                // 每个文件上传时,处理相关的事情
                            },
                            'FileUploaded': function(up, file, info) {
                                // 每个文件上传成功后,处理相关的事情
                                // 其中 info 是文件上传成功后，服务端返回的json，形式如
                                // {
                                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                                //    "key": "gogopher.jpg"
                                //  }
                                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                                //console.log('FileUploaded', info);
                                // var domain = up.getOption('domain');
                                var res = JSON.parse(info);
                                $scope.$apply(function(){
                                    vm.imgData=res;
                                });


                                //alert(res.url);
                                // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                            },
                            'Error': function(up, err, errTip) {
                                //上传出错时,处理相关的事情
                                console.log('Error', err, errTip);
                            },
                            'UploadComplete': function(up, file) {
                                //console.log('UploadComplete');
                                //队列文件处理完毕后,处理相关的事情
                            },
                        },
                    };



                    vm.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    vm.ok = function () {
                        $uibModalInstance.close(vm.imgData.url);
                    };



                    init();
                };
                var open=function(data){
                    var modalInstance = $uibModal.open({
                            templateUrl: appConfig.staticUrl+'/uc/views/uc.view.jcrop_modal.html'+appConfig.bust,
                            controller: ['$scope','$uibModalInstance','jcropModalData',ctrlFunction],
                            backdrop: 'static',
                            windowClass: 'modal-open--jcrop-modal',
                            openedClass: 'modal-open modal-open--body--jcrop-modal',
                            resolve: {
                                jcropModalData: function () {
                                    return data;
                                }
                            }
                        })
                        ;
                    return modalInstance;

                };

                return{
                    open:open
                }
            }])
    ;
}());

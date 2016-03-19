


(function(){


    angular.module('ehelseEditor').run([ '$http', '$rootScope',function($http, $rootScope, MyResourceProvider) {
        $rootScope.userPageView = '';

        $rootScope.userName = "";
        $rootScope.password = "";
        $rootScope.apiUrl = 'https://refkat.eu/v1/';

        $rootScope.topics = [];
        $rootScope.topicsList = [];



        $rootScope.setUserName = function(userName){
            $rootScope.userName = userName;
        };

        $rootScope.setPassword = function(password){
            $rootScope.password = password;
        };

        $rootScope.post = function(url, data, success, error){
            $rootScope.http("post", url, data, success, error);
        };

        $rootScope.put = function(url, data, success, error){
            $rootScope.http("put", url, data, success, error);
        };

        $rootScope.get = function(url, success, error){
            $rootScope.http("get", url, {} , success, error);
        };

        $rootScope.delete = function(url, data, success, error){
            $rootScope.http("delete", url, data, success, error);
        };


        $rootScope.http = function(method, url, data, success, error){
            var credentials = btoa($rootScope.userName + ':' + $rootScope.password);
            var authorization = {'Authorization': 'Basic ' + credentials};
            $http({
                url: $rootScope.apiUrl + url,
                data: data,
                method: method,
                headers: authorization
            }).success(function(data, status, headers, config){

                    success (data, status, headers, config);
                }
            ).error(
                function(data, status, headers, config){
                    error(data, status, headers, config);
                });
        };

        $rootScope.changeUserView = function(view){
            $rootScope.userPageView = view;
            alert($rootScope.userPageView);
        };

        $rootScope.childControllers = {};

        $rootScope.registerChildController = function(name, scope){
            $rootScope.childControllers[name] = scope;
        };

        $rootScope.changeContentView = function(view){
            $rootScope.childControllers['EditorController'].changeView(view);
        }




    }]);

})();
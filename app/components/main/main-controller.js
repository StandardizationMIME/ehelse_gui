


(function(){

    angular.module('ehelseEditor').run([ '$http', '$rootScope', '$cookies', '$location', function($http, $rootScope, $cookies, $location) {
        $rootScope.userName = $cookies.get('username');
        $rootScope.password = $cookies.get('password');
        $rootScope.currentUser = $cookies.get('currentUser');
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


        $rootScope.http = function(method, url, payload, success, error){
            var username = $rootScope.userName || $cookies.get('username');
            var password = $rootScope.password || $cookies.get('password');
            if(username && password){
                var credentials = btoa( username + ':' + password);
                var authorization = {'Authorization': 'Basic ' + credentials};
                var request = {
                    url: $rootScope.apiUrl + url,
                    data: payload,
                    method: method,
                    headers: authorization
                };

                $http(request).success(function(data, status, headers, config){
                        console.log(
                            request.method,
                            request.url,
                            "Success",
                            {
                                "request": request,
                                "response":{
                                    "data": data,
                                    "status": status,
                                    "headers": headers,
                                    "config":config
                                },
                                "success":success,
                                "error": error,
                                "toString": function(){return "bla"}
                            }
                        );
                        success (data, status, headers, config);
                    }
                ).error(

                    function(data, status, headers, config){
                        console.log(
                            request.method,
                            request.url,
                            "Error",
                            {
                                "request": request,
                                "response":{
                                    "data": data,
                                    "status": status,
                                    "headers": headers,
                                    "config":config
                                },
                                "success":success,
                                "error": error,
                                "toString": function(){return "bla"}
                            }
                        );
                        error(data, status, headers, config);
                    }
                );
            }
            else {

                $location.path('/login').replace();
            }

        };

        $rootScope.logout = function(){
            $rootScope.currentUser = null;
            $rootScope.userName = null;
            $rootScope.password = null;

            $cookies.put('username', "");
            $cookies.put('password', "");
            $cookies.put('currentUser', "");
            $location.path('/login').replace();
        };

        $rootScope.childControllers = {};
        $rootScope.registerChildController = function(name, scope){
            $rootScope.childControllers[name] = scope;
        };

        $rootScope.changeContentView = function(view){
            $rootScope.childControllers['EditorController'].changeView(view);
        };

        $rootScope.userPageView = '';

        $rootScope.changeUserView = function(view){
            $rootScope.userPageView = view;
            console.log($rootScope.userPageView);
        };

    }]);

})();
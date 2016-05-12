(function(){

    angular.module('ehelseEditor').run(['$state','$http', '$rootScope', '$cookies', '$location', 'ModalService', function($state,$http, $rootScope, $cookies, $location, ModalService) {
        $rootScope.$state = $state;
        $rootScope.userName = $cookies.get('username');
        $rootScope.password = $cookies.get('password');
        var user= $cookies.get('currentUser');
        if(user){
            $rootScope.currentUser = angular.fromJson(user);
        }
        $rootScope.apiUrl = 'https://refkat.eu/v1/';
        //$rootScope.apiUrl = 'http://localhost:8080/index.php/v1/';


        $rootScope.openModal = function(url, controller){
            ModalService.showModal({
                templateUrl: url,
                controller: controller,
                animation: false
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    console.log(result);
                });
            });
        };

        $rootScope.openConfirmationTGModal = function(message,id){
            $rootScope.confirmMsg = message;
            $rootScope.deleteTGId = id;
            $rootScope.openModal('app/components/main/confirmation/confirmation-tg-modal.html', 'ConfirmationTGModalController');
        };

        $rootScope.openConfirmationModal = function(message, objectToDelete, method){

            $rootScope.confirmationMessage = message;
            $rootScope.objectToDelete = objectToDelete;
            $rootScope.confirmationFunction = function(){
                method($rootScope.objectToDelete);
            };
            $rootScope.openModal('app/components/main/confirmation/confirmation-modal.html', 'ConfirmationModalController');
        };


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

        $rootScope.delete = function(url, success, error){
            $rootScope.http("delete", url, {}, success, error);
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
                $rootScope.$state.go('login');
            }

        };

        $rootScope.logout = function(){
            $rootScope.currentUser = null;
            $rootScope.userName = null;
            $rootScope.password = null;

            $cookies.put('username', "");
            $cookies.put('password', "");
            $cookies.put('currentUser', "");
            $rootScope.view = "";
            $rootScope.$state.go('login');
        };

        $rootScope.childControllers = {};
        $rootScope.registerChildController = function(name, scope){
            $rootScope.childControllers[name] = scope;
        };

        $rootScope.setButtonState = function(state) {
            $rootScope.buttonState = state;
        };

        $rootScope.changeContentView = function(view){
            $rootScope.childControllers['EditorController'].changeView(view);
        };


        $rootScope.userPageView = '';

        $rootScope.changeUserView = function(view){
            $rootScope.userPageView = view;
            console.log($rootScope.userPageView);
        };

        $rootScope.getSequence = function(object){
            return parseInt(object.sequence);
        }
    }]);
})();
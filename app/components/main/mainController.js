(function(){

    angular.module("ehelseEditor").run(["$state","$http", "$rootScope", "$cookies", "$location", "ModalService", function($state,$http, $rootScope, $cookies, $location, ModalService) {

        // Initialize values
        $rootScope.$state = $state;
        $rootScope.userName = $cookies.get("username");
        $rootScope.password = $cookies.get("password");
        var user= $cookies.get("currentUser");
        if(user){
            $rootScope.currentUser = angular.fromJson(user);
        }
        $rootScope.apiUrl = "https://refkat.eu/v1/";

        // Generic function for opening modals
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

        // Modal checking if you are sure you want to delete a target group
        $rootScope.openConfirmationTGModal = function(message,id){
            $rootScope.confirmMsg = message;
            $rootScope.deleteTGId = id;
            $rootScope.openModal("app/components/main/confirmation/confirmationTgModal.html", "ConfirmationTGModalController");
        };

        // Generic modal for confirming whether or not you want to do something
        $rootScope.openConfirmationModal = function(message, objectToDelete, method){
            $rootScope.confirmationMessage = message;
            $rootScope.objectToDelete = objectToDelete;
            $rootScope.confirmationFunction = function(){
                method($rootScope.objectToDelete);
            };
            $rootScope.openModal("app/components/main/confirmation/confirmationModal.html", "ConfirmationModalController");
        };

        // Set user name
        $rootScope.setUserName = function(userName){
            $rootScope.userName = userName;
        };

        // Set password
        $rootScope.setPassword = function(password){
            $rootScope.password = password;
        };

        // Generic post function
        $rootScope.post = function(url, data, success, error){
            $rootScope.http("post", url, data, success, error);
        };

        // Generic put function
        $rootScope.put = function(url, data, success, error){
            $rootScope.http("put", url, data, success, error);
        };

        // Generic get function
        $rootScope.get = function(url, success, error){
            $rootScope.http("get", url, {} , success, error);
        };

        // Generic delete function
        $rootScope.delete = function(url, success, error){
            $rootScope.http("delete", url, {}, success, error);
        };

        // Setting up communication with API
        $rootScope.http = function(method, url, payload, success, error){
            var username = $rootScope.userName || $cookies.get("username");
            var password = $rootScope.password || $cookies.get("password");
            if(username && password){
                var credentials = btoa( username + ":" + password);
                var authorization = {"Authorization": "Basic " + credentials};
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
                $rootScope.$state.go("login");
            }

        };

        // Log out
        $rootScope.logout = function(){
            $rootScope.currentUser = null;
            $rootScope.userName = null;
            $rootScope.password = null;

            $cookies.put("username", "");
            $cookies.put("password", "");
            $cookies.put("currentUser", "");
            $rootScope.view = "";
            $rootScope.$state.go("login");
        };

        // Register child controller
        $rootScope.childControllers = {};
        $rootScope.registerChildController = function(name, scope){
            $rootScope.childControllers[name] = scope;
        };

        // Set state of document
        $rootScope.setDocumentState = function(state) {
            $rootScope.documentState = state;
        };

        // Change view displayed in content window
        $rootScope.changeContentView = function(view){
            $rootScope.childControllers["EditorController"].changeView(view);
        };

        // Initialize user page view
        $rootScope.userPageView = "";

        // Change view of the user page
        $rootScope.changeUserView = function(view){
            $rootScope.userPageView = view;
            console.log($rootScope.userPageView);
        };

        // Get sequence value of an object
        $rootScope.getSequence = function(object){
            return parseInt(object.sequence);
        }
    }]);
})();
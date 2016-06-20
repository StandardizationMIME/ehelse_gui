(function(){

    angular.module("ehelseEditor").run(["$state","$http", "$rootScope", "$cookies", "$location", "ModalService", function($state,$http, $rootScope, $cookies, $location, ModalService) {

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
        $rootScope.openConfirmationTGModal = function(message,obj, method){
            $rootScope.confirmMsg = message;
            $rootScope.deleteTGId = obj.id;
            $rootScope.confirmationFunction = function () {
                method($rootScope.deleteTGId);
            };
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
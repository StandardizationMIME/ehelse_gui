
$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

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
            $rootScope.shouldBeOpen = true;
            $rootScope.openModal("app/components/main/confirmation/confirmationTgModal.html", "ConfirmationTGModalController");
        };
        // Generic modal for confirming whether or not you want to do something
        $rootScope.openConfirmationModal = function(message, objectToDelete, method){
            $rootScope.confirmationMessage = message;
            $rootScope.objectToDelete = objectToDelete;
            $rootScope.confirmationFunction = function(){
                method($rootScope.objectToDelete);
            };
            $rootScope.shouldBeOpen = true;
            $rootScope.openModal("app/components/main/confirmation/confirmationModal.html", "ConfirmationModalController");
        };

        // Register child controller
        $rootScope.childControllers = {};
        $rootScope.registerChildController = function(name, scope){
            $rootScope.childControllers[name] = scope;
        };
        $rootScope.removeChildController = function (name) {
            for (var i = 0; i < $rootScope.childControllers.length; i++){
                if ($rootScope.childControllers[i].name === name){
                    $rootScope.childControllers.splice(i,1);
                    break;
                }
            }
        };

        // Set state of document
        $rootScope.setDocumentState = function(state) {
            $rootScope.documentState = state;
        };

        // Change view displayed in content window
        $rootScope.changeContentView = function(view){
            $rootScope.childControllers["EditorController"].changeView(view);
            if ($rootScope.childControllers["EditTopicController"]) {
                if ($rootScope.childControllers["EditTopicController"].EditTopicController.editTopicForm) {
                    $rootScope.childControllers["EditTopicController"].EditTopicController.editTopicForm.$setPristine();
                }
            }
            if ($rootScope.childControllers["EditDocumentController"]) {
                if ($rootScope.childControllers["EditDocumentController"].EditDocumentController.DocumentForm) {
                    $rootScope.childControllers["EditDocumentController"].EditDocumentController.DocumentForm.$setPristine();
                }
            }
            if(view == "administerfields" || view == "targetgroups" || view == "administerstatus" || view == "administeractions" ||
                view == "administerheadings" || view == "administercontactaddresses" || view == "administermandatory" || view == "administerlinkcategories"){
                $rootScope.deselectDocument();
            }

        };
        $rootScope.checkEditDocumentForm = function (methodValue, method) {
            if($rootScope.formNotPristine('document')){
                method(methodValue);
            }else{
                $rootScope.openConfirmationModal("Du har endret dokument, dersom du fortsetter vil du miste endringene som ble gjort. Vil du fortsette?",methodValue ,method);
            }
        };
        $rootScope.checkEditTopicForm = function (methodValue, method) {
            if($rootScope.formNotPristine('topic')){
                method(methodValue);
            }else{
                $rootScope.openConfirmationModal("Du har endret emne, dersom du fortsetter vil du miste endringene som ble gjort. Vil du fortsette?",methodValue ,method);
            }
        };
        $rootScope.formNotPristine = function(_form){
            if (_form == 'topic') {
                if ($rootScope.childControllers["EditTopicController"]) {
                    if ($rootScope.childControllers["EditTopicController"].EditTopicController.editTopicForm) {
                        return $rootScope.childControllers["EditTopicController"].EditTopicController.editTopicForm.$pristine;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            } else if (_form == 'document') {
                if ($rootScope.childControllers["EditDocumentController"]) {
                    if ($rootScope.childControllers["EditDocumentController"].EditDocumentController.DocumentForm) {
                        return $rootScope.childControllers["EditDocumentController"].EditDocumentController.DocumentForm.$pristine;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
                return true;
            }
        };

        // Initialize user page view
        $rootScope.userPageView = "";

        // Change view of the user page
        $rootScope.changeUserView = function(view){
            $rootScope.userPageView = view;
        };

        // Get sequence value of an object
        $rootScope.getSequence = function(object){
            return parseInt(object.sequence);
        }
    }]);
})();
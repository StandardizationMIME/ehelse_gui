'use strict';

angular.module('ehelseEditor').controller('EditTopicController', [ '$scope','$rootScope', function( $scope, $rootScope) {

    $scope.saveTopicChange = function(form){
        $rootScope.put(
            'topics/' + $rootScope.selectedTopic.id,
            $rootScope.selectedTopic,
            function(){
                console.log("Topic has been changed!");
                $rootScope.notifySuccess("Tema har blitt endret!", 5000);
                $rootScope.reloadTopicTupleList();
                form.$setPristine();

            },
            function(){
                console.log("Error: topic was not saved!");
                $rootScope.notifyError("Advarsel: tema ble ikke lagret!", 5000);
            }
        )
    };

    $rootScope.deleteTopic = function(topic){
        $rootScope.delete(
            'topics/' + topic.id,
            function(){
                console.log("Topic has been deleted!");
                $rootScope.notifySuccess("Tema har blitt slettet!", 5000);
                $rootScope.reloadTopicTupleList();
                $rootScope.changeContentView('editTopic');
            },
            function(){
                console.log("Error: topic was not deleted!");
                $rootScope.notifyError("Advarsel: tema ble ikke slettet!", 5000);
            }
        )
    };

}]);
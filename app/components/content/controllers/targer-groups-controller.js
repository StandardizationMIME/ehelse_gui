'use strict';

angular.module('ehelseEditor').controller('TargetGroupsController',['$scope','ModalService','$rootScope', function($scope, ModalService, $rootScope){

    $scope.showDeleteTGModal = function(){
        ModalService.showModal({
            templateUrl: 'app/components/content/views/delete-target-group-modal.html',
            controller: 'DeleteTargetGroupController',
            animation: false
        }).then(function(modal){
            modal.element.modal();
            modal.close.then(function(result){
               console.log(result)
            });
        });
    };

    $scope.showNewTGModal = function(){
        ModalService.showModal({
            templateUrl: 'app/components/content/views/new-target-group-modal.html',
            controller: 'NewTargetGroupController',
            animation: false
        }).then(function(modal){
            modal.element.modal();
            modal.close.then(function(result){
                console.log(result)
            });
        });
    };

    $scope.showEditTGModal = function(group){
        console.log('showEditTGModal');
        $rootScope.editGroup = group;
        ModalService.showModal({
            templateUrl: 'app/components/content/views/edit-target-group-modal.html',
            controller: 'EditTargetGroupController',
            animation: false
        }).then(function(modal){
            modal.element.modal();
            modal.close.then(function(result){
                console.log(result)
            });
        });
    };

    $rootScope.saveTGChanges = function(group){
        $scope.put('target-groups/'+group.id,
            group,
            function(data){
                console.log(data);
                $rootScope.notifyMessage('Endringene ble lagret!','success')
            },
            function(data){
                console.log(data);
            });

        console.log('saveTGChanges');
    };

    $rootScope.newTargetGroup = {
        "id": "",
        "name": "",
        "description": "",
        "parentId": "",
        "abbreviation": ""
    };

    $rootScope.postNewTargetGroup = function(){
        console.log('postNewTargetGroup');

        if($rootScope.newTargetGroup.parentId == "null"){
            $rootScope.newTargetGroup.parentId = null;
        }

        $scope.post(
            'target-groups/',
            $scope.newTargetGroup,
            function(data){
                $rootScope.notifyMessage('Ny målgruppe lagt til!','success');
                $rootScope.targetGroups.push(data);
                $scope.updateTGTuples();
            },function(){
                $rootScope.notifyMessage('Målgruppe ble ikke lagt til!','error')
            }
        );
    };

    $rootScope.selectedTG = {
        groups: []

    };

    $rootScope.deleteTargetGroup = function(){
        for (var i = 0; i < $scope.selectedTG.groups.length; i++){
            $scope.delete(
                'target-groups/'+i,
                function(){
                    $scope.selectedTG.groups = [];
                    $scope.updateTGTuples();
                },
                function(){}
            );
        }
    };

    $rootScope.targetGroups = [];

    $rootScope.getTargetGroups = function(){
        $scope.get('target-groups/',
            function(data){
            $rootScope.targetGroups = data.targetGroups;
            $scope.updateTGTuples();
            },function(){});
        
    };

    $scope.updateTGTuples = function () {
        $rootScope.TGTuples = $scope.generateListOfTargetGroupTuple($rootScope.targetGroups);

    };

    $rootScope.getTargetGroups();

    $scope.generateListOfTargetGroupTuple = function(targetGroups) {
        var tuples = [];

        for (var i = 0; i < targetGroups.length; i++) {
            var targetGroup = targetGroups[i];
            tuples.push({
                id: targetGroup.id,
                name: targetGroup.name
            })
        }
        return tuples;
    };

}]);

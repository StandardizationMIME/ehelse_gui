'use strict';

angular.module('ehelseEditor').controller('TargetGroupsController',['$scope','ModalService','$rootScope', function($scope, ModalService, $rootScope){

    $scope.showEditTGModal = function(group){
        console.log('showEditTGModal');
        $rootScope.editGroup = $scope.cloneTargetGroupForEditing(group);
        $scope.openModal('app/components/content/administerTargetGroups/editTargetGroups/edit-target-group-modal.html', 'EditTargetGroupController');
    };


    $scope.cloneTargetGroupForEditing = function(group){
        return (JSON.parse(JSON.stringify(group)));
    };

    $rootScope.saveTGChanges = function(group){

        if(group.parentId == "null" || group.parentId == ""){
            group.parentId = null;
        }

        $scope.put('target-groups/'+group.id,
            group,
            function(data){
                console.log(data);
                $scope.updateTGTuples();
                $rootScope.notifySuccess('Endringene ble lagret!');
                $scope.getTargetGroups();
            },
            function(data){
                console.log(data);
            });


        console.log('saveTGChanges');
    };


    $rootScope.postNewTargetGroup = function(){
        console.log('postNewTargetGroup');

        if($rootScope.newTargetGroup.parentId == "null" || $rootScope.newTargetGroup.parentId == ""){
            $rootScope.newTargetGroup.parentId = null;

        }

        $scope.post(
            'target-groups/',
            $scope.newTargetGroup,
            function(data){
                $rootScope.notifySuccess('Ny målgruppe lagt til!');
                $rootScope.targetGroups.push(data);
                $scope.updateTGTuples();
                $scope.updateTGDictionary();
                $scope.clearNewTargetGroup();
            },function(){
                $rootScope.notifyError('Målgruppe ble ikke lagt til!');
            }
        );
    };

    $rootScope.targetGroups = [];

    $rootScope.getTargetGroups = function(){
        $scope.get('target-groups/',
            function(data){
                $rootScope.targetGroups = data.targetGroups;
                $scope.updateTGTuples();
                $scope.updateTGDictionary();
            },function(){});

    };

    $scope.updateTGTuples = function () {
        $rootScope.TGTuples = $scope.generateListOfTargetGroupTuple($rootScope.targetGroups);

    };


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

    $scope.generateTargetGroupDictionary = function (targetGroups) {
        var dictionay = {};

        for (var i = 0; i < targetGroups.length; i++) {
            var targetGroup = targetGroups[i];
            dictionay[targetGroup.id] = targetGroup;
        }
        return dictionay;
    };

    $rootScope.updateTGDictionary = function () {
        $rootScope.TGDictionary = $scope.generateTargetGroupDictionary($rootScope.targetGroups);
    };

    $scope.clearNewTargetGroup = function () {
        $rootScope.newTargetGroup = {
            "id": "",
            "name": "",
            "description": "",
            "parentId": "",
            "abbreviation": ""
        };
    };

    $rootScope.deleteTargetGroupById = function(id) {
        $scope.delete(
            'target-groups/'+id,
            function(){
                $scope.updateTGTuples();
                $scope.updateTGDictionary();
            },function(){});
    };

    $scope.clearNewTargetGroup();
    $rootScope.getTargetGroups();

}]);

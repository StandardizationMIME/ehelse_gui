'use strict';

angular.module('ehelseEditor').controller('TargetGroupsController',['$scope','ModalService','$rootScope', function($scope, ModalService, $rootScope){

    $scope.showEditTGModal = function(group){
        console.log('showEditTGModal');
        $rootScope.editGroup = $scope.cloneTargetGroupForEditing(group);
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerTargetGroups/editTargetGroups/edit-target-group-modal.html', 'EditTargetGroupController');
    };

    $scope.showNewTGModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal('app/components/content/administerTargetGroups/addTargetGroups/new-target-group-modal.html', 'NewTargetGroupController');
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
                $rootScope.notifySuccess('Endringene ble lagret!',6000);
                $scope.getTargetGroups();
            },
            function(data){
                console.log(data);
            });


        console.log('function saveTGChanges(group)');
    };


    $rootScope.postNewTargetGroup = function(){
        console.log('function postNewTargetGroup()');

        if($rootScope.newTargetGroup.parentId == "null" || $rootScope.newTargetGroup.parentId == ""){
            $rootScope.newTargetGroup.parentId = null;

        }

        $scope.post(
            'target-groups/',
            $scope.newTargetGroup,
            function(data){
                $rootScope.notifySuccess('Ny målgruppe lagt til!',6000);
                $rootScope.targetGroups.push(data);
                $scope.updateTGTuples();
                $scope.updateTGDictionary();
                $scope.clearNewTargetGroup();
            },function(){
                $rootScope.notifyError('Målgruppe ble ikke lagt til!',6000);
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
                $rootScope.getTargetGroups();
            },function(){});
    };

    $scope.clearNewTargetGroup();
    $rootScope.getTargetGroups();

}]);


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

    $rootScope.newTargetGroup = {
        "id": "",
        "title": "",
        "description": "",
        "abbreviation": "",
        "parent": ""
    };

    $rootScope.postNewTargetGroup = function(){
        console.log('postNewTargetGroup');
        $scope.post(
            'target_groups/',
            $scope.newTargetGroup,
            function(data){
                $scope.notifyMessage('Ny målgruppe lagt til!','success');
            },function(){
                $scope.notifyMessage('Målgruppe ble ikke lagt til!','error')
            }
        );
    };

    $rootScope.selectedTG = {
        groups: []
    };

    $scope.deleteTargetGroup = function(){
        for (var i = 0; i < $scope.selectedTG.groups.length; i++){
            $scope.delete(
                'target_groups/'+i,
                function(){
                    $scope.selectedTG.groups = [];
                },
                function(){}
            );
        }
    };

    $rootScope.targetGroups = [
        {
            "id": "1",
            "title": "Apotek",
            "description": "Apotek",
            "abbreviation": "A",
            "parentID": ""
        },
        {
            "id": "2",
            "title": "Allmennlegetjeneste",
            "description": "Allmennlegetjeneste",
            "abbreviation": "AL",
            "parentID": ""
        },
        {
            "id": "3",
            "title": "Alle",
            "description": "Gjelder de fleste foretak i helse- og omsorgstjenesten. For å vite om en standard er obligatorisk eller anbefalt for en gitt standard er det nødvendig å lese den.",
            "abbreviation": "Alle",
            "parentID": ""
        },
        {
            "id": "4",
            "title": "Apotek",
            "description": "Apotek som kan levere multidosepakkede legemidler",
            "abbreviation": "AM",
            "parentID": ""
        },
        {
            "id": "5",
            "title": "Ambulanse",
            "description": "Ambulansetjenesten",
            "abbreviation": "AMB",
            "parentID": ""
        },
        {
            "id": "6",
            "title": "AMK",
            "description": "AMK-sentraler",
            "abbreviation": "AMK",
            "parentID": ""
        },
        {
            "id": "7",
            "title": "Avtalespes",
            "description": "Avtalespesialister",
            "abbreviation": "Spesialist",
            "parentID": ""
        },
        {
            "id": "8",
            "title": "Bandasje",
            "description": "Bandasjister",
            "abbreviation": "B",
            "parentID": ""
        },
        {
            "id": "9",
            "title": "Biokjemi",
            "description": "​Virksomheter som utfører en medisinsk biokjemisk undersøkelse",
            "abbreviation": "BIO",
            "parentID": ""
        },
        {
            "id": "10",
            "title": "Fastlege",
            "description": "Fastlege",
            "abbreviation": "FL",
            "parentID": ""
        },
        {
            "id": "11",
            "title": "Folketrygd",
            "description": "Virksomheter som faller inn under folketrygdlovens kapittel 5, stønad ved helsetjenester",
            "abbreviation": "FOLK",
            "parentID": ""
        }
    ];
}]);

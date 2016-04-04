'use strict';

angular.module('ehelseEditor').controller('AdministerFieldController', [ '$scope','$rootScope', function( $scope, $rootScope) {

    $scope.documentFields = [
        {
            "id": 0,
            "title": "Utgiver",
            "description": "Utgiveren av en standard",
            "sequence": 1,
            "fieldType" : {
                "id" : 0,
                "type" : "string"
            }
        },
        {
            "id": 0,
            "title": "versjon",
            "description": "Versj",
            "sequence": 1,
            "fieldType" : {
                "id" : 0,
                "type" : "integer"
            },
            "mandatory": true
        },
        {
            "id": 0,
            "title": "ver2323sjon",
            "description": "Versj",
            "sequence": 1,
            "fieldType" : {
                "id" : 0,
                "type" : "integer"
            },
            "mandatory": true
        },
        {
            "id": 0,
            "title": "versjsasason",
            "description": "Versj",
            "sequence": 1,
            "fieldType" : {
                "id" : 0,
                "type" : "integer"
            },
            "mandatory": true
        }
    ];

    $scope.updateStandardFields = function(){
        console.log($scope.standardFields);
    };

    $( ".document-fields" ).draggable({
        containment: "parent"
    });



    $scope.sortableOptions = {
        stop: function(e, ui) {
            var listItems = ui.item.context.parentNode.querySelectorAll("li");
            for(var i = 0; i < listItems.length; i++){
                listItems[i].querySelectorAll("input")[0].value = i + 1;
            }
        },
        axis: 'y'
    };
}]);
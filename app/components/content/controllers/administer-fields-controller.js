

'use strict';

angular.module('ehelseEditor').controller('AdministerFieldController', [ '$scope', '$http','$rootScope', function( $scope, $rootScope) {

    $scope.standardFields = [
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
        }
    ];

    $scope.profileFields = [
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
        }
    ];

    $scope.fieldTypes = [
        {
            'id' : 0,
            'title' : "string"
        },
        {
            'id' : 0,
            'title' : "integer"
        },
        {
            'id' : 0,
            'title' : "date"
        },
        {
            'id' : 0,
            'title' : "boolean"
        }
    ];

    $scope.tab = 1;

    $scope.setTab = function (tabId) {
        this.tab = tabId;
    };

    $scope.isSet = function (tabId) {
        return this.tab === tabId;
    };

    $scope.updateStandardFields = function(){
        console.log($scope.standardFields);
    }

}]);
'use strict';

angular.module('ehelseEditor').controller('AdministerFieldController', [ '$scope','$rootScope', 'ModalService', function( $scope, $rootScope, ModalService) {

    $rootScope.documentFields = [
        {
            'id': 0,
            'title': 'Utgiver',
            'description': 'Utgiveren av en standard',
            'sequence': 1,
            'fieldType' : {
                'id' : 0,
                'type' : 'string'
            }
        },
        {
            'id': 1,
            'title': 'versjon',
            'description': 'Versj',
            'sequence': 1,
            'fieldType' : {
                'id' : 0,
                'type' : 'integer'
            },
            'mandatory': true
        },
        {
            'id': 2,
            'title': 'ver2323sjon',
            'description': 'Versj',
            'sequence': 1,
            'fieldType' : {
                'id' : 0,
                'type' : 'integer'
            },
            'mandatory': true
        },
        {
            'id': 3,
            'title': 'versjsasason',
            'description': 'Versj',
            'sequence': 1,
            'fieldType' : {
                'id' : 0,
                'type' : 'integer'
            },
            'mandatory': true
        }
    ];

    $scope.openNewFieldModal = function(){
        ModalService.showModal({
            templateUrl: 'app/components/content/views/new-document-field-modal.html',
            controller: 'DocumentFieldModalController',
            animation: false
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);
            });
        });
    };


    //$scope.generateListOfDocumentFieldsTuple = function(documentFields) {
    //    var tuples = [];
    //
    //    for (var i = 0; i < documentFields.length; i++) {
    //        var targetGroup = documentFields[i];
    //        tuples.push({
    //            id: documentFields.id,
    //            title: documentFields.title
    //        })
    //    }
    //    return tuples;
    //};
    //
    //$scope.updateDFTuples = function() {
    //    $rootScope.DFTuples = $scope.generateListOfDocumentFieldsTuple($scope.documentFields);
    //};

    //$scope.generateDocumentFieldsDictionary = function (documentFields) {
    //    var dictionary = {};
    //
    //    for (var i = 0; i < documentFields.length; i++) {
    //        var documentField = documentFields[i];
    //        dictionary[documentField.id] = documentField;
    //    }
    //    return dictionary;
    //};
    //
    //$scope.updateDFDictionary = function () {
    //    $scope.DFDictionary = $scope.generateDocumentFieldsDictionary($scope.documentFields);
    //};


    $scope.getDocumentFieldById = function(id){
        var documentFields = $rootScope.documentFields;
        for (var i = 0; i < documentFields.length; i++){
            if(documentFields[i].id == id){
                return documentFields[i];
            }
        }
        return null;
    };

    $scope.editDocumentFieldModal = function(fieldId){
     $rootScope.currentDocumentField = $scope.getDocumentFieldById(fieldId);
        ModalService.showModal({
            templateUrl: 'app/components/content/views/edit-document-field-modal.html',
            controller: "DocumentFieldModalController",
            animation: false
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);
            });
        });
    };




    //$scope.clearNewDocumentField = function () {
    //    $rootScope.newDocumentField = {
    //        id: '',
    //        title: '',
    //        description: '',
    //        sequence: '',
    //        fieldType: {
    //            id : '',
    //            type : ''
    //        }
    //    };
    //};



    $scope.sortableOptions = {
        cancel: '.unsortable',
        items: 'li:not(.unsortable)',
        stop: function(e, ui) {
            var listItems = ui.item.context.parentNode.querySelectorAll('li');
            for(var i = 0; i < listItems.length; i++){
                listItems[i].querySelectorAll('input')[0].value = i + 1;
            }
        },
        axis: 'y'
    };


}]);
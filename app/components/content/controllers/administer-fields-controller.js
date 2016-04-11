'use strict';

angular.module('ehelseEditor').controller('AdministerFieldsController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $rootScope.documentFields = [];

    $rootScope.updateDocumentFieldsList = function(){
        $scope.get('document-fields/',
            function (data) {
                $rootScope.standardFields = [];
                $rootScope.profileFields = [];
                $rootScope.supportDocumentFields = [];
                for (var i = 0; i < data.documentFields.length; i++) {
                    if(data.documentFields[i].documentTypeId == 1){
                        $rootScope.standardFields.push(data.documentFields[i]);
                    }else if(data.documentFields[i].documentTypeId == 2){
                        $rootScope.profileFields.push(data.documentFields[i]);
                    }else if(data.documentFields[i].documentTypeId == 3) {
                        $rootScope.supportDocumentFields.push(data.documentFields[i]);
                    }
                }
            }, function () {
            });
    };

    $rootScope.setTypeId = function(number){
        $rootScope.typeId = number;
    };

    $rootScope.updateDocumentFieldsList();


    $scope.getDocumentFieldById = function (id) {
        $scope.get(
            'document-fields/' + id,
            function (data) {

                if(data.mandatory == '0'){
                    data.mandatory = false;
                }else if(data.mandatory == '1'){
                    data.mandatory = true;
                }

                $rootScope.currentDocumentField = data;
            },
            function () {
                console.log("error");
            }
        );
    };

    $scope.editDocumentFieldModal = function(fieldId) {
        $scope.getDocumentFieldById(fieldId);
        $scope.openModal('app/components/content/views/edit-document-field-modal.html', 'DocumentFieldModalController');
    };


    $scope.sortableOptions = {
        cancel: '.unsortable',
        items: 'li:not(.unsortable)',
        stop: function (e, ui) {
            var listItems = ui.item.context.parentNode.querySelectorAll('li');
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].querySelectorAll('input')[0].value = i + 1;
            }
        },
        axis: 'y'
    };


}]);
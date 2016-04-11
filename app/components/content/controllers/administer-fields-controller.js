'use strict';

angular.module('ehelseEditor').controller('AdministerFieldsController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $rootScope.documentFields = [];

    $rootScope.updateDocumentFieldsList = function(){
        $scope.get('document-fields/',
            function (data) {
                $rootScope.documentFields = data.documentFields;
            }, function () {
            });
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
                consolge.log("error");
            }
        );
    };

    $scope.editDocumentFieldModal = function (fieldId) {
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
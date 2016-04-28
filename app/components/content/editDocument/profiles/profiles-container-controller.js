angular.module('ehelseEditor').controller('ProfilesContainerController',['$rootScope','$scope', 'Document',
    function($rootScope, $scope, Document) {

        var allDocuments = Document.getAllDocuments();
        $scope.relatedProfiles = [];
        for( var i = 0; i < relatedProfiles; i++){
            if(allDocuments[i].id == document.id){

            }
        }
    }
]);
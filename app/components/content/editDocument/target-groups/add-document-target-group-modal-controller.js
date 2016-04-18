angular.module('ehelseEditor').controller('AddDocumentTargetGroupModelController',
    ['$rootScope','$scope','close', 'TargetGroup', 'Document',
        function($rootScope, $scope, close, TargetGroup, Document) {

            $scope.document_target_groups = Document.getDocument().targetGroups;
    $scope.target_groups = TargetGroup.getTargetGroups();

    $scope.selected_target_groups_ids = [];
            $scope.document_target_groups_ids = Document.getTargetGroupsIds();

    $scope.close = function (result){
        if (result == 'add'){
            Document.extendDocumentTargetGroupsByTargetGroupIds($scope.selected_target_groups_ids);
            close("New TG added to new doc!",500);
        }else{
            $scope.document_target_groups_ids = Document.getTargetGroupsIds();
            close("Nothing added",500);
        }
    };


}]);
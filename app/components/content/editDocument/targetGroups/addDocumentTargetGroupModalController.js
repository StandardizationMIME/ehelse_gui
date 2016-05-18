angular.module("ehelseEditor").controller("AddDocumentTargetGroupModelController",
    ["$rootScope","$scope","close", "TargetGroup", "Document",
        function($rootScope, $scope, close, TargetGroup, Document) {

            // Save target group values to scope for easier access in the html files
            $scope.document_target_groups = Document.getCurrentDocument().targetGroups;
            $scope.target_groups = TargetGroup.getAll();
            $scope.selected_target_groups_ids = [];
            $scope.document_target_groups_ids = Document.getCurrentDocumentTargetGroupsIds();

            // Function for closing and submitting the modal
            $scope.close = function (result){
                if (result == "add"){
                    Document.extendCurrentDocumentTargetGroupsByTargetGroupIds($scope.selected_target_groups_ids);
                    close("New TG added to new doc!",500);
                }else{
                    $scope.document_target_groups_ids = Document.getCurrentDocumentTargetGroupsIds();
                    close("Nothing added",500);
                }
            };
        }
    ]
);


'use strict';

angular.module('ehelseEditor').controller('ContentController', [ '$scope', function( $scope) {


    $scope.topicTitle = "Initial topicTitle value";

    $scope.postNewTopic = function(){
        console.log("Button was clicked");

        console.log($scope.topicTitle);
        //var data = $.param({
        //    json: JSON.stringify({
        //        title: $scope.topicTitle,
        //        description: $scope.topicDescription,
        //        number: "",
        //        isInCatalog: $scope.topicIsInCatalog,
        //        sequence: "",
        //        parent: $scope.topicParent
        //    })
        //});
        //$scope.post("", data).success(function(data, status) {
        //    $scope.hello = data;
        //});
    }
}]);
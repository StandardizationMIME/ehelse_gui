/**
 * Created by dagfs on 05.03.16.
 */
'use strict';

angular.module('ehelseEditor').controller('NewTopicController', [ '$scope', function( $scope) {

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
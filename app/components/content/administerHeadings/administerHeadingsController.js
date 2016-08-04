"use strict";

angular.module("ehelseEditor").controller("AdministerHeadingsController",["$scope", "$rootScope", "Heading", function($scope, $rootScope, Heading){

    // Save heading values to scope for easier access in the html files
    $scope.headings = Heading.getAll();
    $scope.deleteHeading = Heading.delete;

    // Open modal for creating a new heading
    $scope.showNewHeadingModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerHeadings/addEditHeading/addHeadingModal.html", "AddEditHeadingController");
    };

    // Open modal for editing a Heading
    $scope.showEditHeadingModal = function (headingId) {
        $rootScope.currentHeading = Heading.clone(Heading.getById(headingId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerHeadings/addEditHeading/editHeadingModal.html", "AddEditHeadingController");
    };

    $scope.archivedHeadingButton = true;
    $scope.headingHeadingClass = "white-color blue-background";
    $scope.archivedHeadingButtonClass = "btn btn-default pull-right";
    $scope.changeHeadingClass = function () {
        if ($scope.archivedHeadingButton == true){
            $scope.headingHeadingClass = "white-color darkgray-background";
            $scope.archivedHeadingButtonClass = "btn btn-primary pull-right";
            $scope.archivedHeadingButton = false;
        } else {
            $scope.headingHeadingClass = "white-color blue-background";
            $scope.archivedHeadingButtonClass = "btn btn-default pull-right";
            $scope.archivedHeadingButton = true;
        }
    };
    $scope.recoverArchivedHeading = function (heading) {
        heading.isArchived = 0;
        $rootScope.notifySuccess("Overskrift ble gjenopprettet!", 1000);
    };
}]);

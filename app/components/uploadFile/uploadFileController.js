"use strict";

angular.module("ehelseEditor").controller("UploadFileController", ["$scope","$rootScope", function($scope,$rootScope){

    $rootScope.json_object_form_file = {};

    function isValidJson(json) {
        try {
            JSON.parse(json);
        } catch (e) {
            return false;
        }
        return true;
    }

    $scope.uploadFile = function(){

        var f = document.getElementById("input-file").files[0];

        if (f){
            var reader = new FileReader();

            reader.onload = function(e){
                var json_text = e.target.result;
                console.log(json_text);

                if (isValidJson(json_text)){
                    var json_object = JSON.parse(json_text);
                    console.log(json_object);
                }else{
                    alert("invalid JSON");
                }

                angular.copy(json_object, $rootScope.json_object_form_file);
            };
            reader.readAsText(f);
        }else{
            alert("Failed to load file");
        }

    };

    $rootScope.saveTest = function () {
        $rootScope.saveToFile($rootScope.json_object_form_file);
    };


    $rootScope.saveToFile = function (JSON_object) {
        var blob = new Blob([JSON.stringify(JSON_object, null, '\t')], {type: "application/json"});
        saveAs(blob, "your_shitty_json.json");
    };


    $rootScope.getJsonFile = function () {
        console.log($rootScope.json_object_form_file);
        return $rootScope.json_object_form_file;
    }


}]);

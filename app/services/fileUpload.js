"use strict";

angular.module("ehelseEditor").factory("FileUpload", ["$rootScope", function ($rootScope) {

    var json_object_from_file = {};


    function saveTest() {
        saveToFile(json_object_from_file);
    }


    function saveToFile(JSON_object) {
        var blob = new Blob([JSON.stringify(JSON_object, null, '\t')], {type: "application/json"});
        saveAs(blob, "output.json");
    }


    function getJsonFile() {
        return json_object_from_file;
    }

    function readContent($fileContent) {
        // var json_content = $fileContent;
        json_object_from_file = JSON.parse($fileContent);
    }

    function readContentAsPlaneText($fileContent) {
        return $fileContent;
    }



    return {
        getJsonFile: getJsonFile,
        saveToFile: saveToFile,
        saveTest: saveTest,
        readContent: readContent,
        readAsText: readContentAsPlaneText
    };
}]);
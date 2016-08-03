"use strict";

angular.module("ehelseEditor").factory("FileUpload",
    function () {

        var json_object_from_file = {};

        var fileEntry;


        function saveToFileAs(jsonObj) {
            var json = angular.toJson(jsonObj);     // removed Angular elements from array
            var blob = new Blob([JSON.stringify(JSON.parse(json), null, '\t')], {type: "application/json"});
            saveAs(blob, "output.json");
        }

        function saveToFile(jsonObj) {
            try{
                if (chrome.fileSystem){
                    console.log("fileSystem defined");
                    chrome.fileSystem.getWritableEntry(choosenFileEntry, function (writableFileEntry) {
                        writableFileEntry.createWriter(function (writer) {
                            writer.onerror = errorHandler;
                            writer.onwriteend = callback;

                            choosenFileEntry.file(function (file) {
                                var json = angular.toJson(jsonObj);     // removed Angular elements from array
                                var blob = new Blob([JSON.stringify(JSON.parse(json), null, '\t')], {type: "application/json"});
                                writer.write(blob);
                            });
                        }, errorHandler);
                    });
                }
            } catch(error){{console.log("error", error.message)}}
        }


        function errorHandler(e) {
            var msg = "";

            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = "QUOTA_EXCEEDED_ERR";
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = "NOT_FOUND_ERR";
                    break;
                case FileError.SECURITY_ERR:
                    msg = "SECURITY_ERR";
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = "INVALID_MODIFICATION_ERR";
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = "INVALID_STATE_ERR";
                    break;
                default:
                    msg = "Unknown Error";
                    break;
            }
        }

        function setFile(theFileEntry){
            fileEntry = theFileEntry;
        }

        function writeToFile(theFileEntry) {
            try {
                if (theFileEntry){
                    theFileEntry.createWriter(function (fileWriter) {
                        fileWriter.onerror = function (e) {
                            console.log("Write failed: " + e.toString());
                        };
                        var json = angular.toJson(json_object_from_file);     // removed Angular elements from array
                        var blob = new Blob([JSON.stringify(JSON.parse(json), null, '\t')], {type: "application/json"});
                        fileWriter.truncate(blob.size);
                        fileWriter.onwriteend = function () {
                            fileWriter.onwriteend = function (e) {
                                console.log("Write completed.");
                            };
                            fileWriter.write(blob);
                        }


                    }, errorHandler);

                }
            } catch (err){console.log("error", err.message)}
        }

        function handleSaveButton(){
            if (fileEntry){
                writeToFile(fileEntry);
            }
        }

        function handleOpenButton(){
            chrome.permissions.request({
                permissions: [
                    'fileSystem',
                    'fileSystem.write',
                    'fileSystem.retainEntries',
                    'fileSystem.directory'
                ]
            }, function(granted) {
                if (granted) {
                    /* use chrome.fileSystem API */ }
                    chrome.fileSystem.chooseEntry({ type: 'openWritableFile' }, setFile);
            });
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
            saveToFileAs: saveToFileAs,
            saveToFile: saveToFile,
            readContent: readContent,
            readAsText: readContentAsPlaneText,
            handleSaveButton: handleSaveButton,
            handleOpenButton: handleOpenButton,
            setFile: setFile
        };
    },
    ["$rootScope"

    ]);
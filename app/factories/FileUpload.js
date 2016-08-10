"use strict";

angular.module("ehelseEditor").factory("FileUpload",
    ["StorageHandler", "Action", "Document", "DocumentField", "DocumentType" , "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "CSVConverter", "Heading", "ContactAddress",
    function (StorageHandler, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, CSVConverter, Heading, ContactAddress) {

        var chosenFileEntry = null;
        var isJsonFile = false;
        var contentFromFile;

        function onLoad() {
            chrome.fileSystem.chooseEntry({type: 'openWritableFile'}, function (fileEntry) {
                if (chrome.runtime.lastError){
                    console.warn(chrome.runtime.lastError.message);
                } else {
                    chosenFileEntry = fileEntry;

                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onerror = errorHandler;
                        reader.onloadend = function (loadEvent) {
                            clearEverything();
                            contentFromFile = JSON.parse(loadEvent.target.result);
                            StorageHandler.initJSON(contentFromFile);
                            initEverything();
                            isJsonFile = true;
                        };
                        reader.readAsText(file);
                    }, errorHandler)
                }
            })
        }
        function onLoadCSV() {
            chrome.fileSystem.chooseEntry({type: 'openFile'}, function (fileEntry) {
                if (chrome.runtime.lastError){
                    console.warn(chrome.runtime.lastError.message);
                } else {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onerror = errorHandler;
                        reader.onloadend = function (loadEvent) {
                            contentFromFile = loadEvent.target.result;
                            clearEverything();
                            CSVConverter.uploadCSVContent(contentFromFile);
                            StorageHandler.initCsv();
                            initEverything();
                            isJsonFile = false;
                        };
                        reader.readAsText(file);
                    }, errorHandler)
                }
            })
        }

        function onSave(modifiedJsonObject){
            if(isJsonFile){
                chrome.fileSystem.getWritableEntry(chosenFileEntry, function (writableFileEntry) {
                    if (chrome.runtime.lastError){
                        console.warn(chrome.runtime.lastError.message);
                    } else {
                        writableFileEntry.createWriter(function (writer) {
                            writer.onerror = errorHandler;

                            var blob = new Blob([JSON.stringify(JSON.parse(angular.toJson(modifiedJsonObject)), null, '\t')], {type: "application/json"});
                            writer.truncate(blob.size);
                            writer.onwriteend = function () {
                                writer.onwriteend = function (e) {
                                    console.log("written");
                                };
                            };
                            chosenFileEntry.file(function (file) {
                                writer.write(blob);
                            })
                        }, errorHandler)
                    }
                })
            } else {
                chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
                    if (chrome.runtime.lastError){
                        console.warn(chrome.runtime.lastError.message);
                    } else {
                        writableFileEntry.createWriter(function (writer) {
                            writer.onerror = errorHandler;
                            writer.onwriteend = function (e) {
                                chosenFileEntry = writableFileEntry;
                                isJsonFile = true;
                            };
                            writer.write(new Blob(['MIME_JSON'], {type: "application/json"}));
                        }, errorHandler);
                    }
                });

            }
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

        function initEverything() {
            Action.init();
            Document.init();
            DocumentField.init();
            DocumentType.init();
            LinkCategory.init();
            Mandatory.init();
            Status.init();
            TargetGroup.init();
            Topic.init();
            Heading.init();
            ContactAddress.init();
        }

        function clearEverything() {
            Action.clear();
            Document.clear();
            DocumentField.clear();
            DocumentType.clear();
            LinkCategory.clear();
            Mandatory.clear();
            Status.clear();
            TargetGroup.clear();
            Topic.clear();
        }

        return {
            onLoad: onLoad,
            onLoadCSV: onLoadCSV,
            onSave: onSave
        };
    }
]);
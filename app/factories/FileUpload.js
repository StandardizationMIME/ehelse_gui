"use strict";

angular.module("ehelseEditor").factory("FileUpload",
    ["StorageHandler", "Action", "Document", "DocumentField", "DocumentType" , "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "CSVConverter", "Heading", "ContactAddress",
    function (StorageHandler, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, CSVConverter, Heading, ContactAddress) {

        var chosenFileEntry = null;
        var isJsonFile = false;
        var contentFromFile;

        function onLoad(_success, _failure) {
            chrome.fileSystem.chooseEntry({ type: 'openWritableFile',
                                            accepts: [
                                                {
                                                    description: 'JSON',
                                                    extensions: ['json']
                                                }
                                            ],
                                            acceptsAllTypes: false}, function (fileEntry) {
                if (chrome.runtime.lastError){
                    console.warn(chrome.runtime.lastError.message);
                } else {
                    chosenFileEntry = fileEntry;

                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onerror = errorHandler;
                        reader.onloadend = function (loadEvent) {
                            try {
                                contentFromFile = JSON.parse(loadEvent.target.result);
                                if (contentFromFile.documents) {
                                    clearEverything();
                                    StorageHandler.initJSON(contentFromFile);
                                    initEverything();
                                    isJsonFile = true;
                                    chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
                                        StorageHandler.setChosenFilePath(path);
                                    });
                                    _success();
                                } else {
                                    _failure();
                                }
                            } catch (e) {
                                console.info(e);
                                isJsonFile = false;
                                _failure();
                            }

                        };
                        reader.readAsText(file);
                    }, errorHandler);

                }
            })
        }
        function onLoadCSV(_success, _failure) {
            chrome.fileSystem.chooseEntry({ type: 'openFile',
                                            accepts: [
                                                {
                                                    description: 'CSV',
                                                    extensions: ['csv']
                                                }
                                            ],
                                            acceptsAllTypes: false}, function (fileEntry) {
                if (chrome.runtime.lastError){
                    console.warn(chrome.runtime.lastError.message);
                } else {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onerror = errorHandler;
                        reader.onloadend = function (loadEvent) {
                            try {
                                contentFromFile = loadEvent.target.result;
                                if (contentFromFile) {
                                    CSVConverter.uploadCSVContent(contentFromFile);
                                    clearEverything();
                                    StorageHandler.initCsv();
                                    initEverything();
                                    isJsonFile = false;
                                    chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
                                        StorageHandler.setChosenFilePath(path);
                                    });
                                    _success();
                                }
                            } catch (e) {
                                console.log(e);
                                _failure();
                            }

                        };
                        reader.readAsText(file,"windows-1252");
                    }, errorHandler)
                }
            })
        }

        function onSave(modifiedJsonObject, _success, _faillure){
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
                                try {
                                    writer.onwriteend = function (e) {
                                        console.log("written");
                                        _success();
                                    };
                                } catch (e) {
                                    _faillure();
                                }
                            };
                            chosenFileEntry.file(function (file) {
                                writer.write(blob);
                            })
                        }, errorHandler)
                    }
                })
            } else {
                chrome.fileSystem.chooseEntry({ type: 'saveFile',
                                                suggestedName: 'MIME output',
                                                accepts: [
                                                    {
                                                        description: 'JSON',
                                                        extensions: ['json']
                                                    }
                                                ],
                                                acceptsAllTypes: false}, function(writableFileEntry) {
                    if (chrome.runtime.lastError){
                        console.warn(chrome.runtime.lastError.message);
                    } else {
                        writableFileEntry.createWriter(function (writer) {
                            writer.onerror = errorHandler;
                            writer.onwriteend = function (e) {
                                try {
                                    chosenFileEntry = writableFileEntry;
                                    isJsonFile = true;
                                    _success();
                                } catch (e) {
                                    _faillure();
                                }
                            };
                            writer.write(new Blob([JSON.stringify(JSON.parse(angular.toJson(modifiedJsonObject)), null, '\t')], {type: "application/json"}));
                        }, errorHandler);
                    }
                });

            }
        }

        function onSaveAs(modifiedJsonObject, _success, _failure){
            var customName;
            if (!modifiedJsonObject.allDocuments){
                customName = modifiedJsonObject.title;
            } else {
                customName = "Referansekatalog med " + modifiedJsonObject.allDocuments.length + " dokumenter";
            }
            chrome.fileSystem.chooseEntry({ type: 'saveFile',
                                            suggestedName: customName,
                                            accepts: [
                                                {
                                                    description: 'JSON',
                                                    extensions: ['json']
                                                }
                                            ],
                                            acceptsAllTypes: false}, function(writableFileEntry) {
                if (chrome.runtime.lastError){
                    console.warn(chrome.runtime.lastError.message);
                } else {
                    writableFileEntry.createWriter(function (writer) {
                        writer.onerror = errorHandler;
                        writer.onwriteend = function (e) {
                            try {
                                chosenFileEntry = writableFileEntry;
                                isJsonFile = true;
                                _success();
                            } catch (e) {
                                _failure();
                            }
                        };
                        var json = JSON.stringify(modifiedJsonObject, null, '\t');
                        var blob = new Blob([json], {type: "application/json"});
                        writer.write(blob);
                    }, errorHandler);
                }
            });
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
            Heading.init();
            ContactAddress.init();
        }

        return {
            onLoad: onLoad,
            onLoadCSV: onLoadCSV,
            onSave: onSave,
            onSaveAs: onSaveAs
        };
    }
]);
"use strict";

angular.module("ehelseEditor").factory("FileUpload",
    ["StorageHandler", "Action", "Document", "DocumentField", "DocumentType" , "LinkCategory", "Mandatory", "Status", "TargetGroup", "Topic", "CSVConverter", "Heading", "ContactAddress",
    function (StorageHandler, Action, Document, DocumentField, DocumentType, LinkCategory, Mandatory, Status, TargetGroup, Topic, CSVConverter, Heading, ContactAddress) {

        var chosenFileEntry = null;
        var isJsonFile = false;
        var contentFromFile;

        function onLoadJSON(_success, _failure) {
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
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onerror = errorHandler;

                        reader.onloadend = function (loadEvent) {
                            try {
                                contentFromFile = JSON.parse(loadEvent.target.result);
                                if (contentFromFile.documents) {
                                    chosenFileEntry = fileEntry;

                                    clearEverything();
                                    StorageHandler.initJSON(contentFromFile);
                                    initEverything();

                                    chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
                                        StorageHandler.setSavingFilePath(path);
                                        StorageHandler.setCurrentFilePath(path);
                                    });

                                    isJsonFile = true;
                                    _success();
                                } else {
                                    isJsonFile = false;
                                    _failure();
                                }
                            } catch (e) {
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
                                    chosenFileEntry = null;

                                    clearEverything();
                                    CSVConverter.uploadCSVContent(contentFromFile);
                                    StorageHandler.initCsv();
                                    initEverything();

                                    StorageHandler.setSavingFilePath("");
                                    StorageHandler.setCurrentFilePath("");

                                    isJsonFile = false;
                                    _success();
                                } else {
                                    _failure();
                                }
                            } catch (e) {
                                _failure();
                            }
                        };
                        reader.readAsText(file,"windows-1252");
                    }, errorHandler)
                }
            })
        }

        function onSaveMimeJSON(modifiedJsonObject, _success, _failure){
            console.info(modifiedJsonObject);
            if(isJsonFile){
                chrome.fileSystem.getWritableEntry(chosenFileEntry, function (writableFileEntry) {
                    if (chrome.runtime.lastError){
                        console.warn(chrome.runtime.lastError.message);
                    } else {
                        writableFileEntry.createWriter(function (writer) {
                            writer.onerror = errorHandler;

                            var json = JSON.stringify(modifiedJsonObject, null, '\t');
                            var blob = new Blob([json], {type: "application/javascript"});
                            writer.truncate(blob.size);

                            writer.onwriteend = function () {
                                try {
                                    writer.onwriteend = function (e) {
                                        chosenFileEntry = writableFileEntry;
                                        _success();
                                    };
                                } catch (e) {
                                    _failure();
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
                                                acceptsAllTypes: true}, function(writableFileEntry) {
                    if (chrome.runtime.lastError){
                        console.warn(chrome.runtime.lastError.message);
                    } else {
                        writableFileEntry.createWriter(function (writer) {
                            writer.onerror = errorHandler;

                            var json = JSON.stringify(modifiedJsonObject, null, '\t');
                            console.info(json);
                            var blob = new Blob([json], {type: "application/javascript"});
                            console.info(blob);
                            writer.truncate(blob.size);

                            writer.onwriteend = function (e) {
                                try {
                                    chosenFileEntry = writableFileEntry;
                                    isJsonFile = true;
                                    chrome.fileSystem.getDisplayPath(writableFileEntry, function(path) {
                                        StorageHandler.setCurrentFilePath(path);
                                        StorageHandler.setSavingFilePath(path);
                                    });
                                    _success();
                                } catch (e) {
                                    _failure();
                                }
                            };
                            writableFileEntry.file(function (file) {
                                writer.write(blob);
                            })
                        }, errorHandler);
                    }
                });

            }
        }

        function onSaveWebJSON(modifiedJsonObject, _success, _failure){
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
                                chrome.fileSystem.getDisplayPath(writableFileEntry, function(path) {
                                    StorageHandler.setSavingFilePath(path);
                                });
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
            onLoadJSON: onLoadJSON,
            onLoadCSV: onLoadCSV,
            onSaveMimeJSON: onSaveMimeJSON,
            onSaveWebJSON: onSaveWebJSON
        };
    }
]);
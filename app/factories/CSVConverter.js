"use strict";

angular.module("ehelseEditor").factory("CSVConverter", [ "ServiceFunction", function (ServiceFunction) {

        var documentsFromCsv = [];
        var statusListFromCsv = [];
        var documentTypesFromCsv = [];
        var topicsFromCsv = [];
        var documentFieldsFromCsv = [];
        var convertedFileFromCsv = [];

        /**
         * Uploads content of csv file to system and convert it to system format
         * @param fileContentCsv
         */
        function uploadCSVContent (fileContentCsv){
            cleanCsvStorage();
            var csvObjects = [];

            // Convert file content to array
            // each line in from csv file will be presented as array element with column number as index
            // first element contains titles
            var result = ServiceFunction.CSVToArray(fileContentCsv);
            var listOfFieldTitlesInCsvFile = result[0];

            // Generates objects array with {"key": "value"} form
            // Key is taken from title list (result[0]) and value from the rest of result array (result[1...n])
            for (var i = 1; i < result.length -1; i++){
                var tempDict = {};
                for (var j = 0; j< (result[i]).length; j++){
                    tempDict[result[0][j]] = result[i][j];
                }
                csvObjects.push(tempDict);
            }

            // Generating all necessary list
            // DOCUMENT FIELDS
            generateDocumentFieldsTitlesFromCsvDocument(listOfFieldTitlesInCsvFile);
            // TOPICS
            generateTopicListFromCsvDocument(generateTopicTitlesFromCsvDocument(csvObjects));
            // STATUS
            generateStatusListFromCsvDocument(generateStatusTitlesFromCsvDocument(csvObjects));
            // DOCUMENT TYPES
            generateDocumentTypesListFromCsvDocument();
            // FIELDS
            generateDocumentFieldsList(csvObjects);

            var csvObject;
            for (var i = 0; i < csvObjects.length; i++){
                csvObject = csvObjects[i];

                var tempDocument = {
                    "id": (i+1).toString(),
                    "createdTimestamp": "",
                    "editedTimestamp": formatTimestamp(csvObject.Endret),
                    "title": csvObject.Tittel,
                    "description": csvObject.Ingress,
                    "statusId": getStatusIdFromCsvDocument(csvObject.Status),
                    "sequence": 1,
                    "topicId": getTopicIdByTitleCsvDocument(csvObject['Emne (Referansekatalog kapittel)']),
                    "documentTypeId": (getDocumentTypeIdFromCsvDocument(csvObject)).toString(),
                    "previousDocumentId": "",
                    "nextDocumentId": "",
                    "internalId": getInternalIdForCsv(csvObject),
                    "hisNumber": getHisNumberForCsv(csvObject),
                    "fields": generateFieldsListForSingleCsvDocument(csvObject),
                    "contactAddressId": "",
                    "headingContent": [],
                    "links": [],
                    "targetGroups": [],
                    "tempProfiles": csvObject.Profil,
                    "standardId": "",
                    "targetGroupLegalBases": "",
                    "decidedBy": "",
                    "replacedBy": "",
                    "erstatter": csvObject.Erstatter,
                    "skalErstattesAv": csvObject['Skal erstattes av'],
                    "mandatoryNotices": []
                };
                documentsFromCsv.push(tempDocument);
            }
            for (var i = 0; i < documentsFromCsv.length; i++){
                documentsFromCsv[i].standardId = getStandardIdForProfilesFromCsvDocument(documentsFromCsv[i].tempProfiles);
                documentsFromCsv[i].previousDocumentId = getDocumentIdByHisNumberCsvDocument(documentsFromCsv[i].skalErstattesAv);
                documentsFromCsv[i].nextDocumentId = getDocumentIdByHisNumberCsvDocument(documentsFromCsv[i].erstatter);
                delete documentsFromCsv[i].tempProfiles;
                delete documentsFromCsv[i].skalErstattesAv;
                delete documentsFromCsv[i].erstatter;
            }
        }

        /**
         * Returns json array of catalog used in the system
         * @returns {{status: Array, mandatory: Array, actions: Array, documentTypes: Array, linkCategories: Array, documentFields: Array, topics: Array, documents: Array}}
         */
        function getConvertedCsv(){
            var convertedCsv ={
                "actions": [],
                "documentFields": documentFieldsFromCsv,
                "documentTypes": documentTypesFromCsv,
                "linkCategories": [],
                "mandatory": [],
                "targetGroups": [],
                "status": statusListFromCsv,
                "headings": [],
                "contactAddresses": [],
                "topics": topicsFromCsv,
                "documents": documentsFromCsv,
                "archivedDocuments": {}
            };
            // unnecessary var ?
            convertedFileFromCsv = convertedCsv;
            return convertedCsv;
        }
        function cleanCsvStorage(){
            documentsFromCsv = [];
            statusListFromCsv = [];
            documentTypesFromCsv = [];
            topicsFromCsv = [];
            documentFieldsFromCsv = [];
            convertedFileFromCsv = [];
            globalFieldTitles = [];
            standardFieldsTitles = [];
            profileFieldsTitles = [];
            supportFieldsTitles = [];
        }

// . . . . . . . . . . . . . . . . . . . . . . . . . . TOPICS . . . . . . . . . . . . . . . . . . . . . . . . . . . . //
        /**
         * Generates array with topic titles found in csv file
         * @param arr
         * @returns {Array}
         */
        function generateTopicTitlesFromCsvDocument(arr) {
            var topicTitlesList = [];
            for (var i = 0; i < arr.length; i++){
                if (arr[i]['Emne (Referansekatalog kapittel)']){
                    topicTitlesList.push(arr[i]['Emne (Referansekatalog kapittel)']);
                }
            }
            topicTitlesList.push('Ingen Emne');
            return ServiceFunction.removeDuplicates(topicTitlesList);
        }

        /**
         * Generates json array with all topics found in csv
         * @param topicTitles - array with topic titles
         * @returns {Array}
         */
        function generateTopicListFromCsvDocument(topicTitles) {
            var topicList = [];
            for (var i = 0; i < topicTitles.length; i++){
                var topicObj = {
                    "id": (i+1).toString(),
                    "title": topicTitles[i],
                    "description": "",
                    "sequence": 1,
                    "parentId": null
                };
                topicList.push(topicObj);
            }
            topicsFromCsv = topicList;
            return topicList;
        }

        /**
         * Returns topic id based on title
         * @param topicTitle
         * @returns {*}
         */
        function getTopicIdByTitleCsvDocument(topicTitle) {
            var returnId;
            for (var i = 0; i < topicsFromCsv.length; i++) {
                if (topicTitle.toLowerCase() == topicsFromCsv[i].title.toLowerCase()) {
                    returnId = (topicsFromCsv[i].id).toString();
                    break;
                } else if (topicTitle.toLowerCase() == ""){
                    returnId = (topicsFromCsv[topicsFromCsv.length-1].id).toString();
                } else {
                    returnId = null;
                }
            }
            return returnId;
        }
// . . . . . . . . . . . . . . . . . . . . . . . . STATUS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . //
        /**
         * Generates array with status titles found in csv file
         * @param arr
         * @returns {Array}
         */
        function generateStatusTitlesFromCsvDocument(arr) {
            var statusTitlesList = [];
            for (var i = 0; i < arr.length; i++){
                if (arr[i].Status){
                    statusTitlesList.push(arr[i].Status);
                }
            }
            return ServiceFunction.removeDuplicates(statusTitlesList);
        }

        /**
         * Generates json array with all statuses found in csv file
         * @param statusTitles - array with status titles
         * @returns {Array}
         */
        function generateStatusListFromCsvDocument(statusTitles) {
            var statusList = [];
            for (var i = 0; i < statusTitles.length; i++){
                var statusObj = {
                    "id": (i+1).toString(),
                    "name": statusTitles[i],
                    "description": ""
                };
                statusList.push(statusObj);
            }
            statusListFromCsv = statusList;
            return statusList;
        }

        /**
         * Returns status id based on name
         * @param statusName
         * @returns {*}
         */
        function getStatusIdFromCsvDocument(statusName) {
            var statusId;
            if (statusName){
                for(var i = 0; i < statusListFromCsv.length; i++) {
                    if (statusName == statusListFromCsv[i].name) {
                        statusId = statusListFromCsv[i].id;
                        break;
                    }
                }
            }else{
                statusId = null;
            }
            return statusId;
        }
// . . . . . . . . . . . . . . . . . . . . . . DOCUMENT TYPES . . . . . . . . . . . . . . . . . . . . . . . . . . . . //
        /**
         * Generates default document types list
         * @returns {Array}
         */
        function generateDocumentTypesListFromCsvDocument() {
            return [
                {
                    "id": "1",
                    "name": "Standard"
                },
                {
                    "id": "2",
                    "name": "Profil"
                },
                {
                    "id": "3",
                    "name": "Støttedokument"
                }
            ];
        }

        /**
         * Takes a csv object and returns its document type id
         * @param obj
         * @returns {int}
         */
        function getDocumentTypeIdFromCsvDocument(obj) {
            return getDocumentTypeIdWithType(obj.Dokumenttype);
        }

        /**
         * Takes on of three possible document types and returns its id
         * @param documentType
         * @returns {int}
         */
        function getDocumentTypeIdWithType(documentType) {
            var documentTypeId;
            if (documentType === "Standard") {
                documentTypeId = "1"
            } else if (documentType === "Profil") {
                documentTypeId = "2";
            } else {
                documentTypeId = "3";
            }
            return documentTypeId;
        }
// . . . . . . . . . . . . . . . . . . . . . . . . FIELDS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . //
        /**
         * Removes field titles that is used in document and generates list of titles used to make field list
         * @param listOfTitlesFromCsvFile
         * @returns {Array}
         */
        var globalFieldTitles = [];
        function generateDocumentFieldsTitlesFromCsvDocument(listOfTitlesFromCsvFile) {
            var fieldNameKeyList = listOfTitlesFromCsvFile;
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Endret");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Tittel");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Ingress");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Status");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Emne (Referansekatalog kapittel)");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Dokumenttype");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Skal erstattes av");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Erstatter");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Utgivers ID");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Profil");
            fieldNameKeyList = ServiceFunction.removeFromArray(fieldNameKeyList, "Referansekatalog ID");
            globalFieldTitles = fieldNameKeyList;
            return fieldNameKeyList;
        }


        var standardFieldsTitles = [];
        var profileFieldsTitles = [];
        var supportFieldsTitles = [];
        /**
         * Takes csv object and its document type and adds document type title in one of three lists above if
         * title doesn't exist in there already
         * @param csvDocument
         * @param docType
         */
        function populateSpecificDocTypeFieldTitlesList(csvDocument, docType){
            for (var i = 0; i < globalFieldTitles.length; i++) {
                if (csvDocument[globalFieldTitles[i]] != "") {
                    if (docType === "Standard") {
                        if (!(standardFieldsTitles.indexOf(globalFieldTitles[i]) > -1)) {
                            standardFieldsTitles.push((globalFieldTitles[i]).replace(/<|>/g,''));
                        }
                    } else if (docType === "Profil") {
                        if (!(profileFieldsTitles.indexOf(globalFieldTitles[i]) > -1)) {
                            profileFieldsTitles.push((globalFieldTitles[i]).replace(/<|>/g,''));
                        }
                    } else if (docType === "Støttedokument") {
                        if (!(supportFieldsTitles.indexOf(globalFieldTitles[i]) > -1)) {
                            supportFieldsTitles.push((globalFieldTitles[i]).replace(/<|>/g,''));
                        }
                    }
                }
            }
        }
        /**
         * Takes all list of all csv objects and generates document
         * @param allDocumentsFromCsv
         * @returns {Array}
         */
        function generateDocumentFieldsList(allDocumentsFromCsv) {
            var documentFieldsList = [];

            for (var i = 0; i < allDocumentsFromCsv.length; i++){
                populateSpecificDocTypeFieldTitlesList(allDocumentsFromCsv[i], allDocumentsFromCsv[i].Dokumenttype);
            }

            for (var std = 0; std < standardFieldsTitles.length; std++){
                var documentStandardTypeObj = {
                    "id": (std+1).toString(),
                    "name": standardFieldsTitles[std],
                    "description": "",
                    "sequence": 1,
                    "mandatory": false,
                    "documentTypeId": (getDocumentTypeIdWithType('Standard')).toString()
                };
                documentFieldsList.push(documentStandardTypeObj);
            }
            var nextStartId = documentFieldsList.length + 1;
            for (var p = 0; p < profileFieldsTitles.length; p++){
                var documentProfileTypeObj = {
                    "id": (p+nextStartId).toString(),
                    "name": profileFieldsTitles[p],
                    "description": "",
                    "sequence": 1,
                    "mandatory": false,
                    "documentTypeId": (getDocumentTypeIdWithType('Profil')).toString()
                };
                documentFieldsList.push(documentProfileTypeObj);
            }
            nextStartId = documentFieldsList.length + 1;
            for (var sp = 0; sp < supportFieldsTitles.length; sp++){
                var documentSupportTypeObj = {
                    "id": (sp+nextStartId).toString(),
                    "name": supportFieldsTitles[sp],
                    "description": "",
                    "sequence": 1,
                    "mandatory": false,
                    "documentTypeId": (getDocumentTypeIdWithType('Støttedokument')).toString()
                };
                documentFieldsList.push(documentSupportTypeObj);
            }
            documentFieldsFromCsv = documentFieldsList;
            return documentFieldsList;
        }

        /**
         * Returns document field id based on its document type and field name
         * @param documentTypeId
         * @param fieldName
         * @returns {*}
         */
        function getDocumentFieldIdByDocumentTypeIdAndFieldName(documentTypeId, fieldName) {
            var tempDocumentFieldList = [];
            // Generates temporary documentFields list with only specified document type objects
            for (var i = 0; i < documentFieldsFromCsv.length; i++){
                if (documentTypeId == documentFieldsFromCsv[i].documentTypeId){
                    tempDocumentFieldList.push(documentFieldsFromCsv[i]);
                }
            }
            for (var j = 0; j < tempDocumentFieldList.length; j++){
                /*console.log(tempDocumentFieldList[j].name);*/
                if (fieldName == tempDocumentFieldList[j].name){
                    return tempDocumentFieldList[j].id;
                }
            }
        }

        /**
         * Generates filed list for one single document
         * @param obj
         * @returns {Array}
         */
        function generateFieldsListForSingleCsvDocument(obj) {
            var fieldsListForSingleDocument = [];
            var tempDocTypeId = getDocumentTypeIdWithType(obj.Dokumenttype);

            for (var i = 0; i < globalFieldTitles.length; i++) {
                if (obj[globalFieldTitles[i]]) {
                    if (obj[globalFieldTitles[i]] != "") {
                        fieldsListForSingleDocument.push(
                            {
                                "fieldId": getDocumentFieldIdByDocumentTypeIdAndFieldName(tempDocTypeId, globalFieldTitles[i]),
                                "value": obj[globalFieldTitles[i]].replace(/(\r\n|\n|\r|<|>)/gm,"")
                            }
                        );
                    }
                }
            }
            return fieldsListForSingleDocument;
        }
// . . . . . . . . . . . . . . . . . . . . . . . . INTERNAL ID . . . . . . . . . . . . . . . . . . . . . . . . . . . . //
        /**
         * Returns internalId if it exists in csv file
         * If not, returns empty string
         * @param csvObject
         * @returns {*}
         */
        function getInternalIdForCsv(csvObject){
            if (csvObject['Referansekatalog ID']) {
                return csvObject['Referansekatalog ID'];
            } else {
                return "";
            }
        }
// . . . . . . . . . . . . . . . . . . . . . . . . HIS NUMBER . . . . . . . . . . . . . . . . . . . . . . . . . . . . //
        /**
         * Returns hisNumber if it exists in csv file
         * If not returns empty string
         * @param csvObject
         * @returns {*}
         */
        function getHisNumberForCsv(csvObject){
            if (csvObject['Utgivers ID']){
                return csvObject['Utgivers ID'];
            } else {
                return null;
            }
        }
// . . . . . . . . . . . . . . . . . . . . . . . . . DOCUMENT ID . . . . . . . . . . . . . . . . . . . . . . . . . . .//
        /**
         * Returns document id based on title
         * @param documentTitle
         * @returns {*}
         */
        function getDocumentIdByTitleCsvDocument(documentTitle) {
            var returnId;
            for (var i = 0; i < documentsFromCsv.length; i++){
                var planeTitle = ServiceFunction.cleanString(documentsFromCsv[i].title);
                if (documentTitle.toLowerCase() == planeTitle.toLowerCase()){
                    returnId = documentsFromCsv[i].id;
                }else{
                    returnId = null;
                }
            }
            return returnId;
        }
        /**
         * Returns document id based on HIS number
         * Used to generate previous and next document ids
         * And for getting standard id for profiles
         * @param hisNumber
         * @returns {*}
         */
        function getDocumentIdByHisNumberCsvDocument(hisNumber) {
            var returnId;
            for (var i = 0; i < documentsFromCsv.length; i++)
                if (hisNumber){
                    if (hisNumber == documentsFromCsv[i].hisNumber) {
                        returnId = (documentsFromCsv[i].id).toString();
                        break;
                    }
                }else{
                    returnId = null;
                }
            return returnId;
        }
        /**
         * Returns standard id based on its title
         * Used for generate standardId field for profiles that contains id for profiles standard
         * @param standardTitleForProfile
         * @returns {*}
         */
        function getStandardIdForProfilesFromCsvDocument(standardTitleForProfile) {
            if (standardTitleForProfile){
                var hopefullyHisNumber;
                var determinant = 'HIS';
                var indexOfDeterminant = standardTitleForProfile.indexOf(determinant);
                if (indexOfDeterminant > -1){
                    hopefullyHisNumber = standardTitleForProfile.substr(indexOfDeterminant, 14);
                    return getDocumentIdByHisNumberCsvDocument(hopefullyHisNumber);
                }else{
                    var stringParts = standardTitleForProfile.split('.');
                    return getDocumentIdByTitleCsvDocument(stringParts[0]);
                }
            }else{
                return null;
            }
        }

        function formatTimestamp(timestamp){
            var values = timestamp.split(".");
            var yearAndTime = values[2].split(" ");
            var dd = values[0];
            var mm = values[1];
            var yyyy = yearAndTime[0];
            var hh_mm_ss = yearAndTime[1] + ":00";

            return yyyy + "-" + mm + "-" + dd + " " + hh_mm_ss;
        }

        return {
            uploadCSVContent: uploadCSVContent,
            getConvertedCsv: getConvertedCsv
        };
    }]);

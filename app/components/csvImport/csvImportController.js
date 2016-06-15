"use strict";

angular.module("ehelseEditor").controller("CSVImportController", ["$scope","$rootScope", function($scope,$rootScope){

    //@http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    //plagiat and shit! må sjekke den her
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                    // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ){
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[ 3 ];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
    }


/*
    function readSingleFile(f) {
        //var f = evt.target.files[0];

        if (f){
            var reader  = new FileReader();
            reader.readAsText(f);
            reader.onload = loaded;
        } else {
            alert("Failed to load file");
        }

    }
    $scope.listOfObj = [];
    $scope.headers;

    function loaded(e) {
        var content = e.target.result;
        //console.log(content);
        //console.log("RESULTS: ");
        //console.log(content);

        var result = CSVToArray(content);



        for (var i = 1; i < result.length; i++){
            var tempDict = {};
            for (var j = 0; j < (result[i]).length; j++){
                //console.log("key: "+result[0][j]+ " | value: "+result[i][j]);
                tempDict[result[0][j]] = result[i][j];
            }
            //console.log(tempDict);
            $scope.listOfObj.push(tempDict);
        }
        $scope.headers = result[0];
        console.log($scope.listOfObj);
        console.log($scope.headers);

    }*/

/*    $scope.uploadFile = function(){
        var f = document.getElementById("input-file").files[0];
        readSingleFile(f);
        console.log($scope.listOfObj);
        console.log($scope.headers)

    };*/

    $scope.csvObjects = [];
    $scope.documentsFromCsv = []; // NOT DONE YET
    $scope.statusListFromCsv = [];
    $scope.documentTypesFromCsv = [];
    $scope.topicsFromCsv = [];
    $scope.documentFieldsFromCsv = [];

    $scope.showCSVContent = function ($fileContentCsv) {
        // convert file content to array
        var result = CSVToArray($fileContentCsv);


        // getting keys/field titles from csv, only those that going to be in document.fields


        // generates array with key: "value" form
        for (var i = 1; i < result.length; i++){
            var tempDict = {};
            for (var j = 0; j< (result[i]).length; j++){
                tempDict[result[0][j]] = result[i][j];
            }
            $scope.csvObjects.push(tempDict);
        }
        console.log($scope.csvObjects);


        var csvObject;

        console.log('----------------------------------------|      topicList     |----------------------------------------');
        console.log($scope.generateTopicListFromCsvDocument($scope.generateTopicTitlesFromCsvDocument($scope.csvObjects)));
        console.log('----------------------------------------|     statusList     |----------------------------------------');
        console.log($scope.generateStatusListFromCsvDocument($scope.generateStatusTitlesFromCsvDocument($scope.csvObjects)));
        console.log('----------------------------------------|  documentTypesList |----------------------------------------');
        console.log($scope.generateDocumentTypesListFromCsvDocument($scope.generateDocumentTypesTitlesFromCsvDocument($scope.csvObjects)));
        console.log('----------------------------------------| documentFieldsList |----------------------------------------');
        console.log($scope.generateDocumentFieldsList($scope.csvObjects));



        for (var i = 0; i < $scope.csvObjects.length; i++){
            csvObject = $scope.csvObjects[i];
            var tempDocument = {
                "id": i+1,
                "createdTimestamp": "",
                "editedTimestamp": csvObject.Endret,
                "title": csvObject.Tittel,
                "description": csvObject.Ingress,
                "statusId": $scope.getStatusIdFromCsvDocument(csvObject.Status),
                "sequence": "",
                "topicId": $scope.getTopicIdByTitleCsvDocument(csvObject['Emne (Referansekatalog kapittel)']),
                "documentTypeId": $scope.getDocumentTypeIdFromCsvDocument(csvObject),
                "previousDocumentId": $scope.getDocumentIdByHisNumberCsvDocument(csvObject['Skal erstattes av']),
                "nextDocumentId": $scope.getDocumentIdByHisNumberCsvDocument(csvObject.Erstatter),
                "internalId": csvObject['Referansekatalog ID'],
                "hisNumber": csvObject['Utgivers ID'],
                "fields": $scope.generateFieldsListForSingleCsvDocument(csvObject),
                "links": [],
                "targetGroups": [],
                "tempProfiles": csvObject.Profil,
                "standardId": ""
            };
            $scope.documentsFromCsv.push(tempDocument);
        }
        for (var i = 0; i < $scope.documentsFromCsv.length; i++){
            $scope.documentsFromCsv[i].standardId = $scope.getStandardIdForProfilesFromCsvDocument($scope.documentsFromCsv[i].tempProfiles);
            delete $scope.documentsFromCsv[i].tempProfiles;
        }
        console.log('----------------------------------------|      documents     |----------------------------------------');
        console.log($scope.documentsFromCsv);
        console.log($scope.getConvertedCsv());


    };


    function removeDuplicates(arr) {
        var tmp = [];
        for(var i = 0; i < arr.length; i++){
            if(tmp.indexOf(arr[i]) == -1){
                tmp.push(arr[i]);
            }
        }
        return tmp;
    }
    function cleanString(string){
        var returnString = "";
        var stringParts = string.split(" ");
        for (var i = 0; i < stringParts.length; i++){
            if (/^[ A-Za-z_@./#&+-]*$/.test(stringParts[i])){
                returnString = returnString + stringParts[i];
            }
            if (i != stringParts.length-1){
                returnString = returnString + ' ';
            }
        }
        returnString = returnString.replace(/\s+$/, '')
        return returnString;
    }

    $scope.generateTopicTitlesFromCsvDocument = function (arr) {
        var topicTitlesList = [];
        for (var i = 0; i < arr.length; i++){
            if (arr[i]['Emne (Referansekatalog kapittel)']){
                topicTitlesList.push(arr[i]['Emne (Referansekatalog kapittel)']);
            }
        }
        return removeDuplicates(topicTitlesList);
    };
    $scope.generateTopicListFromCsvDocument = function (topicTitles) {
        var topicList = [];
        for (var i = 0; i < topicTitles.length; i++){
            var topicObj = {
                "id": i+1,
                "title": topicTitles[i],
                "description": "",
                "sequence": "",
                "parentId": null
            };
            topicList.push(topicObj);
        }
        var notInRefCatTopic = {
            "id": topicTitles.length+2,
            "title": "Inngår ikke i referansekatalog",
            "description": "",
            "sequence": "",
            "parentId": null
        };
        topicList.push(notInRefCatTopic);
        $scope.topicsFromCsv = topicList;
        return topicList;
    };
    $scope.getTopicIdByTitleCsvDocument = function (topicTitle) {
        var returnId;
        for (var i = 0; i < $scope.topicsFromCsv.length; i++) {
            if (topicTitle.toLowerCase() == $scope.topicsFromCsv[i].title.toLowerCase()) {
                returnId = $scope.topicsFromCsv[i].id;
                break;
            } else {
                returnId = null;
            }
        }
        return returnId;
    };
    $scope.getTopicIdByHisNumberCsvDocument = function(hisNumber){
        var returnId;
        for (var i = 0; i < $scope.topicsFromCsv.length; i++){
            if (hisNumber == $scope.topicsFromCsv[i].hisNumber){
                returnId = $scope.topicsFromCsv[i].id;
                break;
            }else{
                returnId = null;
            }
        }
        return returnId;
    };

    $scope.generateStatusTitlesFromCsvDocument = function (arr) {
        var statusTitlesList = [];
        for (var i = 0; i < arr.length; i++){
            if (arr[i].Status){
                statusTitlesList.push(arr[i].Status);
            }
        }
        return removeDuplicates(statusTitlesList);
    };
    $scope.generateStatusListFromCsvDocument = function (statusTitles) {
        var statusList = [];
        for (var i = 0; i < statusTitles.length; i++){
            var statusObj = {
                "id": i+1,
                "name": statusTitles[i],
                "description": ""
            };
            statusList.push(statusObj);
        }
        $scope.statusListFromCsv = statusList;
        return statusList;
    };
    $scope.getStatusIdFromCsvDocument = function (statusName) {
        var statusId;
        if (statusName){
            for(var i = 0; i < $scope.statusListFromCsv.length; i++) {
                if (statusName == $scope.statusListFromCsv[i].name) {
                    statusId = $scope.statusListFromCsv[i].id;
                    break;
                }
            }
        }else{
            statusId = null;
            }
        return statusId;
    };

    $scope.generateDocumentTypesTitlesFromCsvDocument = function (arr) {
        var documentTypesTitlesList = [];
        for (var i = 0; i < arr.length; i++){
            if (arr[i].Dokumenttype){
                documentTypesTitlesList.push(arr[i].Dokumenttype);
            }
        }
        return removeDuplicates(documentTypesTitlesList);
    };
    $scope.generateDocumentTypesListFromCsvDocument = function (documentTypesTitles) {
        var documentTypesList = [];
        for (var i = 0; i < documentTypesTitles.length; i++){
            var documentTypesObj = {
                "id": i+1,
                "name": documentTypesTitles[i]
            }
            documentTypesList.push(documentTypesObj);
        }
        $scope.documentTypesFromCsv = documentTypesList;
        return documentTypesList;

    };
    $scope.getDocumentTypeIdFromCsvDocument = function (obj) {
        var documentTypeId;
        for (var i = 0; i < $scope.documentTypesFromCsv.length; i++){
            if (obj.Dokumenttype == $scope.documentTypesFromCsv[i].name){
                documentTypeId = $scope.documentTypesFromCsv[i].id;
                break;
            }else{
                documentTypeId = null;
            }
        }
        return documentTypeId;
    };
    $scope.getDocumentTypeIdWithType = function (documentType) {
        var documentTypeId;
        for (var i = 0; i < $scope.documentTypesFromCsv.length; i++) {
            if (documentType == $scope.documentTypesFromCsv[i].name) {
                documentTypeId = $scope.documentTypesFromCsv[i].id;
                break;
            } else {
                documentTypeId = null;
            }
        }
        return documentTypeId;
    }

    $scope.generateDocumentFieldsTitlesFromCsvDocument = function (firstElementFromCsvArray) {
        var fieldNameKeyList = [];
        for (var i = 0; i < firstElementFromCsvArray.length; i ++){
            if (firstElementFromCsvArray[i] == 'Publisert'  ||
                firstElementFromCsvArray[i] == 'Sideinnhold'||
                firstElementFromCsvArray[i] == 'Merknad'    ||
                firstElementFromCsvArray[i] == 'Utgiver'    ||
                firstElementFromCsvArray[i] == 'Versjon'){
                fieldNameKeyList.push(firstElementFromCsvArray[i]);
            }
        }
        return fieldNameKeyList;
    };
    $scope.generateDocumentFieldsList = function (allDocumentsFromCsv) {
        var documentFieldsList = [];
        var standardFieldsTitles = [];
        var profileFieldsTitles = [];
        var supportFieldsTitles = [];
        for (var i = 0; i < allDocumentsFromCsv.length; i++){
            if (allDocumentsFromCsv[i].Dokumenttype == 'Standard'){
                if (allDocumentsFromCsv[i].Publisert){
                    standardFieldsTitles.push('Publisert');
                }
                if (allDocumentsFromCsv[i].Sideinnhold){
                    standardFieldsTitles.push('Sideinnhold');
                }
                if (allDocumentsFromCsv[i].Merknad){
                    standardFieldsTitles.push('Merknad');
                }
                if (allDocumentsFromCsv[i].Utgiver){
                    standardFieldsTitles.push('Utgiver');
                }
                if (allDocumentsFromCsv[i].Versjon){
                    standardFieldsTitles.push('Versjon')
                }
            } else if (allDocumentsFromCsv[i].Dokumenttype == 'Profil'){
                if (allDocumentsFromCsv[i].Publisert){
                    profileFieldsTitles.push('Publisert');
                }
                if (allDocumentsFromCsv[i].Sideinnhold){
                    profileFieldsTitles.push('Sideinnhold');
                }
                if (allDocumentsFromCsv[i].Merknad){
                    profileFieldsTitles.push('Merknad');
                }
                if (allDocumentsFromCsv[i].Utgiver){
                    profileFieldsTitles.push('Utgiver');
                }
                if (allDocumentsFromCsv[i].Versjon){
                    profileFieldsTitles.push('Versjon')
                }
            } else if (allDocumentsFromCsv[i].Dokumenttype == 'Støttedokument'){
                if (allDocumentsFromCsv[i].Publisert){
                    supportFieldsTitles.push('Publisert');
                }
                if (allDocumentsFromCsv[i].Sideinnhold){
                    supportFieldsTitles.push('Sideinnhold');
                }
                if (allDocumentsFromCsv[i].Merknad){
                    supportFieldsTitles.push('Merknad');
                }
                if (allDocumentsFromCsv[i].Utgiver){
                    supportFieldsTitles.push('Utgiver');
                }
                if (allDocumentsFromCsv[i].Versjon){
                    supportFieldsTitles.push('Versjon')
                }
            }
        }

        for (var s = 0; s < removeDuplicates(standardFieldsTitles).length; s++){
            var documentStandardTypeObj = {
                "id": s+1,
                "name": removeDuplicates(standardFieldsTitles)[s],
                "description": "",
                "sequence": "",
                "mandatory": "0",
                "documentTypeId": $scope.getDocumentTypeIdWithType('Standard')
            };
            documentFieldsList.push(documentStandardTypeObj);
        }
        var currentLength = documentFieldsList.length;
        for (var p = 0; p < removeDuplicates(profileFieldsTitles).length; p++){
            var documentProfileTypeObj = {
                "id": p+currentLength,
                "name": removeDuplicates(profileFieldsTitles)[p],
                "description": "",
                "sequence": "",
                "mandatory": "0",
                "documentTypeId": $scope.getDocumentTypeIdWithType('Profil')
            };
            documentFieldsList.push(documentProfileTypeObj);
        }
        currentLength = documentFieldsList.length;
        for (var sp = 0; sp < removeDuplicates(supportFieldsTitles).length; sp++){
            var documentSupportTypeObj = {
                "id": sp+currentLength,
                "name": removeDuplicates(supportFieldsTitles)[sp],
                "description": "",
                "sequence": "",
                "mandatory": "0",
                "documentTypeId": $scope.getDocumentTypeIdWithType('Støttedokument')
            };
            documentFieldsList.push(documentSupportTypeObj);
        }
        $scope.documentFieldsFromCsv = documentFieldsList;
        return documentFieldsList;
    };
    $scope.getDocumentFieldIdByDocumentTypeIdAndFieldName = function (documentTypeId, fieldName) {
        var fieldIdToReturn = null;
        var tempDocumentFieldList = [];
        if(fieldName){
            for (var i = 0; i < $scope.documentFieldsFromCsv.length; i++){
                if (documentTypeId == $scope.documentFieldsFromCsv[i].documentTypeId){
                    tempDocumentFieldList.push($scope.documentFieldsFromCsv[i]);
                }
                /*if (documentTypeId == $scope.documentFieldsFromCsv[i].documentTypeId && fieldName ==$scope.documentFieldsFromCsv[i].name){
                    fieldIdToReturn = $scope.documentFieldsFromCsv[i].id;
                }else{
                    fieldIdToReturn = null;
                }*/
            }
            for (var j = 0; j < tempDocumentFieldList.length; j++){
                if (fieldName == tempDocumentFieldList[j].name){
                    fieldIdToReturn = tempDocumentFieldList[j].id;
                }
            }
        }
        //console.log(fieldIdToReturn);
        return fieldIdToReturn;
    };

    $scope.generateFieldsListForSingleCsvDocument = function (obj) {
        var fieldsListForSingleDocument = [];
        var tempDocTypeId = $scope.getDocumentTypeIdWithType(obj.Dokumenttype);
        //console.log(tempDocTypeId);

        for (var keys in obj){
            if (obj[keys]){
                if (keys == 'Publisert'|| keys == 'Sideinnhold' || keys == 'Merknad' || keys == 'Utgiver' || keys == 'Versjon'){
                    var tempDocumentFieldObj = {
                        "fieldId": $scope.getDocumentFieldIdByDocumentTypeIdAndFieldName(tempDocTypeId, keys),
                        "value": obj[keys]
                    };
                    fieldsListForSingleDocument.push(tempDocumentFieldObj);
                }

            }
        }
        return fieldsListForSingleDocument;
    };
    $scope.getFieldsFromCsvDocument = function (obj) {
        var resultFields = [];
        var tempPublishedField = {
            "fieldId": "1",
            "value": obj.Publisert
        }
        if(tempPublishedField.value){
            resultFields.push(tempPublishedField);
        }
        var tempPageContentField = {
            "fieldId": "2",
            "value": obj.Sideinnhold
        }
        if (tempPageContentField.value){
            resultFields.push(tempPageContentField);
        }
        var tempCommentField = {
            "fieldId": "3",
            "value": obj.Merknad
        }
        if (tempCommentField.value){
            resultFields.push(tempCommentField);
        }
        var tempPublisherField = {
            "fieldId": "4",
            "value": obj.Utgiver
        }
        if (tempPublisherField.value){
            resultFields.push(tempPublisherField);
        }
        var tempVersionField = {
            "fieldId": "5",
            "value": obj.Versjon
        }
        if (tempVersionField.value){
            resultFields.push(tempVersionField);
        }
        return resultFields;
        //console.log(resultFields);
    };

    $scope.getDocumentIdByTitleCsvDocument = function (documentTitle) {
        var returnId;
        for (var i = 0; i < $scope.documentsFromCsv.length; i++){
            var planeTitle = cleanString($scope.documentsFromCsv[i].title);
            if (documentTitle.toLowerCase() == planeTitle.toLowerCase()){
                returnId = $scope.documentsFromCsv[i].id;
            }else{
                returnId = null;
            }
        }
        return returnId;
    };
    $scope.getDocumentIdByHisNumberCsvDocument = function (hisNumber) {
        var returnId;
        for (var i = 0; i < $scope.documentsFromCsv.length; i++)
            if (hisNumber){
                if (hisNumber == $scope.documentsFromCsv[i].hisNumber) {
                    returnId = $scope.documentsFromCsv[i].id;
                    break;
                }
            }else{
                returnId = null;
            }
        return returnId;
    };

    $scope.getStandardIdForProfilesFromCsvDocument = function (standardTitleForProfile) {
        var standardId;
        if (standardTitleForProfile){
            var hopefullyHisNumber;
            var determinant = 'HIS';
            var indexOfDeterminant = standardTitleForProfile.indexOf(determinant);
            if (indexOfDeterminant > -1){
                hopefullyHisNumber = standardTitleForProfile.substr(indexOfDeterminant, 14);
                standardId = $scope.getDocumentIdByHisNumberCsvDocument(hopefullyHisNumber);
            }else{
                var stringParts = standardTitleForProfile.split('.');
                standardId = $scope.getDocumentIdByTitleCsvDocument(stringParts[0]);
            }
        }else{
            standardId = null;
        }
        return standardId;
    };

    $scope.getConvertedCsv = function(){
        var convertedCsv ={
            "status": $scope.statusListFromCsv,
            "mandatory": [],
            "actions": [],
            "documentTypes": $scope.documentTypesFromCsv,
            "linkCategories": [],
            "documentFields": $scope.documentFieldsFromCsv,
            "topics": $scope.topicsFromCsv,
            "documents": $scope.documentsFromCsv
        }
        return convertedCsv;
    };


}]);
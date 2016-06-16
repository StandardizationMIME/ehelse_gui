"use strict";

angular.module("ehelseEditor").factory("CSVConverter",
    [
        function () {

            var documentsFromCsv = [];
            var statusListFromCsv = [];
            var documentTypesFromCsv = [];
            var topicsFromCsv = [];
            var documentFieldsFromCsv = [];
            var convertedFileFromCsv = [];

            function uploadCSVContent ($fileContentCsv){
                var csvObjects = [];
                // convert file content to array
                var result = CSVToArray($fileContentCsv);

                // generates array with key: "value" form
                for (var i = 1; i < result.length; i++){
                    var tempDict = {};
                    for (var j = 0; j< (result[i]).length; j++){
                        tempDict[result[0][j]] = result[i][j];
                    }
                    csvObjects.push(tempDict);
                }
                console.log(csvObjects);

                console.log('----------------------------------------|      topicList     |----------------------------------------');
                console.log(generateTopicListFromCsvDocument(generateTopicTitlesFromCsvDocument(csvObjects)));
                console.log('----------------------------------------|     statusList     |----------------------------------------');
                console.log(generateStatusListFromCsvDocument(generateStatusTitlesFromCsvDocument(csvObjects)));
                console.log('----------------------------------------|  documentTypesList |----------------------------------------');
                console.log(generateDocumentTypesListFromCsvDocument(generateDocumentTypesTitlesFromCsvDocument(csvObjects)));
                console.log('----------------------------------------| documentFieldsList |----------------------------------------');
                console.log(generateDocumentFieldsList(csvObjects));

                var csvObject;
                for (var i = 0; i < csvObjects.length; i++){
                    csvObject = csvObjects[i];
                    var tempDocument = {
                        "id": i+1,
                        "createdTimestamp": "",
                        "editedTimestamp": csvObject.Endret,
                        "title": csvObject.Tittel,
                        "description": csvObject.Ingress,
                        "statusId": getStatusIdFromCsvDocument(csvObject.Status),
                        "sequence": "",
                        "topicId": getTopicIdByTitleCsvDocument(csvObject['Emne (Referansekatalog kapittel)']),
                        "documentTypeId": getDocumentTypeIdFromCsvDocument(csvObject),
                        "skalErstattesAv": csvObject['Skal erstattes av'],
                        "previousDocumentId": "",
                        "erstatter": csvObject.Erstatter,
                        "nextDocumentId": "",
                        "internalId": csvObject['Referansekatalog ID'],
                        "hisNumber": csvObject['Utgivers ID'],
                        "fields": generateFieldsListForSingleCsvDocument(csvObject),
                        "links": [],
                        "targetGroups": [],
                        "tempProfiles": csvObject.Profil,
                        "standardId": ""
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
                console.log('----------------------------------------|      documents     |----------------------------------------');
                console.log(documentsFromCsv);
            }

            function getConvertedCsv(){
                var convertedCsv ={
                    "status": statusListFromCsv,
                    "mandatory": [],
                    "actions": [],
                    "documentTypes": documentTypesFromCsv,
                    "linkCategories": [],
                    "documentFields": documentFieldsFromCsv,
                    "topics": topicsFromCsv,
                    "documents": documentsFromCsv
                };
                convertedFileFromCsv = convertedCsv;
                return convertedCsv;
            }

// TOPICS
            function generateTopicTitlesFromCsvDocument(arr) {
                var topicTitlesList = [];
                for (var i = 0; i < arr.length; i++){
                    if (arr[i]['Emne (Referansekatalog kapittel)']){
                        topicTitlesList.push(arr[i]['Emne (Referansekatalog kapittel)']);
                    }
                }
                topicTitlesList.push('Ingen Emne')
                return removeDuplicates(topicTitlesList);
            }
            function generateTopicListFromCsvDocument(topicTitles) {
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
                topicsFromCsv = topicList;
                return topicList;
            }
            function getTopicIdByTitleCsvDocument(topicTitle) {
                var returnId;
                for (var i = 0; i < topicsFromCsv.length; i++) {
                    if (topicTitle.toLowerCase() == topicsFromCsv[i].title.toLowerCase()) {
                        returnId = topicsFromCsv[i].id;
                        break;
                    } else if (topicTitle.toLowerCase() == ""){
                        returnId = topicsFromCsv[topicsFromCsv.length-1].id;
                    } else {
                        returnId = null;
                    }
                }
                return returnId;
            }
            function getTopicIdByHisNumberCsvDocument(hisNumber){
                var returnId;
                for (var i = 0; i < topicsFromCsv.length; i++){
                    if (hisNumber == topicsFromCsv[i].hisNumber){
                        returnId = topicsFromCsv[i].id;
                        break;
                    }else{
                        returnId = null;
                    }
                }
                return returnId;
            }

// STATUS
            function generateStatusTitlesFromCsvDocument(arr) {
                var statusTitlesList = [];
                for (var i = 0; i < arr.length; i++){
                    if (arr[i].Status){
                        statusTitlesList.push(arr[i].Status);
                    }
                }
                return removeDuplicates(statusTitlesList);
            }
            function generateStatusListFromCsvDocument(statusTitles) {
                var statusList = [];
                for (var i = 0; i < statusTitles.length; i++){
                    var statusObj = {
                        "id": i+1,
                        "name": statusTitles[i],
                        "description": ""
                    };
                    statusList.push(statusObj);
                }
                statusListFromCsv = statusList;
                return statusList;
            }
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
// DOCUMENT TYPES
            function generateDocumentTypesTitlesFromCsvDocument(arr) {
                var documentTypesTitlesList = [];
                for (var i = 0; i < arr.length; i++){
                    if (arr[i].Dokumenttype){
                        documentTypesTitlesList.push(arr[i].Dokumenttype);
                    }
                }
                return removeDuplicates(documentTypesTitlesList);
            }
            function generateDocumentTypesListFromCsvDocument() {
                var documentTypesList = [
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
                /*for (var i = 0; i < documentTypesTitles.length; i++){
                    var documentTypesObj = {
                        "id": i+1,
                        "name": documentTypesTitles[i]
                    }
                    documentTypesList.push(documentTypesObj);
                }*/
                documentTypesFromCsv = documentTypesList;
                return documentTypesList;

            }
            function getDocumentTypeIdFromCsvDocument(obj) {
                var documentTypeId;
                for (var i = 0; i < documentTypesFromCsv.length; i++){
                    if (obj.Dokumenttype == documentTypesFromCsv[i].name){
                        documentTypeId = documentTypesFromCsv[i].id;
                        break;
                    }else{
                        documentTypeId = null;
                    }
                }
                return documentTypeId;
            }
            function getDocumentTypeIdWithType(documentType) {
                var documentTypeId;
                for (var i = 0; i < documentTypesFromCsv.length; i++) {
                    if (documentType == documentTypesFromCsv[i].name) {
                        documentTypeId = documentTypesFromCsv[i].id;
                        break;
                    } else {
                        documentTypeId = null;
                    }
                }
                return documentTypeId;
            }
// FIELDS
            function generateDocumentFieldsTitlesFromCsvDocument(firstElementFromCsvArray) {
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
            }
            function generateDocumentFieldsList(allDocumentsFromCsv) {
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
                        "documentTypeId": getDocumentTypeIdWithType('Standard')
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
                        "documentTypeId": getDocumentTypeIdWithType('Profil')
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
                        "documentTypeId": getDocumentTypeIdWithType('Støttedokument')
                    };
                    documentFieldsList.push(documentSupportTypeObj);
                }
                documentFieldsFromCsv = documentFieldsList;
                return documentFieldsList;
            }
            function getDocumentFieldIdByDocumentTypeIdAndFieldName(documentTypeId, fieldName) {
                var fieldIdToReturn = null;
                var tempDocumentFieldList = [];
                if(fieldName){
                    for (var i = 0; i < documentFieldsFromCsv.length; i++){
                        if (documentTypeId == documentFieldsFromCsv[i].documentTypeId){
                            tempDocumentFieldList.push(documentFieldsFromCsv[i]);
                        }
                    }
                    for (var j = 0; j < tempDocumentFieldList.length; j++){
                        if (fieldName == tempDocumentFieldList[j].name){
                            fieldIdToReturn = tempDocumentFieldList[j].id;
                        }
                    }
                }
                return fieldIdToReturn;
            }

            function generateFieldsListForSingleCsvDocument(obj) {
                var fieldsListForSingleDocument = [];
                var tempDocTypeId = getDocumentTypeIdWithType(obj.Dokumenttype);

                for (var keys in obj){
                    if (obj[keys]){
                        if (keys == 'Publisert'|| keys == 'Sideinnhold' || keys == 'Merknad' || keys == 'Utgiver' || keys == 'Versjon'){
                            var tempDocumentFieldObj = {
                                "fieldId": getDocumentFieldIdByDocumentTypeIdAndFieldName(tempDocTypeId, keys),
                                "value": obj[keys]
                            };
                            fieldsListForSingleDocument.push(tempDocumentFieldObj);
                        }

                    }
                }
                return fieldsListForSingleDocument;
            }
// DOCUMENT ID
            function getDocumentIdByTitleCsvDocument(documentTitle) {
                var returnId;
                for (var i = 0; i < documentsFromCsv.length; i++){
                    var planeTitle = cleanString(documentsFromCsv[i].title);
                    if (documentTitle.toLowerCase() == planeTitle.toLowerCase()){
                        returnId = documentsFromCsv[i].id;
                    }else{
                        returnId = null;
                    }
                }
                return returnId;
            }
            function getDocumentIdByHisNumberCsvDocument(hisNumber) {
                var returnId;
                for (var i = 0; i < documentsFromCsv.length; i++)
                    if (hisNumber){
                        if (hisNumber == documentsFromCsv[i].hisNumber) {
                            returnId = documentsFromCsv[i].id;
                            break;
                        }
                    }else{
                        returnId = null;
                    }
                return returnId;
            }
            function getStandardIdForProfilesFromCsvDocument(standardTitleForProfile) {
                var standardId;
                if (standardTitleForProfile){
                    var hopefullyHisNumber;
                    var determinant = 'HIS';
                    var indexOfDeterminant = standardTitleForProfile.indexOf(determinant);
                    if (indexOfDeterminant > -1){
                        hopefullyHisNumber = standardTitleForProfile.substr(indexOfDeterminant, 14);
                        standardId = getDocumentIdByHisNumberCsvDocument(hopefullyHisNumber);
                    }else{
                        var stringParts = standardTitleForProfile.split('.');
                        standardId = getDocumentIdByTitleCsvDocument(stringParts[0]);
                    }
                }else{
                    standardId = null;
                }
                return standardId;
            }

            function CSVToArray( strData, strDelimiter ){
            //@http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
            //plagiat and shit! må sjekke den her
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




            return {
                uploadCSVContent: uploadCSVContent,
                getConvertedCsv: getConvertedCsv
            };
        }]);


"use strict";

angular.module("ehelseEditor").factory("FileUpload",
    ["$rootScope",
    function () {

    var json_object_from_file = {};


    function saveTest() {
        saveToFile(json_object_from_file);
    }


    function saveToFile(JSON_object) {
        var json = angular.toJson(JSON_object);     // removed Angular elements from array
        var blob = new Blob([JSON.stringify(JSON.parse(json), null, '\t')], {type: "application/json"});
        saveAs(blob, "output.json");
    }


    function getJsonFile() {
        return json_object_from_file;
        /*return {
            "actions": [
                {
                    "id": "1",
                    "name": "Motta",
                    "description": "Denne standarden kan brukes for mottakelse",
                    "isArchived": 0
                },
                {
                    "id": "2",
                    "name": "Sende/motta",
                    "description": "Denne standarden kan brukes både for sending og mottakelse",
                    "isArchived": 0
                },
                {
                    "id": "3",
                    "name": "Send",
                    "description": "Denne standarden skal brukes ved sending",
                    "isArchived": 0
                }
            ],
            "documentFields": [
                {
                    "id": "1",
                    "name": "Versjon",
                    "description": "Versjonnummer",
                    "sequence": "1",
                    "mandatory": "0",
                    "documentTypeId": "1",
                    "isArchived": 0
                },
                {
                    "id": "2",
                    "name": "Utgivers id",
                    "description": "Utgivers id",
                    "sequence": "2",
                    "mandatory": "0",
                    "documentTypeId": "1",
                    "isArchived": 0
                },
                {
                    "id": "3",
                    "name": "Profilbeskrivelse",
                    "description": "Profilbeskrivelse",
                    "sequence": "3",
                    "mandatory": "0",
                    "documentTypeId": "2",
                    "isArchived": 0
                }
            ],
            "documentTypes": [
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
                },
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
            ],
            "linkCategories": [
                {
                    "id": "1",
                    "name": "Kravdokument",
                    "description": null,
                    "isArchived": 0
                },
                {
                    "id": "2",
                    "name": "Relaterte dokument",
                    "description": null,
                    "isArchived": 0
                },
                {
                    "id": "3",
                    "name": "Bibliografi",
                    "description": null,
                    "isArchived": 0
                },
                {
                    "id": "4",
                    "name": "Nettsted",
                    "description": null,
                    "isArchived": 0
                }
            ],
            "mandatory": [
                {
                    "id": "1",
                    "name": "Obligatorisk",
                    "description": "Må brukes av alle relevante målgrupper",
                    "isArchived": 0
                },
                {
                    "id": "2",
                    "name": "Anbefalt",
                    "description": "Anbefalt for alle relevante målgrupper",
                    "isArchived": 0
                },
                {
                    "id": "3",
                    "name": "Frivillig",
                    "description": "Kan brukes fritt",
                    "isArchived": 0
                }
            ],
            "targetGroups": [
                {
                    "id": "10",
                    "name": "Ambulanse",
                    "description": "Ambulansetjenesten",
                    "parentId": null,
                    "abbreviation": "AMB",
                    "isArchived": 0
                },
                {
                    "id": "11",
                    "name": "Spesialisthelsetjenesten",
                    "description": null,
                    "parentId": null,
                    "abbreviation": null,
                    "isArchived": 0
                }
            ],
            "status": [
                {
                    "id": "1",
                    "name": "Aktiv",
                    "description": "Aktive dokumenter",
                    "isArchived": 0
                },
                {
                    "id": "2",
                    "name": "Ikke i refkat",
                    "description": "Dokumenter som er ikke med i referansekatalogen",
                    "isArchived": 0
                },
                {
                    "id": "81",
                    "name": "Under innfasing",
                    "description": "Dokumenter som er under innfasing",
                    "isArchived": 0
                }
            ],
            "topics": [
                {
                    "id": "10",
                    "title": "Topic nivå 5",
                    "description": "",
                    "sequence": 1,
                    "parentId": "9"
                },
                {
                    "id": "9",
                    "title": "Topic nivå 4",
                    "description": "",
                    "sequence": 1,
                    "parentId": "8"
                },
                {
                    "id": "8",
                    "title": "Topic nivå 3",
                    "description": "",
                    "sequence": 1,
                    "parentId": "7"
                },
                {
                    "id": "7",
                    "title": "Topic nivå 2",
                    "description": "",
                    "sequence": 1,
                    "parentId": "1"
                },
                {
                    "id": "1",
                    "title": "Del 1: Informasjonssikkerhet",
                    "description": "Omfatter standarder og andre kravdokumenter som skal bidra til tilfredsstillende informasjonssikkerhet med hensyn til konfidensialitet, integritet, kvalitet og tilgjengelighet ved behandling av helseopplysninger.",
                    "sequence": "1",
                    "parentId": null
                },
                {
                    "id": "2",
                    "title": "Del 2: Kodeverk, terminologier mv",
                    "description": "Omfatter standarder og andre kravdokumenter som skal bidra til ensartet bruk av termer og koder i helse- og omsorgstjenesten.",
                    "sequence": "2",
                    "parentId": null
                },
                {
                    "id": "3",
                    "title": "Del 3: Informasjonsinnhold og strukturert føring av journal",
                    "description": "Omfatter standarder og andre kravdokumenter som skal bidra til at elektroniske pasientjournaler føres på en ensartet måte i alle virksomheter.",
                    "sequence": "3",
                    "parentId": null
                },
                {
                    "id": "11",
                    "title": "Tema 1",
                    "description": "",
                    "sequence": 1,
                    "parentId": "4"
                },
                {
                    "id": "12",
                    "title": "Tema 2",
                    "description": "",
                    "sequence": 1,
                    "parentId": "4"
                },
                {
                    "id": "4",
                    "title": "Del 4: Elektronisk samhandling",
                    "description": "Omfatter standarder og andre kravdokumenter som skal bidra til sikker elektronisk utveksling av helseopplysninger mellom ulike virksomheter i helse- og omsorgstjenesten.",
                    "sequence": "4",
                    "parentId": null
                }
            ],
            "documents": [
                {
                    "id": "1",
                    "createdTimestamp": "2016-06-08 10:08:23",
                    "editedTimestamp": "2016-06-08 12:10:23",
                    "title": "Sikkerhetskrav for systemer - Selvdeklarering",
                    "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                    "statusId": "1",
                    "sequence": "1",
                    "topicId": "1",
                    "documentTypeId": "1",
                    "standardId": null,
                    "previousDocumentId": null,
                    "nextDocumentId": 4,
                    "internalId": "1",
                    "hisNumber": null,
                    "fields": [
                        {
                            "fieldId": "1",
                            "value": "4.1"
                        },
                        {
                            "fieldId": "2",
                            "value": "Styringsgruppen for Norm for informasjonssikkerhet"
                        }
                    ],
                    "links": [
                        {
                            "id": "1",
                            "text": "Normen på ehelse.no",
                            "description": null,
                            "url": "https://ehelse.no/Sider/Norm-for-informasjonssikkerhet.aspx",
                            "linkCategoryId": "4",
                            "documentId": "1"
                        }
                    ],
                    "targetGroups": [
                        {
                            "documentId": "1",
                            "description": "w",
                            "actionId": "2",
                            "deadline": "",
                            "mandatoryId": "1",
                            "targetGroupId": "10"
                        }
                    ]
                },
                {
                    "id": "2",
                    "createdTimestamp": "2016-06-08 03:08:23",
                    "editedTimestamp": "2016-06-09 15:10:23",
                    "title": "Profil",
                    "description": "Profil av dokument 1.",
                    "statusId": "1",
                    "sequence": "2",
                    "topicId": "1",
                    "documentTypeId": "2",
                    "standardId": 1,
                    "previousDocumentId": null,
                    "nextDocumentId": null,
                    "internalId": "2",
                    "hisNumber": null,
                    "fields": [],
                    "links": [],
                    "targetGroups": []
                },
                {
                    "id": "3",
                    "createdTimestamp": "2016-06-08 03:08:23",
                    "editedTimestamp": "2016-06-08 03:10:23",
                    "title": "Støttedokument",
                    "description": "Støttedokument.",
                    "statusId": "1",
                    "sequence": "3",
                    "topicId": "1",
                    "documentTypeId": "3",
                    "standardId": null,
                    "previousDocumentId": null,
                    "nextDocumentId": 6,
                    "internalId": "3",
                    "hisNumber": null,
                    "fields": [],
                    "links": [],
                    "targetGroups": []
                },
                {
                    "id": 4,
                    "topicId": "1",
                    "title": "Sikkerhetskrav for systemer - Selvdeklarering v2",
                    "documentTypeId": "1",
                    "statusId": "1",
                    "internalId": "1",
                    "hisNumber": null,
                    "nextDocumentId": 5,
                    "previousDocumentId": "1",
                    "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                    "sequence": "1",
                    "targetGroups": [
                        {
                            "documentId": "1",
                            "description": "w",
                            "actionId": "2",
                            "deadline": "",
                            "mandatoryId": "1",
                            "targetGroupId": "10"
                        }
                    ],
                    "fields": [
                        {
                            "fieldId": "1",
                            "value": "4.1"
                        },
                        {
                            "fieldId": "2",
                            "value": "Styringsgruppen for Norm for informasjonssikkerhet"
                        }
                    ],
                    "links": [
                        {
                            "id": "1",
                            "text": "Normen på ehelse.no",
                            "description": null,
                            "url": "https://ehelse.no/Sider/Norm-for-informasjonssikkerhet.aspx",
                            "linkCategoryId": "4",
                            "documentId": "1"
                        }
                    ],
                    "standardId": null,
                    "editedTimestamp": "2016-06-17 14:03:38",
                    "createdTimestamp": "2016-06-17 14:03:38"
                },
                {
                    "id": 5,
                    "topicId": "1",
                    "title": "Sikkerhetskrav for systemer - Selvdeklarering v3",
                    "documentTypeId": "1",
                    "statusId": "1",
                    "internalId": "1",
                    "hisNumber": null,
                    "nextDocumentId": null,
                    "previousDocumentId": 4,
                    "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                    "sequence": "1",
                    "targetGroups": [
                        {
                            "documentId": "1",
                            "description": "w",
                            "actionId": "2",
                            "deadline": "",
                            "mandatoryId": "1",
                            "targetGroupId": "10"
                        }
                    ],
                    "fields": [
                        {
                            "fieldId": "1",
                            "value": "4.1"
                        },
                        {
                            "fieldId": "2",
                            "value": "Styringsgruppen for Norm for informasjonssikkerhet"
                        }
                    ],
                    "links": [
                        {
                            "id": "1",
                            "text": "Normen på ehelse.no",
                            "description": null,
                            "url": "https://ehelse.no/Sider/Norm-for-informasjonssikkerhet.aspx",
                            "linkCategoryId": "4",
                            "documentId": "1"
                        }
                    ],
                    "standardId": null,
                    "editedTimestamp": "2016-06-17 14:03:42",
                    "createdTimestamp": "2016-06-17 14:03:42"
                },
                {
                    "id": 6,
                    "topicId": "1",
                    "title": "Støttedokument v2",
                    "documentTypeId": "3",
                    "statusId": "1",
                    "internalId": "3",
                    "hisNumber": null,
                    "nextDocumentId": null,
                    "previousDocumentId": "3",
                    "description": "Støttedokument.",
                    "sequence": "3",
                    "targetGroups": [],
                    "fields": [],
                    "links": [],
                    "standardId": null,
                    "editedTimestamp": "2016-06-17 14:03:52",
                    "createdTimestamp": "2016-06-17 14:03:52"
                },
                {
                    "id": 7,
                    "topicId": "1",
                    "title": "TestProfil",
                    "documentTypeId": "2",
                    "statusId": 1,
                    "internalId": "123",
                    "hisNumber": null,
                    "nextDocumentId": null,
                    "previousDocumentId": null,
                    "description": "",
                    "sequence": 1,
                    "targetGroups": [],
                    "fields": [],
                    "links": [],
                    "standardId": 4,
                    "editedTimestamp": "2016-06-17 14:04:05",
                    "createdTimestamp": "2016-06-17 14:04:05"
                },
                {
                    "id": 8,
                    "topicId": "1",
                    "title": "Profil 123",
                    "documentTypeId": "2",
                    "statusId": 1,
                    "internalId": "123123",
                    "hisNumber": null,
                    "nextDocumentId": 9,
                    "previousDocumentId": null,
                    "description": "",
                    "sequence": 1,
                    "targetGroups": [],
                    "fields": [],
                    "links": [],
                    "standardId": 5,
                    "editedTimestamp": "2016-06-17 14:04:31",
                    "createdTimestamp": "2016-06-17 14:04:31"
                },
                {
                    "id": 9,
                    "topicId": "1",
                    "title": "Profil 123 v2",
                    "documentTypeId": "2",
                    "statusId": 1,
                    "internalId": "123123",
                    "hisNumber": null,
                    "nextDocumentId": null,
                    "previousDocumentId": 8,
                    "description": "",
                    "sequence": 1,
                    "targetGroups": [],
                    "fields": [],
                    "links": [],
                    "standardId": 5,
                    "editedTimestamp": "2016-06-17 14:04:42",
                    "createdTimestamp": "2016-06-17 14:04:42"
                }
            ],
            "archivedDocuments": {
                "3": [
                    {
                        "id": "3",
                        "createdTimestamp": "2016-06-08 03:08:23",
                        "editedTimestamp": "2016-06-08 03:10:01",
                        "title": "Støttedokument",
                        "description": "Støttedokument.",
                        "statusId": "1",
                        "sequence": "3",
                        "topicId": "1",
                        "documentTypeId": "3",
                        "standardId": null,
                        "previousDocumentId": null,
                        "nextDocumentId": null,
                        "internalId": "3",
                        "hisNumber": null,
                        "fields": [],
                        "links": [],
                        "targetGroups": []
                    },
                    {
                        "id": "3",
                        "createdTimestamp": "2016-06-08 03:08:23",
                        "editedTimestamp": "2016-06-08 03:09:23",
                        "title": "Støttedokument",
                        "description": "Støttedokument.",
                        "statusId": "1",
                        "sequence": "3",
                        "topicId": "1",
                        "documentTypeId": "3",
                        "standardId": null,
                        "previousDocumentId": null,
                        "nextDocumentId": null,
                        "internalId": "3",
                        "hisNumber": null,
                        "fields": [],
                        "links": [],
                        "targetGroups": []
                    }
                ]
            }
        }*/
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
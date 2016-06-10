"use strict";

angular.module("ehelseEditor").factory("StorageHandler", ["$rootScope", function ($rootScope) {

    //var input_list; // TODO: Must be set from input file.

    var input_list = {
        "status": [
            {
                "id": "1",
                "name": "Aktiv",
                "description": "Aktive dokumenter"
            },
            {
                "id": "2",
                "name": "Ikke i refkat",
                "description": "Dokumenter som er ikke med i referansekatalogen"
            },
            {
                "id": "3",
                "name": "Under innfasing",
                "description": "Dokumenter som er under innfasing"
            }
        ],
        "topics": [
            {
                "id": "1",
                "timestamp": "2016-05-19 03:55:34",
                "title": "I. Informasjonssikkerhet",
                "description": null,
                "sequence": "2",
                "parentId": null,
                "comment": null,
                "documents": []
            },
            {
                "id": "2",
                "timestamp": "2016-05-19 03:55:57",
                "title": "III. Informasjonsinnhold og strukturert f\u00f8ring av journal",
                "description": null,
                "sequence": "3",
                "parentId": 1,
                "comment": null,
                "documents": []
            },
            {
                "id": "3",
                "timestamp": "2016-05-19 03:55:57",
                "title": "III. Informasjonsinnhold og strukturert f\u00f8ring av journal",
                "description": null,
                "sequence": "1",
                "parentId": 2,
                "comment": null,
                "documents": []
            },
            {
                "id": "4",
                "timestamp": "2016-05-19 03:55:57",
                "title": "test",
                "description": null,
                "sequence": 2,
                "parentId": null,
                "comment": null,
                "documents": []
            },
            {
                "id": "5",
                "timestamp": "2016-05-19 03:55:57",
                "title": "te2223st",
                "description": null,
                "sequence": 2,
                "parentId": 1,
                "comment": null,
                "documents": []
            }

        ],
        "documents": [
            {
                "id": "1",
                "timestamp": "2016-06-08 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "10",
                "topicId": "1",
                "comment": null,
                "documentTypeId": "1",
                "standardId": null,
                "previousDocumentId": null,
                "nextDocumentId": null,
                "internalId": "1",
                "hisNumber": null,
                "isArchived": 0,
                "fields": [
                    {
                        "fieldId": "1",
                        "value": "as"
                    }
                ],
                "links": [
                    {
                        "id": "1",
                        "text": "google",
                        "description": null,
                        "url": "google.com",
                        "linkCategoryId": "1",
                        "documentId": "1"
                    }
                ],
                "targetGroups": [
                    {
                        "documentId": "1",
                        "description": "w",
                        "actionId": "1",
                        "deadline": "w",
                        "mandatoryId": "1",
                        "targetGroupId": "1"
                    },
                    {
                        "documentId": "1",
                        "description": "w",
                        "actionId": "1",
                        "deadline": "w",
                        "mandatoryId": "1",
                        "targetGroupId": "2"
                    }
                ]

            },
            {
                "id": "2",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "1",
                "topicId": "1",
                "comment": null,
                "documentTypeId": "1",
                "standardId": null,
                "previousDocumentId": null,
                "nextDocumentId": null,
                "internalId": "2",
                "hisNumber": null,
                "isArchived": 1
            },
            {
                "id": "3",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "11",
                "topicId": "1",
                "comment": null,
                "documentTypeId": "1",
                "standardId": null,
                "previousDocumentId": null,
                "nextDocumentId": null,
                "internalId": "3",
                "hisNumber": null,
                "isArchived": 0
            },
            {
                "id": "3",
                "timestamp": "2016-06-03 03:08:23",
                "title": "test",
                "description": "s",
                "statusId": "1",
                "sequence": "1",
                "topicId": "2",
                "comment": null,
                "documentTypeId": "1",
                "standardId": 2,
                "previousDocumentId": null,
                "nextDocumentId": null,
                "internalId": "4",
                "hisNumber": null,
                "isArchived": 0
            }
        ],
        "targetGroups": [
            {
                "id": "1",
                "name": "Ambulanse",
                "description": "Ambulansetjenesten",
                "parentId": null,
                "abbreviation": "AMB"
            },
            {
                "id": "2",
                "name": "Spesialisthelsetjenesten",
                "description": null,
                "parentId": null,
                "abbreviation": null
            }
        ],
        "actions": [
            {
                "id": "1",
                "name": "Motta",
                "description": "Denne standarden kan brukes for mottakelse"
            },
            {
                "id": "2",
                "name": "Sende\/motta",
                "description": "Denne standarden kan brukes b\u00e5de for sending og mottakelse"
            },
            {
                "id": "3",
                "name": "Send",
                "description": "Denne standarden skal brukes ved sending"
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
                "name": "St\u00f8ttedokument"
            }
        ],
        "linkCategories": [
            {
                "id": "1",
                "name": "Kravdokument",
                "description": null
            },
            {
                "id": "2",
                "name": "Relaterte dokument",
                "description": null
            },
            {
                "id": "3",
                "name": "Bibliografi",
                "description": null
            }
        ],
        "mandatory": [
            {
                "id": "1",
                "name": "Obligatorisk",
                "description": "M\u00e5 brukes av alle relevante m\u00e5lgrupper"
            },
            {
                "id": "2",
                "name": "Anbefalt",
                "description": "Anbefalt for alle relevante m\u00e5lgrupper"
            },
            {
                "id": "3",
                "name": "Frivillig",
                "description": "Kan brukes fritt"
            }
        ],
        "documentFields": [
            {
                "id": "1",
                "name": "Versjon",
                "description": "Versjonnummer",
                "sequence": "1",
                "mandatory": "0",
                "documentTypeId": "1"
            },
            {
                "id": "2",
                "name": "asd",
                "description": null,
                "sequence": "1",
                "mandatory": "1",
                "documentTypeId": "1"
            },
            {
                "id": "3",
                "name": "asd",
                "description": null,
                "sequence": "1",
                "mandatory": "1",
                "documentTypeId": "2"
            }
        ]
    };



    var SORT_ON_SEQUENCE = function (a, b) { // Constant for sequence sort (ascending)
        return a.sequence - b.sequence;
    };

    /**
     * Returns a clone of a multidimensional array
     * @param list
     */
    function cloneObjectList(list) {
        return (JSON.parse(JSON.stringify(list)));
    }

    /**
     * Returns action list
     * @returns {Array}
     */
    function getActions() {
        //return {"actions": input_list.actions.sort()};
        return {
            actions:
                [
                    {
                        description: "Denne standarden kan brukes for mottakelse",
                        id: 2,
                        name: "Motta"
                    },
                    {
                        description: "Denne standarden kan brukes både for sending og mottakelse",
                        id: 3,
                        name: "Sende/Motta"
                    },
                    {
                        description: "Denne standarden kan brukes ved sending",
                        id: 52,
                        name: "Send"
                    }
                ]
        };
    }

    /**
     * Return document list
     * @returns {{documents: Array}}
     */
    function getDocuments() {
        //return {"documents": getDocumentWithProfilesList()};
        return {
            documents:
                [
                    {
                        comment: null,
                        description: "s",
                        documentTypeId: 1,
                        fields: [{
                            fieldId: 154,
                            value: "1213"
                        }],
                        hisNumber: null,
                        id: 386,
                        internalId: 1,
                        links: [],
                        nextDocumentId: 387,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [{
                            id: 408
                        }],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-08 03:08:23",
                        title: "test",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: null,
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 387,
                        internalId: 22,
                        links: [],
                        nextDocumentId: 388,
                        populatedProfiles: [],
                        previousDocumentId: 386,
                        profiles: [{
                            id: null
                        }],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 03:33:33",
                        title: "test v2",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: null,
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 389,
                        internalId: 4,
                        links: [],
                        nextDocumentId: 390,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],

                        timestamp: "2016-06-07 03:36:47",
                        title: "test v4",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 391,
                        internalId: 55,
                        links: [],
                        nextDocumentId: 392,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 03:40:36",
                        title: "test v5",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 393,
                        internalId: 443,
                        links: [],
                        nextDocumentId: 394,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 03:45:02",
                        title: "test v8",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 395,
                        internalId: 41441,
                        links: [],
                        nextDocumentId: 396,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 03:48:05",
                        title: "test v10",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 397,
                        internalId: 5154453,
                        links: [],
                        nextDocumentId: 398,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 03:51:58",
                        title: "test v12",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 399,
                        internalId: 515445322,
                        links: [],
                        nextDocumentId: 400,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 03:56:12",
                        title: "test v14"  ,
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 401,
                        internalId: 124412,
                        links: [],
                        nextDocumentId: 402,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 04:05:09",
                        title: "test v16",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 403,
                        internalId: 91924,
                        links: [],
                        nextDocumentId: 404,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 04:05:36",
                        title: "test v18",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 405,
                        internalId: 1222,
                        links: [],
                        nextDocumentId: 406,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 04:10:14",
                        title: "test2",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 1,
                        fields: [],
                        hisNumber: null,
                        id: 407,
                        internalId: 122223,
                        links: [],
                        nextDocumentId: null,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: null,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-07 04:10:14",
                        title: "test2 v3",
                        topicId: 161
                    },
                    {
                        comment: null,
                        description: "asd",
                        documentTypeId: 2,
                        fields: [{
                            fieldId: 156,
                            value: "as"
                        },
                            {
                                fieldId: 162,
                                value: "23"
                            }
                        ],
                        hisNumber: null,
                        id: 408,
                        internalId: 12342,
                        links: [],
                        nextDocumentId: null,
                        populatedProfiles: [],
                        previousDocumentId: null,
                        profiles: [],
                        sequence: 1,
                        standardId: 386,
                        statusId: 1,
                        targetGroups: [],
                        timestamp: "2016-06-08 03:10:02",
                        title: "test",
                        topicId: 161
                    }
                ]
        };
    }

    /**
     * Returns document field list
     * @returns {{documentFields: Array}}
     */
    function getDocumentFields() {
        //var sorted_document_list = input_list.documentFields.sort(SORT_ON_SEQUENCE);
        //return {"documentFields": sorted_document_list};
        return {
            documentFields:
                [
                    {
                        description: "Versjonsnummer",
                        documentTypeId: 1,
                        id: 154,
                        mandatory: 0,
                        name: "Versjon",
                        sequence: 1
                    },
                    {
                        description: null,
                        documentTypeId: 3,
                        id: 155,
                        mandatory: 1,
                        name: "asd",
                        sequence: 1
                    },
                    {
                        description: null,
                        documentTypeId: 2,
                        id: 156,
                        mandatory: 1,
                        name: "asd",
                        sequence: 1
                    },
                    {
                        description: "Her skriver vi merknader",
                        documentTypeId: 1,
                        id: 164,
                        mandatory: 0,
                        name: "Merknad",
                        sequence: 1
                    },
                    {
                        description: null,
                        documentTypeId: 1,
                        id: 165,
                        mandatory: 0,
                        name: "Alternativ ID",
                        sequence: 1
                    },
                    {
                        description: null,
                        documentTypeId: 2,
                        id: 162,
                        mandatory: 1,
                        name: "Test",
                        sequence: 1
                    },
                    {
                        description: "Refkat id",
                        documentTypeId: 1,
                        id: 76,
                        mandatory: 0,
                        name: "Refkat id",
                        sequence: 1
                    },
                    {
                        description: null,
                        documentTypeId: 1,
                        id: 78,
                        mandatory: 0,
                        name: "Utgivers ID",
                        sequence: 6
                    }
                ]
        };
    }

    /**
     * Returns document types
     */
    function getDocumentTypes() {
        //return {"documentTypes": input_list.documentTypes};
        return {
            documentTypes:
                [
                    {
                        id: 1,
                        name: "Standard"
                    },
                    {
                        id: 2,
                        name: "Profil"
                    },
                    {
                        id: 3,
                        name: "Støttedokument"
                    }
                ]
        };
    }

    /**
     * Returns link categories
     */
    function getLinkCategories() {
        //return {"linkCategories": input_list.linkCategories};
        return {
            linkCategories:
                [
                    {
                        description: null,
                        id: 2,
                        name: "Kravdokument"
                    },
                    {
                        description: null,
                        id: 3,
                        name: "Relaterte dokumenter"
                    },
                    {
                        description: null,
                        id: 23,
                        name: "Bibliografi"
                    },
                    {
                        description: null,
                        id: 24,
                        name: "Brukertest-kategori"
                    },
                    {
                        description: null,
                        id: 25,
                        name: "Bibliografi 2"
                    },
                    {
                        description: null,
                        id: 26,
                        name: "Bibliografi 3"
                    },
                    {
                        description: null,
                        id: 28,
                        name: "test"
                    }
                ]
        };
    }

    /**
     * Returns status list
     * @returns {Array}
     */
    function getStatus() {
        //return {"status": input_list.status};
        return {
            status:
                [
                    {
                        description: "asd",
                        id: 1,
                        name: "Aktiv"
                    },
                    {
                        description: "asd",
                        id: 2,
                        name: "Ikke i refkat"
                    },
                    {
                        description: "asd",
                        id: 81,
                        name: "Under innfasing"
                    }
                ]
        };
    }

    /**
     * Returns mandatory list
     * @returns {{mandatory: Array}}
     */
    function getMandatory() {
        //return {"mandatory": input_list.mandatory};
        return {
            mandatory:
                [
                    {
                        description: "asdasd",
                        id: 1,
                        name: "Obligatorisk"
                    },
                    {
                        description: "asdasd",
                        id: 3,
                        name: "Anbefalt"
                    },
                    {
                        description: "asdasd",
                        id: 12,
                        name: "Frivillig"
                    }
                ]
        };
    }

    /**
     * Returns topic tree
     */
    function getTopics() {
        //return {"topics": getTopicTree()};
        return {
            topics:
                [
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 161,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-19 03:55:34",
                        title: "I. Informasjonssikkerhet"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 162,
                        parentId: null,
                        sequence: 3,
                        timestamp: "2016-05-19 03:55:57",
                        title: "III. Informasjonsinnhold og strukturert føring av journal"
                    },
                    {
                        children: [
                            {
                                children: [],
                                comment: null,
                                description: null,
                                documents: [],
                                id: 219,
                                parentId: 163,
                                sequence: 1,
                                timestamp: "2016-05-20 04:41:33",
                                title: "E-resept"
                            }
                        ],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 163,
                        parentId: null,
                        sequence: 4,
                        timestamp: "2016-05-19 03:56:07",
                        title: "IV. Elektronisk samhandling"
                    },
                    {
                        children: [
                            {
                                children: [],
                                comment: null,
                                description: null,
                                documents: [],
                                id: 218,
                                parentId: 216,
                                sequence: 1,
                                timestamp: "2016-05-19 06:42:17",
                                title: "Test undertema"
                            }
                        ],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 216,
                        parentId: null,
                        sequence: 6,
                        timestamp: "2016-05-19 06:41:51",
                        title: "VI. TESTING"
                    },
                    {
                        children: [
                            {
                                children: [],
                                comment: null,
                                description: null,
                                documents: [],
                                id: 221,
                                parentId: 220,
                                sequence: 1,
                                timestamp: "2016-05-20 05:17:43",
                                title: "Kodeverk"
                            }
                        ],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 220,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-20 05:17:05",
                        title: "II. Kodeverk, terminologier"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 222,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:52:40",
                        title: "title2"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 223,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:45:56",
                        title: "title"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 224,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:47:48",
                        title: "title"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 225,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:51:10",
                        title: "title"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 226,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:51:48",
                        title: "title"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 227,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:52:03",
                        title: "title"
                    },
                    {
                        children: [],
                        comment: null,
                        description: null,
                        documents: [],
                        id: 228,
                        parentId: null,
                        sequence: 1,
                        timestamp: "2016-05-23 16:52:40",
                        title: "title"
                    }
                ]
        };
    }

    /**
     * Returns target groups
     */
    function getTargetGroups() {
        //return {"targetGroups": input_list.targetGroups};
        return {
            targetGroups:
                [
                    {
                        abbreviation: "AMB",
                        description: "asd",
                        id: 10,
                        name: "Ambulanse",
                        parentId: null
                    },
                    {
                        abbreviation: "SHT",
                        description: "asd",
                        id: 11,
                        name: "Spesialisthelsetjenesten",
                        parentId: null
                    }
                ]
        };
    }


    /**
     * Returns tree structure of topics
     *
     * The tree structure consists of
     * @returns {Array}
     */
    function getTopicTree() {

        var topic_tree = [];    // Tree to return
        var topic_dict = [];    // Dictionary with id of topics
        var topic_children = [];    // List on the format topic_children[parent_id] : [child1,...,childN]
        var topic_list = input_list.topics;

        for (var i = 0; i < topic_list.length; i++) {
            var topic = cloneObjectList(topic_list[i]);
            var parent_id = topic.parentId;
            // If topic does not have a parent, push to list (level 0 of topic_tree)
            if (parent_id == null) {
                topic_tree.push(topic);
            } else {
                // If topic_children[parent_id] does not exist, add it
                if (!(parent_id in topic_children)) {
                    topic_children[parent_id] = [];
                }
                topic.children = [];
                topic_children[parent_id].push(topic);
            }
            topic_dict[topic.id] = topic;
        }
        // Add the children lists (topic_children[parent_id]) to their parents
        for (var index in topic_children) {
            var parent = topic_dict[index];
            // Sort each children list on sequence
            topic_children[index].sort(SORT_ON_SEQUENCE);

            parent.children = topic_children[index];
        }
        // Sort topics on sequence
        topic_tree.sort(SORT_ON_SEQUENCE);

        return topic_tree;
    }

    /**
     * Returns document tree
     * @returns {Array}
     */
    function getDocumentWithProfilesList() {
        var document_list = [];
        var document_dict = [];
        var documents = cloneObjectList(input_list.documents);
        var profiles = [];

        for (var i = 0; i < documents.length; i++) {
            var document = cloneObjectList(documents[i]);
            var id = document.id;
            var standard_id = document.standardId;
            // Only non-archived documents is handled
            if (document.isArchived == 0) {
                delete document["isArchived"];
                document_dict[id] = document;
                // add profiles list to document, if it does not exist
                if (!("profiles" in document)) {
                    //console.log("Add profile list")
                    document["profiles"] = [];
                }
                // If the document has a standards_id, it is a profile of another document.
                if (standard_id != null) {
                    if (!(standard_id in profiles)) {
                        profiles[standard_id] = []
                    }
                    profiles[standard_id].push({"id": id});
                }
                document_list.push(document);
            }
        }
        // Add profiles list to the documents with profiles
        for (var index in profiles) {
            document_dict[index].profiles = profiles[index];
        }
        // Sort documents on sequence
        document_list.sort(SORT_ON_SEQUENCE);

        return document_list;
    }

    return {
        getActions: getActions,
        getDocuments: getDocuments,
        getDocumentFields: getDocumentFields,
        getDocumentTypes: getDocumentTypes,
        getLinkCategories: getLinkCategories,
        getStatus: getStatus,
        getMandatory: getMandatory,
        getTopics: getTopics,
        getTargetGroups: getTargetGroups
    };
}]);
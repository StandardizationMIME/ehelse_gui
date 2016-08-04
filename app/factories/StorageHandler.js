"use strict";

angular.module("ehelseEditor").factory("StorageHandler", ["$rootScope", "FileUpload", "ServiceFunction", "CSVConverter",
    function ($rootScope, FileUpload, ServiceFunction, CSVConverter) {


        var input_list = [];

        init();

        function init() {
            //input_list = FileUpload.getJsonFile();
            input_list = {
                "actions": [
                    {
                        "name": "Motta",
                        "id": "1",
                        "isArchived": 0
                    },
                    {
                        "name": "Sende/motta",
                        "id": "2",
                        "isArchived": 0
                    },
                    {
                        "name": "Send",
                        "id": "3",
                        "isArchived": 0
                    }
                ],
                "documentFields": [
                    {
                        "id": "4",
                        "name": "Utgivers ID",
                        "sequence": 1,
                        "mandatory": "0",
                        "documentTypeId": 1,
                        "isArchived": 0,
                        "isRichText": 0
                    },
                    {
                        "id": "1",
                        "name": "Versjon",
                        "sequence": "2",
                        "mandatory": "0",
                        "documentTypeId": 1,
                        "isArchived": 0,
                        "isRichText": 0
                    },
                    {
                        "id": "2",
                        "name": "Publisert",
                        "sequence": "2",
                        "mandatory": "0",
                        "documentTypeId": 1,
                        "isArchived": 0,
                        "isRichText": 0
                    },
                    {
                        "id": "3",
                        "name": "Utgiver",
                        "sequence": "3",
                        "mandatory": "0",
                        "documentTypeId": 1,
                        "isArchived": 0,
                        "isRichText": 0
                    },
                    {
                        "id": "6",
                        "name": "Alternativ ID",
                        "sequence": "3",
                        "mandatory": "0",
                        "documentTypeId": 1,
                        "isArchived": 0,
                        "isRichText": 0
                    },
                    {
                        "id": "5",
                        "name": "Merknad",
                        "sequence": "5",
                        "mandatory": "0",
                        "documentTypeId": 1,
                        "isArchived": 0,
                        "isRichText": 0
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
                    }
                ],
                "linkCategories": [
                    {
                        "name": "Kravdokument",
                        "id": "1",
                        "isArchived": 0
                    },
                    {
                        "name": "Bibliografi",
                        "id": "2",
                        "isArchived": 0
                    },
                    {
                        "name": "Relatert dokument",
                        "id": "3",
                        "isArchived": 0
                    },
                    {
                        "name": "Nettsted",
                        "id": "4",
                        "isArchived": 0
                    },
                    {
                        "name": "Dokument",
                        "id": "5",
                        "isArchived": 0
                    },
                    {
                        "name": "Selvdeklarering av programvare",
                        "id": "6",
                        "isArchived": 0
                    },
                    {
                        "name": "Tilgjengelig fra",
                        "id": "7",
                        "isArchived": 0
                    },
                    {
                        "name": "Se også",
                        "id": "8",
                        "isArchived": 0
                    }
                ],
                "mandatory": [
                    {
                        "name": "Obligatorisk",
                        "description": "Må brukes av alle relevante målgrupper",
                        "id": "1",
                        "isArchived": 0
                    },
                    {
                        "name": "Anbefalt",
                        "description": "Anbefalt av alle relevante målgrupper",
                        "id": "2",
                        "isArchived": 0
                    },
                    {
                        "name": "Frivillig",
                        "description": "Kan brukes fritt",
                        "id": "3",
                        "isArchived": 0
                    }
                ],
                "targetGroups": [
                    {
                        "id": "1",
                        "name": "Helse- og omsorgssektoren",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "2",
                        "name": "Virksomheter som har plikt til å rapportere virksomhetsdata til NPR",
                        "description": "",
                        "parentId": "11",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "3",
                        "name": "Virksomheter som yter allmennlegetjenester",
                        "description": "",
                        "parentId": "9",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "4",
                        "name": "Virksomheter innen psykisk helsevern som har plikt til å rapportere virksomhetsdata til NPR",
                        "description": "",
                        "parentId": "13",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "5",
                        "name": "Virksomheter som utfører en patologisk undersøkelse",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "",
                        "isArchived": 1
                    },
                    {
                        "id": "6",
                        "name": "​Laboratorier (patologi, immunologi og transfusjonsmedisin, medisinsk mikrobiologi, klinisk farmakologi, medisinsk genetikk og medisinsk biokjemi) i spesialisthelsetjenesten.",
                        "description": "",
                        "parentId": "11",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "7",
                        "name": "​Virksomheter i helsesektoren som rekvirerer laboratorietjenester",
                        "description": "",
                        "parentId": "10",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "8",
                        "name": "​Virksomheter i helsesektoren som rekvirerer laboratorietjenester",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "",
                        "isArchived": 1
                    },
                    {
                        "id": "9",
                        "name": "Allmenlegetjenesten",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "AL",
                        "isArchived": 0
                    },
                    {
                        "id": "10",
                        "name": "Kommunal helse- og omsorgstjeneste",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "KHO",
                        "isArchived": 0
                    },
                    {
                        "id": "11",
                        "name": "Spesialisthelsetjenesten",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "S",
                        "isArchived": 0
                    },
                    {
                        "id": "12",
                        "name": "Virksomheter som utfører patologiske undersøkelser",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "PAT",
                        "isArchived": 0
                    },
                    {
                        "id": "13",
                        "name": "Virksomheter innen psykisk helsevern",
                        "description": "",
                        "parentId": null,
                        "abbreviation": "PSY",
                        "isArchived": 0
                    },
                    {
                        "id": "14",
                        "name": "Virksomheter som har plikt til å rapportere virksomhetsdata som inkluderer medisinske prosedyrer til NPR",
                        "description": "",
                        "parentId": "11",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "15",
                        "name": "​Virksomheter som har plikt til å rapportere virksomhetsdata som inkluderer kirurgiske inngrep til NPR",
                        "description": "",
                        "parentId": "11",
                        "abbreviation": "",
                        "isArchived": 0
                    },
                    {
                        "id": "16",
                        "name": "​Virksomheter som har plikt til å rapportere virksomhetsdata som inkluderer radiologiske prosedyrer til NPR",
                        "description": "",
                        "parentId": "11",
                        "abbreviation": "",
                        "isArchived": 0
                    }
                ],
                "status": [
                    {
                        "name": "Aktiv",
                        "id": "1",
                        "isArchived": 0
                    },
                    {
                        "name": "Under innfasing",
                        "id": "1",
                        "isArchived": 0
                    },
                    {
                        "name": "Ikke i refkat",
                        "id": "1",
                        "isArchived": 0
                    }
                ],
                "headings": [],
                "contactAddresses": [],
                "topics": [
                    {
                        "id": "1",
                        "title": "Del 1: Informasjonsssikkerhet",
                        "description": "Omfatter standarder og andre kravdokumenter som skal bidra til tilfredsstillende informasjonssikkerhet med hensyn til konfidensialitet, integritet, kvalitet og tilgjengelighet ved behandling av helseopplysninger.",
                        "sequence": 1,
                        "parentId": null
                    },
                    {
                        "id": "3",
                        "title": "Begrepsapparat og kodeverk",
                        "description": "",
                        "sequence": 1,
                        "parentId": "2"
                    },
                    {
                        "id": "2",
                        "title": "Del 2: Kodeverk, terminologier mv",
                        "description": "Omfatter standarder og andre kravdokumenter som skal bidra til ensartet bruk av termer og koder i helse- og omsorgstjenesten.\n\n​​​​I tillegg til de klassifikasjoner som det her stilles krav om, vil det også kunne inngå krav til bruk av bestemte kodeverk i standarder som inngår i de øvrige delene av Referansekatalogen for e-helse.",
                        "sequence": "2",
                        "parentId": null
                    }
                ],
                "documents": [
                    {
                        "id": "7",
                        "topicId": "1",
                        "title": "asdads",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sadlkklads",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:39:50",
                        "createdTimestamp": "2016-08-04 11:39:50"
                    },
                    {
                        "id": "1",
                        "topicId": "1",
                        "title": "Sikkerhetskrav for systemer - selvdeklarering",
                        "documentTypeId": "1",
                        "statusId": "1",
                        "internalId": "1.1",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                        "sequence": 1,
                        "targetGroups": [
                            {
                                "targetGroupId": "1",
                                "description": "",
                                "actionId": null,
                                "deadline": "",
                                "mandatoryId": "2"
                            }
                        ],
                        "fields": [
                            {
                                "fieldId": "1",
                                "value": "4.1"
                            },
                            {
                                "fieldId": "2",
                                "value": "17.8.2015"
                            },
                            {
                                "fieldId": "3",
                                "value": "Styringsgruppen for Norm for informasjonssikkerhet"
                            }
                        ],
                        "links": [
                            {
                                "linkCategoryId": "3",
                                "text": "Norm for informasjonssikkerhet Helse- og omsorgstjenesten (PDF)",
                                "url": "https://ehelse.no/Documents/Normen/Norm%20for%20informasjonssikkerhet%205.1%20%20utgave.pdf"
                            },
                            {
                                "linkCategoryId": "5",
                                "text": "Faktaark nr. 38: Sikkerhetskrav for systemer (PDF)",
                                "url": "https://ehelse.no/Documents/Normen/Faktaark%2038%20-%20Sikkerhetskrav%20for%20systemer.pdf"
                            },
                            {
                                "linkCategoryId": "4",
                                "text": "Normen på ehelse.no",
                                "url": "https://ehelse.no/Sider/Norm-for-informasjonssikkerhet.aspx"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veiledning og selvdeklarering for deklareringsområdet - informasjonssikkerhet-V1.0.(PDF)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Microsoft%20Word%20-%20Veiledning%20til%20deklareringsordningen%20-%20informasjonssikkerhet%20V1.0.pdf"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Autentisering-V1.0. (DOC)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autentisering%20-%20V1.0%20(doc).doc"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Autentisering-V1.0.(ODT)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autentisering%20-%20V1.0%20(odt).odt"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Autorisering-V1.0.(DOC)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autorisering%20-%20V1.0%20(doc).doc"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Autorisering-V1.0.(ODT)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autorisering%20-%20V1.0%20(odt).odt"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Hendelsesregistering-V1.0.(DOC)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Hendelsesregistering%20-%20V1.0%20(doc).doc"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Hendelsesregistering-V1.0.(ODT)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Hendelsesregistering%20-%20V1.0%20(odt).odt"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Kvalitet-V1.0.(DOC)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Kvalitet%20-%20V1.0%20(doc).doc"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Kvalitet-V1.0.(ODT)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Kvalitet%20-%20V1.0%20(odt).odt"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Pasientrettigheter-V1.0.(DOC)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Pasientrettigheter%20-%20V1.0%20(doc).doc"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Pasientrettigheter-V1.0.(ODT)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Pasientrettigheter%20-%20V1%200%20(odt).odt"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Tilleggskrav-V1.0.(DOC)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Tilleggskrav%20-%20V1.0%20(doc).doc"
                            },
                            {
                                "linkCategoryId": "6",
                                "text": "Veilednings- og selvdeklareringsdokument-Tilleggskrav-V1.0.(ODT)",
                                "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Tilleggskrav%20-%20V1.0%20(odt).odt"
                            }
                        ],
                        "standardId": null,
                        "editedTimestamp": "2016-08-02 08:49:59",
                        "createdTimestamp": "2016-08-02 08:35:17"
                    },
                    {
                        "id": "3",
                        "topicId": "1",
                        "title": "asd",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "asd",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:39:23",
                        "createdTimestamp": "2016-08-04 11:39:23"
                    },
                    {
                        "id": "4",
                        "topicId": "1",
                        "title": "asd",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sdadasdsa",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:39:28",
                        "createdTimestamp": "2016-08-04 11:39:28"
                    },
                    {
                        "id": "5",
                        "topicId": "1",
                        "title": "adjskdjsa",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "asdjk",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:39:33",
                        "createdTimestamp": "2016-08-04 11:39:33"
                    },
                    {
                        "id": "6",
                        "topicId": "1",
                        "title": "dsa",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sdajkldsa",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:39:38",
                        "createdTimestamp": "2016-08-04 11:39:38"
                    },
                    {
                        "id": "2",
                        "topicId": "3",
                        "title": "ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer",
                        "documentTypeId": "1",
                        "statusId": "1",
                        "internalId": "2.1",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "Dette kodeverket benyttes for koding av sykdommer og beslektede helseproblemer. Anvendes i spesialisthelsetjenesten.",
                        "sequence": 1,
                        "targetGroups": [
                            {
                                "targetGroupId": "2",
                                "description": "",
                                "actionId": null,
                                "deadline": "",
                                "mandatoryId": "1"
                            }
                        ],
                        "fields": [
                            {
                                "fieldId": "4",
                                "value": "ICD-10 2016"
                            },
                            {
                                "fieldId": "5",
                                "value": "Kodeverk OID: 2.16.578.1.12.4.1.1.7110."
                            },
                            {
                                "fieldId": "3",
                                "value": "Helsedirektoratet / Verdens helseorganisasjon"
                            },
                            {
                                "fieldId": "6",
                                "value": "IS-2277"
                            }
                        ],
                        "links": [
                            {
                                "linkCategoryId": "7",
                                "text": "Kodeverket ICD-10 (og ICD-11)",
                                "url": "https://ehelse.no/Sider/Kodeverket-ICD-10-(og-ICD-11).aspx"
                            },
                            {
                                "linkCategoryId": "8",
                                "text": "http://helsedirektoratet.no/norsk-pasientregister-npr/registrere-og-rapportere-data",
                                "url": "https://ehelse.no/Sider/Kodeverket-ICD-10-(og-ICD-11).aspx"
                            }
                        ],
                        "standardId": null,
                        "editedTimestamp": "2016-08-02 09:31:20",
                        "createdTimestamp": "2016-08-02 09:29:20"
                    },
                    {
                        "id": "8",
                        "topicId": "1",
                        "title": "saddas",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "saddasads",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:39:57",
                        "createdTimestamp": "2016-08-04 11:39:57"
                    },
                    {
                        "id": "9",
                        "topicId": "1",
                        "title": "sdakldsajk",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sadjklsdajkdsakjl",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:40:05",
                        "createdTimestamp": "2016-08-04 11:40:05"
                    },
                    {
                        "id": "10",
                        "topicId": "1",
                        "title": "sadkljdsajkladsjkl",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sadadsadsads",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:40:14",
                        "createdTimestamp": "2016-08-04 11:40:14"
                    },
                    {
                        "id": "11",
                        "topicId": "1",
                        "title": "sdajkasdj",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "adsjksadjk",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:40:30",
                        "createdTimestamp": "2016-08-04 11:40:30"
                    },
                    {
                        "id": "12",
                        "topicId": "1",
                        "title": "sdajkasdjkadsjk",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sadjksadjk",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 11:40:39",
                        "createdTimestamp": "2016-08-04 11:40:39"
                    },
                    {
                        "id": "13",
                        "topicId": "1",
                        "title": "saddsa",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "sadadsadsadsasd",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 12:09:05",
                        "createdTimestamp": "2016-08-04 12:09:05"
                    },
                    {
                        "id": "14",
                        "topicId": "1",
                        "title": "asdsadsdsaadsdasdsasdadsadsadsaadssad",
                        "documentTypeId": "2",
                        "statusId": "1",
                        "contactAddressId": null,
                        "internalId": "123432",
                        "hisNumber": null,
                        "nextDocumentId": null,
                        "previousDocumentId": null,
                        "description": "",
                        "sequence": 1,
                        "headingContent": [],
                        "targetGroups": [],
                        "fields": [],
                        "links": [],
                        "standardId": "1",
                        "editedTimestamp": "2016-08-04 12:09:18",
                        "createdTimestamp": "2016-08-04 12:09:18"
                    }
                ],
                "archivedDocuments": {
                    "1": [
                        {
                            "id": "1",
                            "topicId": "1",
                            "title": "Sikkerhetskrav for systemer - selvdeklarering",
                            "documentTypeId": "1",
                            "statusId": 1,
                            "internalId": "1.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "",
                            "sequence": 1,
                            "targetGroups": [],
                            "fields": [],
                            "links": [],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 08:35:17",
                            "createdTimestamp": "2016-08-02 08:35:17"
                        },
                        {
                            "id": "1",
                            "topicId": "1",
                            "title": "Sikkerhetskrav for systemer - selvdeklarering",
                            "documentTypeId": "1",
                            "statusId": "1",
                            "internalId": "1.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                            "sequence": 1,
                            "targetGroups": [],
                            "fields": [],
                            "links": [],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 08:38:49",
                            "createdTimestamp": "2016-08-02 08:35:17"
                        },
                        {
                            "id": "1",
                            "topicId": "1",
                            "title": "Sikkerhetskrav for systemer - selvdeklarering",
                            "documentTypeId": "1",
                            "statusId": "1",
                            "internalId": "1.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                            "sequence": 1,
                            "targetGroups": [
                                {
                                    "targetGroupId": "1",
                                    "description": "",
                                    "actionId": null,
                                    "deadline": "",
                                    "mandatoryId": "2"
                                }
                            ],
                            "fields": [],
                            "links": [
                                {
                                    "linkCategoryId": "3",
                                    "text": "Norm for informasjonssikkerhet Helse- og omsorgstjenesten (PDF)",
                                    "url": "https://ehelse.no/Documents/Normen/Norm%20for%20informasjonssikkerhet%205.1%20%20utgave.pdf"
                                }
                            ],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 08:41:05",
                            "createdTimestamp": "2016-08-02 08:35:17"
                        },
                        {
                            "id": "1",
                            "topicId": "1",
                            "title": "Sikkerhetskrav for systemer - selvdeklarering",
                            "documentTypeId": "1",
                            "statusId": "1",
                            "internalId": "1.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                            "sequence": 1,
                            "targetGroups": [
                                {
                                    "targetGroupId": "1",
                                    "description": "",
                                    "actionId": null,
                                    "deadline": "",
                                    "mandatoryId": "2"
                                }
                            ],
                            "fields": [],
                            "links": [
                                {
                                    "linkCategoryId": "3",
                                    "text": "Norm for informasjonssikkerhet Helse- og omsorgstjenesten (PDF)",
                                    "url": "https://ehelse.no/Documents/Normen/Norm%20for%20informasjonssikkerhet%205.1%20%20utgave.pdf"
                                },
                                {
                                    "linkCategoryId": "5",
                                    "text": "Faktaark nr. 38: Sikkerhetskrav for systemer (PDF)",
                                    "url": "https://ehelse.no/Documents/Normen/Faktaark%2038%20-%20Sikkerhetskrav%20for%20systemer.pdf"
                                },
                                {
                                    "linkCategoryId": "4",
                                    "text": "Normen på ehelse.no",
                                    "url": "https://ehelse.no/Sider/Norm-for-informasjonssikkerhet.aspx"
                                }
                            ],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 08:42:36",
                            "createdTimestamp": "2016-08-02 08:35:17"
                        },
                        {
                            "id": "1",
                            "topicId": "1",
                            "title": "Sikkerhetskrav for systemer - selvdeklarering",
                            "documentTypeId": "1",
                            "statusId": "1",
                            "internalId": "1.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "Dette kravdokumentet angir krav innenfor informasjonssikkerhet som skal ivaretas av programvaresystemer.",
                            "sequence": 1,
                            "targetGroups": [
                                {
                                    "targetGroupId": "1",
                                    "description": "",
                                    "actionId": null,
                                    "deadline": "",
                                    "mandatoryId": "2"
                                }
                            ],
                            "fields": [],
                            "links": [
                                {
                                    "linkCategoryId": "3",
                                    "text": "Norm for informasjonssikkerhet Helse- og omsorgstjenesten (PDF)",
                                    "url": "https://ehelse.no/Documents/Normen/Norm%20for%20informasjonssikkerhet%205.1%20%20utgave.pdf"
                                },
                                {
                                    "linkCategoryId": "5",
                                    "text": "Faktaark nr. 38: Sikkerhetskrav for systemer (PDF)",
                                    "url": "https://ehelse.no/Documents/Normen/Faktaark%2038%20-%20Sikkerhetskrav%20for%20systemer.pdf"
                                },
                                {
                                    "linkCategoryId": "4",
                                    "text": "Normen på ehelse.no",
                                    "url": "https://ehelse.no/Sider/Norm-for-informasjonssikkerhet.aspx"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veiledning og selvdeklarering for deklareringsområdet - informasjonssikkerhet-V1.0.(PDF)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Microsoft%20Word%20-%20Veiledning%20til%20deklareringsordningen%20-%20informasjonssikkerhet%20V1.0.pdf"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Autentisering-V1.0. (DOC)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autentisering%20-%20V1.0%20(doc).doc"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Autentisering-V1.0.(ODT)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autentisering%20-%20V1.0%20(odt).odt"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Autorisering-V1.0.(DOC)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autorisering%20-%20V1.0%20(doc).doc"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Autorisering-V1.0.(ODT)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Autorisering%20-%20V1.0%20(odt).odt"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Hendelsesregistering-V1.0.(DOC)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Hendelsesregistering%20-%20V1.0%20(doc).doc"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Hendelsesregistering-V1.0.(ODT)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Hendelsesregistering%20-%20V1.0%20(odt).odt"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Kvalitet-V1.0.(DOC)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Kvalitet%20-%20V1.0%20(doc).doc"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Kvalitet-V1.0.(ODT)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Kvalitet%20-%20V1.0%20(odt).odt"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Pasientrettigheter-V1.0.(DOC)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Pasientrettigheter%20-%20V1.0%20(doc).doc"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Pasientrettigheter-V1.0.(ODT)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Pasientrettigheter%20-%20V1%200%20(odt).odt"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Tilleggskrav-V1.0.(DOC)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Tilleggskrav%20-%20V1.0%20(doc).doc"
                                },
                                {
                                    "linkCategoryId": "6",
                                    "text": "Veilednings- og selvdeklareringsdokument-Tilleggskrav-V1.0.(ODT)",
                                    "url": "https://ehelse.no/Documents/Normen/2%20Normen%20prosessdok/Veilednings-%20og%20selvdeklareringsdokument%20-%20Tilleggskrav%20-%20V1.0%20(odt).odt"
                                }
                            ],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 08:49:07",
                            "createdTimestamp": "2016-08-02 08:35:17"
                        }
                    ],
                    "2": [
                        {
                            "id": "2",
                            "topicId": "3",
                            "title": "ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer",
                            "documentTypeId": "1",
                            "statusId": "1",
                            "internalId": "2.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "Dette kodeverket benyttes for koding av sykdommer og beslektede helseproblemer. Anvendes i spesialisthelsetjenesten.",
                            "sequence": 1,
                            "targetGroups": [
                                {
                                    "targetGroupId": "2",
                                    "description": "",
                                    "actionId": null,
                                    "deadline": "",
                                    "mandatoryId": "1"
                                }
                            ],
                            "fields": [
                                {
                                    "fieldId": "4",
                                    "value": "ICD-10 2016"
                                },
                                {
                                    "fieldId": "5",
                                    "value": "Kodeverk OID: 2.16.578.1.12.4.1.1.7110."
                                },
                                {
                                    "fieldId": "3",
                                    "value": "Helsedirektoratet / Verdens helseorganisasjon"
                                }
                            ],
                            "links": [],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 09:29:20",
                            "createdTimestamp": "2016-08-02 09:29:20"
                        },
                        {
                            "id": "2",
                            "topicId": "3",
                            "title": "ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer",
                            "documentTypeId": "1",
                            "statusId": "1",
                            "internalId": "2.1",
                            "hisNumber": null,
                            "nextDocumentId": null,
                            "previousDocumentId": null,
                            "description": "Dette kodeverket benyttes for koding av sykdommer og beslektede helseproblemer. Anvendes i spesialisthelsetjenesten.",
                            "sequence": 1,
                            "targetGroups": [
                                {
                                    "targetGroupId": "2",
                                    "description": "",
                                    "actionId": null,
                                    "deadline": "",
                                    "mandatoryId": "1"
                                }
                            ],
                            "fields": [
                                {
                                    "fieldId": "4",
                                    "value": "ICD-10 2016"
                                },
                                {
                                    "fieldId": "5",
                                    "value": "Kodeverk OID: 2.16.578.1.12.4.1.1.7110."
                                },
                                {
                                    "fieldId": "3",
                                    "value": "Helsedirektoratet / Verdens helseorganisasjon"
                                },
                                {
                                    "fieldId": "6",
                                    "value": "IS-2277"
                                }
                            ],
                            "links": [],
                            "standardId": null,
                            "editedTimestamp": "2016-08-02 09:30:01",
                            "createdTimestamp": "2016-08-02 09:29:20"
                        }
                    ]
                }
            };
            initValues();
        }

        function initCsv() {
            input_list = CSVConverter.getConvertedCsv();
            initValues();
        }

        function initValues(){
            input_list.documentTypes = [
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
            if (!input_list.documents) {
                input_list.documents = [];
            }
            if (!input_list.status) {
                input_list.status = [];
            }
            if (!input_list.mandatory) {
                input_list.mandatory = [];
            }
            if (!input_list.actions) {
                input_list.actions = [];
            }
            if (!input_list.linkCategories) {
                input_list.linkCategories = [];
            }
            if (!input_list.documentFields) {
                input_list.documentFields = [];
            }
            if (!input_list.headings) {
                input_list.headings = [];
            }
            if (!input_list.contactAddresses) {
                input_list.contactAddresses = [];
            }
            if (!input_list.topics) {
                input_list.topics = [];
            }
            if (!input_list.archivedDocuments) {
                input_list.archivedDocuments = {};
            }
        }

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
            return {"actions": input_list.actions.sort()};
        }

        /**
         * Return document list
         * @returns {{documents: Array}}
         */
        function getDocuments() {
            return {"documents": getDocumentWithProfilesList()};
        }

        /**
         * Returns document field list
         * @returns {{documentFields: Array}}
         */
        function getDocumentFields() {
            var sorted_document_list = input_list.documentFields.sort(SORT_ON_SEQUENCE);
            return {"documentFields": sorted_document_list};
        }

        /**
         * Returns document types
         */
        function getDocumentTypes() {
            return {"documentTypes": input_list.documentTypes};
        }

        /**
         * Returns link categories
         */
        function getLinkCategories() {
            return {"linkCategories": input_list.linkCategories};
        }

        /**
         * Returns headings
         */
        function getHeadings() {
            return {"headings": input_list.headings};
        }

        /**
         * Returns status list
         * @returns {Array}
         */
        function getStatus() {
            return {"status": input_list.status};
        }

        /**
         * Returns mandatory list
         * @returns {{mandatory: Array}}
         */
        function getMandatory() {
            return {"mandatory": input_list.mandatory};
        }

        /**
         * Returns topic tree
         */
        function getTopics() {
            return {"topics": getTopicTree()};
        }

        /**
         * Returns contact addresses
         */
        function getContactAddresses() {
            return {"contactAddresses": input_list.contactAddresses};
        }

        /**
         * Returns target groups
         */
        function getTargetGroups() {
            return {"targetGroups": input_list.targetGroups};
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
                    topic.children = [];
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
                document_dict[id] = document;
                // add profiles list to document, if it does not exist
                if (!("profiles" in document)) {
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
            // Add profiles list to the documents with profiles
            for (var index in profiles) {
                document_dict[index].profiles = profiles[index];
            }
            // Sort documents on sequence
            document_list.sort(SORT_ON_SEQUENCE);
            return document_list;
        }

        /**
         * Returns archived documents
         * @returns {*}
         */
        function getArchivedDocuments() {
            return cloneObjectList(input_list.archivedDocuments);
        }

        /**
         * Returns list of archived documents by id
         * @param id
         * @returns {*}
         */
        function getArchivedDocumentsById(id) {
            return input_list.archivedDocuments[id];
        }

        /**
         * Adds document to archivedDocuments by id
         *
         * @param document
         * @returns {boolean}
         */
        function addArchivedDocumentsById(document) {       // TODO: change name - remove "ById", since input is document
            var document_clone = ServiceFunction.cloneDocument(document);   // TODO: is it more logical to clone argument to this function?
            var id = document_clone.id;
            var archived_documents = input_list.archivedDocuments;
            if (document_clone.id in archived_documents){
                archived_documents[id].push(document_clone);
            }
            else{
                archived_documents[id] = [document_clone];
            }
        }



        return {
            init: init,
            initCsv: initCsv,
            getHeadings: getHeadings,
            getActions: getActions,
            getDocuments: getDocuments,
            getDocumentFields: getDocumentFields,
            getDocumentTypes: getDocumentTypes,
            getLinkCategories: getLinkCategories,
            getStatus: getStatus,
            getMandatory: getMandatory,
            getContactAddresses: getContactAddresses,
            getTopics: getTopics,
            getTargetGroups: getTargetGroups,
            getArchivedDocuments: getArchivedDocuments,
            getArchivedDocumentsById: getArchivedDocumentsById,
            addArchivedDocumentsById: addArchivedDocumentsById
        };
    }]);

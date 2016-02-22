/**
 * Created by Stian on 12.02.2016.
 */
(function(){
    var app = angular.module('mainApp', []);

    app.controller('ThemeController', function(){
        this.themes = themes;
    });

    app.controller('DisplayController', function($scope) {

        $scope.getContent = function(theme) {
            $(".theme-text").css("font-weight", "normal").css("background-color", "transparent");
            $("#" + theme.themeId).css("font-weight", "bolder").css("background-color", "#e7e7e7");
            var standardDisplay = $(".standard-display");
            standardDisplay.empty();
            standardDisplay.html('<p><h4>' + theme.themeName + '</h4></p><p><span class="glyphicon glyphicon-plus plus-icon"></span> Ny standard</p>');
            var i;
            for (i = 0; i < theme.standards.length; ++i) {
                var standards = theme.standards;
                standardDisplay.append('<p><a ng-controller="DisplayContentController as displaContCtrl" ng-click="getStdContent(standards[i])"><span class="standard-icon glyphicon glyphicon-file"></span> ' + standards[i].standardName + '</a></p>');
            }
            $("#folder" + theme.themeId).toggleClass("glyphicon-folder-close glyphicon-folder-open");
        };
    });

    app.controller('DisplayContentController', function($scope){
        $scope.getStdContent = function(standard){
            var stdContentDisplay = $(".content-display");
            stdContentDisplay.empty();

            for (var i = 0; i < standard.fields.length; ++i){
                stdContentDisplay.append('<li>'+ standard.fields[i].fieldTitle +'</li>');
            }
        };
    });

    app.directive('toolbar',function(){
        return{
            restrict: 'E',
            templateUrl: 'toolbar.html'
        };
    });

    app.directive('editordisplay',function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display.html'
        };
    });

    app.directive('filelist', function(){
        return{
            restrict: 'E',
            templateUrl: 'file-list.html'
        };
    });

    app.directive('contentdisplay', function(){
        return{
            restrict: 'E',
            templateUrl: 'content-display.html'
        };
    });


    app.directive('filebrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'file-browser.html'
        };
    });


    var themes = [
        {
            
            themeId: 1,
            themeName: 'Del 1 - Informasjonssikkerhet',
            themeDescription: "Denne delen av Referansekatalogen for e-helse omfatter standarder og andre kravdokumenter som skal bidra til tilfredsstillende" +
                         " informasjonssikkerhet med hensyn til konfidensialitet, integritet, kvalitet og tilgjengelighet ved behandling av helseopplysninger.",
            extraInfo: [
                {
                    title: '',
                    content: 'Alle virksomheter som er tilknyttet Norsk helsenett er forpliktet til å følge Norm for informasjonssikkerhet Helse- og omsorgstjenesten (normen.no).'
                }
            ],
            subThemes: [
                {
                    themeId: 2,
                    themeName: 'Andre standarder',
                    standards: [
                        {
                            standardName: 'Sikkerhetskrav for systemer - Selvdeklarering​'
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardName: 'Sikkerhetskrav for systemer - Selvdeklarering​',
                    fields: [
                        {
                            fieldID: '1',
                            fieldType: 'text',
                            fieldTitle: 'Titel',
                            fieldContent: 'Sikkerhetskrav for systemer - Selvdeklarering'
                        },
                        {
                            fieldID: '2',
                            fieldType: 'text',
                            fieldTitle: 'Referansekatalog ID',
                            fieldContent: '1.1'
                        },
                        {
                            fieldID: '3',
                            fieldType: 'text',
                            fieldTitle: 'Utgiver',
                            fieldContent: 'Styringsgruppen for Norm for informasjonssikkerhet'
                        },
                        {
                            fieldID: '4',
                            fieldType: 'text',
                            fieldTitle: 'Status',
                            fieldContent: 'Aktiv'
                        },
                        {
                            fieldID: '5',
                            fieldType: 'text',
                            fieldTitle: 'Versjon',
                            fieldContent: '4.1'
                        },
                        {
                            fieldID: '6',
                            fieldType: 'text',
                            fieldTitle: 'Publisert',
                            fieldContent: '17.8.2015'
                        }
                    ]
                }
            ]
        },
        {
            themeId: 3,
            themeName: 'Del 2 - Kodeverk, terminologier mv.',
            themeDescription: "Denne delen av Referansekatalogen for e-helse omfatter standarder og andre kravdokumenter som skal bidra til en ensartet bruk av termer og koder " +
                         "innen helse- og omsorgstjenesten.",
            extraInfo: [
                {
                    title: '',
                    content: "I tillegg til de klassifikasjoner mv. som det her stilles krav om, vil det også kunne inngå krav til bruk av bestemte kodeverk" +
                             " i standarder mv. som inngår i de øvrige delene av denne Referansekatalogen for e-helse."
                }
            ],
            subThemes: [
                {
                    themeId: 4,
                    themeName: 'Andre standarder',
                    standards: [
                        {
                            standardName: '​ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '2.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet / Verdens helseorganisasjon'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: 'ICPC-2: Den internasjonale klassifikasjonen for primærhelsetjenesten',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'ICPC-2: Den internasjonale klassifikasjonen for primærhelsetjenesten'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '3.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet, NSAM og Wonca'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]

                        },
                        {
                            standardName: '​NCMP: Kodeverk for medisinske prosedyrer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'NCMP: Kodeverk for medisinske prosedyrer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '4.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: '​NCSP: Kodeverk for kirurgiske prosedyrer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'NCMP: Kodeverk for medisinske prosedyrer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '5.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: 'NCRP: Norsk klassifikasjon av radiologiske prosedyrer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'NCRP: Norsk klassifikasjon av radiologiske prosedyrer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '6.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: '​ICD-10: Psykiske lidelser og atferdsforstyrrelse: kliniske beskrivelser og diagnostiske retningslinjer (Blåboka)',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: '​ICD-10: Psykiske lidelser og atferdsforstyrrelse: kliniske beskrivelser og diagnostiske retningslinjer (Blåboka)'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '7.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet / Verdens helseorganisasjon'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: 'Den norske SNOMED​',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'Den norske SNOMED​'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '8.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Den norske patologforening'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: '​ATC: Anatomisk Terapeutisk Kjemisk legemiddelregister',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: '​ATC: Anatomisk Terapeutisk Kjemisk legemiddelregister​'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '9.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'WHO Collaborating Centre for Drug Statistics Methodology (under Folkehelseinstituttet)'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: 'Multiaksial klassifikasjon i psykisk helsevern for barn og unge (BUP)',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'Multiaksial klassifikasjon i psykisk helsevern for barn og unge (BUP)​'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '10.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardName: '​Norsk laboratoriekodeverk (NLK)',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'Norsk laboratoriekodeverk (NLK)'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '11.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardName: '​ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer',
                    fields: [
                        {
                            fieldID: '1',
                            fieldType: 'text',
                            fieldTitle: 'Titel',
                            fieldContent: '​ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer'
                        },
                        {
                            fieldID: '2',
                            fieldType: 'text',
                            fieldTitle: 'Referansekatalog ID',
                            fieldContent: '12.2'
                        },
                        {
                            fieldID: '3',
                            fieldType: 'text',
                            fieldTitle: 'Utgiver',
                            fieldContent: 'Helsedirektoratet / Verdens helseorganisasjon'
                        },
                        {
                            fieldID: '4',
                            fieldType: 'text',
                            fieldTitle: 'Status',
                            fieldContent: 'Aktiv'
                        },
                        {
                            fieldID: '5',
                            fieldType: 'text',
                            fieldTitle: 'Versjon',
                            fieldContent: ''
                        },
                        {
                            fieldID: '6',
                            fieldType: 'text',
                            fieldTitle: 'Publisert',
                            fieldContent: ''
                        }
                    ]
                },
                {
                    standardName: 'ICPC-2: Den internasjonale klassifikasjonen for primærhelsetjenesten'
                },
                {
                    standardName: '​NCMP: Kodeverk for medisinske prosedyrer'
                },
                {
                    standardName: '​NCSP: Kodeverk for kirurgiske prosedyrer'
                },
                {
                    standardName: 'NCRP: Norsk klassifikasjon av radiologiske prosedyrer'
                },
                {
                    standardName: '​ICD-10: Psykiske lidelser og atferdsforstyrrelse: kliniske beskrivelser og diagnostiske retningslinjer (Blåboka)'
                },
                {
                    standardName: 'Den norske SNOMED​'
                },
                {
                    standardName: '​ATC: Anatomisk Terapeutisk Kjemisk legemiddelregister'
                },
                {
                    standardName: 'Multiaksial klassifikasjon i psykisk helsevern for barn og unge (BUP)'
                },
                {
                    standardName: '​Norsk laboratoriekodeverk (NLK)'
                }
            ]
        },
        {
            themeId: 5,
            themeName: 'Del 3: Informasjonsinnhold og strukturert føring av journal',
            themeDescription: 'Omfatter standarder og andre kravdokumenter som skal bidra til at elektroniske pasientjournaler føres på en ensartet måte i alle' +
                         ' virksomheter. ​​​​​​​​​​​​​​​​​​​​​​​​I tillegg skal det sørges for at innholdet blir strukturert på en slik måte at opplysningene blir egnet for gjenbruk til ' +
                         'forskjellige formål.',
            extraInfo: [
                {
                    title: 'Strukturering av journal',
                    content: 'For helsepersonell kan det være problematisk å finne fram i en dårlig strukturert elektronisk ' +
                             'pasientjournal, og det er også vanskelig å oppnå den nødvendige presisjon i styringen av tilgang til opplysningene dersom strukturen er mangelfull. ' +
                             'For at helsepersonell skal kunne yte forsvarlig helsehjelp, må de autoriseres for tilgang til nødvendige og relevante helseopplysninger. Dette ' +
                             'forutsetter at helseopplysningene er delt inn i informasjonskategorier (grupper) som er egnet for styring av tilgang. Ved det enkelte tilfelle av ' +
                             'tilgang må det kunne foretas ytterligere filtrering.  For en kategori kan det for eksempel kun gis tilgang til opplysninger registrert i forbindelse ' +
                             'med pågående behandling, dersom dette er tilstrekkelig i den aktuelle situasjonen. For å kunne foreta mer avanserte former for behandling av opplysninger, ' +
                             'eksempelvis i forbindelse med beslutningsstøtte, elektronisk samhandling og melding til forskjellige helseregistre, kreves en ytterligere detaljering av strukturen.' +
                             ' Kravene til slik strukturering beskrives gjennom innholdsstandarder hvor det inngår entydige spesifikasjoner av hvert enkelt informasjonselement, samt organiseringen av disse. '
                }
            ],
            subThemes: [
                {
                    themeId: 6,
                    themeName: 'Grunnleggende krav til EPJ-systemer',
                    standards: [
                        {
                            standardName: 'EPJ Standard del 2 - Tilgangsstyring, redigering, retting og sletting (HIS 80506)​​'
                        },
                        {
                            standardName: 'EPJ Standard del 3 - Journalarkitektur og generelt om journalinnhold (HIS 80507)​​'
                        },
                        {
                            standardName: 'EPJ Standard del 4 - Person, organisasjon mv (HIS 80508) ​​'
                        },
                        {
                            standardName: 'EPJ Standard del 5 - Arkivuttrekk (HIS 80509)​​'
                        },
                        {
                            standardName: 'EPJ Standard del 6 - Felles funksjonelle krav (HIS 80510)​​'
                        }
                    ]
                },
                {
                    themeId: 7,
                    themeName: 'Innhold og funksjonalitet i EPJ-systemer',
                    standards: [
                        {
                            standardName: 'Kravspesifikasjon elektronisk dokumentasjonssystem for pleie- og omsorgstjenesten (HIS 80315)​​​'
                        },
                        {
                            standardName: 'Teknisk standard for elektronisk dokumentasjonssystem for pleie- og omsorgstjenesten (HIS 80318) ​'
                        },
                        {
                            standardName: 'Vedtak etter psykisk helsevernloven (HIS 80702)'
                        },
                        {
                            standardName: 'Vedtak etter psykisk helsevernloven (HIS 80702)'
                        },
                        {
                            standardName: 'Kravspesifikasjon for EPJ i helsestasjons- og skolehelsetjenesten (HIS 1104-1)​'
                        },
                        {
                            standardName: 'Kravspesifikasjon for EPJ i helsestasjons- og skolehelsetjenesten - Del II Tekniske krav til informasjonsinnhold (HIS 1104-2)'
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardName: 'EPJ Standard del 2 - Tilgangsstyring, redigering, retting og sletting (HIS 80506)​​'
                },
                {
                    standardName: 'EPJ Standard del 3 - Journalarkitektur og generelt om journalinnhold (HIS 80507)​​'
                },
                {
                    standardName: 'EPJ Standard del 4 - Person, organisasjon mv (HIS 80508) ​​'
                },
                {
                    standardName: 'EPJ Standard del 5 - Arkivuttrekk (HIS 80509)​​'
                },
                {
                    standardName: 'EPJ Standard del 6 - Felles funksjonelle krav (HIS 80510)​​'
                }
            ]
        },
        {
            themeId: 8,
            themeName: 'Del 4 - Elektronisk samhandling',
            themeDescription: 'Omfatter standarder og andre kravdokumenter som skal bidra til sikker elektronisk utveksling av helseopplysninger mellom ulike virksomheter i helse- og omsorgstjenesten.',
            extraInfo: [
                {
                    title: '',
                    content: '​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Det vil framgå av den enkelte standard eller profil hvilke metoder som skal kunne benyttes ved samhandlingen. ' +
                             'For kravdokument som omhandler elektroniske meldinger, vil det både være angitt målgruppe for sending av meldingen og målgruppe for mottak av meldingen.'
                }
            ],
            subThemes: [
                {
                    themeId: 9,
                    themeName: 'Grunnleggende krav til elektronisk samhandling',
                    standards: [
                        {
                            standardName: 'ebXML Messages Service specification​​​'
                        },
                        {
                            standardName: 'ebXML Rammeverk (HIS 1037)'
                        },
                        {
                            standardName: 'Applikasjonskvittering v1.1 (HIS 80415:2012)​'
                        },
                        {
                            standardName: 'Applikasjonskvittering v1.0 (HIS 80415:2004)​'
                        },
                        {
                            standardName: 'Dialogmelding (HIS 80603)​​​​'
                        },
                        {
                            standardName: 'Avviksmelding (HIS 1151)​​'
                        },
                        {
                            standardName: '​Krav til tjenestebasert adressering (HIS 1153)'
                        }
                    ]
                },
                {
                    themeId: 10,
                    themeName: 'Henvisning og epikrise',
                    standards: [
                        {
                            standardName: 'Henvisningsmelding (HIS 80517)​​'
                        },
                        {
                            standardName: 'Henvisningsmelding - tannhelsetjenesten (HIS 1017)​'
                        },
                        {
                            standardName: 'Epikrisemelding (HIS 80226)​​'
                        },
                        {
                            standardName: 'Epikrisemelding - tannhelsetjenesten (HIS 1016)​'
                        }
                    ]
                },
                {
                    themeId: 11,
                    themeName: 'Samhandling – laboratoriemedisin og radiologi​​',
                    standards: [
                        {
                            standardName: '​Rekvisisjon - laboratoriemedisin (HIS 1160)'
                        },
                        {
                            standardName: '​Svarrapportering av medisinske tjenester (HIS 80822)'
                        },
                        {
                            standardName: '​Svarrapport - medisinsk biokjemi (HIS 1138)'
                        },
                        {
                            standardName: 'Svarrapport - mikrobiologi (HIS 1139)​​'
                        },
                        {
                            standardName: 'Svarrapport - immunologi (HIS 1140)​'
                        },
                        {
                            standardName: '​Svarrapport - patologi (HIS 1141)​'
                        },
                        {
                            standardName: '​Rekvisisjon/henvising - radiologi (HIS 80821)'
                        },
                        {
                            standardName: 'Svarrapport - radiologi (HIS 1142)​​'
                        }
                    ]
                },
                {
                    themeId: 12,
                    themeName: 'Pleie- og omsorgsmeldinger',
                    standards: [
                        {
                            standardName: 'Standard for elektronisk kommunikasjon med pleie- og omsorgstjenesten​ (HIS 80704)​​'
                        },
                        {
                            standardName: '​Innleggelsesrapport (HIS 1143)'
                        },
                        {
                            standardName: 'Helseopplysninger (HIS 1144)​'
                        },
                        {
                            standardName: 'Helseopplysninger til lege (HIS 1145)​'
                        },
                        {
                            standardName: '​Orientering om tjenestetilbud (HIS 1146)'
                        },
                        {
                            standardName: '​Medisinske opplysninger (HIS 1147)'
                        },
                        {
                            standardName: 'Utskrivningsrapport (HIS 1148)'
                        },
                        {
                            standardName: 'Pasientlogistikkmeldinger (HIS 1149)​'
                        },
                        {
                            standardName: '​Standard for kommunikasjon av EPJ-innhold (HIS 80710)'
                        },
                        {
                            standardName: 'Overføring av legemiddelopplysninger (HIS 1150)'
                        },
                        {
                            standardName: '​​​Forespørsel og svar på forespørsel i tilknytning til pleie- og omsorgsmeldinger (HIS 1152)'
                        }
                    ]
                },
                {
                    themeId: 13,
                    themeName: 'E-resept',
                    standards: [
                        {
                            standardName: 'M1 Resept (HIS 80809)​​'
                        },
                        {
                            standardName: 'M02 Individuell søknad om refusjon til HELFO (HIS 80810)​​'
                        },
                        {
                            standardName: 'M3 Anmodning om søknad til SLV (HIS 80811)​​​'
                        },
                        {
                            standardName: 'M04.1-2 Referansenummer (HIS 80819)​​'
                        },
                        {
                            standardName: 'M5 - Tilbakekalling (HIS 80812)​​'
                        },
                        {
                            standardName: 'M6 Utleveringsrapport forskriver (HIS 80813)​​'
                        },
                        {
                            standardName: 'M7 Slettet resept (HIS 80812)​​'
                        },
                        {
                            standardName: 'M8 Utleveringsrapport fastlege (HIS 80813)​​'
                        },
                        {
                            standardName: 'M09.1 Forespørsel om tilgjengelige resepter på pasient (HIS 80814) ​'
                        },
                        {
                            standardName: '​M09.2 Reseptliste (utleverer) (HIS 80814) ​'
                        },
                        {
                            standardName: '​M09.3 Forespørsel om nedlasting av resept (HIS 80814) ​'
                        },
                        {
                            standardName: 'M09.4 Nedlasting av resept (HIS 80814) ​​'
                        },
                        {
                            standardName: 'M9.5 – Forespørsel om tilgjengelige resepter på pasient (HIS 80812)'
                        },
                        {
                            standardName: 'M9.6 – Reseptliste (rekvirent) (HIS 80812) ​'
                        },
                        {
                            standardName: 'M09.7 - Forespørsel om utleveringer på resept (HIS 80812)'
                        },
                        {
                            standardName: 'M9.8 - Utleveringer på resept (HIS 80812)​'
                        },
                        {
                            standardName: 'M9.11 Forespørsel om varer i bruk (HIS 80816) ​​'
                        },
                        {
                            standardName: 'M9.12 Nedlasting av varer i bruk (HIS 80816) ​​'
                        },
                        {
                            standardName: 'M9.21 Hent endrede multidosepasienter (HIS 80816) ​​'
                        },
                        {
                            standardName: 'M9.22 Endrede multidosepasienter (HIS 80816)​​​'
                        },
                        {
                            standardName: 'M10 Utleveringsrapport reseptformidler (HIS 80813) ​​'
                        },
                        {
                            standardName: 'M12 Søknadssvar – Individuell søknad om refusjon til HELFO (HIS 80810)​'
                        },
                        {
                            standardName: '​M14 Søknad til SLV (HIS 80811) ​'
                        },
                        {
                            standardName: '​M15 Søknadssvar fra SLV (HIS 80811) ​'
                        },
                        {
                            standardName: '​M18 Oppgjørskrav (HIS 80815)'
                        },
                        {
                            standardName: 'M20 Notifisering (HIS 80813) ​​'
                        },
                        {
                            standardName: 'M21 Ekspederingsanmodning (HIS 80809) ​​'
                        },
                        {
                            standardName: 'M22 Oppgjørsresultat (HIS 80815) ​​'
                        },
                        {
                            standardName: 'M23 Utbetaling (HIS 80815) ​​'
                        },
                        {
                            standardName: 'M24.1 Samtykke (HIS 80812)​'
                        },
                        {
                            standardName: 'M24.2 Svar på samtykke (HIS 80812) ​​'
                        },
                        {
                            standardName: 'M25.1 Legemidler i bruk (HIS 80816)​​'
                        },
                        {
                            standardName: 'M25.2 Legemidler i bruk - forespørsel om endring (HIS 80816) ​'
                        },
                        {
                            standardName: '​M25.3 Legemidler i bruk - utleveringsmelding (HIS 80816) ​'
                        },
                        {
                            standardName: '​M27.1 Registrering av multidoseansvarlig (HIS 80816) ​'
                        },
                        {
                            standardName: '​M27.2 Svar på registrering av multidoseansvarlig (HIS 80816) ​'
                        },
                        {
                            standardName: 'M28 Endring av multidoselege (HIS 80816)  '
                        },
                        {
                            standardName: '​M30 FEST-meldingen (HIS 80818) ​'
                        }
                    ]
                },
                {
                    themeId: 14,
                    themeName: 'Samhandling med NAV',
                    standards: [
                        {
                            standardName: 'Legeerklæring ved arbeidsuførhet (HIS 80805:2008)'
                        },
                        {
                            standardName: 'Medisinsk vurdering av arbeidsmulighet / Sykmelding (HIS 80803) ​​'
                        },
                        {
                            standardName: '​Innkalling dialogmøte'
                        },
                        {
                            standardName: 'Svar innkalling dialogmøte​'
                        },
                        {
                            standardName: 'Forespørsel om pasient'
                        },
                        {
                            standardName: '​Svar på forespørsel om pasient'
                        },
                        {
                            standardName: 'Oppfølgingsplan fra arbeidsgiver​'
                        },
                        {
                            standardName: 'Henvendelse fra NAV til lege'
                        },
                        {
                            standardName: 'Henvendelse fra lege til NAV​'
                        }
                    ]
                },
                {
                    themeId: 15,
                    themeName: 'Samhandling med HELFO',
                    standards: [
                        {
                            standardName: 'Behandlerkravmelding (BKM)'
                        },
                        {
                            standardName: '​NPR-behandlerkravmelding (NPR-BKM)​'
                        },
                        {
                            standardName: '​Forespørsel og svar om egenandel (​HIS 1024)​'
                        },
                        {
                            standardName: 'Pasientens fastlege (​HIS 1022)​'
                        },
                        {
                            standardName: '​Fastlegeliste: Oversikt over fastlegens listeinnbyggere (​HIS 1023)​'
                        }
                    ]
                },
                {
                    themeId: 16,
                    themeName: 'Melding til Norsk pasientregister',
                    standards: [
                        {
                            standardName: 'Ordinær NPR-melding v52.0.2​'
                        },
                        {
                            standardName: 'Innrapportering av data for identifikasjon av person v52.0.2​'
                        },
                        {
                            standardName: 'Validering av data om helsehjelp for somatiske lidelser v52.0.2​'
                        },
                        {
                            standardName: '​Innrapportering av data etter psykisk helsevernloven (EPJ-standard) v52.0.2'
                        },
                        {
                            standardName: 'Innrapportering av data fra Psykisk helsevern voksne (PHV) v52.0.2​'
                        },
                        {
                            standardName: '​Innrapportering av data fra Barne og ungdomspsykiatrien (BUP) v52.0.2​'
                        },
                        {
                            standardName: 'Innrapportering av data om ventelister v52.0.2'
                        },
                        {
                            standardName: '​Innrapportering av data fra tverrfaglig spesialisert rusbehandling (TSB) aktivitetsdata v52.0.2'
                        },
                        {
                            standardName: '​Innrapportering av data fra avtalespesialister v52.0.2'
                        },
                        {
                            standardName: '​Innrapportering av data fra rehabiliteringsenheter v52.0.2​'
                        },
                        {
                            standardName: '​Innrapportering av data fra billeddiagnostikk, intervensjon og nukleærmedisin v52.0.2'
                        },
                        {
                            standardName: 'Innrapportering av data fra Innsatsstyrt finansiering (ISF) v52.0.2'
                        },
                        {
                            standardName: '​Innrapportering av data om situasjonen ved behandlingsstart for ruspasienter v52.0.2​'
                        },
                        {
                            standardName: 'Innrapportering av data fra prehospitale tjenester/ambulanse v52.0.2​'
                        },
                        {
                            standardName: '​Innrapportering av data om personskade. Felles minimum datasett (FMDS) v52.0.2​'
                        },
                        {
                            standardName: 'Innrapportering av data om arbeidsrelatert skade. Skadetypespesfikt minimum datasett (SMDS) v52.0.2​.'
                        },
                        {
                            standardName: '​Innrapportering av data om veitrafikkskade. Skadetypespesifikt minimum datasett (SMDS) v52.0.2'
                        },
                        {
                            standardName: '​​Innrapportering av data om produktrelatert skade. Skadetypespesifikt minimum datasett (SMDS) v52.0.2'
                        },
                        {
                            standardName: '​Innrapportering av data fra stråleterapi v52.0.2'
                        },
                        {
                            standardName: '​Den ordinære tilbakemeldingen inkludert feilmeldinger v52.0.2​'
                        }
                    ]
                },
                {
                    themeId: 17,
                    themeName: 'Melding til øvrige sentrale helseregistre ',
                    standards: [
                        {
                            standardName: 'Melding til SYSVAK: HendelseRequest​​'
                        },
                        {
                            standardName: 'Melding til SYSVAK: SokRequest​​'
                        },
                        {
                            standardName: 'Melding til SYSVAK: KodeverkRequest​​'
                        },
                        {
                            standardName: 'Svarmelding fra SYSVAK: HendelseResponse​​'
                        },
                        {
                            standardName: '​Svarmelding fra Sysvak: SokResponse​'
                        },
                        {
                            standardName: '​Svarmelding fra SYSVAK: KodeverkResponse​'
                        },
                        {
                            standardName: 'Melding av fødsel til Medisinsk fødselsregister (MFR)​'
                        },
                        {
                            standardName: 'Melding om fødte overflyttet nyfødtavdeling'
                        },
                        {
                            standardName: 'Melding om svangerskapsavbrudd'
                        }
                    ]
                },
                {
                    themeId: 18,
                    themeName: 'Melding til IPLOS',
                    standards: [
                        {
                            standardName: 'IPLOS Teknisk kravspesifikasjon​'
                        },
                        {
                            standardName: '​IPLOS Funksjonell kravspesifikasjon'
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardName: 'M1 Resept (HIS 80809)​​'
                },
                {
                    standardName: 'M02 Individuell søknad om refusjon til HELFO (HIS 80810)​​'
                },
                {
                    standardName: 'M3 Anmodning om søknad til SLV (HIS 80811)​​​'
                },
                {
                    standardName: 'M04.1-2 Referansenummer (HIS 80819)​​'
                },
                {
                    standardName: 'M5 - Tilbakekalling (HIS 80812)​​'
                },
                {
                    standardName: 'M6 Utleveringsrapport forskriver (HIS 80813)​​'
                },
                {
                    standardName: 'M7 Slettet resept (HIS 80812)​​'
                },
                {
                    standardName: 'M8 Utleveringsrapport fastlege (HIS 80813)​​'
                },
                {
                    standardName: 'M09.1 Forespørsel om tilgjengelige resepter på pasient (HIS 80814) ​'
                },
                {
                    standardName: '​M09.2 Reseptliste (utleverer) (HIS 80814) ​'
                },
                {
                    standardName: '​M09.3 Forespørsel om nedlasting av resept (HIS 80814) ​'
                },
                {
                    standardName: 'M09.4 Nedlasting av resept (HIS 80814) ​​'
                },
                {
                    standardName: 'M9.5 – Forespørsel om tilgjengelige resepter på pasient (HIS 80812)'
                },
                {
                    standardName: 'M9.6 – Reseptliste (rekvirent) (HIS 80812) ​'
                },
                {
                    standardName: 'M09.7 - Forespørsel om utleveringer på resept (HIS 80812)'
                },
                {
                    standardName: 'M9.8 - Utleveringer på resept (HIS 80812)​'
                },
                {
                    standardName: 'M9.11 Forespørsel om varer i bruk (HIS 80816) ​​'
                },
                {
                    standardName: 'M9.12 Nedlasting av varer i bruk (HIS 80816) ​​'
                },
                {
                    standardName: 'M9.21 Hent endrede multidosepasienter (HIS 80816) ​​'
                },
                {
                    standardName: 'M9.22 Endrede multidosepasienter (HIS 80816)​​​'
                },
                {
                    standardName: 'M10 Utleveringsrapport reseptformidler (HIS 80813) ​​'
                },
                {
                    standardName: 'M12 Søknadssvar – Individuell søknad om refusjon til HELFO (HIS 80810)​'
                },
                {
                    standardName: '​M14 Søknad til SLV (HIS 80811) ​'
                },
                {
                    standardName: '​M15 Søknadssvar fra SLV (HIS 80811) ​'
                },
                {
                    standardName: '​M18 Oppgjørskrav (HIS 80815)'
                },
                {
                    standardName: 'M20 Notifisering (HIS 80813) ​​'
                },
                {
                    standardName: 'M21 Ekspederingsanmodning (HIS 80809) ​​'
                },
                {
                    standardName: 'M22 Oppgjørsresultat (HIS 80815) ​​'
                },
                {
                    standardName: 'M23 Utbetaling (HIS 80815) ​​'
                },
                {
                    standardName: 'M24.1 Samtykke (HIS 80812)​'
                },
                {
                    standardName: 'M24.2 Svar på samtykke (HIS 80812) ​​'
                },
                {
                    standardName: 'M25.1 Legemidler i bruk (HIS 80816)​​'
                },
                {
                    standardName: 'M25.2 Legemidler i bruk - forespørsel om endring (HIS 80816) ​'
                },
                {
                    standardName: '​M25.3 Legemidler i bruk - utleveringsmelding (HIS 80816) ​'
                },
                {
                    standardName: '​M27.1 Registrering av multidoseansvarlig (HIS 80816) ​'
                },
                {
                    standardName: '​M27.2 Svar på registrering av multidoseansvarlig (HIS 80816) ​'
                },
                {
                    standardName: 'M28 Endring av multidoselege (HIS 80816)  '
                },
                {
                    standardName: '​M30 FEST-meldingen (HIS 80818) ​'
                }
            ]
        }

    ];
})();
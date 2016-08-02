"use strict";

angular.module("ehelseEditor").factory("DocumentExtractor",
    ["Document", "Status", "Topic", "TargetGroup", "Mandatory", "Action", "DocumentField", "LinkCategory",
        function (Document, Status, Topic, TargetGroup, Mandatory, Action, DocumentField, LinkCategory) {

            function getDocumentAsJSON(doc) {
                if(doc){
                    var output_dict = {};
                    output_dict["Tittel"] = doc.title;
                    output_dict["Beskrivelse"] = doc.description;
                    if(Status.getById(doc.statusId)){
                        output_dict["Status"] = Status.getById(doc.statusId).name;
                    }
                    output_dict["Emne (Referansekatalog kapittel)"] = Topic.getById(doc.topicId).title;
                    output_dict["Intern ID"] = doc.internalId;
                    output_dict["HIS nummer"] = doc.hisNumber;
                    for (var i = 0; i < doc.fields.length; i++) {
                        output_dict[DocumentField.getById(doc.fields[i].fieldId).name] = doc.fields[i].value;
                    }
                    output_dict["Målgrupper"] = getTargetGroupsRelatedToDocumentAsJSON(doc);
                    output_dict["Lenker"] = getLinksRelatedToDocumentAsJSON(doc);

                    return output_dict;
                }
            }

            function getTargetGroupsRelatedToDocumentAsJSON(doc) {
                var output_list = [];
                var target_groups_list = doc.targetGroups;
                for (var i = 0; i < target_groups_list.length; i++) {
                    var target_group = {};

                    target_group["Navn"] = TargetGroup.getById(target_groups_list[i].targetGroupId).name;
                    target_group["Beskrivelse"] = target_groups_list[i].description;
                    target_group["Obligatorisk-verdi"] = Mandatory.getById(target_groups_list[i].mandatoryId).name;

                    if(target_groups_list[i].actionId){
                        target_group["Handling"] = Action.getById(target_groups_list[i].actionId).name;
                    }

                    output_list.push(target_group);
                }

                return output_list;
            }


            function getLinksRelatedToDocumentAsJSON(doc){
                var output_dict = {};
                var links_list = doc.links;
                for (var i = 0; i < links_list.length; i++) {
                    if(!output_dict[LinkCategory.getById(links_list[i].linkCategoryId).name]){
                        output_dict[LinkCategory.getById(links_list[i].linkCategoryId).name] = [];
                    }
                    var link = {};
                    link["Tekst"] = links_list[i].text;
                    link["url"] = links_list[i].url;

                    output_dict[LinkCategory.getById(links_list[i].linkCategoryId).name].push(link);
                }

                return output_dict;
            }

            function getAllDocumentsAsJSON(){
                var output = {
                    allDocuments: []
                };
                var documents = Document.getAll();

                for (var i = 0; i < documents.length; i++) {
                    output["allDocuments"].push(getDocumentAsJSON(documents[i]));
                }

                return output;
            }

            return {
                getDocumentAsJSON: getDocumentAsJSON,
                getAllDocumentsAsJSON: getAllDocumentsAsJSON
            };
        }
    ]
);
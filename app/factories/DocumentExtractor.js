"use strict";

angular.module("ehelseEditor").factory("DocumentExtractor",
    ["Document", "Status", "Topic", "TargetGroup", "Mandatory", "Action", "DocumentField", "LinkCategory", "ContactAddress", "Heading",
        function (Document, Status, Topic, TargetGroup, Mandatory, Action, DocumentField, LinkCategory, ContactAddress, Heading) {

            function getDocumentAsJSON(doc) {
                if(doc){
                    var output_dict = {};
                    output_dict["title"] = doc.title;
                    output_dict["description"] = doc.description;
                    if(Status.getById(doc.statusId)){
                        output_dict["status"] = Status.getById(doc.statusId).name;
                    }else{
                        output_dict["status"] = null;
                    }
                    output_dict["topic"] = Topic.getById(doc.topicId).title;
                    output_dict["internalId"] = doc.internalId;
                    output_dict["his"] = doc.hisNumber;
                    output_dict["contactAddress"] = getContactAddressRelatedToDocumentAsJSON(doc);
                    output_dict["fields"] = getDocumentFieldsRelatedToDocumentAsJSON(doc);
                    output_dict["targetGroups"] = getTargetGroupsRelatedToDocumentAsJSON(doc);
                    output_dict["linkCategories"] = getLinksRelatedToDocumentAsJSON(doc);
                    output_dict["paragraphs"] = getParagraphsRelatedToDocumentAsJSON(doc);

                    return output_dict;
                }
            }

            function getParagraphsRelatedToDocumentAsJSON(doc){
                var output_list = [];
                var paras = doc.headingContent;
                for (var i = 0; i < paras.length; i++) {
                    var heading = {};

                    heading["title"] = Heading.getById(paras[i].headingId).name;
                    heading["text"] = paras[i].text;

                    output_list.push(heading);
                }
                return output_list;
            }

            function getContactAddressRelatedToDocumentAsJSON(doc){
                var output = {};
                output["title"] = "";
                output["email"] = ContactAddress.getById(doc.contactAddressId).name;
                return output;
            }

            function getDocumentFieldsRelatedToDocumentAsJSON(doc){
                var output_list = [];
                var fields = doc.fields;
                for (var i = 0; i < fields.length; i++) {
                    var field = {};

                    field["name"] = DocumentField.getById(fields[i].fieldId).name;
                    field["text"] = fields[i].value;

                    output_list.push(field);
                }
                return output_list;
            }

            function getTargetGroupsRelatedToDocumentAsJSON(doc) {
                var output_dict = {};

                for (var i = 0; i < doc.targetGroups.length; i++){
                    output_dict[Mandatory.getById(doc.targetGroups[i].mandatoryId).name] = getTargetGroupsByMandatoryId(doc, doc.targetGroups[i].targetGroupId);
                }
                return output_dict;
            }

            function getTargetGroupsByMandatoryId(doc, id){
                var output_dict = {};
                var targetGroupsList = [];
                if(id == "1"){
                    output_dict["hjemmel"] = doc.hjemmel;
                    output_dict["decidedBy"] = doc.decidedBy;
                    output_dict["replacedBy"] = doc.replacedBy;
                }
                for (var i = 0; i < doc.mandatoryNotices.length; i++) {
                    if(doc.mandatoryNotices[i].mandatoryId == id){
                        output_dict["notice"] = doc.mandatoryNotices[i].notice;
                    }
                }
                for (var x = 0; x < doc.targetGroups.length; x++) {
                    if(doc.targetGroups[x].mandatoryId == id){
                        var targetGroup = {};
                        targetGroup["name"] = TargetGroup.getById(doc.targetGroups[x].targetGroupId);
                        targetGroup["deadline"] = doc.targetGroups[x].deadline;
                        targetGroup["description"] = doc.targetGroups[x].description;
                        if(doc.targetGroups[x].actionId){
                            targetGroup["action"] = Action.getById(doc.targetGroups[x].actionId).name;
                        }else{
                            targetGroup["action"] = null;
                        }
                        targetGroup["abbreviation"] = TargetGroup.getById(doc.targetGroups[x].targetGroupId).abbreviation;
                        if(TargetGroup.getById(doc.targetGroups[x].targetGroupId).parentId){
                            targetGroup["parentTargetGroup"] = TargetGroup.getById(TargetGroup.getById(doc.targetGroups[x].targetGroupId).parentId).name;
                        }else{
                            targetGroup["parentTargetGroup"] = null;
                        }
                        targetGroupsList.push(targetGroup);
                    }
                }
                output_dict["targetGroupsList"] = targetGroupsList;

                return output_dict;
            }


            function getLinksRelatedToDocumentAsJSON(doc){
                var temp_dict = {};
                for (var i = 0; i < doc.links.length; i++) {
                    if(!temp_dict[LinkCategory.getById(doc.links[i].linkCategoryId).name]){
                        temp_dict[LinkCategory.getById(doc.links[i].linkCategoryId).name] = [];
                    }
                    var link = {};
                    link["Tekst"] = doc.links[i].text;
                    link["url"] = doc.links[i].url;

                    temp_dict[LinkCategory.getById(doc.links[i].linkCategoryId).name].push(link);
                }

                var output_list = [];
                for(var item in temp_dict){
                    if (!temp_dict.hasOwnProperty(item)) continue;
                    var linkCat = {};
                    linkCat["name"] = item;
                    linkCat["links"] = temp_dict[item];
                    output_list.push(linkCat);
                }
                return output_list;



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
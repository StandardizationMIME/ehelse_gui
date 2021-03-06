"use strict";

angular.module("ehelseEditor").factory("DocumentExtractor",
    ["Document", "Status", "Topic", "TargetGroup", "Mandatory", "Action", "DocumentField", "LinkCategory", "ContactAddress", "Heading", "DocumentType",
        function (Document, Status, Topic, TargetGroup, Mandatory, Action, DocumentField, LinkCategory, ContactAddress, Heading, DocumentType) {

            function getDocumentAsJSON(doc) {
                if(doc){
                    var output_dict = {};
                    output_dict["title"] = doc.title;
                    if(doc.description){
                        output_dict["description"] = doc.description;
                    }else{
                        output_dict["description"] = null;
                    }
                    if(Status.getById(doc.statusId)){
                        output_dict["status"] = Status.getById(doc.statusId).name;
                    }else{
                        output_dict["status"] = null;
                    }
                    output_dict["topic"] = Topic.getById(doc.topicId).title;
                    if(doc.internalId){
                        output_dict["internalId"] = doc.internalId;
                    }else{
                        output_dict["internalId"] = "";
                    }
                    if(doc.hisNumber){
                        output_dict["his"] = doc.hisNumber;
                    }else{
                        output_dict["his"] = null;
                    }
                    output_dict["documentType"] = DocumentType.getById(doc.documentTypeId).name;
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
                var headingContent = doc.headingContent;
                if(headingContent){
                    for (var i = 0; i < headingContent.length; i++) {
                        var heading = {};

                        heading["title"] = Heading.getById(headingContent[i].headingId).name;
                        if(headingContent[i].text){
                            heading["text"] = headingContent[i].text;
                        }else{
                            heading["text"] = null;
                        }

                        output_list.push(heading);
                    }
                }
                return output_list;
            }

            function getContactAddressRelatedToDocumentAsJSON(doc){
                var output = {};
                if(doc.contactAddressId){
                    output["email"] = ContactAddress.getById(doc.contactAddressId).name;
                    if(ContactAddress.getById(doc.contactAddressId).description){
                        output["description"] = ContactAddress.getById(doc.contactAddressId).description;
                    }else{
                        output["description"] = null;
                    }
                }
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
                if(doc.targetGroups){
                    var mandatoryIdList = [];
                    for (var i = 0; i < doc.targetGroups.length; i++){
                        if(!mandatoryIdList.includes(doc.targetGroups[i].targetGroupId)){
                            mandatoryIdList.push(doc.targetGroups[i].mandatoryId);
                        }
                    }
                    for (var x = 0; x < mandatoryIdList.length; x++){
                        output_dict[Mandatory.getById(mandatoryIdList[x]).name] = getTargetGroupsByMandatoryId(doc, mandatoryIdList[x]);
                    }
                }

                return output_dict;
            }

            function getTargetGroupsByMandatoryId(doc, id){
                var output_dict = {};
                var targetGroupsList = [];
                if(id == "1"){
                    if(doc.targetGroupLegalBases){
                        output_dict["targetGroupLegalBases"] = doc.targetGroupLegalBases;
                    }else{
                        output_dict["targetGroupLegalBases"] = null;
                    }

                    if(doc.decidedBy){
                        output_dict["decidedBy"] = doc.decidedBy;
                    }else{
                        output_dict["decidedBy"] = null;
                    }

                    if(doc.replacedBy){
                        output_dict["replacedBy"] = doc.replacedBy;
                    }else{
                        output_dict["replacedBy"] = null;
                    }
                }
                if(doc.mandatoryNotices){
                    for (var i = 0; i < doc.mandatoryNotices.length; i++) {
                        if(doc.mandatoryNotices[i].mandatoryId == id){
                            if(doc.mandatoryNotices[i].notice){
                                output_dict["notice"] = doc.mandatoryNotices[i].notice;
                            }else{
                                output_dict["notice"] = null;
                            }
                        }
                    }
                }
                if(doc.targetGroups){
                    for (var x = 0; x < doc.targetGroups.length; x++) {
                        if(doc.targetGroups[x].mandatoryId == id){
                            var targetGroup = {};
                            targetGroup["name"] = TargetGroup.getById(doc.targetGroups[x].targetGroupId).name;
                            if(doc.targetGroups[x].deadline){
                                targetGroup["deadline"] = doc.targetGroups[x].deadline;
                            }else{
                                targetGroup["deadline"] = null;
                            }
                            if(doc.targetGroups[x].description){
                                targetGroup["description"] = doc.targetGroups[x].description;
                            }else{
                                targetGroup["description"] = null;
                            }
                            if(doc.targetGroups[x].actionId){
                                targetGroup["action"] = Action.getById(doc.targetGroups[x].actionId).name;
                            }else{
                                targetGroup["action"] = null;
                            }
                            if(TargetGroup.getById(doc.targetGroups[x].targetGroupId).abbreviation){
                                targetGroup["abbreviation"] = TargetGroup.getById(doc.targetGroups[x].targetGroupId).abbreviation;
                            }else{
                                targetGroup["abbreviation"] = null;
                            }
                            if(TargetGroup.getById(doc.targetGroups[x].targetGroupId).parentId){
                                targetGroup["parentTargetGroup"] = TargetGroup.getById(TargetGroup.getById(doc.targetGroups[x].targetGroupId).parentId).name;
                            }else{
                                targetGroup["parentTargetGroup"] = null;
                            }
                            targetGroupsList.push(targetGroup);
                        }
                    }
                }
                output_dict["targetGroupsList"] = targetGroupsList;

                return output_dict;
            }


            function getLinksRelatedToDocumentAsJSON(doc){
                var temp_dict = {};
                if(doc.links){
                    console.log(doc.links);
                    var temp_list = [];
                    for (var y = 0; y < doc.links.length; y++){
                        var temp_field = {};
                        temp_field["id"] = LinkCategory.getById(doc.links[y].linkCategoryId).id;
                        temp_field["sequence"] = LinkCategory.getById(doc.links[y].linkCategoryId).sequence;
                        temp_field["text"] = doc.links[y].text;
                        temp_field["url"] = doc.links[y].url;
                        temp_list.push(temp_field);
                    }

                    temp_list.sort(compareSequence);

                    var temp_list2 = [];
                    for (var x = 0; x < temp_list.length; x++) {
                            temp_list2.push({linkCategoryId: temp_list[x].id, text: temp_list[x].text, url: temp_list[x].url});
                    }

                    for (var i = 0; i < temp_list2.length; i++) {
                        if(!temp_dict[LinkCategory.getById(temp_list2[i].linkCategoryId).name]){
                            temp_dict[LinkCategory.getById(temp_list2[i].linkCategoryId).name] = [];
                        }
                        var link = {};
                        link["text"] = temp_list2[i].text;
                        link["url"] = temp_list2[i].url;

                        temp_dict[LinkCategory.getById(temp_list2[i].linkCategoryId).name].push(link);
                    }
                }

                var output_list = [];
                if(temp_dict){
                    for(var item in temp_dict){
                        if (!temp_dict.hasOwnProperty(item)) continue;
                        var linkCat = {};
                        linkCat["name"] = item;
                        linkCat["links"] = temp_dict[item];
                        output_list.push(linkCat);
                    }
                }
                return output_list;

            }

            function compareSequence(a,b) {
                if (parseInt(a.sequence) < parseInt(b.sequence))
                    return -1;
                if (parseInt(a.sequence) > parseInt(b.sequence))
                    return 1;
                return 0;
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
"use strict";

angular.module("ehelseEditor").factory("ServiceFunction", [function () {

    /**
     * Returns timestamp on database format
     * @returns {string}
     */
    function getTimestamp() {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1; // Months are zero-based
        var day = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        return year + "-" +
            getTwoDigitNumber(month) + "-" +
            getTwoDigitNumber(day) + " " +
            getTwoDigitNumber(hours) + ":" +
            getTwoDigitNumber(minutes) + ":" +
            getTwoDigitNumber(seconds);
    }

    /**
     * Returns zero in front of numbers less than 10: "05" instead of "5"
     * @param number
     * @returns {string}
     */
    function getTwoDigitNumber(number) {
        // TODO: handle 3 digit numbers, give error?
        return (number > 9 ? number : "0" + number);
    }

    /**
     * Returns new unique document id
     *
     * Checks all elements in list and returns -1 if undefined
     *  and a new valid id if the list is defined.
     * @param list
     * @returns {number}
     */
    function generateNewId(list) {
        var length = list.length;
        // If list is undefined
        if (list == null){
            return "-1"
        }
        // if the list is defined
        if (length) {
            var max = -Infinity;
            for (var i = 0; i < length; i++) {
                var id = parseInt(list[i].id);
                if (id > max) {
                    max = id;
                }
            }
            return "" + (max + 1);
        } else {
            return "1";
        }
    }

    function generateNewIdFromDict(dict) {
        var length = Object.keys(dict).length;
        // If dictionary is undefined
        if (dict == null){
            return "-1";
        }
        // if the dictionary is defined
        if (length) {
            var max = -Infinity;
            for (var key in dict) {
                if (!dict.hasOwnProperty(key)) continue;
                var id = parseInt(key);
                if (id > max){
                    max = id;
                }
            }
            return ""+(max + 1);
        } else {
            return "1";
        }
    }

    /**
     * Returns deep copy of documents
     *
     * Removes the list populatedProfiles to avoid circular dependencies.
     * @param list
     * @returns {Array}
     */
    function cloneDocuments(list) {
        var clone;
        if (list instanceof Array) {
            clone = [];
            for (var i = 0; i < list.length; i++) {
                var document_clone = cloneDocument(list[i]);
                clone.push(document_clone);
            }
        } else {
            clone = {};
            for (var key in list) {
                if (!list.hasOwnProperty(key)) continue;
                var document_list = [];
                for (var i = 0; i < list[key].length; i++) {
                    document_list.push(cloneDocument(list[key][i]));
                }
                clone[key] = document_list;
            }
        }
        return clone;
    }

    /**
     * Returns deep copy of document
     * @param document
     * @returns {{}}
     */
    function cloneDocument(document) {
        var invalid_elements = ["populatedProfiles", "$$hashKey"];
        var document_clone = {};
        for (var element in document) {
            if (!document.hasOwnProperty(element)) continue;
            if (invalid_elements.indexOf(element) < 0) {
                document_clone[element] = deepCopy(document[element]);
            }
        }
        return document_clone;
    }

    /**
     * Returns deep copy of element
     * @param element
     * @returns {*}
     */
    function deepCopy(element) {
        if (element instanceof Array) {
            return cloneArray(element);
        } else if (element == "object") {
            return cloneObject(element);
        } else {
            return element; // TODO: make sure this covers everything, so no deep copy of anything else is needed.
        }
    }

    /**
     * Returns clone of object
     * @param object
     * @returns {{}}
     */
    function cloneObject(object) {
        var clone = {};

        for (var element in object) {
            if (!object.hasOwnProperty(element)) continue;
            if (object[element] instanceof Array) {
                clone[element] = cloneArray(object[element]);
            } else if (typeof(object[element]) == "object") {
                if (object[element] === null)   // typeof(null) === "object" >> true, must be handled
                    clone[element] = null;
                else
                clone[element] = cloneObject(object[element]);
            } else  {
                clone[element] = object[element];

            }
        }
        return clone;
    }

    function orderListBySequence(list, getByIdMethod,type){
        var temp_list = [];
        for (var i = 0; i < list.length; i++) {
            var temp_field = {};
            if(type == "field"){
                temp_field["id"] = getByIdMethod(list[i].fieldId).id;
                temp_field["sequence"] = getByIdMethod(list[i].fieldId).sequence;
                temp_field["value"] = list[i].value;
            }else if(type == "heading"){
                temp_field["id"] = getByIdMethod(list[i].headingId).id;
                temp_field["sequence"] = getByIdMethod(list[i].headingId).sequence;
                temp_field["text"] = list[i].text;
            }else if(type == "link"){
                temp_field["id"] = getByIdMethod(list[i].id).id;
                temp_field["sequence"] = getByIdMethod(list[i].id).sequence;
                temp_field["links"] = list[i].links;
            }else if(type == "linksInDocument"){
                temp_field["id"] = getByIdMethod(list[i].linkCategoryId).id;
                temp_field["sequence"] = getByIdMethod(list[i].linkCategoryId).sequence;
                temp_field["text"] = list[i].text;
                temp_field["url"] = list[i].url;
            }
            temp_list.push(temp_field);
        }
        temp_list.sort(compareSequence);


        var output = [];
        for (var x = 0; x < temp_list.length; x++) {
            if(type == "field"){
                output.push({fieldId: temp_list[x].id, value: temp_list[x].value});
            }else if(type == "heading"){
                output.push({headingId: temp_list[x].id, text: temp_list[x].text});
            }else if(type == "link"){
                if(temp_list[x]){
                    output.push({id: temp_list[x].id, links: temp_list[x].links });
                }
            }else if(type == "linksInDocument"){
                output.push({linkCategoryId: temp_list[x].id, text: temp_list[x].text, url: temp_list[x].url});
            }
        }
        return output;
    }

    function compareSequence(a,b) {
        if (parseInt(a.sequence) < parseInt(b.sequence))
            return -1;
        if (parseInt(a.sequence) > parseInt(b.sequence))
            return 1;
        return 0;
    }

    /**
     * Returns clone of array
     * @param array
     * @returns {Array}
     */
    function cloneArray(array) {
        var clone = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] instanceof Array) {
                clone[i] = cloneArray(array[i]);
            } else if (typeof(array[i]) == "object") {
                if (array[i] === null) {    // typeof(null) === "object" >> true, must be handled
                    clone[i]=null;
                }
                else {
                    clone[i] = cloneObject(array[i]);
                }
            } else {
                clone[i] = array[i];
            }
        }
        return clone;
    }

    /**
     * Returns whether or not a value is unique
     *
     * Takes in a list of objects, checks how many times a value for a property
     *  occurs, and returns true if there are no occurrences of this value.
     * @param list
     * @param property
     * @param value
     * @returns {boolean}
     */
    function isUnique(list, property, value) {
        var occurrences = 0;
        for (var i = 0; i < list.length; i++) {
            if (!(property in list[0])) {
                throw "Invalid property " + property + ".";
            }
            //console.log(" IF " + value + " == " + list[i][property]);
            if (value == list[i][property]) {
                occurrences++;
            }
        }
        return occurrences < 1;
    }

    /**
     * Sort element on sequence
     * @param elements
     * @returns {*}
     */
    function sortArrayOnSequence(elements) {
        var sorted_elements = deepCopy(elements);
        sorted_elements.sort(
            function (a, b) {
                return a["sequence"] - b["sequence"];
            }
        );
        return sorted_elements;
    }

    return {
        orderListBySequence: orderListBySequence,
        compareSequence: compareSequence,
        deepCopy: deepCopy,
        getTimestamp: getTimestamp,
        generateNewId: generateNewId,
        generateNewIdFromDict: generateNewIdFromDict,
        cloneObject: cloneObject,
        cloneDocuments: cloneDocuments,
        cloneDocument: cloneDocument,
        isUnique: isUnique,
        sortArrayOnSequence: sortArrayOnSequence
    }
}]);
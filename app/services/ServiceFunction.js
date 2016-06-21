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
            console.log(max + 1);
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
            for (var key in dict)   {
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
     * Returns a clone of a multidimensional array
     * @param list
     */
    /*
    function cloneObject(list) {
        return (JSON.parse(JSON.stringify(list)));
    }
    */

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
            if (object[element] instanceof Array) {
                clone[element] = cloneArray(object[element]);
            } else if (typeof(object[element]) == "object") {
                clone[element] = cloneObject(object[element]);
            } else  {
                clone[element] = object[element];

            }
        }
        return clone;
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
                clone[i] = cloneObject(array[i]);
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
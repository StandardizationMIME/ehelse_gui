"use strict";

angular.module("ehelseEditor").factory("ServiceFunction", [function() {

    /**
     * Returns timestamp on database format
     * @returns {string}
     */
    function getTimestamp() {
        var time = new Date();
        var year = time.getFullYear();
        var month =  time.getMonth()+1; // Months are zero-based
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

    function generateNewId(list){
        if(list.length){
            return (list[list.length-1].id + 1);
        }else{
            return 1;
        }
    }

    /**
     * Returns a clone of a multidimensional array
     * @param list
     */
    function cloneObject(list) {
        return (JSON.parse(JSON.stringify(list)));
    }

    return {
        getTimestamp: getTimestamp,
        generateNewId: generateNewId,
        cloneObject: cloneObject
    }
}]);
"use strict";

angular.module("ehelseEditor").factory("Test", ["$rootScope", function($rootScope) {


    function get(){
        return "test text";
    }

    return {
        get: get
    }


}]);
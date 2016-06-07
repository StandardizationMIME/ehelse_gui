"use strict";

angular.module("ehelseEditor").controller("CSVImportController", ["$scope","$rootScope", function($scope,$rootScope){

    function readSingleFile(f) {
        //var f = evt.target.files[0];

        if (f){
            var reader  = new FileReader();
            reader.readAsText(f);
            reader.onload = loaded;
        } else {
            alert("Failed to load file");
        }

    }

    function loaded(e) {
        var content = e.target.result;
        console.log(content);

        var result = CSVToArray(content);
        console.log("RESULTS: ");
        console.log(result);



        var listOfObj = [];
        for (var i = 1; i < result.length; i++){
            var tempDict = {};
            for (var j = 0; j < (result[i]).length; j++){
                console.log("key: "+result[0][j]+ " | value: "+result[i][j]);
                tempDict[result[0][j]] = result[i][j];
            }
            //console.log(tempDict);
            listOfObj.push(tempDict);
        }
        console.log(listOfObj);
        console.log(result[0]);
        

    }

    //@http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    //plagiat and shit! må sjekke den her
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                    // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ){
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                );
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[ 3 ];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
    }

    //document.getElementById("input-file").addEventListener("change",readSingleFile,false);


    $scope.importCsv = function(){
        var f = document.getElementById("input-file").files[0];
        readSingleFile(f);
    };

}]);
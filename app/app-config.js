angular.module('ehelseEditor', ['ui.router','ui.bootstrap','ngRoute','ui.sortable','angularModalService', 'checklist-model', 'ngCookies']).config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);
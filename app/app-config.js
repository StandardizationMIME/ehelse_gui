angular.module('ehelseEditor', ['ui.router','ui.bootstrap','ngRoute','ui.sortable','angularModalService', 'checklist-model', 'ngCookies']).constant('CONFIG',
        {
            DebugMode: true,
            StepCounter: 0,
            APIHost: 'https://refkat.eu/v1'
        });
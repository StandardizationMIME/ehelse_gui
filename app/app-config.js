angular.module('ehelseEditor', ['ngRoute','ui.sortable','angularModalService', 'checklist-model']).constant('CONFIG',
        {
            DebugMode: true,
            StepCounter: 0,
            APIHost: 'https://refkat.eu/v1'
        });
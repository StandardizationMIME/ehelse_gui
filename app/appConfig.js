angular.module("ehelseEditor",
    ["ui.router","ui.bootstrap","ngRoute","angularModalService", "checklist-model", "ngCookies","angular-loading-bar","ngMessages", "angular-autogrow"])
    .config(["$compileProvider", function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);
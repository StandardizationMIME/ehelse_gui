angular.module("ehelseEditor",
    ["ui.router","ui.bootstrap","ngRoute","angularModalService", "checklist-model", "ngCookies","cfp.loadingBar","ngMessages", "angular-autogrow"])
    .config(["$compileProvider", "$provide", function ($compileProvider, $provide) {
        $compileProvider.debugInfoEnabled(false);
        $provide.decorator('$window', function($delegate) {
            Object.defineProperty($delegate, 'history', {get: function(){ return null; }});
            return $delegate;
        });
    }]);
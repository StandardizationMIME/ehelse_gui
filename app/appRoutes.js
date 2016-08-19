angular.module("ehelseEditor")
    .config(function($stateProvider, $urlRouterProvider) {

        //redirect to "/" if nothing else matches
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("login", {
                controller: "LoginController",
                url: "/",
                templateUrl: "app/components/login/loginView.html"
            }).state("main-view", {
                controller: "MainController",
                url: "/main-view",
                templateUrl: "app/components/main/mainView.html"
            })
            .state("main-view.editor-view", {
                controller: "EditorController",
                url: "/editor-view",
                templateUrl: "app/components/editor/editorView.html"
            });
    });
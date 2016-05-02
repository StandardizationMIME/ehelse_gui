/*angular.module('ehelseEditor')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                controller: 'LoginController',
                templateUrl: 'app/components/login/login-view.html'
            })
            .when('/main-view/', {
                controller: 'MainController',
                templateUrl: 'app/components/main/main-view.html'
            })
            .otherwise({redirectTo: '/'})
    }]);
*/

//NEW ROUTING
angular.module("ehelseEditor")
    .config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to loginView
        $urlRouterProvider.otherwise("/");

        // Possible URL matches
        $stateProvider
            .state("login", {
                controller: "LoginController",
                url: "/",
                templateUrl: "app/components/login/login-view.html"
            })
            .state("main-view", {
                controller: "MainController",
                url: "/main-view",
                templateUrl: "app/components/main/main-view.html"
            })
            .state("main-view.editor-view", {
                controller: "EditorController",
                url: "/editor-view",
                templateUrl: "app/components/editor/editor-view.html"
            })
            .state("main-view.min-side", {
                controller: "MyPageController",
                url: "/min-side",
                templateUrl: "app/components/myPage/myPage-view.html"
            })
            .state("main-view.administrer-brukere", {
                controller: "AdministerUsersController",
                url: "/administrer-brukere",
                templateUrl: "app/components/administerUsers/administerUsers-view.html"
            });
    });
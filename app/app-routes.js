angular.module('ehelseEditor')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                controller: 'LoginController',
                templateUrl: 'app/components/login/login-view.html'
            })
            .when('/main-view/', {
                controller: 'MainController',
                templateUrl: 'app/components/main/views/main-view.html'
            })
            .when('/myPage-view/', {
                controller: 'MyPageController',
                templateUrl: 'app/components/main/views/main-view.html'
            })
            .when('/settings-view/', {
                controller: 'SettingsController',
                templateUrl: 'app/components/main/views/main-view.html'
            })
            .when('/administerUsers-view/', {
                controller: 'AdministerUsersController',
                templateUrl: 'app/components/main/views/main-view.html'
            })
            .otherwise({redirectTo: '/'})
    }]);
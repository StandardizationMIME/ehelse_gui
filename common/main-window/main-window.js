/**
 * Created by Stian on 12.02.2016.
 */

function generateTopicList(parent, topics){
    var paths = [];
    for (var i = 0; i < topics.length; i++) {
        paths.push({
            id: topics[i].id,
            path: parent + "/" + topics[i].title
        });
        Array.prototype.push.apply(paths,generateTopicList(parent + "/" + topics[i].title, topics[i].children))
        }
    return paths;
}


(function(){

    angular.module('Authentication', []);
    angular.module('Home', []);

    var app = angular.module('mainApp', [
        'Authentication',
        'Home',
        'ngRoute',
        'ngCookies']);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            controller: 'LoginController',
            templateUrl: 'common/login/login.html'
        })
        .when('/main-view/:topicID?', {
            controller: 'HomeController',
            templateUrl: 'common/main-window/main-view.html'
        })
        .when('/:topicID?', {
            controller: 'HomeController',
            templateUrl: 'common/main-window/main-view.html'
        })
        .otherwise({redirectTo: '/'})
    }]);


    app.run([ '$http', '$rootScope',function($http, $rootScope, MyResourceProvider) {
        $rootScope.login = function (username, authtoken) {

            $rootScope.post(
                'https://refkat.eu/v1/topics/',
                {},
                function (data) {
                    console.log(data);
                },
                function () {
                }
            );
        };



        $rootScope.userName = "";
        $rootScope.password = "";
        $rootScope.apiUrl = 'https://refkat.eu/v1/';

        $rootScope.setUserName = function(userName){
            $rootScope.userName = userName;
        };

        $rootScope.setPassword = function(password){
            $rootScope.password = password;
        };

        $rootScope.post = function(url, data, success, error){
            $rootScope.http("post", url, data, success, error);
        };

        $rootScope.put = function(url, data, success, error){
            $rootScope.http("put", url, data, success, error);
        };

        $rootScope.get = function(url, success, error){
            $rootScope.http("get", url, {} , success, error);
        };

        $rootScope.delete = function(url, data, success, error){
            $rootScope.http("delete", url, data, success, error);
        };


        $rootScope.http = function(method, url, data, success, error){
            var credentials = btoa($rootScope.userName + ':' + $rootScope.password);
            var authorization = {'Authorization': 'Basic ' + credentials};
            $http({
                url: $rootScope.apiUrl + url,
                data: data,
                method: method,
                headers: authorization
            }).success(function(data, status, headers, config){

                    success (data, status, headers, config);
                }
            ).error(
                function(data, status, headers, config){
                    error(data, status, headers, config);
                });
        };

    }]);


    app.controller('LoginController', [ '$scope', '$rootScope', '$location',  function( $scope, $rootScope, $location) {
        $scope.submit = function(){
            $rootScope.setUserName($scope.username);
            $rootScope.setPassword($scope.password);
            $scope.logIn();
        };

        $scope.logIn = function (username, authtoken) {

            $rootScope.post(
                'topics/',
                {},
                function(data){
                    console.log(data);
                    if (data.create === 'created'){
                        $location.path('/main-view').replace();
                    }
                },
                function(){}
            );

        };
    }]);

    // Controller for selecting a topic.
    app.controller('TopicController', function($scope, $http){

        $scope.get('topics/' , function(data){
            $scope.topics = data.topics;
            $scope.topicList = generateTopicList("", data.topics);
            console.log($scope.topics);

        }, function(){});

        $scope.getStandards = function(id) {
            $scope.get('topics/' + id , function(data){
                $scope.standards = data.documents;
                $scope.topic = data;
                console.log($scope.topic);
            }, function(){});
        };

        $scope.changeView = function(view) {
            $scope.view = view;
        };

        $scope.cancelContentBrowser = function(){
            $scope.changeView("");
        };

        $scope.topicTitle = "Initial topicTitle value";


        $scope.postNewTopic = function(){
            console.log("Button was clicked");

            console.log($scope.topicTitle);
            //var data = $.param({
            //    json: JSON.stringify({
            //        title: $scope.topicTitle,
            //        description: $scope.topicDescription,
            //        number: "",
            //        isInCatalog: $scope.topicIsInCatalog,
            //        sequence: "",
            //        parent: $scope.topicParent
            //    })
            //});
            //$scope.post("", data).success(function(data, status) {
            //    $scope.hello = data;
            //});
        }

    });

    app.directive('loginpage', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/login/login.html'
        };
    });

    app.directive('toolbar',function(){
        return{
            restrict: 'E',
            templateUrl: 'common/main-window/toolbar/toolbar-view.html'
        };
    });

    // Directive for html used to display the edtior.
    app.directive('editordisplay',function(){
        return{
            restrict: 'E',
            templateUrl: 'common/main-window/editor-display/editor-display-view.html'
        };
    });

    // Directive for html used to display the list of standards.
    app.directive('filebrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/main-window/editor-display/file-browser/file-browser-view.html'
        };
    });

    // Directive for html used to display the content of standards/profiles.
    app.directive('contentbrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/main-window/editor-display/content-browser/content-browser-view.html'
        };
    });

    // Directive for html used to display the topicbrowser.
    app.directive('topicbrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/main-window/editor-display/topic-browser/topic-browser-view.html'
        };
    });

    app.directive('newtopic', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/main-window/editor-display/content-browser/new-topic-view.html'
        };
    });

})();
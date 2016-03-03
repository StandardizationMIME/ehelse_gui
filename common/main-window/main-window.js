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


    app.run([ '$http', '$rootScope',function($http, $rootScope, MyResourceProvider) {
        $rootScope.login = function (username, authtoken) {

            $rootScope.post(
                'http://refkat.eu/v1/topics/',
                {},
                function(data){
                    console.log(data);
                },
                function(){}
            );


        };

        $rootScope.userName = "";
        $rootScope.password = "";

        $rootScope.setUserName = function(userName){
            $rootScope.userName = userName;
        };

        $rootScope.setPassword = function(password){
            $rootScope.password = password;
        };

        $rootScope.post = function(url, data, success, error){
            $rootScope.http("post", url, data, success, error);
        };

        $rootScope.http = function(method, url, data, success, error){
            var credentials = btoa($rootScope.userName + ':' + $rootScope.password);
            var authorization = {'Authorization': 'Basic ' + credentials};
            $http({
                url: url,
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




    app.directive('loginpage', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/login/login.html'
        };
    });

    app.controller('LoginController', [ '$scope', '$rootScope',  function( $scope, $rootScope) {
        $scope.submit = function(){
            $rootScope.setUserName($scope.username);
            $rootScope.setPassword($scope.password);
            $rootScope.login();
        };
    }]);

    // Controller for selecting a theme.
    app.controller('TopicController', function($scope, $http){

        $http.get('http://37.139.13.117/v1/topics/').success(function(data){
            $scope.topics = data.topics;
            console.log("TopicList: " , generateTopicList("", data.topics));
            $scope.topicList = generateTopicList("", data.topics);
        });
        console.log($scope.topicList);

        $scope.getStandards = function(id) {
            $http.get('http://37.139.13.117/v1/topics/' + id).success(function(data){
                $scope.standards = data.documents;
                $scope.topic = data;
            });
        };

        $scope.changeView = function(view) {
            $scope.view = view;
        };

    });


    // Controller for displaying standards/profiles
    app.controller('DisplayController', function($scope, $http) {


    });

    // Controller for displaying the content of a standard.
    app.controller('DisplayContentController', function($scope){
        $scope.getStdContent = function(standard){
            console.log(standard);
            var stdContentDisplay = $(".content-display");
            stdContentDisplay.empty();

            for (var i = 0; i < standard.fields.length; ++i){
                stdContentDisplay.append('<li>'+ standard.fields[i].fieldTitle +'</li>');
            }
        };
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
            templateUrl: 'toolbar/toolbar-view.html'
        };
    });

    // Directive for html used to display the edtior.
    app.directive('editordisplay',function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/editor-display-view.html'
        };
    });

    // Directive for html used to display the list of standards.
    app.directive('filebrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/file-browser/file-browser-view.html'
        };
    });

    // Directive for html used to display the content of standards/profiles.
    app.directive('contentbrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/content-browser/content-browser-view.html'
        };
    });

    // Directive for html used to display the topicbrowser.
    app.directive('topicbrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/topic-browser/topic-browser-view.html'
        };
    });

    app.directive('newtopic', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/content-browser/new-topic-view.html'
        };
    });

})();
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


    angular.module('ehelseEditor').run([ '$http', '$rootScope',function($http, $rootScope, MyResourceProvider) {
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


    angular.module('ehelseEditor').controller('LoginController', [ '$scope', '$rootScope', '$location',  function( $scope, $rootScope, $location) {
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
    angular.module('ehelseEditor').controller('TopicController', function($scope, $http){

        $scope.topic = {
            title: "Referansekatalogen"
        };

        $scope.get('topics/' , function(data){
            $scope.topics = data.topics;
            $scope.topicList = generateTopicList("", data.topics);
            console.log($scope.topics);

        }, function(){});

        $scope.getStandards = function(id) {
            $scope.get('topics/' + id , function(data){
                $scope.standards = data.documents;
                $scope.topic = data;

            }, function(){});

            <!-- Makes selected folder bold and toggles folder icon between opened and closed -->
            $(".clickable").removeClass('selected');
            $('#' + id).addClass('selected');
            $('#folder' + id).toggleClass('glyphicon-folder-open','glyphicon-folder-close');
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



    angular.module('ehelseEditor').directive('toolbar',function(){
        return{
            restrict: 'E',
            templateUrl: 'app/components/toolbar/toolbar-view.html'
        };
    });

    angular.module('ehelseEditor').directive('editorview',function(){
        return{
            restrict: 'E',
            templateUrl: 'app/components/editor/editor-view.html'
        };
    });

    angular.module('ehelseEditor').directive('topicview', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/components/topic/topic-view.html'
        };
    });

    angular.module('ehelseEditor').directive('documentview', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/components/document/document-view.html'
        };
    });

    angular.module('ehelseEditor').directive('contentview', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/components/content/content-view.html'
        };
    });


})();
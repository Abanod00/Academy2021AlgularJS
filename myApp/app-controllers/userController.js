/*User Controller*/
myApp.controller('UserController', ['$scope', '$rootScope', '$location', '$http', 'UsersService', '$routeParams', 'Authentication', function($scope, $rootScope, $location, $http, $UsersService, $routeParams, $Authentication) {

    var user = JSON.parse(localStorage.getItem('logUserInfo'));

    $scope.deslog = function() {
        $Authentication.deslog();
    };


    var retrieveUser = $UsersService.retrieveUser($routeParams.userid);
    retrieveUser.then(function(data) {
        $scope.userfromdb = data.data

    })


    var allusers = $UsersService.retrieveAllUser();
    allusers.then(function(data) {
        $scope.allusers = data.data

    })
    



}]); //Controller

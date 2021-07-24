/*Login Controller*/
myApp.controller('LoginController', ['$scope', '$location', 'Authentication', function($scope, $location, $Authentication) {

        if ($Authentication.requireAuth()) {
            event.preventDefault();
            $location.path('/');
        }

        $scope.login = function() {
            $Authentication.log($scope.username, $scope.password);
        };


        $scope.deslog = function() {
            $Authentication.deslog();
        };


    }

]); //Controller
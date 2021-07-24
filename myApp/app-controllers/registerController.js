/*Registrer Controller*/
myApp.controller('RegisterController', ['$scope', '$rootScope', '$location', 'Authentication', function($scope, $rootScope, $location, $Authentication) {

        if ($Authentication.requireAuth()) {
            event.preventDefault();
            $location.path('/');
        }


        $scope.register = function() {
            var email = $scope.email;
            var username = $scope.username;
            var password1 = $scope.password1;
            var password2 = $scope.password2;
            var fullname = $scope.fullname;
            var avatar = $scope.avatar;

            if (!validate(password1, password2)) {
                $scope.error = "Error password dont match"
            }

            $Authentication.register(email, username, password1, fullname);

        };



        $scope.deslog = function() {
            $Authentication.deslog();
        };

        function validate(password1, password2) {
            if (password1 == password2) {
                return true;
            }
            return false;
        };

    }

]); //Controller
/*Profile Controller*/
myApp.controller('ProfileController', ['$scope', '$rootScope', '$location', '$http', 'Authentication', 'UsersService', '$timeout', function($scope, $rootScope, $location, $http, $Authentication, $UsersService, $timeout) {
    var user = JSON.parse(localStorage.getItem('logUserInfo'));

    $scope.user = user;

    $scope.username = $scope.user.username;
    $scope.fullname = $scope.user.fullname;
    $scope.description = $scope.user.description;
    $scope.avatar = $scope.user.avatar;

    $scope.deslog = function() {
        $Authentication.deslog();
    };


    $scope.save = function() {



        data = {
            "username": $scope.username,
            "fullname": $scope.fullname,
            "description": $scope.description,
            "avatar": $scope.avatar
        }

        var save = $UsersService.save(data, $scope.user._id);
        save.then(function(data) {
                $scope.user = data.data;
                localStorage.setItem('logUserInfo', JSON.stringify(data.data));

                $scope.username = data.data.username;
                $scope.fullname = data.data.fullname;
                $scope.description = data.data.description;
                $scope.avatar = data.data.avatar;

                showAlert(false, "Profile saved.");

        }, function(res){
             showAlert(true, "Profile save error: " + data.data.reason);
        });

    };



    var getUserFollows = $UsersService.getUserFollows(user._id);
    getUserFollows.then(function(data) {
         $scope.follows = data.data;
    })


    var showAlert = function(isError, message) {
        var elem = document.getElementById('alert');
        if (isError) {
            $scope.alertMessage = message;
            elem.classList.remove('alert-success');
            elem.classList.add('alert-danger');

        } else {
            elem.classList.remove('alert-danger');
            elem.classList.add('alert-success');
            $scope.alertMessage = message;
        }


        $scope.alert = true
        $timeout(function() {
            $scope.alert = false;
        }, 2000);

    }


}]); //Controller
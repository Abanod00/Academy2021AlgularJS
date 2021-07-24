/*Likes Controller*/
myApp.controller('LikesController', ['$scope', '$location', '$http', 'Authentication', 'LikesService','UsersService', '$routeParams', function($scope, $location, $http, $Authentication, $LikesService, $UsersService, $routeParams) {

    var user = JSON.parse(localStorage.getItem('logUser'));
    var userInfo = JSON.parse(localStorage.getItem('logUserInfo'));

    $scope.hastags = []

    $scope.deslog = function() {
        $Authentication.deslog();
    };


    var retrieveAllUser = $UsersService.retrieveAllUser();
    retrieveAllUser.then(function(data) {
        $scope.users = shuffleArray(data.data);

    })


    var getUserLikes = $LikesService.getUserLikes(userInfo._id);
    getUserLikes.then(function(data) {
        $scope.messages = data.data;

    })


    var shuffleArray = function(array) {
        var m = array.length,t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }


    $http({
            method: 'GET',
            url: 'http://localhost:8081/api/v1/hastag/getall',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).success(function(response) {
            console.log("Get all hastag successfully " + response);

            for (const [key, value] of Object.entries(response)) {
                $scope.hastags.push({
                    'key': key,
                    'value': value
                });
            }

        })
        .error(function(response) {
            console.log('Get all hastag error: ' + response.message);
        });

    }




]); //Controller
/*Messages Controller*/
myApp.controller('MessagesController', ['$scope', '$rootScope', '$timeout', '$location', '$http', 'Authentication', 'MessagesService', 'UsersService', function($scope, $rootScope, $timeout, $location, $http, $Authentication, $MessagesService, $UsersService) {


    var user = JSON.parse(localStorage.getItem('logUserInfo'));

    $scope.user = user;
    $scope.hastags = []
    $scope.messages = [];
    $scope.tweet_message;
    $scope.users = [];

    $scope.deslog = function() {
        $Authentication.deslog();
    };


    var retrieveAllUser = $UsersService.retrieveAllUser();
    retrieveAllUser.then(function(data) {
        $scope.users = shuffleArray(data.data);

    })

    var retrieveAllMessages = $MessagesService.retrieveAllMessage();
    retrieveAllMessages.then(function(data) {
         $scope.messages = data.data
    })



    $scope.follow = function(uuid) {
        var follow =  $UsersService.followUser(user._id, uuid);
        follow.then(function(data) {
            //Code after execute request
            console.log("Follow successfully to " + uuid)
        })
       
    }


    $scope.tweet = function() {
        console.log("Tweet " + $scope.tweet_message);
        var tweet_content = $scope.tweet_message
        var image1 = $scope.image1;
        var image2 = $scope.image2;

        images = []
        if (image1) {
            images.push(image1);
        }

        if (image2) {
            images.push(image2);
        }

        body = {
            "content": tweet_content,
            "userUsername": user.username,
            "date": new Date(),
            "like": 0,
            "images": images

        }

        var postTweet = $MessagesService.postTweet(body);
        postTweet.then(function(data) {
            cleanInputs();
            $scope.messages.push(data.data);
            $('#tweetModal').modal('hide')

        }, function(res){
            console.log("Error sending tweet.")
        });

    };



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


        var shuffleArray = function(array) {
            var m = array.length,
                t, i;

            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        }

        var cleanInputs = function(array) {
            $scope.tweet_message = "";
            $scope.image1 = "";
            $scope.image2 = "";
        }


        $scope.like = function(uuid) {
            event.preventDefault()

            var likeMessage = $MessagesService.likeMessage(uuid, user.username);
            likeMessage.then(function(data) {
                var response = data.data

                var value = document.getElementById('like_' + uuid).textContent;

                if (parseInt(response.code) == 300) {
                    document.getElementById('like_' + uuid).textContent = parseInt(value) + 1;
                    var value = document.getElementById('img_like_' + uuid);
                    value.style.backgroundColor = "red";
                } else {
                    document.getElementById('like_' + uuid).textContent = parseInt(value) - 1;
                    var value = document.getElementById('img_like_' + uuid);
                    value.style.backgroundColor = "#15202B";
                }

            })

        };




    $scope.userLike = function(arr) {
        if (arr == null) {
            return false;
        }

        return arr.includes(user.username);
    }

    $scope.isOwnTweet = function(messageid, userid) {
        if (messageid == userid) {
            return true;
        }

        return false;
    }






    

    }




]); //Controller



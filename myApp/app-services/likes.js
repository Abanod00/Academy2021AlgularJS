myApp.service('LikesService',['$rootScope', '$location', '$http', '$log', function($rootScope, $location, $http, $log) {


this.getUserLikes = function(uuid){
   var likes = $http({
            method: 'GET',
            url: 'http://localhost:8081/api/v1/user/getlikes?uuid=' + uuid,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).success(function(response) {
            console.log("Get all messages successfully " + response);
        })
        .error(function(response) {
            console.log('Get all messages error: ' + response.message);

        });
	return likes;
}





}]); //service

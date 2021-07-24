myApp.service('UsersService',['$rootScope', '$location', '$http', '$log', function($rootScope, $location, $http, $log) {


  this.retrieveUser = function(uuid){
    console.log("Retrieving User: " + uuid);
    
    var user = $http({
      method: 'GET',
      url: 'http://localhost:8081/api/v1/user/'+uuid,
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).success(function(response) {
      console.log("User retrieved successfully " + response);

    })
    .error(function(response) {
      console.log('User retrieved error: ' + response);
    });
    return user;

  }


  this.retrieveAllUser = function(){
    console.log("Retrieving all Users");

    var users =$http({
      method: 'GET',
      url: 'http://localhost:8081/api/v1/user/getall',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).success(function(response) {
      console.log("User retrieved all successfully " + response);


    })
    .error(function(response) {
      console.log('User retrieved all error: ' + response);

    });
     return users;
  }



        this.followUser = function(userid, followid){
            $http({
                method: 'POST',
                url: 'http://localhost:8081/api/v1/user/follow?userid=' + userid + '&followid=' + followid,
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              }).success(function(response) {
                alert("User followed successfully.")
                console.log("Follow saved successfully " + response);
              })
              .error(function(response) {
                alert("User followed error.")
                console.log('Follow error: ' + response.reason);
              });

        }


this.getUserFollows = function(userid){
    var follows = $http({
            method: 'GET',
            url: 'http://localhost:8081/api/v1/user/follows?uuid=' + userid,

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).success(function(response) {
            console.log("Get follows successfully " + response);

        })
        .error(function(response) {
            console.log('Get follows error: ' + response.message);
        });
        return follows;
        }



this.save = function(data, userid){
    
   var save =  $http({
            method: 'POST',
            url: 'http://localhost:8081/api/v1/user/' + userid,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).success(function(response) {
            console.log("User info saved successfully " + response);
        })
        .error(function(response) {
            console.log('User info error: ' + response.reason);

        });
      return save;
}

}]); //service

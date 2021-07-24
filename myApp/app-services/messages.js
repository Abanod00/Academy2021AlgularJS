myApp.service('MessagesService',['$rootScope', '$location', '$http', '$log', function($rootScope, $location, $http, $log) {


  
  this.retrieveAllMessage = function(){
    console.log("Retrieving all messages");

    var messages = $http({
      method: 'GET',
      url: 'http://localhost:8081/api/v1/message/getall',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).success(function(response) {
      console.log("Message retrieved all successfully " + response);

    })
    .error(function(response) {
      console.log('Message retrieved all error: ' + response);

    });
    return messages;
  }

  this.postTweet = function(data){
       var tweet = $http({
                method: 'POST',
                url: 'http://localhost:8081/api/v1/message/save',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).success(function(response) {
                console.log("Tweet saved successfully " + response);

            })
            .error(function(response) {
                console.log('Tweet error: ' + response.message);
               
            });
        return tweet;
  }


  this.likeMessage = function(uuid, username){
    var message = $http({
        method: 'POST',
        url: 'http://localhost:8081/api/v1/message/like/' + uuid + '?username=' + username,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).success(function(response) {
        console.log("Like saved successfully " + response);
    })
    .error(function(response) {
        console.log('Like error: ' + response.reason);

    });
    return message;
  }


}]); //service

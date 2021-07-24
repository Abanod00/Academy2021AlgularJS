myApp.service('Authentication',['$rootScope', '$location', '$http', '$log', '$timeout', function($rootScope, $location, $http, $log, $timeout) {

  var userObj = {};

  this.isAuth = function(){
    if( $location.$$path == "/register"){
      return true;
    }

    if(localStorage.getItem('logUser') != null){

      //Update user
      console.log("User is log at " + $location.$$path + " user:" + $rootScope.logUser)
      return true;
    }else{
      console.log("User is not log at " + $location.$$path + " redirect to login page.")
      return false;
    }
  }


  this.log = function(username, password, refresh){
    console.log("Log function with credentials:" + username + " " + password);
    data = {
      "username": username,
      "password": password
    }

    $http({
      method: 'POST',
      url: 'http://localhost:8081/api/v1/user/login',
      data: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).success(function(response) {
      console.log("Log successfully " + response);
      logUser = {"username": response.username, "password": response.password, "likes": response.likes}
      localStorage.setItem('logUser', JSON.stringify(logUser));
      localStorage.setItem('logUserInfo', JSON.stringify(response));

      showAlert(false, "User log successfully: " + response)

      setTimeout(() => {  location.reload(); }, 2000);
      
    })
    .error(function(response) {
  
      console.log('Log error: ' + response);
      showAlert(true, "User log error: " + response)

    });

 
  }


  this.register = function(email, username, password, fullname){
    console.log("Register user email:" + email + " username:" + username);
    data = {
      "email": email,
      "username": username,
      "password": password,
      "fullname": fullname
    }

    $http({
      method: 'POST',
      url: 'http://localhost:8081/api/v1/user/register',
      data: JSON.stringify(data),
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).success(function(response) {
      console.log("Register successfully " + response);
      logUser = {"username": response.username, "password": response.password}
      localStorage.setItem('logUser', JSON.stringify(logUser));
      localStorage.setItem('logUserInfo', JSON.stringify(response));
      
      showAlert(false, "User register successfully.")
      setTimeout(() => {  location.reload(); }, 2000);

    })
    .error(function(response) {
      console.log('Register error: ' + response);

      showAlert(true, "User register error.")

    });
  }

  this.requireAuth = function(){
    if(localStorage.getItem('logUser') != null){
      return true;
    }else{
      return false;
    }
  }

  this.deslog = function(){
    localStorage.clear();
    location.reload();
  }


  var showAlert = function(isError, message) {
    var elem = document.getElementById('alert');
    if(isError){
      $rootScope.alertMessage = message;
      elem.classList.add('alert-danger');

    }else{
      elem.classList.add('alert-success');
      $rootScope.alertMessage = message;
    }
  
    
    $rootScope.alert = true
    $timeout(function() { $rootScope.alert = false; }, 2000);
    
  }

}]); //service

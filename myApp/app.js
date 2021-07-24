var myApp = angular.module('myApp',['ngRoute']);

myApp.run(['$rootScope', '$location', 'Authentication', function($rootScope, $location, Authentication) {

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ( !Authentication.isAuth() ) {
        // no logged user, we should be going to #login
          $location.path( "/login" );
      }         
    });

    $rootScope.$watch(function () { return localStorage.getItem('logUser'); },function(newVal,oldVal){
     if(oldVal!==newVal && newVal === undefined){
       console.log('It is undefined'); 
    }else{
      $rootScope.logUser = newVal;
    }

  });

    $rootScope.$watch(function () { return localStorage.getItem('logUserInfo'); },function(newVal,oldVal){
     if(oldVal!==newVal && newVal === undefined){
       console.log('It is undefined'); 
    }else{
      $rootScope.logUserInfo = newVal;
    }

  });

}]); //run





myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController'
    }).
    when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController'
    }).
    when('/likes', {
      templateUrl: 'views/likes.html',
      controller: 'LikesController'
    }). 
    when('/user/:userid', {
      templateUrl: 'views/user.html',
      controller: 'UserController'
    }).
     when('/', {
      templateUrl: 'views/messages.html',
      controller: 'MessagesController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //currentAuth
      }//resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
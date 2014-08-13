angular.module('UserData', [])

.factory('userData', ['$http','url', function($http, url){
  return $http.get(url+'data/userData.json');
}]);
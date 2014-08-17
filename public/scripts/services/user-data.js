angular.module('user-data', [])

.factory('getData', ['$http','url', function($http, url){
  return $http.get(url+'data/userData.json');
}]);
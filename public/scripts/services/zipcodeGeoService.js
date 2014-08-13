angular.module('ZipcodeGeoService')

.factory('ZipcodeLookUp', ['$http', 'url', function($http, url){
  return $http.get(url+'zipGeoHash.json')
}])

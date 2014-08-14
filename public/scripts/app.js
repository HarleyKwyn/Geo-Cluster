angular.module( 'GeoCluster', [
  'ui.bootstrap',
  'UserData',
  'GeoClusterGraph'
])

.constant('url', 'http://172.12.8.150/')

.controller('MainController', [
  '$scope',
  'userData',
  function($scope, UserData){
    $scope.data = null;
    UserData.success(function(data){
      $scope.data = data;
      console.log(data);
    });
}])

;
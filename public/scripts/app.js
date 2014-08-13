angular.module( 'GeoCluster', [
  'ui.bootstrap',
  'd3',
  'UserData',
  'GeoClusterGraph'
])

.constant('url', 'http://localhost:8000/')

.controller('MainController', [
  '$scope',
  'userData',
  function($scope, UserData){
    UserData.success(function(data){
      $scope.userData = data;
      console.log( data);
    });
    $scope.data = [
      {name: "test1", score: 98},
      {name: "test2", score: 96},
      {name: 'test3', score: 75},
      {name: "test4", score: 48}
    ];
}])

;
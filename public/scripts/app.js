angular.module( 'GeoCluster', [
  'ui.bootstrap',
  'user-data',
  'geo-cluster-graph',
  'data-processing'
])

.constant('url', 'http://localhost:8000/')

.controller('MainController', [
  '$scope',
  'getData',
  'dataFilter',
  function($scope, getData, dataFilter){
    var rawData = null;
    $scope.data = null;
    $scope.zoom = 1;

    getData.success(function(data){
      rawData = data;
      $scope.data = data;
    });

}])

;
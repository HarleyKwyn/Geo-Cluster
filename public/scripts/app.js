angular.module( 'GeoCluster', [
  'ui.bootstrap',
  'user-data',
  'geo-cluster-graph',
  'data-processing',
  'cluster-data'
])

.constant('url', 'http://localhost:8000/')

.controller('MainController', [
  '$scope',
  'getData',
  'dataFilter',
  'attachCoords',
  'kmeans',
  function($scope, getData, dataFilter, attachCoords, kmeans){
    var origonalData  = null;
    $scope.data = null;
    $scope.zoom = 1;
    $scope.timeRange = {min:0, max:0};
    $scope.k = 4;
    $scope.kmeans = null;

    getData.success(function(data){
      origonalData = attachCoords(data);
      $scope.data = origonalData;
      $scope.kmeans = new kmeans($scope.data, $scope.k);
      $scope.clusters = $scope.kmeans.clusters;
      $scope.centroids = $scope.kmeans.means;
      console.log($scope.centroids)
    });

}])

;
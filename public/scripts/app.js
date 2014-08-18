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
    var filter,
        origonalData  = null;

    $scope.data = null;
    $scope.currentCluster = {data:null, index:null};
    $scope.kmeans = null;
    $scope.error = null;
    $scope.timeRange = {min:0, max:0};
    $scope.k = 4;
    $scope.tolerance = 100;
    $scope.zoom = 1;
    $scope.clusters = null;

    getData.success(function(data){
      origonalData = attachCoords(data);
      $scope.data = origonalData;
      $scope.kmeans = new kmeans($scope.data, $scope.k, $scope.tolerance);
      $scope.clusters = $scope.kmeans.clusters;
      $scope.centroids = $scope.kmeans.means;
      filter = new dataFilter($scope.data);
      console.log($scope.centroids)
    });

    $scope.showCluster = function(d, i){
      $scope.currentCluster.index = i+1;
      $scope.currentCluster.data = $scope.clusters[i];
      $scope.$apply();
    };

    $scope.filter = function(){
      console.log("filtered")
      filter.byModule($scope.module);
      console.log(filter);
      if(filter.filteredData.length === 0 ){
        $scope.error = "No Matches"
      }else{
        $scope.error = null;
        $scope.data = filter.filteredData;
        $scope.kmeans.recalculate( filter.filteredData );
        $scope.clusters = $scope.kmeans.clusters;
        $scope.centroids = $scope.kmeans.means;
      }
    }

}])

;
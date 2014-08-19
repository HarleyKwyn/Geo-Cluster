angular.module( 'GeoCluster', [
  'ui.bootstrap',
  'user-data',
  'geo-cluster-graph',
  'data-processing',
  'cluster-data',
  'ui-rangeSlider'
])

.constant('url', 'http://localhost:8000/')

.controller('MainController', [
  '$scope',
  'getData',
  'dataFilter',
  'attachCoords',
  'kmeans',
  function($scope, getData, dataFilter, attachCoords, kmeans){
    //private variables
    var filter,
        origonalData  = null;

    //init general scope models
    $scope.data = [];
    $scope.kmeans = null;
    $scope.error = null;
    $scope.currentCluster = {data:null, index:null};
    
    //init kmeans and filter params 
    $scope.timeRange = {min:0, max:0};
    $scope.k = 4;
    $scope.tolerance = 100;
    $scope.zoom = 1;
    $scope.clusters = null;
    $scope.module = '';

    //init date picker params
    $scope.startDate = new Date(1);
    $scope.endDate = new Date();
    $scope.minDate = $scope.startDate;
    $scope.maxDate =  $scope.endDate;
    $scope.startOpened = false;
    $scope.endOpened = false;

    //get data from data service. To be replaced with api possibly.
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

    $scope.recalculate = function(){
      var startDate = Date.parse($scope.startDate);
      var endDate = Date.parse($scope.endDate);
      var module = $scope.module;
      
      var comparator = function(data){
        if(data.time_purchased > startDate && data.time_purchased < endDate ){
          if(module !== ''){
            return data.products.indexOf(module) > -1 ;
          }
          return true;
        }
      };

      filter.by(comparator);

      if(filter.filteredData.length === 0 ){
        $scope.error = "No Matches"
      }else{
        console.log(filter.filteredData , $scope.k)
        $scope.error = null;
        $scope.data = filter.filteredData;
        $scope.kmeans.recalculate( filter.filteredData, $scope.k);
        $scope.clusters = $scope.kmeans.clusters;
        $scope.centroids = $scope.kmeans.means;
      }
    }

  $scope.startOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startOpened = !$scope.startOpened;
    console.log($scope.startDate);
  };

  $scope.endOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.endOpened = !$scope.endOpened;

  };

}])

;
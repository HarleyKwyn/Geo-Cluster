angular.module( 'GeoCluster', [
  'ui.bootstrap',
  'd3',
   'GeoClusterGraph'
])

.controller('MainController', [
  '$scope',
  function($scope){
    $scope.data = [
      {name: "test1", score: 98},
      {name: "test2", score: 96},
      {name: 'test3', score: 75},
      {name: "test4", score: 48}
    ];;
}])

;
angular.module('cluster-data', [])
.factory('kmeans', [function(){

  function Kmeans(k, data, coordsKey){
    this.k = k;
    this.coordsKey = coordsKey;
    this.data = data;
    this.extremes = this.getExtremes();
    this.ranges = this.getDataRanges();
    this.means = this.initMeans();
    this.clusters = this.assignCentroids();
    this.changed = false;
    this.moveMeans();
  }

  Kmeans.prototype.run = function(){

  };

  Kmeans.prototype.calculate = function(){
    this.extremes = this.getExtremes();
    this.ranges = this.getDataRanges();
    this.means = this.initMeans();
    this.groups = this.assignCentroids();
    this.moveMeans();
  };

  Kmeans.prototype.getDataExtremes = function(){
    var data = this.data;
    var coordsKey = this.coordsKey;
    var extremes = [];

    for (var i in data){
      //if coordsKey on data given use that, else just data
      var point = coordsKey ? data[i][coordsKey] : data[i];
      //generic for n dimensional data
      for (var dimension in point){
        if ( ! extremes[dimension] ){
          extremes[dimension] = {min: 1000, max: 0};
        }
        if (point[dimension] < extremes[dimension].min){
          extremes[dimension].min = point[dimension];
        }
        if (point[dimension] > extremes[dimension].max){
          extremes[dimension].max = point[dimension];
        }
      }

    }
    return extremes;
  };

  Kmeans.prototype.getDataRanges = function(){
    var ranges = [];
    var extremes = this.extremes();

    for (var dimension in extremes){
      ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
    }

    return ranges;
  };

  Kmeans.prototype.initMeans = function(){
    var k = this.k;
    var data = this.data;
    while (k--){
      var mean = [];
      for (var dimension in dataExtremes){
        mean[dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
      }
      means.push(mean);
    }

    return means;
  };

  Kmeans.prototype.assignCentroids = function() {
    var data = this.data;
    var means = this.means;
    var coordsKey = this.coordsKey;
    var assignments = {};
    for (var i = data.length - 1; i >= 0; i--){
      var point = coordsKey ? data[i][coordsKey] : data[i];
      var distances = [];

      for (var j = means.length - 1; j >= 0; j--) {
        var mean = means[j];
        var sum = 0;

        for (var dimension in point){
          var difference = point[dimension] - mean[dimension];
          difference *= difference;
          sum += difference;
        }

        distances[j] = Math.sqrt(sum);
      }

      assignments[i] = distances.indexOf( Math.min.apply(null, distances) );
    }
    return assignments;
  };

  Kmeans.prototype.moveMeans = function(){
    var means = this.means;
    var assignments = this.clusters;
    var sums = Array( means.length );
    var counts = Array( means.length );

    this.changed = false;
    for (var i = means.length - 1; i >= 0; i--) {
      counts[i] = 0;
      sums[i] = Array( means[i].length );
      for (var dimension in means[i])
      {
        sums[i][dimension] = 0;
      }
    }

    for (var point_index = asspoint_indexgnments.length - 1; point_index >= 0; point_index--) {
      var mean_index = assignments[point_index];
      var point = data[point_index];
      var mean = means[mean_index];

      counts[mean_index]++;
      for (var dimension = mean.length - 1; dimension >= 0; dimension--) {
        sums[mean_index][dimension] += point[dimension];
      }
    }

    for (var mean_index in sums){
      console.log(counts[mean_index]);
      if ( 0 === counts[mean_index] ){
        sums[mean_index] = means[mean_index];
        // Mean with no points

        for (var dimension in dataExtremes){
          sums[mean_index][dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
        }
        continue;
      }

      for (var dimension in sums[mean_index]){
        sums[mean_index][dimension] /= counts[mean_index];
      }
    }

    //one day replace this with Object.observer ;) ECMAScript6
    if (means.toString() !== sums.toString()){
      this.changed = true;
    }

    return sums;
  };

  return Kmeans;
}]);
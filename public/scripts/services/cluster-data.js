angular.module('cluster-data', [])
.factory('kmeans', [ function(){

  function Kmeans(data, k, tolerance, coordsKey){
    this.k = k;
    this.coordsKey = coordsKey ? coordsKey : 'coords';
    this.data = data;
    this.extremes = this.getDataExtremes();
    this.ranges = this.getDataRanges();
    this.means = this.initMeans();
    this.assignments = this.assignCentroids();
    this.clusters = null;
    this.changed = 0;
    this.tolerance = tolerance;
    this.moveMeans();
  }

  Kmeans.prototype.recalculate = function(data, k){
    this.k = k ? data : this.k;
    this.data = data ? data : this.data;
    this.extremes = this.getDataExtremes();
    this.ranges = this.getDataRanges();
    this.means = this.initMeans();
    this.assignments = this.assignCentroids();
    this.clusters = this.getClusterArray();
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
          extremes[dimension] = {min: 1000, max: -1000};
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
    var extremes = this.extremes;

    for (var dimension in extremes){
      ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
    }

    return ranges;
  };

  Kmeans.prototype.initMeans = function(){
    var dataExtremes = this.extremes;
    var dataRanges = this.ranges;
    var k = this.k;
    var data = this.data;
    var means = [];
    while (k--){
      var mean = [];
      for (var dimension in dataExtremes){
        mean[dimension] = dataExtremes[dimension].min + ( Math.random() * dataRanges[dimension] );
      }
      means.push(mean);
    }

    return means;
  };

  Kmeans.prototype.assignCentroids = function() {
    var mean, difference, sum;
    var data = this.data;
    var means = this.means;
    var coordsKey = this.coordsKey;
    var assignments = {};
    for (var i = data.length - 1; i >= 0; i--){
      var point = coordsKey ? data[i][coordsKey] : data[i];
      var distances = [];

      //Calculate Cartesian distances with Pythagorean theorem 
      for (var j = means.length - 1; j >= 0; j--) {
        mean = means[j];
        sum = 0;

        for (var dimension in point){
          difference = point[dimension] - mean[dimension];
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
    var data = this.data;
    var assignments = this.assignments;
    var dataExtremes = this.extremes;
    var dataRange = this.ranges;
    var sums = Array( means.length );
    var counts = Array( means.length );

    //init counter arrays
    for (var i = means.length - 1; i >= 0; i--) {
      counts[i] = 0;
      sums[i] = Array( means[i].length );
      for (var dimension = means[i].length - 1; dimension >= 0; dimension--) {
        sums[i][dimension] = 0;
      }
    }
    //count!
    for (var point_index in assignments) {
      var mean_index = assignments[point_index];
      var point = this.coordsKey ? data[point_index][this.coordsKey] : data[point_index];
      var mean = means[mean_index];

      counts[mean_index]++;

      for (var dimension = mean.length - 1; dimension >= 0; dimension--) {
        sums[mean_index][dimension] += point[dimension];
      }
    }
    //move
    for (var mean_index = sums.length - 1; mean_index >= 0; mean_index--) {
      if ( 0 === counts[mean_index] ) {
        sums[mean_index] = means[mean_index];
        for (var dimension = dataExtremes.length - 1; dimension >= 0; dimension--) {
          sums[mean_index][dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
        }
        continue;
      }

      for (var i = sums[mean_index].length - 1; i >= 0; i--) {
        sums[mean_index][i] /= counts[mean_index];
      }
    }

    if (means.toString() !== sums.toString() && this.changed < this.tolerance){
      this.changed++;
      console.log("re-adjust");
      this.moveMeans();
    }else{
      console.log("equilibrium");
      this.change = 0;
      this.clusters = this.getClusterArray();
    }

    this.means = sums;
  };

  Kmeans.prototype.getClusterArray = function(){
    var assignments = this.assignments;
    var data = this.data;
    var clusters = {};
    for (var i = data.length - 1; i >= 0; i--) {
      var cluster = clusters[assignments[i]];
      if(clusters[assignments[i]]){
        clusters[assignments[i]].push(data[i]);
      }else{
        clusters[assignments[i]] = [ data[i] ];
      }
    }
    console.log(clusters);
    return clusters;
  };
  return Kmeans;
}]);
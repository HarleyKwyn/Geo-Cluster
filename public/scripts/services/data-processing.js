angular.module('data-processing',['zipcode-service'])

.factory('dataFilter', [function(){
  function Filter(data){
    this.origonalData = data;
    this.filteredData = null;
  }
  Filter.prototype.by = function(comparator){
    var data = this.origonalData;
    var filteredData = [];
    for (var i = data.length - 1; i >= 0; i--) {
      if( comparator(data[i], i) ){
        filteredData.push(data[i]);
      }
    }
    this.filteredData = filteredData;
    return filteredData;
  };
  Filter.prototype.byModule = function(name){
    var moduleComparator = function(data){
      if(data.products.indexOf(name) > -1){
        return true;
      }
    };
    return this.by(moduleComparator);
  };
  Filter.prototype.byTimeRange = function(begin, end){
    var timeRangeComparator = function(data){
      var time = data.time_purchased;
      if( time > begin && time < end){
        return true;
      }
    };
    return this.by(timeRangeComparator);
  };
  Filter.prototype.invalidZip = function(){
    var invalidZipComparator = function(data){
      if(! data.coords ){
        return true;
      }
    };
    return this.by(invalidZipComparator);
  };
  return Filter;
}])

.factory('attachCoords', ['zipcoords', function(zipcoords){
  var zipToCoords = zipcoords;
  function attachCoords(data){
    for (var i = data.length - 1; i >= 0; i--) {
      data[i].coords = zipcoords[ data[i].zipcode ] ? zipcoords[ data[i].zipcode ] : null;
    }
    return data;
  }
  return attachCoords;
}])

.factory('findExtremes', [function(){
  function findExtremes(data, key){
    var extremes = {};
    for (var i = data.length - 1; i >= 0; i--) {
      var point = data[i][key];
      if ( ! extremes.min && ! extreme.max ){
        extremes.min = 100000000000000;
        extremes.max = -100000000000000;
      }
      if (point < extremes.min){
        extremes.min = point;
      }
      if (point > extremes.max){
        extremes.max = point;
      }
    }
    return extremes;
  }
  return findExtremes;
}])

;
angular.module('data-processing',['zipcode-service'])

.factory('dataFilter', [function(){
  function Filter(data){
    this.origonalData = data;
    this.filteredData = null;
  }
  Filter.prototype.by = function(comparitor){
    var data = this.origonalData;
    var filteredData = [];
    for (var i = data.length - 1; i >= 0; i--) {
      if( comparitor(data[i], i) ){
        filteredData.push(data[i]);
      }
    }
    this.filteredData = filteredData;
    return filteredData;
  };
  Filter.prototype.byModule = function(name){

  };
  Filter.prototype.byTimeRange = function(begin, end){

  };
  Filter.prototype.invalidZip = function(){

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

;
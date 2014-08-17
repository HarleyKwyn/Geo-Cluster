angular.module('data-processing',['zipcode-service'])

.factory('dataFilter', [function(){
  function Filter(data){
    this.rawData = data;
    this.filteredData = null;
  }
  Filter.prototype.contains = function(collection){
    var contains = {};
    return false;
  };
  Filter.prototype.byModule = function(name){
    for (var i = users.length - 1; i >= 0; i--) {
      this.trim(users[i].products);
    }
  };
  Filter.prototype.byTimeRange = function(begin, end){

  };
  Filter.prototype.invalidZip = function(){

  };
  return new Filter;
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
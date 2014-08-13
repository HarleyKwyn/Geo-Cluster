var geoData = require('./zipGeo.json');
var fs = require('fs');

var outputFilename = './zipGeoHash.json';
var zipGeoHash = {};

function generateHash(){
  var feature;
  for (var i = geoData.features.length - 1; i >= 0; i--) {
    feature = geoData.features[i]
    zipGeoHash[feature.id] = feature.geometry.coordinates;
  }
};

generateHash();

fs.writeFile(outputFilename, JSON.stringify(zipGeoHash, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 


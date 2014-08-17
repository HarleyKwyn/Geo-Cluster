var geoData = require('./zipGeo.json');
var fs = require('fs');

var outputFilename = './userData.json';
var numberOfPoints = 100;
var modules = ["IR", "Accelerometer", "Tessel", "Ambient", "Audio", "BLE", "Camera", "Climate","GPS","MicroSD", "NRF","Relay","RFID","Servo","GPRS/SIM"]
var averageItemsPurchased = 7;

function mockData(){
  var data = [];
  for (var i = numberOfPoints - 1; i >= 0; i--) {
    var newUser = {
      name : "User "+ i ,
      user_id : i,
      time_purchased : randomDate(new Date(2012, 0, 1), new Date()),
      zipcode : randomZipcode(),
      products : randomProducts()
    }
    data.push(newUser);
  }
  return data;
};

function randomDate(start, end) {
    return Date.parse( new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())) );
}

function randomZipcode(){
  var featureIndex = Math.floor(geoData.features.length * Math.random());
  return geoData.features[featureIndex].id 
}

function randomProducts(){
  var randomProducts = [];
  var quantity = Math.ceil(Math.random()*7*2) //ceil instead of floor cause we want at least on item
  for (var i = quantity - 1; i >= 0; i--) {
    var randomModule = modules[ Math.floor(Math.random() * modules.length) ];
    randomProducts.push(randomModule);
  }
  return randomProducts;
}

var randomData = mockData();
fs.writeFile(outputFilename, JSON.stringify(randomData, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
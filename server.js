var express = require('express');
var app = express();
var publicDir = process.env.NODE_ENV === 'dev' ? '/public/' : '/dist/';

app.use('/data/:fileName', function(req,res){
  var file = req.params.fileName
  res.json( require(__dirname +'/data/'+ file) ) ;
})
app.use('/', express.static(__dirname + publicDir));
app.listen(8000);
console.log("Server listening on port 8000");
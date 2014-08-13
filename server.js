var express = require('express');
var app = express();

app.use('/data/:fileName', function(req,res){
  var file = req.params.fileName
  res.json(express.static(_dirname + file));
})
app.use('/', express.static(__dirname));
app.listen(8000);
console.log("Server listening on port 8000");
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
global.path = require('path');
global.mongoose = require('mongoose');

var db_url = 'mongodb://localhost:27017/Playtest'; 
global.db = mongoose.connect(db_url);

var app = express();
app.set('port',process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var playDetails = require('./playDetails');

app.get('/playbook/all', playDetails.index);
app.post('/playbook', playDetails.create);
app.get('/playbook/:id', playDetails.index);
app.put('/playbook/:id', playDetails.update);
app.delete('/playbook/:id', playDetails.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

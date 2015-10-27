
var express = require('express');
var app = express();
var server = require('http').Server(app);
var router = express.Router();
var path = require('path');


var connection_string = '127.0.0.1:27017/';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

server.listen(server_port, server_ip_address, "0.0.0.0");
app.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname , 'public', 'hey.html'));
});

app.use('/', router);

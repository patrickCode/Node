var express = require('express');
var app = express();

var jsonData = { count: '12', message: 'hey' };

app.get('/', function(req, res) {
    // res.sendFine takes an absolute path to a file
    // sets the mime type based on the file extension
    // res.status sets the Status code of the response
    res.sendFile(__dirname + '/index.html', function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
});

app.get('/data', function(req, res) {
    res.json(jsonData);
});

var port = 9000;
app.listen(port);
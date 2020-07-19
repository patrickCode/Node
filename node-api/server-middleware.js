var express = require('express');
var bodyPartner = require('body-parser');
const { update } = require('lodash');
var app = express();

app.use(bodyPartner.urlencoded({ extended: true }));
app.use(bodyPartner.json());

var lions = [];
var id = 0;


var updateId = function(req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
}

app.param('id', function (req, res, next, id) {
    var lion = lions.find(l => l.id === id);
    if (lion) {
        req.lion = lion;
        next();
    } else {
        res.status(404).send("The given lion doesn't exist");
    }
})

app.all('/api/lions', function (req, res, next) {
    console.log("Request " + req);
    next();
});

app.get('/api/lions', function (req, res) {
    res.json(lions);
});

app.get('/api/lions/:id', function (req, res) {
    // Filled from middleware
    var lion = req.lion;
    res.json(lion);
});

app.post('/api/lions', updateId, function (req, res) {
    var lion = req.body; // Id of the lion has been added by the middleware updateId
    lions.push(lion);
    res.json(lion);
});

app.put('/api/lions/:id', function (req, res) {
    var lion = req.lion;
    var newLion = req.body;
    newLion.id = lion.id;

    var lionIndex = lions.findIndex(l => l.id === req.params.id);
    lions = lions.slice(0, lionIndex - 1).concat(lions.slice(lionIndex + 1));
    lions.push(newLion);
    res.json(newLion);
});

app.delete('/api/lions/:id', function (req, res) {
    var lion = req.lion;
    var lionIndex = lions.findIndex(l => l.id === lion.id);
    lions = lions.slice(0, lionIndex - 1).concat(lions.slice(lionIndex + 1));
    res.json(lion);
});

app.use(function (err, req, res, next) {
    console.log(err);
    next();
});

app.listen(9000);
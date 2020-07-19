var express = require('express');
var bodyPartner = require('body-parser');
var app = express();

app.use(bodyPartner.urlencoded({extended: true}));
app.use(bodyPartner.json());

var lions = [];
var id = 0;  

app.get('/api/lions', function(req, res) {
    res.json(lions);
});

app.get('/api/lions/:id', function(req, res) {
    var lion = lions.find(lion => lion.id === req.params.id);
    if (lion) {
        res.json(lion);
    } else {
        res.status(404).send("No lion found");
    }
});

app.post('/api/lions', function(req, res) {
    var lion = req.body;
    id++;
    lion.id = id + ''; // Converting to string
    lions.push(lion);
    res.json(lion);
});

app.put('/api/lions/:id', function(req, res) {
    var lionIndex = lions.findIndex(lion => lion.id === req.params.id);
    if (lions[lionIndex]) {
        var lion = lions[lionIndex];
        var newLion = req.body;
        newLion.id = lion.id;
        lions = lions.slice(0, lionIndex - 1).concat(lions.slice(lionIndex + 1));
        lions.push(newLion);
        res.json(newLion);
    } else {
        res.status(404).send("Invalid lion id");
    }
});

app.delete('/api/lions/:id', function(req, res) {
    var lionIndex = lions.findIndex(lion => lion.id === req.params.id);
    if (lions[lionIndex]) {
        var lion = lions[lionIndex];
        lions = lions.slice(0, lionIndex - 1).concat(lions.slice(lionIndex + 1));
        res.json(lion);
    } else {
        res.status(404).send("Invalid lion id");
    }
});

app.listen(9000);
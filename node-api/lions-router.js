var express = require('express');
var router = express.Router();

var lions = [];
var id = 0;

var updateId = function (req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
}

router.param('id', function (req, res, next, id) {
    var lion = lions.find(l => l.id === id);
    if (lion) {
        req.lion = lion;
        next();
    } else {
        res.status(404).send("The given lion doesn't exist");
    }
})

router.all('/', function (req, res, next) {
    console.log("Request coming from lion router " + req);
    next();
});

router.get('/', function (req, res) {
    res.json(lions);
});

router.route('/:id')
    .get(function (req, res) {
        // Filled from middleware
        var lion = req.lion;
        res.json(lion);
    })
    .put(function (req, res) {
        var lion = req.lion;
        var newLion = req.body;
        newLion.id = lion.id;
        var lionIndex = lions.findIndex(l => l.id === req.params.id);
        lions = lions.slice(0, lionIndex - 1).concat(lions.slice(lionIndex + 1));
        lions.push(newLion);
        res.json(newLion);
    })
    .delete(function (req, res) {
        var lion = req.lion;
        var lionIndex = lions.findIndex(l => l.id === lion.id);
        lions = lions.slice(0, lionIndex - 1).concat(lions.slice(lionIndex + 1));
        res.json(lion);
    });


router.post('/', updateId, function (req, res) {
    var lion = req.body; // Id of the lion has been added by the middleware updateId
    lions.push(lion);
    res.json(lion);
});

router.use(function (err, req, res, next) {
    console.log(err);
    next();
});

module.exports = router;
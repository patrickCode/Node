var express = require('express');
var bodyPartner = require('body-parser');
var lionRouter = require('./lions-router');
var app = express();

app.use(bodyPartner.urlencoded({ extended: true }));
app.use(bodyPartner.json());

app.use('/api/lions', lionRouter);

app.use(function (err, req, res, next) {
    console.log(err);
    next();
});

app.listen(9000);
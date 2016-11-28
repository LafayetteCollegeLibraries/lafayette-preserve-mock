var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    res.render('index', { title: 'MetaDB Mock Server' });
});

router.get('/catalog.json', function(req, res) {
    var contents = fs.readFileSync('public/data/catalog.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(contents);
});

router.get('/concern/generic_works/postcard.json', function(req, res) {
    var contents = fs.readFileSync('public/data/generic_work_postcard.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(contents);
});

router.get('/concern/generic_works/print.json', function(req, res) {
    var contents = fs.readFileSync('public/data/generic_work_print.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(contents);
});

router.get('/downloads/print', function(req, res) {
    var contents = fs.readFileSync('public/img/print.jpg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(contents);
});

router.get('/downloads/postcard', function(req, res) {
    var contents = fs.readFileSync('public/img/postcard.jpg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(contents);
});

router.get('/vocabularies.json', function (req, res) {
    var contents = fs.readFileSync('public/data/vocabularies.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(contents)
});

router.get('/vocabularies/eaic-subject-ocm.json', function (req, res) {
    var contents = fs.readFileSync('public/data/eaic-subject-ocm.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(contents)
});

module.exports = router;

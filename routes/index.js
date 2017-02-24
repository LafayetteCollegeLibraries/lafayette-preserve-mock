var fs = require('fs');
var express = require('express');
var router = express.Router();

// dummy index route for now
router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'name': 'lafayette-preserve-mock'}));
});

router.get('/catalog.json/?', catalog)
router.get('/concern/generic_works/:id.json', handleWork)

// send the same image for everything
router.get('/downloads/*', handleImages)

module.exports = router;

function sendJSONHeader (res) {
  res.setHeader('Content-Type', 'application/json')
}

function catalog (req, res) {
  setJSONHeader(res)
  fs.createReadStream('public/data/catalog.json').pipe(res)
}

function handleWork (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id
  var filepath = 'public/data/' + id + '.json'

  fs.access(filepath, function (err) {
    sendJSONHeader(res)

    if (err) {
      res.status(404)
      res.end(JSON.stringify({error: 'not found'}))
      return
    }

    fs.createReadStream(filepath).pipe(res)
  })
}

function handleImages (req, res) {
  res.setHeader('Content-Type', 'image/jpeg')
  fs.createReadStream('public/img/postcard.jpg').pipe(res)
}

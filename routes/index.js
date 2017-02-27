var fs = require('fs')
var path = require('path')
var express = require('express')
var router = express.Router()

// dummy index route for now
router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'name': 'lafayette-preserve-mock'}));
})

router.get('/catalog.json/?', catalog)
router.get('/concern/generic_works/:id.json', handleWork)

// send the same image for everything
router.get('/downloads/*', handleImages)

module.exports = router;

function sendJSONHeader (res) {
  res.setHeader('Content-Type', 'application/json')
}

function catalog (req, res) {
  sendJSONHeader(res)
  fs.createReadStream(file('data/catalog.json')).pipe(res)
}

function file (location) {
  return path.join(path.resolve(__dirname, '../public'), location)
}

function handleWork (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id
  var filepath = file('data/' + id + '.json')

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
  fs.createReadStream(file('img/postcard.jpg')).pipe(res)
}

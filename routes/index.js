var express = require('express');
var router = express.Router();
var fs = require('fs');
var debug = require('debug')('lafayette-preserve-mock:routes/')

function sendFile (path, mimeType) {
  return function (req, res) {
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }

    fs.createReadStream('public/' + path).pipe(res);
  }
}

function sendJSON (which) {
  return sendFile('data/' + which + '.json', 'application/json');
}

function sendImage (which) {
  return sendFile('img/' + which + '.jpg', 'image/jpeg');
}

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'name': 'lafayette-preserve-mock'}));
});

router.get('/catalog.json/?', sendJSON('catalog'));
router.get('/concern/generic_works/postcard.json', sendJSON('generic_work_postcard'));
router.get('/concern/generic_works/print.json', sendJSON('generic_work_print'));
router.get('/downloads/print', sendImage('print'));
router.get('/downloads/postcard', sendImage('postcard'));

module.exports = router;

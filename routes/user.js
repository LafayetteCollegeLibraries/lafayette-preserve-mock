var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({users: []}));
});

module.exports = router;

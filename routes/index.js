var express = require('express');
var router = express.Router();
var api = require('../data/api')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/first', function(req, res, next) {
  res.json({name:'aaa',pwd:'123'});
});
module.exports = router;

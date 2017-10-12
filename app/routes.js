var express = require('express')
var router = express.Router()
var data = require('./data.json')
var utils = require('./utils')

// Route index page
router.get('/', function(req, res) {
  res.render('examples/index')
})

// AGFS router and data loading.
router.get('/examples/agfs/*', function(req, res) {
  var path = req.path.substring(1);
  var lookup = path.replace('examples/', '')
  res.render(path, utils.loadData(lookup, data))
})


// add your routes here
module.exports = router

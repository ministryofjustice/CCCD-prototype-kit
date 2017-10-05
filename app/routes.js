var express = require('express')
var router = express.Router()
var data = require('./data.json')

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Route agfs page
router.get('/examples/agfs', function (req, res) {
  res.render('examples/agfs/index', data.routes['agfs/index'])
})

// Route agfs page
router.get('/examples/agfs/defendants', function (req, res) {
  console.log(req.session.data);
  res.render('examples/agfs/defendants', data.routes['agfs/defendants'])
})


// add your routes here
module.exports = router

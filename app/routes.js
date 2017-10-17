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
  data.formcache = res.locals.data;
  res.render(path, utils.loadData(lookup, data))
})

// Route index page
router.get('/examples/lgfs/', function(req, res) {
  data.formcache = res.locals.data;
  res.render('examples/lgfs/bill-type', utils.loadData('lgfs/bill-type', data))
})

// lgfs router and data loading.
router.get('/examples/lgfs/:folder(final|interim|transfer)/:page*?', function(req, res, next) {
  var page = req.params.page;
  var path = req.path.substring(1);
  var lookup = path.replace('examples/', '')
  data.formcache = res.locals.data;
  if (!page){
    res.redirect('case-details');
    next
  }
  res.render(path, utils.loadData(lookup, data))
})


// add your routes here
module.exports = router

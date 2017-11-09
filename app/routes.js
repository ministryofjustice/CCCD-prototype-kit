var express = require('express')
var router = express.Router()
var data = require('./data.json')
var utils = require('./utils')

// Route index page
router.get('/', function(req, res) {
  res.render('examples/index')
})


// Route index page
router.get('/examples/lgfs/bill-type', function(req, res) {
  data.formcache = res.locals.data;
  res.render('examples/lgfs/bill-type', utils.loadData('lgfs/bill-type', data))
})

router.get('/examples/:scheme(lgfs|agfs)/fee-chooser', function(req, res) {
  var feePath;
  data.formcache = res.locals.data;

  // the formcache lookup is very flaky. any changes to
  // macros/elements.html (select macro) might affect this
  // for the time being
  feePath = utils.feetypeLookup(data.formcache['general-select-case-type-1'], req.params.scheme);
  res.redirect(feePath);
})


// lgfs router and data loading.
router.get('/examples/:scheme(lgfs|agfs)/:folder(final|interim|transfer)/:page*?', function(req, res, next) {
  var page = req.params.page;
  var path = req.path.substring(1);
  var lookup = path.replace('examples/', '')
  data.formcache = res.locals.data;
  if (!page){
    res.redirect('case-details');
    next
  }

  console.log('>>>>>', path, lookup);

  res.render(path, utils.loadData(lookup, data))
})


// add your routes here
module.exports = router

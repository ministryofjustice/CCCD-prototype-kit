var express = require('express')
var router = express.Router()
var data = require('./data.json')
var utils = require('./utils')

// Route index page
router.get('/', function(req, res) {
  res.render('examples/index')
})


router.get('/examples/:scheme(lgfs|agfs)/final/cost-summary-static', function(req, res) {

  // data.formcache = {
  //   "general-radio-group-advocate-category-1": "Junior alone",
  //   "general-input-advocate-1": "sdfsdf",
  //   "general-input-reference-number-1": "",
  //   "general-select-case-type-1": "Retrial",
  //   "general-select-court-1": "Reading",
  //   "general-input-case-number-1": "CaseNumber goes here",
  //   "general-select-transfer-court-1": "",
  //   "general-input-transfer-case-number-1": "",
  //   "first-day-date-first-day-of-trial-1-day": "",
  //   "first-day-date-first-day-of-trial-1-month": "",
  //   "first-day-date-first-day-of-trial-1-year": "",
  //   "estimated-length-input-days-1": "",
  //   "last-day-date-trial-concluded-on-1-day": "",
  //   "last-day-date-trial-concluded-on-1-month": "",
  //   "last-day-date-trial-concluded-on-1-year": "",
  //   "number-of-days-input-days-1": ""
  // };
  res.render('examples/'+ req.params.scheme +'/final/cost-summary-static', utils.loadData(req.params.scheme + '/final/cost-summary-static', data))
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
  if (!page) {
    res.redirect('case-details');
    next
  }

  res.render(path, utils.loadData(lookup, data))
})


// add your routes here
module.exports = router

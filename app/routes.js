var express = require('express')
var router = express.Router()
var data = require('./data.json')
var preloads = require('./data-preloads.json')
var utils = require('./utils')
var _ = require('underscore')
var offences = require('./assets/javascripts/data/scheme-9-offences.json')


router.use('/', (req, res, next) => {

  req.feature = req.originalUrl.split('/')[1]
  req.version = req.originalUrl.split('/')[2]
  // res.locals.feature = req.feature
  // res.locals.version = req.version
  next()
})

// Route index page
router.get('/', function(req, res) {
  res.render('examples/index')
})

router.get('/examples/:scheme(lgfs|agfs)/start-a-claim', function(req, res) {
  req.session.destroy()

  var path = !!~req.header('Referer').indexOf('/lgfs/') ? '/examples/lgfs/bill-type' : '/examples/agfs/final/case-details'
  res.redirect(path)

})


router.get('/examples/:scheme(lgfs|agfs)/final/cost-summary-static', function(req, res) {
  data.formcache = _.extend({}, data.formcache, preloads[req.params.scheme][req.query.load])
  res.render('examples/' + req.params.scheme + '/final/cost-summary-static', utils.loadData(req.params.scheme + '/final/cost-summary-static', data))
})

// Delete defedant model
router.get('/examples/:scheme(lgfs|agfs)/final/delete-model/:model/:id', function(req, res) {
  var id = req.params.id;
  var model = req.params.model || 'defedant';

  utils.deleteModel[model](req, res);

})


// LGFS bill type start page
router.get('/examples/lgfs/bill-type', function(req, res) {
  data.formcache = res.locals.data;
  res.render('examples/lgfs/bill-type', utils.loadData('lgfs/bill-type', data))
})

// Fee chooser that directs fixed vs graduated fees
router.get('/examples/:scheme(lgfs|agfs)/fee-chooser', function(req, res) {
  var feePath;
  data.formcache = res.locals.data;

  // the formcache lookup is very flaky. any changes to
  // macros/elements.html (select macro) might affect this
  // for the time being
  feePath = utils.feetypeLookup(data.formcache['general-select-case-type-1'], req.params.scheme);
  res.redirect(feePath);
})

// Playground > Accordion
router.use(/\/playground\/accordion\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/accordion/version-${req.params[0]}/routes`)(req, res, next);
})

// Playground > Autocomplete
router.use(/\/playground\/autocomplete\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/autocomplete/version-${req.params[0]}/routes`)(req, res, next);
})

// Playground > Collections
router.use(/\/playground\/collections\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/collections/version-${req.params[0]}/routes`)(req, res, next);
})

// Playground > Dependent drop-downs
router.use(/\/playground\/dependent-dropdowns\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/dependent-dropdowns/version-${req.params[0]}/routes`)(req, res, next);
})

// Playground > Search/filter
router.use(/\/playground\/search-filter\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/search-filter/version-${req.params[0]}/routes`)(req, res, next);
})


router.get('/public/javascripts/data/scheme-9-offences/:call*?', function(req, res, next){
  if (req.params.call) {
    var data = {
      output: utils.getOffenceClass(req.session.data.offence_class[0]).categories,
      selected: req.session.data.offence_category
    }

    res.send(data)
    return;
  }
  res.send(offences)
  return;
})

// Gerenal router for AGFS/LGFS pages
router.get('/examples/:scheme(lgfs|agfs)/:folder(final|interim|transfer)/:page*?', function(req, res, next) {
  var page = req.params.page;
  var path = req.path.substring(1);
  var lookup = path.replace('examples/', '')

  data.formcache = res.locals.data;
  data.formcache.offences = offences;
  data.formcache.seedNum = req.query.seedNum || 1;

  if (!page) {
    res.redirect('case-details');
    next
  }
  res.render(path, utils.loadData(lookup, data))
})


// add your routes here
module.exports = router

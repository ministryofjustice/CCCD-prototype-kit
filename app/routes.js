var express = require('express')
var router = express.Router()
var data = require('./data.json')
var _ = require('underscore')


// Route index page
router.get('/', function (req, res) {
  res.render('examples/index')
})

router.get('/examples/agfs/case-details', function (req, res) {
  res.render('examples/agfs/case-details', data.routes['agfs/case-details'])
})

router.get('/examples/agfs/defendants', function (req, res) {
  res.render('examples/agfs/defendants', data.routes['agfs/defendants'])
})

router.get('/examples/agfs/offence', function (req, res) {

  // read a map of ids to data store names
  var dataMap = data.routes['agfs/offence'].formData.objRefs;

  // loop over the map and attach the data lists to the options key
  _.each(dataMap, function(obj, idx, list){
    data.routes['agfs/offence'].formData[idx].options = data.lists[list[idx]];
  });

  res.render('examples/agfs/offence', data.routes['agfs/offence'])
})

router.get('/examples/agfs/fixed-fees', function (req, res) {

  // read a map of ids to data store names
  var dataMap = data.routes['agfs/fixed-fees'].formData.objRefs;

  // loop over the map and attach the data lists to the options key
  _.each(dataMap, function(obj, idx, list){
    data.routes['agfs/fixed-fees'].formData[idx].options = data.lists[list[idx]];
  });

  res.render('examples/agfs/fixed-fees', data.routes['agfs/fixed-fees'])
})

router.get('/examples/agfs/misc-fees', function (req, res) {

  // read a map of ids to data store names
  var dataMap = data.routes['agfs/misc-fees'].formData.objRefs;

  // loop over the map and attach the data lists to the options key
  _.each(dataMap, function(obj, idx, list){
    data.routes['agfs/misc-fees'].formData[idx].options = data.lists[list[idx]];
  });

  res.render('examples/agfs/misc-fees', data.routes['agfs/misc-fees'])
})

router.get('/examples/agfs/expenses', function (req, res) {

  // read a map of ids to data store names
  var dataMap = data.routes['agfs/expenses'].formData.objRefs;

  // loop over the map and attach the data lists to the options key
  _.each(dataMap, function(obj, idx, list){
    data.routes['agfs/expenses'].formData[idx].options = data.lists[list[idx]];
  });

  res.render('examples/agfs/expenses', data.routes['agfs/expenses'])
})

router.get('/examples/agfs/supporting-evidence', function (req, res) {
  // read a map of ids to data store names
  var dataMap = data.routes['agfs/supporting-evidence'].formData.objRefs;

  // loop over the map and attach the data lists to the options key
  _.each(dataMap, function(obj, idx, list){
    data.routes['agfs/supporting-evidence'].formData[idx].options = data.lists[list[idx]];
  });

  res.render('examples/agfs/supporting-evidence', data.routes['agfs/supporting-evidence'])
})

// add your routes here
module.exports = router

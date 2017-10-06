var express = require('express')
var router = express.Router()
var data = require('./data.json')
var _ = require('underscore')


// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Route agfs page
router.get('/examples/agfs/case-details', function (req, res) {
  res.render('examples/agfs/case-details', data.routes['agfs/case-details'])
})

// Route agfs page
router.get('/examples/agfs/defendants', function (req, res) {
  res.render('examples/agfs/defendants', data.routes['agfs/defendants'])
})


// Route agfs page
router.get('/examples/agfs/offence', function (req, res) {

  // read a map of ids to data store names
  var dataMap = data.routes['agfs/offence'].formData.objRefs;

  // loop over the map and attach the data lists to the options key
  _.each(dataMap, function(obj, idx, list){
    data.routes['agfs/offence'].formData[idx].options = data.lists[list[idx]];
  });

  res.render('examples/agfs/offence', data.routes['agfs/offence'])
})


// add your routes here
module.exports = router

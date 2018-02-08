var _ = require('underscore')
var offences = require('./assets/javascripts/data/scheme-9-offences.json')

module.exports = {
  getOffences: function() {
    return offences
  },

  getOffenceClass: function(class_id) {

    var classObj = this.getOffences().classes.filter(function(el) {
      return (el.id == class_id)
    })

    return classObj[0]
  },

  getOffenceCategory: function(class_id, category_id) {

    var classObj = this.getOffenceClass(class_id).categories.filter(function(el) {
      return (el.id == category_id)
    })

    return classObj[0]
  },
  feetypeLookup: function(string, scheme) {
    var data = {
      // AGFS case types
      "basic-fees": [
        "Cracked before retrial",
        "Cracked Trial",
        "Discontinuance",
        "Guilty plea",
        "Retrial",
        "Trial"
      ],
      "fixed-fees": [
        "Appeal against conviction",
        "Appeal against sentence",
        "Breach of Crown Court order",
        "Committal for Sentence",
        "Contempt",
        "Elected cases not proceeded",
        "Hearing subsequent to sentence"
      ]
    };

    if (!!~data['basic-fees'].indexOf(string)) {
      return '/examples/' + scheme + '/final/graduated-fees';
    }
    return '/examples/' + scheme + '/final/fixed-fees';
  },
  loadData: function(pointer, data) {

    // read a map of ids to data store names
    var dataMap = data.routes[pointer];

    if (dataMap) {

      if (dataMap.loaded) {
        // pass the form values into the view
        data.routes[pointer].formcache = data.formcache;
        return data.routes[pointer];
      }

      // loop over the map and attach the data lists to the options key
      _.each(dataMap.formData.objRefs, function(obj, idx, list) {
        data.routes[pointer].formData[idx].options = data.lists[list[idx]];
      });
      dataMap.loaded = true;
      data.routes[pointer].formcache = data.formcache;
      return data.routes[pointer];
    }
    return _.extend({}, data.routes[pointer], {
      formcache: data.formcache
    });
  },
  deleteModel: {
    defendant: function(req, res) {
      var id = req.params.id;
      req.session.data["general-input-first-name-" + id] = '';
      req.session.data["general-input-last-name-" + id] = '';
      req.session.data["general-date-of-birth-" + id + "-day"] = '';
      req.session.data["general-date-of-birth-" + id + "-month"] = '';
      req.session.data["general-date-of-birth-" + id + "-year"] = '';
      req.session.data["general-checkbox-group-no-header-attr-" + id + "-1"] = '';
      req.session.data["general-representation-order-date-" + id + "-day"] = '';
      req.session.data["general-representation-order-date-" + id + "-month"] = '';
      req.session.data["general-representation-order-date-" + id + "-year"] = '';
      req.session.data["general-input-maat-reference-" + id] = '';
      res.redirect('../../defendants-lookup')
    },
    disbursement: function(req, res) {
      var id = req.params.id;
      req.session.data["general-select-disbursement-type-" + id] = '';
      req.session.data["disbursements-input-net-amount-" + id] = '';
      req.session.data["disbursements-input-vat-amount-" + id] = '';
      res.redirect('../../disbursements')
    },
    miscfee: function(req, res) {
      var id = req.params.id;

      req.session.data["misc-fee-select-fee-type-" + id] = '';
      req.session.data["misc-fee-input-net-amount-" + id] = '';
      req.session.data["misc-fee-input-additional-case-number-" + id] = '';

      res.redirect('../../misc-fees')
    }
  }
}

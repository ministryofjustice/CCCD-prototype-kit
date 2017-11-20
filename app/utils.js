var _ = require('underscore')
module.exports = {
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
      return {
        path: '/examples/' + scheme + '/final/graduated-fees',
        type: 'basic-fees'
      };
    }
    return {
      path: '/examples/' + scheme + '/final/fixed-fees',
      type: 'fixed-fees'
    };
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
  }
}

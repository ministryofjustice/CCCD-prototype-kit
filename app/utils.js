var _ = require('underscore')
module.exports = {
  loadData: function(pointer, data) {
    console.log('>>>', pointer);
    // read a map of ids to data store names
    var dataMap = data.routes[pointer];

    if (dataMap) {

      if (dataMap.loaded) {
        return data.routes[pointer];
      }

      // loop over the map and attach the data lists to the options key
      _.each(dataMap.formData.objRefs, function(obj, idx, list) {
        data.routes[pointer].formData[idx].options = data.lists[list[idx]];
      });
      dataMap.loaded = true;
      return data.routes[pointer];
    }
    return data.routes[pointer] || {};
  }
}

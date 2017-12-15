// Cost Summary Ctrl
moj.Modules.CostSummary = {
  /**
   * el jquery selector at category wrapper level
   */
  el: '.fx-category-block',

  // a cache of all the block instances
  blocks: [],
  header: null,
  init: function() {
    this.$el = $(this.el);
    this.initHeader()
    this.format()
  },
  bindEvents: function() {

  },
  initHeader: function(){
    this.header = new moj.Modules.CostSummaryHeader('.mod-cost-summary');
  },
  format: function(){
    var self = this;

    // iterate the category blocks
    // init them and cache them in this.blocks
    this.$el.each(function(idx, catBlock){
      self.blocks.push(new moj.Modules.CostSummaryBlock(catBlock))
    });
  }
}

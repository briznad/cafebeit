(function(app, $) {
  'use strict';

  var _init, _processTemplates;

  _init = function(callback) {
    return _processTemplates(callback);
  };

  _processTemplates = function(callback) {
    var $templates = app.cache.$body.find('script.template[type="text/html"]');

    $templates.each(function() {
      var $this = $(this);

      app.template[$this.attr('id')] = _.template($this.html());

      return $this.remove();
    });

    return callback();
  };

  app.template = {
    init: _init
  };
})(window.app = window.app || {}, jQuery);
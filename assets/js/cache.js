app.cache = (function(app, $) {
	'use strict';

	var _init = function() {
		app.cache = {
			$window: $(window),
			$document: $(document),
			$html: $(document.documentElement),
			$body: $(document.body),
			$title: $('title'),
			$h1: $('h1')
		};
	}

	return {
		init: _init
	};
})(window.app = window.app || {}, jQuery);
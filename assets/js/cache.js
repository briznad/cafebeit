(function(app, $) {
	'use strict';

	var _init = function() {
		app.cache = {
			$window           : $(window),
			$document         : $(document),
			$html             : $(document.documentElement),
			$body             : $(document.body),
			$title            : $('title'),
			$dynamicContainer : $('#dynamicContainer')
		};
	};

	app.cache = {
		init: _init
	};
})(window.app = window.app || {}, jQuery);
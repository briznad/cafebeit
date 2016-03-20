(function(app, $) {
	'use strict';

	// init cache
	app.cache.init();

	return app.modelBuildr.init(function(status) {
		console.debug(status ? 'app is ready to rock!' : 'uh-oh! something went wrong. things may not work out so well :(');
	});
})(window.app = window.app || {}, jQuery);
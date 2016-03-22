(function(app, $) {
	'use strict';

	var _init, _removeLoading;

	_init = function() {
		// init cache
		app.cache.init();

		app.template.init(function() {
			app.modelBuildr.init(function(status) {
				if (status) {
					app.cache.$dynamicContainer.html(app.template.homepageModule({
						data: app.model
					}));

					_removeLoading();
				} else {
					// if we encounter a problem loading data, redirect to the Yelp page
					// window.location = 'http://www.yelp.com/biz/cafe-beit-williamsburg';
				}
			});
		});
	};

	_removeLoading = function() {
		var desiredDelay, elapsedTime, remainingDelay, t;

		desiredDelay = 750;

		elapsedTime = Math.floor(new Date()) - app.loadTime;

		remainingDelay = elapsedTime < desiredDelay ? desiredDelay - elapsedTime : 0;

		return t = setTimeout(function() {
			return app.cache.$html.removeClass('loading');
		}, remainingDelay);
	};

	_init();
})(window.app = window.app || {}, jQuery);
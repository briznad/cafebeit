(function(app, $) {
	'use strict';

	var _init = function(callback) {
		return {
			"name" : "Cafe Beit",
			"photo" : {
				"file" : "cortado-pour.png",
				"attribution" : {
					"name" : "Brad Mallow",
					"url" : "http://bradmallow.com",
		            "email" : "brad.mallow@gmail.com"
				}
			},
			"address" : {
				"streetAddress" : "158 Bedford Ave",
				"addressLocality" : "Brooklyn",
				"addressRegion" : "NY",
				"postalCode" : "11211"
			},
			"hours" : ["Mo,Tu,We,Th,Fr 07:00-19:00", "Sa,Su 08:00-20:00"],
			"email" : "cafebeit@gmail.com"
		};
	};

	app.defaultData = {
		init: _init
	};
})(window.app = window.app || {}, jQuery);
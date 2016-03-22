(function(app, $) {
	'use strict';

	var _init = function(callback) {
		return {
			"name" : "Cafe Beit",
			"photo" : {
				"file" : "cortado-pour-scaled.png",
				"attribution" : {
					"name" : "Jane Doe",
					"url" : "http://bradmallow.com",
		            "email" : "jane.doe@example.com"
				}
			},
			"address" : {
				"streetAddress" : "158 Bedford Ave",
				"addressLocality" : "Brooklyn",
				"addressRegion" : "NY",
				"postalCode" : "11211"
			},
			"hours" : [
				{
					"days" : "Mo,Tu,We,Th,Fr",
					"hours" : {
						"open" : "07:00",
						"close" : "19:00"
					}
				},
				{
					"days" : "Sa,Su",
					"hours" : {
						"open" : "08:00",
						"close" : "20:00"
					}
				}
			],
			"email" : "cafebeit@gmail.com",
			"description" : []
		};
	};

	app.defaultData = {
		init: _init
	};
})(window.app = window.app || {}, jQuery);
(function(app, $) {
	'use strict';

	var _init, _createModel, _getData, _internalExternalImg, _lineBreakify, _postProcessing, _slugify, _uppercasify;

	_init = function(callback) {
		return _getData(callback);
	};

	_getData = function(callback) {
		var request = $.ajax({
			dataType : 'json',
			url      : 'data/data.json'
		});

		request.done(function(data) {
			_createModel(data);

			return callback(true);
		});

		return request.fail(function(data) {
			_createModel(app.defaultData.init());

			return callback(true);
		});
	};

	_createModel = function(data) {
		app.model = data || {};

		_postProcessing();
	};

	_postProcessing = function() {
		// process photo
		app.model.photo.file = _internalExternalImg(app.model.photo.file);

		// process photo attribution
		if (app.model.photo && app.model.photo.attribution) {
			var attr = app.model.photo.attribution;

			if (attr.link || attr.email) {
				attr.type = attr.url ? 'url' : 'email';

				attr.link = attr.url ? attr.url : 'mailto:' + attr.email;
			}
		}

		// generate Google Maps link
		if (app.model.address && app.model.address.streetAddress) {
			var mapLink,
				addr = app.model.address;

			mapLink = 'https://www.google.com/maps/search/';
			mapLink += app.model.name + ' %7C ';
			mapLink += addr.streetAddress + ', ';
			mapLink += addr.addressLocality + ', ';
			mapLink += addr.addressRegion + ' ';
			mapLink += addr.postalCode;

	        app.model.address.googleMapsLink = mapLink.replace(' ', '+');
		}

		// generate human hours from robot hours
		if (app.model.hours && app.model.hours.length) {
			var tempHours = [];

			_.each(app.model.hours, function(value, key) {
				tempHours.push({
					robot : value,
					human : null // TODO use robot value to create human time
				});
			});

			app.model.hours = tempHours;
		}
	};

	_slugify = function(rawInput) {
		return rawInput.replace(/^\s|\s$/, '').replace(/\s/g, '-');
	};

	_uppercasify = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	_lineBreakify = function(rawInput) {
		return rawInput.replace(/\n/g, '<br/>');
	};

	_internalExternalImg = function(img) {
		if (img === '') {
			return false;
		} else if (/^http/.test(img)) {
			return img;
		} else {
			return 'assets/images/' + img;
		}
	};

	app.modelBuildr = {
		init: _init
	};
})(window.app = window.app || {}, jQuery);

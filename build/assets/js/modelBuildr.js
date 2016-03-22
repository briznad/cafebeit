(function(app, $) {
	'use strict';

	var __ = {};

	__.init = function(callback) {
		return __.getData(callback);
	};

	__.getData = function(callback) {
		var request = $.ajax({
			dataType : 'json',
			url      : 'data/data.json'
		});

		request.done(function(data) {
			__.createModel(data);

			return callback(true);
		});

		return request.fail(function(data) {
			__.createModel(app.defaultData.init());

			return callback(true);
		});
	};

	__.createModel = function(data) {
		app.model = data || {};

		__.postProcessing();
	};

	__.postProcessing = function() {
		// process photo
		if (app.model.photo && app.model.photo.file) {
			app.model.photo.file = __.internalExternalImg(app.model.photo.file);
		}

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

			_.each(app.model.hours, function(value) {
				var humanDays,
					humanHours,
					tempArr = value.split(' '),
					tempDaysArr = tempArr[0].split(','),
					tempHoursArr = tempArr[1].split('-');

				humanDays = __.dayCodeToAbbr(tempDaysArr[0]) + '-' + __.dayCodeToAbbr(tempDaysArr.pop());

				humanHours = __.twentyFourHourTo12Hour(tempHoursArr[0]) + ' - ' + __.twentyFourHourTo12Hour(tempHoursArr[1]);

				tempHours.push({
					robot : value,
					human : {
						days  : humanDays,
						hours : humanHours
					}
				});
			});

			app.model.hours = tempHours;
		}
	};

	__.dayCodeToAbbr = function(code) {
		var dayCodeLibrary = {
			Mo : 'Mon',
			Tu : 'Tues',
			We : 'Wed',
			Th : 'Thurs',
			Fr : 'Fri',
			Sa : 'Sat',
			Su : 'Sun'
		};

		return dayCodeLibrary[code];
	};

	__.twentyFourHourTo12Hour = function(time) {
		time = time.split(':');

		var antePostMeridiem,
			hour = parseInt(time[0], 10);

		if (hour <= 12) {
			antePostMeridiem = 'am';
		} else {
			hour = hour - 12;
			antePostMeridiem = 'pm';
		}

		return hour + (time[1] && parseInt(time[1], 10) !== 0 ? ':' + time[1] : '') + antePostMeridiem;
	};

	__.internalExternalImg = function(img) {
		if (img === '') {
			return false;
		} else if (/^http/.test(img)) {
			return img;
		} else {
			return 'assets/images/' + img;
		}
	};

	app.modelBuildr = {
		init: __.init
	};
})(window.app = window.app || {}, jQuery);

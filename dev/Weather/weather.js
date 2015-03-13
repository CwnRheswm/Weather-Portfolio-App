define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	var Weather = Backbone.Model.extend({
		defaults: {
			city: '',
			state: '',
			latitude: 0,
			longitude: 0,
			skyIcon: '',
			temperature: 0,
			maxTemp: 0,
			minTemp: 0,
			windIcon: '',
			windSpeed: 0,
			windUnits: '',
			windDirection: 0,
			dateFormatted: '',
			ready: false
		},
		urlRoot: 'https://api.forecast.io/forecast/',
		buildDate: function(){
			var date,
				year,
				month,
				day,
				hours,
				minutes,
				seconds,
				passValue;
			date = new Date();
			year = date.getFullYear();
			month = date.getMonth();
			day = date.getDay();
			hours = date.getHours();
			minutes = date.getMinutes();
			seconds = date.getSeconds();
			if( month < 10 ) { month = "0" + month };
			if( day < 10 ) { day = "0" + day };
			if( hours < 10 ) { hours = "0" + hours };
			if( minutes < 10 ) { minutes = "0" + minutes };
			if( seconds < 10 ) { seconds = "0" + seconds };
			return year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds;
		},
		url: function() {
			var passValue = this.buildDate();
			var date = new Date();
			return this.urlRoot + '2cfdbe1e25142f76c4233746c835ac77' + '/' + this.get('latitude') + ',' + this.get('longitude') + ',' + parseInt((date.getTime()) / 1000) + '?exclude=monthly,hourly,alerts,flags';
		},
		sync: function(method, model, options) {
			var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'jsonp',
				url: that.url(),
				processDate: false,
			}, options);
			console.log(that.url());
			return $.ajax(params);
		},
		parse: function(response) {
			if (!response) {
				return;
			}
			console.log(response);
			this.set('skyIcon', response.currently.icon);
			this.set('temperature', response.currently.temperature);
			this.set('maxTemp', response.daily.data[0].temperatureMax);
			this.set('minTemp', response.daily.data[0].temperatureMin);
			this.set('windSpeed', response.currently.windSpeed);
			this.set('windDirection', response.currently.windBearing);
			this.set('ready', true);
			return response;
		}
	});
	return Weather;
})
define([
	'jquery',
	'underscore',
	'backbone',
	'./WeatherApp/weather-app-view'
], function($,_,Backbone,WeatherAppView){
	var Geocode = Backbone.Model.extend({
		defaults: {
			city: '',
			state: '',
			latitude: 0,
			longitude: 0
		},
		urlRoot: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
		url: function() {
			return this.urlRoot + this.get('city') + ',+' + this.get('state') + '&key=AIzaSyABqQ1hH2mpwyBRQG91i2t6vpNz3L3OMQE';
		},
		sync: function(method, model, options) {
			var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'json',
				url: that.url(),
				processData: false,
			}, options);
			return $.ajax(params);
		},
		parse: function(response){
			if(respsonse.status === 'OK') {
				return;
			}
			this.set('latitude', response.results[0].geometry.location.lat);
			this.set('longitude', response.results[0].geometry.location.lng);
			return response;
		}
	});
	return Geocode;
})
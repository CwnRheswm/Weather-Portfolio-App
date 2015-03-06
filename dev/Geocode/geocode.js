define([
	'jquery',
	'underscore',
	'backbone',
	'../WeatherApp/weather-app-view.min'
], function($,_,Backbone,WeatherAppView){
	var Geocode = Backbone.Model.extend({
		defaults: {
			city: '',
			state: '',
			latitude: 0,
			longitude: 0,
			ready: false
		},
		urlRoot: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
		url: function() {
			return this.urlRoot + this.get('city') + ',+' + this.get('state') + '&key=AIzaSyABqQlhH2mpwyBRQG91i2t6vpNz3L3OMQE';
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
			if(response.status !== 'OK') {
				return;
			}
			this.set('latitude', response.results[0].geometry.location.lat);
			this.set('longitude', response.results[0].geometry.location.lng);
			this.set('ready', true);
			return response;
		}
	});
	return Geocode;
})
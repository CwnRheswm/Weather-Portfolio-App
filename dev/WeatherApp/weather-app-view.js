define([
	'jquery',
	'underscore',
	'backbone',

], function($,_,Backbone){
	'use strict';

	var WeatherAppView = Backbone.View.extend({
		el: '#weather-app',
		events: {
			'keypress #city-search' : 'checkForEnter',
			'click #current-btn' : 'retrieveWeather'
		},
		initialize: function() {
			this.$input = this.$('#city-search');
			this.$current = $('weather-current');
		},
		render: function() {

		},
		retrieveWeather: function() {
			var searchInput = this.$input.val().trim();
			if(searchInput) {
				//translate city to lat/long, get weather
				console.log('Input is '+searchInput);
			}
		},
		checkForEnter: function(e) {
			if (e.which === ENTER_KEY) {
				this.retrieveWeather();
			}
		}
	});

	return WeatherAppView;
});
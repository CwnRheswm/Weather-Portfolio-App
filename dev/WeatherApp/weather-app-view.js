define([
	'jquery',
	'underscore',
	'backbone',
	'../Geocode/geocodes.min',
	'../Geocode/geocodeView.min'
], function($,_,Backbone,Geocodes,GeocodeView){
	'use strict';

	var WeatherAppView = Backbone.View.extend({
		el: '#weather-app',
		events: {
			'keypress #city-search' : 'checkForEnter',
			'click #current-btn' : 'validateInput'
		},
		initialize: function() {
			this.$input = this.$('#city-search');
			this.$current = $('weather-current');
			
			this.geocodes = new Geocodes();
			this.listenTo(this.geocodes, 'change:ready', this.addGeocode)
		},
		render: function() {

		},
		addGeocode: function(geocode) {
			var view = new GeocodeView({ model: geocode });
		},
		retrieveCoordinates: function(location) {
			this.geocodes.create({
				city: location[0].trim(),
				state: location[1].trim()
			});
		},
		validateInput: function() {
			var searchInput = this.$input.val().trim();
			if(!searchInput) {
				alert('You Need To Enter a City and State first');
				return
			}
			var location = searchInput.split(',');
			if(location.length !== 2) {
				alert('Enter The City and State in the form "City, State"');
				return;
			}
			this.retrieveCoordinates(location);
		},
		checkForEnter: function(e) {
			if (e.which === ENTER_KEY) {
				this.validateInput();
			}
		}
	});

	return WeatherAppView;
});
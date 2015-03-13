define([
	'jquery',
	'underscore',
	'backbone',
	'../Geocode/geocodes.min',
	'../Geocode/geocodeView.min',
	'../Weather/weathers.min',
	'../Weather/weatherView.min'
], function($,_,Backbone,Geocodes,GeocodeView,Weathers,WeatherView){
	'use strict';

	var WeatherAppView = Backbone.View.extend({
		el: '#weather-app',
		events: {
			'keypress #city-search' : 'checkForEnter',
			'click #current-btn' : 'validateInput'
		},
		initialize: function() {
			this.$input = this.$('#city-search');
			this.$current = $('#weather-current');
			
			this.geocodes = new Geocodes();
			this.listenTo(this.geocodes, 'change:ready', this.addGeocode);

			this.weathers = new Weathers();
			this.listenTo(this.weathers, 'change:ready', this.addWeather);
		},
		render: function() {
			if (this.weathers.length) {
				this.$current.show();
			} else {
				this.$current.hide();
			}

		},
		addWeather: function(weather) {
			var view = new WeatherView({ model: weather });
			this.$current.append(view.render().el);
		},
		addGeocode: function(geocode) {
			var view = new GeocodeView({ model: geocode });
			var input = this.geocodes.models[0];
			this.weathers.create({
				city: input.get('city'),
				state: input.get('state'),
				latitude: input.get('latitude'),
				longitude: input.get('longitude'),
			});
			console.log(input);
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
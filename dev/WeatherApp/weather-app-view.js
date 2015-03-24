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
	var isDebug = window.location.hostname === 'localhost';
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
			//this.listenTo(this.geocodes, 'sync', this.addGeocode);
			this.listenTo(this.geocodes, 'change:ready', this.addGeocode);

			this.weathers = new Weathers();
			//this.listenTo(this.weathers, 'sync', this.addWeather);
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
			var view,
				input = this.geocodes.models[0];
			if(this.weathers.length == 1){
				console.log("City: "+this.weathers.models[0].get('city'));
				this.weathers.models[0].set('city', input.get('city'));
				this.weathers.models[0].set('state', input.get('state'));
				this.weathers.models[0].set('latitude', input.get('latitude'));
				this.weathers.models[0].set('longitude', input.get('longitude'));
				this.weathers.models[0].sync();
				console.log("City 2: "+this.weathers.models[0].get('city'));
				return;
			}
			view = new GeocodeView({ model: geocode });
			this.weathers.create({
				city: input.get('city'),
				state: input.get('state'),
				latitude: input.get('latitude'),
				longitude: input.get('longitude'),
			});
		},
		retrieveCoordinates: function(location) {
			console.log(this.geocodes.models.length);
			if(this.geocodes.length === 1){
				this.geocodes.models[0].set('city', location[0].trim());
				this.geocodes.models[0].set('state', location[1].trim());
				console.log(this.geocodes.models[0]);
				this.geocodes.models[0].sync();
				return;
			};
			this.geocodes.create({
				city: location[0].trim(),
				state: location[1].trim()
			});
		},
		validateInput: function() {
			if (!isDebug) {
				this.$input[0].value = 'San Fransokyo, CA';
				this.retrieveCoordinates(['San Fransokyo','CA']);
				return;
			}
			var searchInput = this.$input.val().trim();
			if(!searchInput) {
				alert('You Need To Enter a City and State first');
				return;
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
				console.log('reading input');
				this.validateInput();
			}
		},
		report: function(e) {
			console.log("Reporting: ")
			console.log(e);
		}
	});

	return WeatherAppView;
});
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
	var weatherCurrent,
		isDebug = window.location.hostname === 'localhost';
	var WeatherAppView = Backbone.View.extend({
		el: '#weather-app',
		events: {
			'keypress #city-search' : 'checkForEnter',
			'click #current-btn' : 'validateInput',
			'click #forecast-btn' : 'validateInput',
			'click #history-btn' : 'validateInput'
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
			//this.$current[0].classList.toggle("closed");
			this.$current[0].classList.toggle("opened");
		},
		addGeocode: function(geocode) {
			var view,
				input = this.geocodes.models[0];
			if(this.weathers.length == 1){
				this.weathers.models[0].set('city', input.get('city'));
				this.weathers.models[0].set('state', input.get('state'));
				this.weathers.models[0].set('latitude', Math.round(input.get('latitude')));
				this.weathers.models[0].set('longitude', Math.round(input.get('longitude')));
				this.weathers.models[0].sync();
				return;
			}
			view = new GeocodeView({ model: geocode });
			this.weathers.create({
				city: input.get('city'),
				state: input.get('state'),
				latitude: Math.round(input.get('latitude')),
				longitude: Math.round(input.get('longitude')),
			});
		},
		retrieveCoordinates: function(location) {
			
			if(this.geocodes.length === 1){
				this.geocodes.models[0].set('city', location[0].trim());
				this.geocodes.models[0].set('state', location[1].trim());
				this.geocodes.models[0].sync();
				return;
			};
			this.geocodes.create({
				city: location[0].trim(),
				state: location[1].trim()
			});
		},
		validateInput: function(e) {
			$("#weather-current")[0].classList.add('opened');
			
			if (isDebug) {
				this.$input[0].value = 'San Fransokyo, CA';
				this.retrieveCoordinates(['San Fransokyo','CA']);
				e.target.classList.toggle('activated');
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
			$('#current-btn')[0].classList.toggle('activated');
				
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
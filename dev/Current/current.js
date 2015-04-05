define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	'use strict';
	var isDebug = window.location.hostname === 'localhost';
	var Current = Backbone.Model.extend({
		defaults: {
			current: [],
			city: '',
			state: '',
			lat: 0,
			lng: 0,
			tempMin: 0,
			tempMax: 0,
			windSpeed: 0,
			windSpeedIcon: '',
			windBearing: 0,
			windDirection: '',
			ready:false
		}
	});
	return Current;
})
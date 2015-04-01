define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	var isDebug = window.location.hostname === 'localhost';

	var Forecast = Backbone.Model.extend({
		defaults: {[
			skyIcon: '',
			maxTemp: 0,
			minTemp: 0,
			windIcon: '',
			windKnots: 0,
			windSpeed: 0,
			windBearing: 0,
			windDirection: 0
		]},
		
	})
})
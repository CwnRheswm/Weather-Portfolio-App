define([
	'jquery',
	'underscore',
	'backbone',
	'./forecast.min'
], function($,_,Backbone,Forecast){
	'use strict';
	var Forecasts = Backbone.Collection.extend({
		model: Forecast,
		comparator: 'order'
	});
	return Forecasts;
})
define([
	'jquery',
	'underscore',
	'backbone',
	'./weather.min'
], function($,_,Backbone,Weather){
	'use strict';
	var Weathers = Backbone.Collection.extend({
		model: Weather,
		comparator: 'order'
	});
	return Weathers;
})
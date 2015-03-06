define([
	'underscore',
	'backbone',
	'./geocode.min'
], function(_,Backbone,Geocode){
	'use strict';
	var Geocodes = Backbone.Collection.extend({
		model: Geocode,
	});
	return Geocodes;
});
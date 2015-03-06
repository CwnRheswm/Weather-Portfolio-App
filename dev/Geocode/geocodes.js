define([
	'underscore',
	'backbone',
	'geocode'
], function(_,Backbone,Geocode){
	'use strict';
	var Geocodes = Backbone.Collection.extend({
		model: Geocode,
	});
	return Geocode;
});
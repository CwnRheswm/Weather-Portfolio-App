define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	'use strict';
	var ForecastPerDayView = Backbone.View.extend({
		template: _.template($('#tmpl-forecast-day').html()),
		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
		},
		render: function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	})
})
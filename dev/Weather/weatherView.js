define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	var WeatherView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#tmpl-current').html()),
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	return WeatherView;
});
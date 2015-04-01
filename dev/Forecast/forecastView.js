define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	var isDebug = window.location.hostname === 'localhost';

	var ForecastView = Backbone.View.extend({
		template: _.template($('#tmpl-forecast').html()),
		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
		},
		render: function(){
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	return ForecastView;
})
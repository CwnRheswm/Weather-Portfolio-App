define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	var isDebug = window.location.hostname === 'localhost';
	var CurrentView = Backbone.View.extend({
		el: '#weather-current',
		template: _.template($('#tmpl-current').html()),
		initialize: function() {
			//this.render();
			//this.listenTo(this.model, 'change:ready', this.render);
			this.$('weather-current').append(this.render().el);
		},
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	return CurrentView;
})
var ENTER_KEY = 13;
var ESC_KEY = 27;

require.config({
	paths: {
		jquery: '../node_modules/jquery/dist/jquery',
		underscore: '../node_modules/underscore/underscore',
		backbone: '../node_modules/backbone/backbone'
	}
});

require([
	'WeatherApp/weather-app-view.min'
], function(WeatherAppView){
	'use strict';
	new WeatherAppView();
});
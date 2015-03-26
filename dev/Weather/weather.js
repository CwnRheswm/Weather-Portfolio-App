define([
	'jquery',
	'underscore',
	'backbone'
], function($,_,Backbone){
	var isDebug = window.location.hostname === 'localhost';
	var Weather = Backbone.Model.extend({
		defaults: {
			city: '',
			state: '',
			latitude: 0,
			longitude: 0,
			skyIcon: '',
			temperature: 0,
			maxTemp: 0,
			minTemp: 0,
			windIcon: '',
			windSpeed: 0,
			windUnits: '',
			windDirection: 0,
			dateFormatted: '',
			ready: false
		},
		urlRoot: 'https://api.forecast.io/forecast/',
		url: function() {
			var date = new Date();
			return this.urlRoot + '2cfdbe1e25142f76c4233746c835ac77' + '/' + this.get('latitude') + ',' + this.get('longitude') + ',' + parseInt((date.getTime()) / 1000);
		},
		sync: function(method, model, options) {
			if(isDebug){
				var sampleWeather =  
				{"latitude":34.4480495,"longitude":-119.242889,"timezone":"America/Los_Angeles","offset":-7,
				"currently":{"time":1427145438,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":69.13,"apparentTemperature":69.13,"dewPoint":51.59,"humidity":0.54,"windSpeed":6.05,"windBearing":257,"visibility":9.99,"cloudCover":0.06,"pressure":1019.88,"ozone":331.51},
				"minutely":{"data":[{"time":1427145420,"precipIntensity":0,"precipProbability":0},{"time":1427145480,"precipIntensity":0,"precipProbability":0}]},
				"hourly":{"summary":"Partly cloudy starting in the evening.","icon":"partly-cloudy-night","data":[{"time":1427094000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":52.32,"apparentTemperature":52.32,"dewPoint":45.98,"humidity":0.79,"windSpeed":3.25,"windBearing":319,"visibility":9.04,"cloudCover":0.18,"pressure":1021.12,"ozone":328.7},{"time":1427097600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":51.68,"apparentTemperature":51.68,"dewPoint":45.29,"humidity":0.79,"windSpeed":4.19,"windBearing":344,"visibility":9.41,"cloudCover":0.12,"pressure":1021.04,"ozone":327.58},{"time":1427101200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":50.46,"apparentTemperature":50.46,"dewPoint":44.51,"humidity":0.8,"windSpeed":4.03,"windBearing":7,"visibility":8.5,"cloudCover":0.07,"pressure":1020.95,"ozone":326.46},{"time":1427104800,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":48.41,"apparentTemperature":46.51,"dewPoint":42.5,"humidity":0.8,"windSpeed":4.75,"windBearing":18,"visibility":9.3,"cloudCover":0.07,"pressure":1020.83,"ozone":325.8},{"time":1427108400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":47.81,"apparentTemperature":46.87,"dewPoint":41.84,"humidity":0.8,"windSpeed":3.35,"windBearing":21,"visibility":9.42,"cloudCover":0.18,"pressure":1020.71,"ozone":325.4},{"time":1427112000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":47.77,"apparentTemperature":46.21,"dewPoint":42.13,"humidity":0.81,"windSpeed":4.11,"windBearing":19,"visibility":9.6,"cloudCover":0.08,"pressure":1020.71,"ozone":325.49},{"time":1427115600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":48.25,"apparentTemperature":47.05,"dewPoint":42.2,"humidity":0.79,"windSpeed":3.75,"windBearing":14,"visibility":9.3,"cloudCover":0.1,"pressure":1020.61,"ozone":326.36},{"time":1427119200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":48.01,"apparentTemperature":46.05,"dewPoint":41.69,"humidity":0.79,"windSpeed":4.75,"windBearing":14,"visibility":9.35,"cloudCover":0.06,"pressure":1020.92,"ozone":327.71},{"time":1427122800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":51.19,"apparentTemperature":51.19,"dewPoint":44.17,"humidity":0.77,"windSpeed":3.3,"windBearing":2,"visibility":9.79,"cloudCover":0.05,"pressure":1021.22,"ozone":328.91},{"time":1427126400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":57.32,"apparentTemperature":57.32,"dewPoint":47.27,"humidity":0.69,"windSpeed":3.22,"windBearing":335,"visibility":9.95,"cloudCover":0.05,"pressure":1021.33,"ozone":329.73},{"time":1427130000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":61.84,"apparentTemperature":61.84,"dewPoint":49.91,"humidity":0.65,"windSpeed":2.22,"windBearing":237,"visibility":9.97,"cloudCover":0.04,"pressure":1021.31,"ozone":330.39},{"time":1427133600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":65.2,"apparentTemperature":65.2,"dewPoint":48.76,"humidity":0.55,"windSpeed":4.06,"windBearing":242,"visibility":10,"cloudCover":0.04,"pressure":1021.15,"ozone":330.9},{"time":1427137200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":67.78,"apparentTemperature":67.78,"dewPoint":51.88,"humidity":0.57,"windSpeed":4.3,"windBearing":259,"visibility":10,"cloudCover":0.02,"pressure":1020.9,"ozone":331.23},{"time":1427140800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":69.5,"apparentTemperature":69.5,"dewPoint":53.41,"humidity":0.57,"windSpeed":4.7,"windBearing":258,"visibility":10,"cloudCover":0.01,"pressure":1020.48,"ozone":331.41},{"time":1427144400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":69.76,"apparentTemperature":69.76,"dewPoint":52.54,"humidity":0.54,"windSpeed":5.39,"windBearing":255,"visibility":9.99,"cloudCover":0.06,"pressure":1020.02,"ozone":331.52},{"time":1427148000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":67.57,"apparentTemperature":67.57,"dewPoint":49.24,"humidity":0.52,"windSpeed":7.7,"windBearing":259,"visibility":9.99,"cloudCover":0.05,"pressure":1019.51,"ozone":331.48},{"time":1427151600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":66.93,"apparentTemperature":66.93,"dewPoint":48.34,"humidity":0.51,"windSpeed":6.81,"windBearing":274,"visibility":9.99,"cloudCover":0.05,"pressure":1019.01,"ozone":331.36},{"time":1427155200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":65.95,"apparentTemperature":65.95,"dewPoint":47.7,"humidity":0.52,"windSpeed":6.61,"windBearing":294,"visibility":10,"cloudCover":0.06,"pressure":1018.69,"ozone":331.5},{"time":1427158800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":64.82,"apparentTemperature":64.82,"dewPoint":47.71,"humidity":0.54,"windSpeed":7.13,"windBearing":314,"visibility":10,"cloudCover":0.12,"pressure":1018.65,"ozone":332.14},{"time":1427162400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":62.72,"apparentTemperature":62.72,"dewPoint":48.03,"humidity":0.59,"windSpeed":7.69,"windBearing":327,"visibility":10,"cloudCover":0.18,"pressure":1018.8,"ozone":333.05},{"time":1427166000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":59.94,"apparentTemperature":59.94,"dewPoint":47.11,"humidity":0.63,"windSpeed":8.11,"windBearing":339,"visibility":10,"cloudCover":0.22,"pressure":1019.06,"ozone":333.86},{"time":1427169600,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":58.5,"apparentTemperature":58.5,"dewPoint":46.65,"humidity":0.65,"windSpeed":8.74,"windBearing":345,"visibility":10,"cloudCover":0.31,"pressure":1019.46,"ozone":334.29},{"time":1427173200,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":57.63,"apparentTemperature":57.63,"dewPoint":46.44,"humidity":0.66,"windSpeed":9.98,"windBearing":350,"visibility":10,"cloudCover":0.41,"pressure":1019.93,"ozone":334.62},{"time":1427176800,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":56.83,"apparentTemperature":56.83,"dewPoint":45.86,"humidity":0.67,"windSpeed":11.75,"windBearing":356,"visibility":10,"cloudCover":0.44,"pressure":1020.27,"ozone":335.29}]},
				"daily":{"data":[{"time":1427094000,"summary":"Partly cloudy starting in the evening.","icon":"partly-cloudy-night","sunriseTime":1427119076,"sunsetTime":1427163101,"moonPhase":0.13,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":47.77,"temperatureMinTime":1427112000,"temperatureMax":69.76,"temperatureMaxTime":1427144400,"apparentTemperatureMin":46.05,"apparentTemperatureMinTime":1427119200,"apparentTemperatureMax":69.76,"apparentTemperatureMaxTime":1427144400,"dewPoint":46.71,"humidity":0.67,"windSpeed":4.08,"windBearing":326,"visibility":9.73,"cloudCover":0.12,"pressure":1020.28,"ozone":330.22}]},
				"flags":{"sources":["isd","fnmoc","sref","rtma","rap","nam","cmc","gfs","madis","lamp","darksky"],"isd-stations":["723924-99999","723926-99999","723927-93110","723929-99999","999999-23136"],"madis-stations":["AR137","AT184","AT185","AT490","C1484","C7664","C9814","D7412","D9923","E3136","E4795","LGRC1","RSVC1","SMNC1","SYCC1","VTUC1"],"lamp-stations":["KCMA","KNTD","KOXR","KSBA","KSDB"],"darksky-stations":["KVTX"],"units":"us"}};
				this.parse(sampleWeather);
				return;
			}
			var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'jsonp',
				url: that.url(),
				processDate: false,
			}, options);
			console.log(that.url());
			return $.ajax(params);
		},
		parse: function(response) {
			if (!response) {
				return;
			}
			console.log(response);
			this.set('skyIcon', response.currently.icon);
			this.set('temperature', Math.round( response.currently.temperature) );
			this.set('maxTemp', Math.round( response.daily.data[0].temperatureMax) );
			this.set('minTemp', Math.round( response.daily.data[0].temperatureMin) );
			this.set('windSpeed', Math.round( response.currently.windSpeed) );
			this.set('windDirection', response.currently.windBearing);
			this.set('ready', true);
			return response;
		}
	});
	return Weather;
})
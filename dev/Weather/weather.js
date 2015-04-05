define([
	'jquery',
	'underscore',
	'backbone',
	'../Current/current.min',
	'../Current/currentView.min'
], function($,_,Backbone,Current,CurrentView){
	'use strict';
	var isDebug = window.location.hostname === 'localhost';
	var Weather = Backbone.Model.extend({
		defaults: {
			currently: [],
			hourly: [],
			forecast: [],
			city: '',
			state: '',
			latitude: 0,
			longitude: 0,
			skyIcon: '',
			temperature: 0,
			maxTemp: 0,
			minTemp: 0,
			windIcon: '',
			windKnots: 0,
			windSpeed: 0,
			windUnits: '',
			windBearing: 0,
			windDirection: 0,
			dateFormatted: '',
			ready: false
		},
		urlRoot: 'https://api.forecast.io/forecast/',
		url: function() {
			var date = new Date();
			return this.urlRoot + '2cfdbe1e25142f76c4233746c835ac77' + '/' + this.get('latitude') + ',' + this.get('longitude');// + ',' + parseInt((date.getTime()) / 1000);
		},
		sync: function(method, model, options) {
			if(isDebug){
				var sampleWeather =  
				{"latitude":34.4480495,"longitude":-119.242889,"timezone":"America/Los_Angeles","offset":-7,
				"currently":{"time":1427145438,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":69.13,"apparentTemperature":69.13,"dewPoint":51.59,"humidity":0.54,"windSpeed":26.05,"windBearing":120,"visibility":9.99,"cloudCover":0.06,"pressure":1019.88,"ozone":331.51},
				"minutely":{"data":[
					{"time":1427145420,"precipIntensity":0,"precipProbability":0},
					{"time":1427145480,"precipIntensity":0,"precipProbability":0}]},
				"hourly":{"summary":"Partly cloudy starting in the evening.","icon":"partly-cloudy-night","data":[
					{"time":1427094000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":52.32,"apparentTemperature":52.32,"dewPoint":45.98,"humidity":0.79,"windSpeed":3.25,"windBearing":319,"visibility":9.04,"cloudCover":0.18,"pressure":1021.12,"ozone":328.7},
					{"time":1427097600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":51.68,"apparentTemperature":51.68,"dewPoint":45.29,"humidity":0.79,"windSpeed":4.19,"windBearing":344,"visibility":9.41,"cloudCover":0.12,"pressure":1021.04,"ozone":327.58},
					{"time":1427101200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":50.46,"apparentTemperature":50.46,"dewPoint":44.51,"humidity":0.8,"windSpeed":4.03,"windBearing":7,"visibility":8.5,"cloudCover":0.07,"pressure":1020.95,"ozone":326.46},
					{"time":1427104800,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":48.41,"apparentTemperature":46.51,"dewPoint":42.5,"humidity":0.8,"windSpeed":4.75,"windBearing":18,"visibility":9.3,"cloudCover":0.07,"pressure":1020.83,"ozone":325.8},
					{"time":1427108400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":47.81,"apparentTemperature":46.87,"dewPoint":41.84,"humidity":0.8,"windSpeed":3.35,"windBearing":21,"visibility":9.42,"cloudCover":0.18,"pressure":1020.71,"ozone":325.4},
					{"time":1427112000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":47.77,"apparentTemperature":46.21,"dewPoint":42.13,"humidity":0.81,"windSpeed":4.11,"windBearing":19,"visibility":9.6,"cloudCover":0.08,"pressure":1020.71,"ozone":325.49},
					{"time":1427115600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":48.25,"apparentTemperature":47.05,"dewPoint":42.2,"humidity":0.79,"windSpeed":3.75,"windBearing":14,"visibility":9.3,"cloudCover":0.1,"pressure":1020.61,"ozone":326.36},
					{"time":1427119200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":48.01,"apparentTemperature":46.05,"dewPoint":41.69,"humidity":0.79,"windSpeed":4.75,"windBearing":14,"visibility":9.35,"cloudCover":0.06,"pressure":1020.92,"ozone":327.71},
					{"time":1427122800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":51.19,"apparentTemperature":51.19,"dewPoint":44.17,"humidity":0.77,"windSpeed":3.3,"windBearing":2,"visibility":9.79,"cloudCover":0.05,"pressure":1021.22,"ozone":328.91},
					{"time":1427126400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":57.32,"apparentTemperature":57.32,"dewPoint":47.27,"humidity":0.69,"windSpeed":3.22,"windBearing":335,"visibility":9.95,"cloudCover":0.05,"pressure":1021.33,"ozone":329.73},
					{"time":1427130000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":61.84,"apparentTemperature":61.84,"dewPoint":49.91,"humidity":0.65,"windSpeed":2.22,"windBearing":237,"visibility":9.97,"cloudCover":0.04,"pressure":1021.31,"ozone":330.39},
					{"time":1427133600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":65.2,"apparentTemperature":65.2,"dewPoint":48.76,"humidity":0.55,"windSpeed":4.06,"windBearing":242,"visibility":10,"cloudCover":0.04,"pressure":1021.15,"ozone":330.9},
					{"time":1427137200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":67.78,"apparentTemperature":67.78,"dewPoint":51.88,"humidity":0.57,"windSpeed":4.3,"windBearing":259,"visibility":10,"cloudCover":0.02,"pressure":1020.9,"ozone":331.23},
					{"time":1427140800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":69.5,"apparentTemperature":69.5,"dewPoint":53.41,"humidity":0.57,"windSpeed":4.7,"windBearing":258,"visibility":10,"cloudCover":0.01,"pressure":1020.48,"ozone":331.41},
					{"time":1427144400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":69.76,"apparentTemperature":69.76,"dewPoint":52.54,"humidity":0.54,"windSpeed":5.39,"windBearing":255,"visibility":9.99,"cloudCover":0.06,"pressure":1020.02,"ozone":331.52},
					{"time":1427148000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":67.57,"apparentTemperature":67.57,"dewPoint":49.24,"humidity":0.52,"windSpeed":7.7,"windBearing":259,"visibility":9.99,"cloudCover":0.05,"pressure":1019.51,"ozone":331.48},
					{"time":1427151600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":66.93,"apparentTemperature":66.93,"dewPoint":48.34,"humidity":0.51,"windSpeed":6.81,"windBearing":274,"visibility":9.99,"cloudCover":0.05,"pressure":1019.01,"ozone":331.36},
					{"time":1427155200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":65.95,"apparentTemperature":65.95,"dewPoint":47.7,"humidity":0.52,"windSpeed":6.61,"windBearing":294,"visibility":10,"cloudCover":0.06,"pressure":1018.69,"ozone":331.5},
					{"time":1427158800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":64.82,"apparentTemperature":64.82,"dewPoint":47.71,"humidity":0.54,"windSpeed":7.13,"windBearing":314,"visibility":10,"cloudCover":0.12,"pressure":1018.65,"ozone":332.14},
					{"time":1427162400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":62.72,"apparentTemperature":62.72,"dewPoint":48.03,"humidity":0.59,"windSpeed":7.69,"windBearing":327,"visibility":10,"cloudCover":0.18,"pressure":1018.8,"ozone":333.05},
					{"time":1427166000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":59.94,"apparentTemperature":59.94,"dewPoint":47.11,"humidity":0.63,"windSpeed":8.11,"windBearing":339,"visibility":10,"cloudCover":0.22,"pressure":1019.06,"ozone":333.86},
					{"time":1427169600,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":58.5,"apparentTemperature":58.5,"dewPoint":46.65,"humidity":0.65,"windSpeed":8.74,"windBearing":345,"visibility":10,"cloudCover":0.31,"pressure":1019.46,"ozone":334.29},
					{"time":1427173200,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":57.63,"apparentTemperature":57.63,"dewPoint":46.44,"humidity":0.66,"windSpeed":9.98,"windBearing":350,"visibility":10,"cloudCover":0.41,"pressure":1019.93,"ozone":334.62},
					{"time":1427176800,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":56.83,"apparentTemperature":56.83,"dewPoint":45.86,"humidity":0.67,"windSpeed":11.75,"windBearing":356,"visibility":10,"cloudCover":0.44,"pressure":1020.27,"ozone":335.29}]},
				"daily":{"summary":"Light rain on Sunday and Tuesday, with temperatures bottoming out at 60°F on Sunday.","icon":"rain","data":[{
						"time":1427871600,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1427896504,"sunsetTime":1427941858,"moonPhase":0.42,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":46.17,"temperatureMinTime":1427893200,"temperatureMax":62.62,"temperatureMaxTime":1427922000,"apparentTemperatureMin":42.35,"apparentTemperatureMinTime":1427893200,"apparentTemperatureMax":62.62,"apparentTemperatureMaxTime":1427922000,"dewPoint":41.95,"humidity":0.65,"windSpeed":10.74,"windBearing":327,"visibility":9.54,"cloudCover":0.05,"pressure":1020.76,"ozone":345.22},
						{"time":1427958000,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1427982815,"sunsetTime":1428028310,"moonPhase":0.45,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":45.08,"temperatureMinTime":1427979600,"temperatureMax":65.13,"temperatureMaxTime":1428015600,"apparentTemperatureMin":39.43,"apparentTemperatureMinTime":1427979600,"apparentTemperatureMax":65.13,"apparentTemperatureMaxTime":1428015600,"dewPoint":40.02,"humidity":0.6,"windSpeed":12.05,"windBearing":347,"visibility":9.99,"cloudCover":0.01,"pressure":1021.53,"ozone":339.85},
						{"time":1428044400,"summary":"Partly cloudy overnight.","icon":"partly-cloudy-night","sunriseTime":1428069126,"sunsetTime":1428114763,"moonPhase":0.48,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":45.56,"temperatureMinTime":1428062400,"temperatureMax":65.22,"temperatureMaxTime":1428102000,"apparentTemperatureMin":43.07,"apparentTemperatureMinTime":1428062400,"apparentTemperatureMax":65.22,"apparentTemperatureMaxTime":1428102000,"dewPoint":44.39,"humidity":0.7,"windSpeed":6.66,"windBearing":329,"visibility":10,"cloudCover":0.07,"pressure":1021.35,"ozone":339.26},
						{"time":1428130800,"summary":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1428155438,"sunsetTime":1428201215,"moonPhase":0.51,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":44.26,"temperatureMinTime":1428148800,"temperatureMax":61.06,"temperatureMaxTime":1428181200,"apparentTemperatureMin":40.17,"apparentTemperatureMinTime":1428148800,"apparentTemperatureMax":61.06,"apparentTemperatureMaxTime":1428181200,"dewPoint":44.12,"humidity":0.75,"windSpeed":10.63,"windBearing":319,"visibility":9.9,"cloudCover":0.58,"pressure":1016.3,"ozone":342.95},
						{"time":1428217200,"summary":"Light rain until afternoon.","icon":"rain","sunriseTime":1428241750,"sunsetTime":1428287667,"moonPhase":0.54,"precipIntensity":0.0031,"precipIntensityMax":0.0096,"precipIntensityMaxTime":1428249600,"precipProbability":0.83,"precipType":"rain","temperatureMin":42.45,"temperatureMinTime":1428242400,"temperatureMax":60.2,"temperatureMaxTime":1428274800,"apparentTemperatureMin":40.23,"apparentTemperatureMinTime":1428242400,"apparentTemperatureMax":60.2,"apparentTemperatureMaxTime":1428274800,"dewPoint":40.44,"humidity":0.7,"windSpeed":8.28,"windBearing":293,"cloudCover":0.28,"pressure":1015.64,"ozone":376.94},
						{"time":1428303600,"summary":"Mostly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1428328063,"sunsetTime":1428374119,"moonPhase":0.57,"precipIntensity":0.0014,"precipIntensityMax":0.0044,"precipIntensityMaxTime":1428386400,"precipProbability":0.13,"precipType":"rain","temperatureMin":33.93,"temperatureMinTime":1428321600,"temperatureMax":60.94,"temperatureMaxTime":1428361200,"apparentTemperatureMin":33.93,"apparentTemperatureMinTime":1428321600,"apparentTemperatureMax":60.94,"apparentTemperatureMaxTime":1428361200,"dewPoint":39.67,"humidity":0.72,"windSpeed":3.41,"windBearing":226,"cloudCover":0.38,"pressure":1017.12,"ozone":373.48},
						{"time":1428390000,"summary":"Light rain until evening.","icon":"rain","sunriseTime":1428414376,"sunsetTime":1428460572,"moonPhase":0.6,"precipIntensity":0.0148,"precipIntensityMax":0.0426,"precipIntensityMaxTime":1428422400,"precipProbability":1,"precipType":"rain","temperatureMin":43.04,"temperatureMinTime":1428411600,"temperatureMax":62.71,"temperatureMaxTime":1428447600,"apparentTemperatureMin":39.2,"apparentTemperatureMinTime":1428411600,"apparentTemperatureMax":62.71,"apparentTemperatureMaxTime":1428447600,"dewPoint":45.39,"humidity":0.79,"windSpeed":4.37,"windBearing":242,"cloudCover":0.43,"pressure":1016.12,"ozone":371.72},
						{"time":1428476400,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1428500689,"sunsetTime":1428547024,"moonPhase":0.64,"precipIntensity":0.0013,"precipIntensityMax":0.0026,"precipIntensityMaxTime":1428494400,"precipProbability":0.07,"precipType":"rain","temperatureMin":39.13,"temperatureMinTime":1428494400,"temperatureMax":66.01,"temperatureMaxTime":1428534000,"apparentTemperatureMin":35.23,"apparentTemperatureMinTime":1428494400,"apparentTemperatureMax":66.01,"apparentTemperatureMaxTime":1428534000,"dewPoint":42.62,"humidity":0.72,"windSpeed":7.07,"windBearing":319,"cloudCover":0,"pressure":1017.25,"ozone":346.02}]},
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
			return $.ajax(params);
		},
		parse: function(response) {
			var windBearing,
				windSpeed;
			if (!response) {
				return;
			}
			var current = new Current();
			current.set('city', this.get('city'));
			current.set('state', this.get('state'));
			current.set('lat', this.get('latitude'));
			current.set('lng', this.get('longitude'));
			current.set('current', response.currently);
			current.set('tempMin', Math.round(response.daily.data[0].temperatureMin));
			current.set('tempMax', Math.round(response.daily.data[0].temperatureMax));
			this.set('forecast', response.daily);

			/*
			this.set('skyIcon', response.currently.icon);
			this.set('temperature', Math.round( response.currently.temperature) );
			this.set('maxTemp', Math.round( response.daily.data[0].temperatureMax) );
			this.set('minTemp', Math.round( response.daily.data[0].temperatureMin) );
			*/
			windSpeed = Math.round(response.currently.windSpeed);
			current.set('windSpeed',windSpeed);

			if (windSpeed === 0){
				current.set('windSpeedIcon', 'sp0');
			} else if(windSpeed < 5){
				current.set('windSpeedIcon', 'sp5');
			} else if (windSpeed >= 5 && windSpeed < 10) {
				current.set('windSpeedIcon', 'sp10');
			} else if (windSpeed >= 10 && windSpeed < 15 ) {
				current.set('windSpeedIcon', 'sp15');
			} else if (windSpeed >= 15 && windSpeed < 20 ) {
				current.set('windSpeedIcon', 'sp20');
			} else if (windSpeed >= 20 && windSpeed < 50 ) {
				current.set('windSpeedIcon', 'sp50');
			} else if (windSpeed >= 50){
				current.set('windSpeedIcon', 'sp65');
			};

			windBearing = response.currently.windBearing;
			current.set('windBearing',windBearing);

			if (windBearing <= 22.5 || windBearing > 337.5 ) {
				current.set('windDirection',"north");	
			} else if (windBearing > 22.5 && windBearing <= 67.5) {
				current.set("windDirection","northeast");
			} else if (windBearing > 67.5 && windBearing <= 112.5) {
				current.set('windDirection','east');
			} else if (windBearing > 112.5 && windBearing <= 157.5) {
				current.set("windDirection",'southeast');
			} else if (windBearing > 157.5 && windBearing <= 202.5) {
				current.set('windDirection','south');
			} else if (windBearing > 202.5 && windBearing <= 247.5) {
				current.set('windDirection','southwest');
			} else if (windBearing > 247.5 && windBearing <= 292.5) {
				current.set('windDirection','west');
			} else if (windBearing > 292.5 && windBearing <= 337.5) {
				current.set('windDirection','northwest');
			}
			new CurrentView ({ model: current });
			current.set('ready',!current.get('ready'));
			console.log(current);
			this.set('ready', true);

			return response;
		}
	});
	return Weather;
})
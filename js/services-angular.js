'use strict'; //WHAT IS THIS???!?

/* Services */

angular.module('magicviewerServices', ['ngResource'])
	.factory('Cards', function($resource) {
		return $resource('magicsets/:set.json', {}, {
			query: {method: 'GET', params:{set: 'M14'}, isArray:true}
		});
	})
	.factory('Pack', function($http, $resource) {
		$resource('magicsets/:set.json', {}, {}).get("magicsets/M14.json", function(data) {
			console.log(data);	
		});
	})
	.filter('textmain', function() {
		return function(input) {
			var str = "";
			for(var i=0; i!=input.length; ++i)
				if(input[i].db_main > 0)
					str += input[i].db_main + "x " + input[i].name + "\n";

			return str;
		};
	})
	.filter('textside', function() {
		return function(input) {
			var str = "";
			for(var i=0; i!=input.length; ++i)
				if(input[i].db_side > 0)
					str += input[i].db_side + "x " + input[i].name + "\n";

			return str;
		};
	});


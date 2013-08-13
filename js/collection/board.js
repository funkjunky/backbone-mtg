define(['backbone'], function(Backbone) {
	return Backbone.Collection.extend({
		model: window.Card,
		selector: "",
	});
});

define(['backbone', 'model/card'], function(Backbone, Card) {
	return Backbone.Collection.extend({
		model: Card,
		url: "/magicsets/M14.json",
		selector: "",
	});
});

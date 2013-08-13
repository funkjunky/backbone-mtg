define(['backbone', 'handlebars'], function(Backbone, Handlebars) {
	return Backbone.View.extend({
		_template: "",
		context: {},
		render: function() {
			var template = Handlebars.compile(this._template);
			return template(this.context);
		},
		setContext: function(new_context) {
			this.context = new_context;
			return this;
		},
	});
});

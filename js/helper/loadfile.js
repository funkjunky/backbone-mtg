define(['jquery', 'handlebars'], function($, Handlebars) {

	var cache = {};
	Handlebars.registerHelper('loadfile', function(file) {
		var html;
		var $this = this;
		if(cache[file])
			html = cache[file]($this);
		else
			$.ajax(file, {
				async: false,
				success: function(data, textStatus, jqXHR) {
					var template = Handlebars.compile(data);
					cache[file] = template;
					html = template($this);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("HandleBars loadfile error:");
					console.log(textStatus);
					console.log(errorThrown);
				}
			});

		return new Handlebars.SafeString(html);
	});

	return true;
});

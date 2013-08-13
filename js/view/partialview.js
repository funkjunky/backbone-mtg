define(['jquery', 'view/genericview'], function($, GenericView) {
	return GenericView.extend({
		partial: "",
		initialize: function() {
			//this is ineffecient... need caching.
			this.context = this.options.context || this.context;
			this.partial = this.options.partial;
			var $this = this;
			$.get("partials/"+this.partial+".html", function(html) {
				$this._template = html;
			});
		},
	});
});

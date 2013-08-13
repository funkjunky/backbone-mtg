$(function($) {
	Friend = Backbone.Model.extend({
		name: null,
	});
	Friends = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.bind("add", options.view.addFriendLi);
		},
	});

	window.AppView = Backbone.View.extend({
		el: 'body',
		initialize: function() {
			this.friends = new Friends( null, {view: this});
		},
		events: {
			"click #add-friend": "showPrompt",
		},
		showPrompt: function() {
			var friend_name = prompt("Who is your friend?");
			var friend_model = new Friend({ name: friend_name });
			this.friends.add(friend_model);
		},
		addFriendLi: function(model) {
			$("#friends-list").append("<li>"+model.get('name')+"</li>");
		}
	});
	var appview = new AppView;
	console.log(appview);
})(jQuery);

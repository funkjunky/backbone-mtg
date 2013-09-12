define(['jquery'], function($) {
	return function(card, boardSelector) {
		//show the first card and hide the rest.
		var instances = $(boardSelector).find("."+card.get('id'));
		instances.each(function(i, el) {
			if(i > 0)
				return $(this).hide();

			$(this).show()
				//show the total # of cards at the top.
				.find(".instanceCount").text(instances.length + " Total");
		});
	};
});

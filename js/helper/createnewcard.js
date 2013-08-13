define([], function() {
	return function(card) {
		var newcard = card.clone();
		newcard.id += "_" + Date.now();
		return newcard;
	};
});

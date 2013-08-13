define([], function() {
	return function(collection, $this) {
		var cardid = $this.parent().data('id');
		var card = collection.get(cardid);
		collection.remove(card); //-1 side
		return card;
	};
});

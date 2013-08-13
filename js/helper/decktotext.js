define(['handlebars'], function(Handlebars) {
	Handlebars.registerHelper('deckToText', function(board) {
		var cardtally = {};
		for(var i=0; i!=board.length; ++i)
		{
			if(cardtally[board[i].get("name")])
				++cardtally[board[i].get("name")];
			else
				cardtally[board[i].get("name")] = 1;
		}

		var str = "";
		for(var key in cardtally)
			str += cardtally[key] + "x " + key + "\n";
		return str;
	});
	return true;
});

define(['jquery', 'helper/createnewcard', 'helper/removecardfromselection', 'helper/stackcard'], function($, createNewCard, removeCardFromSelection, stackcard) {
	//sets up the events for the page.
	return function(currentDeck) {
		$("#the_whole_page").on("change", ".cardvisualtoggle", function() {
			if($(this).prop('checked'))
			{
				$(this).parent().parent().find(".cardtext").hide();
				$(this).parent().parent().find(".cardimage").show();
			} else {
				$(this).parent().parent().find(".cardimage").hide();
				$(this).parent().parent().find(".cardtext").show();
			}
		});

		$("#the_whole_page").on("change", "#stacked", function() {
			if($(this).prop('checked'))
				for(var key in currentDeck)
					for(var i = 0; i != currentDeck[key].models.length; ++i)
						stackcard(currentDeck[key].models[i], currentDeck[key].selector);
			else {
				$(".cardchoice").show();
				$(".instanceCount").text("");
			}
		});

		//addToMain
		$("#visualMainBoard,#visualPoolBoard").on("click", ".addToMain", function() {
			var cardid = $(this).parent().data('cardid');
			var newcard = currentDeck.pool.get(cardid).clone();
			newcard.id += "_" + Date.now();
			currentDeck.mainboard.add(newcard);
		});

		//addToSide
		$("#visualSideBoard,#visualPoolBoard").on("click", ".addToSide", function() {
			var cardid = $(this).parent().data('cardid');
			var newcard = createNewCard(currentDeck.pool.get(cardid));
			currentDeck.sideboard.add(newcard);
		});

		//moveToMain
		$("#visualSideBoard").on("click", ".moveToMain", function() {
			var card = removeCardFromSelection(currentDeck.sideboard, $(this));
			currentDeck.mainboard.add(card); //+1 side
		});

		$("#visualMainBoard").on("click", ".moveToSide", function() {
			var card = removeCardFromSelection(currentDeck.mainboard, $(this));
			currentDeck.sideboard.add(card); //+1 side
		});

		$("#visualMainBoard").on("click", ".removeFromMain", function() {
			removeCardFromSelection(currentDeck.mainboard, $(this));
		});

		$("#visualSideBoard").on("click", ".removeFromSide", function() {
			removeCardFromSelection(currentDeck.sideboard, $(this));
		});

		$("#visualPoolBoard").on("click", ".removeFromPool", function() {
			removeCardFromSelection(currentDeck.pool, $(this));
		});

		$("#textBoard").on("change", ".textualMainBoard,.textualSideBoard", function() {
			var newboard = {};

			//parse the text
			var tokens = $(this).val().split("\n");
			var cardregex = /(\d+)x (.+)/;
			for(var i = 0, result; i != tokens.length; ++i)
				if((result = cardregex.exec(tokens[i])))
					newboard[result[2].toLowerCase()] = result[1];
		
			//get which board changed
			var board = currentDeck[$(this).data("board")];
			
			//see if we need to remove the card, if we have too many.
			var toBeRemoved = [];
			for(var i = 0; i != board.models.length; ++i)
				if(newboard[board.models[i].get('name').toLowerCase()])
					--newboard[board.models[i].get('name').toLowerCase()];
				//else, then there is no card, or there are 0 left in new board
				else
					toBeRemoved.push(board.models[i]);
			for(var i=0; i!=toBeRemoved.length; ++i) //actually remove them.
				board.remove(toBeRemoved[i]);
			
			//now that we've accounted for the cards we currently have,
			//we need to add any new cards.
			for(var key in newboard)
				for(var i = 0; i != newboard[key]; ++i)
					//board.add(createNewCard(currentDeck.pool.findWhere({name: key})));
					board.add(createNewCard(_.find(currentDeck.pool.models, function(card){
						return card.get('name').toLowerCase() == key;
					})));
		});
	};
});

requirejs.config({
	baseUrl: 'lib',
	paths: {
		bootstrap: 'bootstrap/js/bootstrap',
		app: '../js/app',
		model: '../js/model',
		collection: '../js/collection',
		view: '../js/view',
		helper: '../js/helper',
	},
	shim: {
		'bootstrap': {
			deps: ['jquery'],
		},
		'backbone': {
			exports: 'Backbone',
		},
		'handlebars': {
			exports: 'Handlebars',
		},
	},
});

//start magic app
requirejs(
	['jquery', 'underscore', 'handlebars', 'backbone',
		'bootstrap', 'model/card', 'collection/set', 'collection/board',
		'view/genericview', 'view/partialview',
		'helper/stackcard', 'helper/decktotext', 'helper/loadfile',
		'helper/events'],
	function($, _, Handlebars, Backbone,
		Bootstrap, Card, Set, Board,
		GenericView, PartialView,
		stackcard, _0, _1,
		events)
	{
		var currentDeck = {
			pool: $.extend(new Set, {
				selector: "#visualPoolBoard",
				cardpartial: "poolcard",
			}),
			mainboard: $.extend(new Board, {
				selector: "#visualMainBoard",
				cardpartial: "mainboardcard",
			}),
			sideboard: $.extend(new Board, {
				selector: "#visualSideBoard",
				cardpartial: "sideboardcard",
			}),
		};

		var BoardView = GenericView.extend({
			selector: "",
			initialize: function() {
				this.selector = this.options.selector || this.selector;
				this.context = this.options.context || this.context;
				this._template = $(this.selector).html();
			},
			context: { deck: currentDeck }
		});

		var views = {
			header: new GenericView({selector: "#header"}),
			visualPoolBoard: new BoardView({selector: "#visualPoolBoard"}),
			visualMainBoard: new BoardView({selector: "#visualMainBoard"}),
			visualSideBoard: new BoardView({selector: "#visualSideBoard"}),
			textBoard: new BoardView({selector: "#textBoard"}),
			poolcard: new PartialView({partial: "poolcard"}),
			mainboardcard: new PartialView({partial: "mainboardcard"}),
			sideboardcard: new PartialView({partial: "sideboardcard"}),
		};
		//render all the views.
		for(var key in views)
			$(views[key].selector).html(views[key].render());

		//fetch the pool data, then render the pool
		//TODO: make nicer...
		currentDeck.pool.fetch({
			reset: true,
			success: function(collection) {
				console.log("number of cards: " + currentDeck.pool.length);
				$(views.visualPoolBoard.selector).html(views.visualPoolBoard.render())
			},
		});

		var addCB = function (model, collection) {
			//create the new card div
			var carddiv = views[collection.cardpartial].setContext(model).render();
			//try and find an element to put ours before...
			var found = false;
			$(collection.selector).find(".cardchoice").each(function(i, el) {
				if($(el).data("name") > model.get("name"))
				{
					found = $(el).before(carddiv);
					return false;
				}
			});
			//if none are found, then just append the element.
			if(!found)
				$(collection.selector).append(carddiv);
			//stack the card if need be
			if($("#stacked").prop("checked"))
				stackcard(model, collection.selector);

			//update the textboard
			$("#textBoard").html(views.textBoard.render());
		};
		var removeCB = function (model, collection) {
			$(collection.selector).find("."+model.id).remove();
			//we have to restak the cards to show a new lead.
			if($("#stacked").prop("checked"))
				stackcard(model, collection.selector);
			$("#textBoard").html(views.textBoard.render());
		};
		for(var key in currentDeck)
		{
			currentDeck[key].on("add", addCB);
			currentDeck[key].on("remove", removeCB);
		}

		//sets up the events for the page.
		events(currentDeck);
	}
);

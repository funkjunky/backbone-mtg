'use strict';	//what does this do??? try removing it later.

/* App Module */

angular.module('magicviewer', ['magicviewerServices'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/builder', {templateUrl: "partials/builder.html", controller: builderCtrl})
			.when('/:set', {templateUrl: "partials/cardlist.html", controller: CardListCtrl})
			.when('/:set/:cardnum', {templateUrl: "partials/card.html", controller: CardDetailCtrl})
			.otherwise({redirectTo: '/m14'});
	}]);

function sealedCtrl($scope, Pack)
{
}

function builderCtrl($scope, $http, Cards)
{
	$scope.cards = Cards.query();
	$scope.cardpool = [];
	$http.get('magicsets/M14Names.json').success(function(data) {
		$scope.cardsavailable = data;
	});
	$scope.addCardToPool = function() {
		console.log($scope.newcard);
		for(var i=0; i!=$scope.cards.length; ++i)
			if($scope.cards[i].name == $scope.newcard)
			{
				$scope.cardpool.push($.extend({}, $scope.cards[i], {db_main:4, db_side:0, db_maybe:0}));
				break;
			}

		console.log("Added card, new cardpool:");
		console.log($scope.cardpool);
	};
	$scope.incrementMain = function(card) {
		if(card.db_side <= 0)
			return;

		++card.db_main;
		--card.db_side;
	};
	$scope.incrementSide = function(card) {
		if(card.db_main <= 0)
			return;

		++card.db_side;
		--card.db_main;
	};
	$scope.maybeAll = function(card) {
		card.db_maybe = card.db_side + card.db_main;
		card.db_main = 0;
		card.db_side = 0;
	};
	$scope.mainAllMaybe = function(card) {
		card.db_main = card.db_maybe;
		card.db_maybe = 0;
	};
}

function CardListCtrl($scope, Cards)
{
	$scope.cards = Cards.query();
}

//I don't know how right now, nor do I care too much. Neeeexxxxtttt
function CardDetailCtrl($scope, Cards)
{
}

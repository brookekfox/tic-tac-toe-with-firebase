var app = angular.module('tictacApp', ['firebase']);

app.controller('tictacController', function ($scope, $firebase) {

	//three 'drawers' to store information about the game
	$scope.board = $firebase(new Firebase("https://my-tic-tac-toe-1.firebaseio.com/board")).$asArray();
	$scope.counter = $firebase(new Firebase("https://my-tic-tac-toe-1.firebaseio.com/counter")).$asArray();
	$scope.players = $firebase(new Firebase("https://my-tic-tac-toe-1.firebaseio.com/players")).$asArray();

	//when the board loads, this function runs
	$scope.board.$loaded().then(function () {
		//if the board is empty, populate it with 9 empty entries
		if ($scope.board.length === 0) {
			for (var i = 0; i < 9; i++) {
				$scope.board.$add({letterOnBoard: ''});
			}
		} else { //if the board already exists, replace all the entries with empty ones
			for (var i = 0; i < 9; i++) {
				$scope.board[i].letterOnBoard = '';
				$scope.board.$save($scope.board[i]);
			}
		}

		//remove the previous game's players from the player drawer
		for (var i = 0; i < $scope.players.length; i++) {
			$scope.players.$remove($scope.players[i]);
		}
		//if there aren't any current players, add them
		$scope.players.$add( {
			xORo: 'x',
			rowCount: [0,0,0],
			columnCount: [0,0,0],
			diagonalCount: [0,0],
			winCount: 0
		});
		$scope.players.$add( {
			xORo: 'o',
			rowCount: [0,0,0],
			columnCount: [0,0,0],
			diagonalCount: [0,0],
			winCount: 0
		});
        
	});

	//when the counter is loaded, this function runs
	$scope.counter.$loaded().then(function () {
		//if there is nothing stored in the counter 'drawer', add an object containing the turn counter and the current player properties
		if ($scope.counter.length === 0) {
			$scope.counter.$add({turnCounter: 0, currentPlayer: 'x'});
		} else { //if the counter already exists, set the turn counter back to 0 and the current player to x
			$scope.counter[0].turnCounter = 0;
			$scope.counter[0].currentPlayer = 'x';
			$scope.counter.$save($scope.counter[0]);
		}
	});

	//when a square is clicked, this function runs
	$scope.squareClick = function (index) {
		//on even turns, on empty squares, on the right turn, update everything to the first player's attributes
		if (	$scope.counter[0].turnCounter % 2 == 0 &&
				$scope.board[index].letterOnBoard == '' &&
				$scope.counter[0].currentPlayer == 'x'
		  ) {
			$scope.board[index].letterOnBoard = 'x'; //place an x on the board in the square
			$scope.board.$save($scope.board[index]);
			$scope.counter[0].turnCounter++; //increment the turn counter
			$scope.counter[0].currentPlayer = 'o';
			$scope.counter.$save($scope.counter[0]);

			//depending on the square clicked, the first player's row/column/diagonal counts need to increase
			if (index == 0) {
				$scope.players[$scope.players.length-2].rowCount[0]++;
				$scope.players[$scope.players.length-2].columnCount[0]++;
				$scope.players[$scope.players.length-2].diagonalCount[0]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 1) {
				$scope.players[$scope.players.length-2].rowCount[0]++;
				$scope.players[$scope.players.length-2].columnCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 2) {
				$scope.players[$scope.players.length-2].rowCount[0]++;
				$scope.players[$scope.players.length-2].columnCount[2]++;
				$scope.players[$scope.players.length-2].diagonalCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 3) {
				$scope.players[$scope.players.length-2].rowCount[1]++;
				$scope.players[$scope.players.length-2].columnCount[0]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 4) {
				$scope.players[$scope.players.length-2].rowCount[1]++;
				$scope.players[$scope.players.length-2].columnCount[1]++;
				$scope.players[$scope.players.length-2].diagonalCount[0]++;
				$scope.players[$scope.players.length-2].diagonalCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 5) {
				$scope.players[$scope.players.length-2].rowCount[1]++;
				$scope.players[$scope.players.length-2].columnCount[2]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 6) {
				$scope.players[$scope.players.length-2].rowCount[2]++;
				$scope.players[$scope.players.length-2].columnCount[0]++;
				$scope.players[$scope.players.length-2].diagonalCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 7) {
				$scope.players[$scope.players.length-2].rowCount[2]++;
				$scope.players[$scope.players.length-2].columnCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			} else if (index == 8) {
				$scope.players[$scope.players.length-2].rowCount[2]++;
				$scope.players[$scope.players.length-2].columnCount[2]++;
				$scope.players[$scope.players.length-2].diagonalCount[0]++;
				$scope.players.$save($scope.players[$scope.players.length-2]);
			}

			//after the 4th turn, we start checking for a winner
			if ($scope.counter[0].turnCounter >= 4) {
				$scope.winner();
			}

		//similarly, for player two
		} else if (	$scope.counter[0].turnCounter % 2 != 0 &&
					$scope.board[index].letterOnBoard == '' &&
					$scope.counter[0].currentPlayer == 'o') {
			$scope.board[index].letterOnBoard = 'o';
			$scope.board.$save($scope.board[index]);
			$scope.counter[0].turnCounter++;
			$scope.counter[0].currentPlayer = 'x';
			$scope.counter.$save($scope.counter[0]);

			if (index == 0) {
				$scope.players[$scope.players.length-1].rowCount[0]++;
				$scope.players[$scope.players.length-1].columnCount[0]++;
				$scope.players[$scope.players.length-1].diagonalCount[0]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 1) {
				$scope.players[$scope.players.length-1].rowCount[0]++;
				$scope.players[$scope.players.length-1].columnCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 2) {
				$scope.players[$scope.players.length-1].rowCount[0]++;
				$scope.players[$scope.players.length-1].columnCount[2]++;
				$scope.players[$scope.players.length-1].diagonalCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 3) {
				$scope.players[$scope.players.length-1].rowCount[1]++;
				$scope.players[$scope.players.length-1].columnCount[0]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 4) {
				$scope.players[$scope.players.length-1].rowCount[1]++;
				$scope.players[$scope.players.length-1].columnCount[1]++;
				$scope.players[$scope.players.length-1].diagonalCount[0]++;
				$scope.players[$scope.players.length-1].diagonalCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 5) {
				$scope.players[$scope.players.length-1].rowCount[1]++;
				$scope.players[$scope.players.length-1].columnCount[2]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 6) {
				$scope.players[$scope.players.length-1].rowCount[2]++;
				$scope.players[$scope.players.length-1].columnCount[0]++;
				$scope.players[$scope.players.length-1].diagonalCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 7) {
				$scope.players[$scope.players.length-1].rowCount[2]++;
				$scope.players[$scope.players.length-1].columnCount[1]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			} else if (index == 8) {
				$scope.players[$scope.players.length-1].rowCount[2]++;
				$scope.players[$scope.players.length-1].columnCount[2]++;
				$scope.players[$scope.players.length-1].diagonalCount[0]++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
			}

			if ($scope.counter[0].turnCounter >= 4) {
				$scope.winner();
			}
		//this is so you can't change the square's game piece
		} else if ($scope.board[index].letterOnBoard != '') {
			alert('that space is already taken, dum dum!');
		}
	}

	$scope.winner = function () {
		for (var k = 0; k < 3; k++) {
			//if any of the first player's row/column/diagonal counts is 3, he wins
			if (	$scope.players[$scope.players.length-2].rowCount[k] == 3 ||
					$scope.players[$scope.players.length-2].columnCount[k] == 3 ||
					$scope.players[$scope.players.length-2].diagonalCount[k] == 3) {
				alert("The Nintendo controller wins!");
				$scope.players[$scope.players.length-2].winCount++; //increment the player's win count
				$scope.players.$save($scope.players[$scope.players.length-2]);
				$scope.reset();

			} else if (	$scope.players[$scope.players.length-1].rowCount[k] == 3 ||
						$scope.players[$scope.players.length-1].columnCount[k] == 3 ||
						$scope.players[$scope.players.length-1].diagonalCount[k] == 3) {
				alert("The spaceship wins!");
				$scope.players[$scope.players.length-1].winCount++;
				$scope.players.$save($scope.players[$scope.players.length-1]);
				$scope.reset();

			} else if ($scope.counter[0].turnCounter == 9) {
				alert("It's a tie!");
				$scope.reset();
			}
		}
	}

	//reset the board back to empty without deleting the win counts
	$scope.reset = function () {
		if ($scope.board.length === 0) {
			for (var i = 0; i < 9; i++) {
				$scope.board.$add({letterOnBoard: ''});
			}
		} else {
			for (var i = 0; i < 9; i++) {
				$scope.board[i].letterOnBoard = '';
				$scope.board.$save($scope.board[i]);
			}
		}

		$scope.players[$scope.players.length-2].rowCount = [0,0,0];
		$scope.players[$scope.players.length-2].columnCount = [0,0,0];
		$scope.players[$scope.players.length-2].diagonalCount = [0,0,0];
		$scope.players.$save($scope.players[$scope.players.length-2]);
		$scope.players[$scope.players.length-1].rowCount = [0,0,0];
		$scope.players[$scope.players.length-1].columnCount = [0,0,0];
		$scope.players[$scope.players.length-1].diagonalCount = [0,0,0];
		$scope.players.$save($scope.players[$scope.players.length-1]);

		$scope.counter[0].turnCounter = 0;
		$scope.counter[0].currentPlayer = 'x';
		$scope.counter.$save($scope.counter[0]);
	}

	//reset() with reset of win counts and addition of new players to the players drawer
	$scope.newGame = function () {
		if ($scope.board.length === 0) {
			for (var i = 0; i < 9; i++) {
				$scope.board.$add({letterOnBoard: ''});
			}
		} else {
			for (var i = 0; i < 9; i++) {
				$scope.board[i].letterOnBoard = '';
				$scope.board.$save($scope.board[i]);
			}
		}

		if ($scope.players.length != 0) {
			$scope.players[$scope.players.length-2].rowCount = [0,0,0];
			$scope.players[$scope.players.length-2].columnCount = [0,0,0];
			$scope.players[$scope.players.length-2].diagonalCount = [0,0,0];
			$scope.players[$scope.players.length-2].winCount = 0;
			$scope.players.$save($scope.players[$scope.players.length-2]);
			$scope.players[$scope.players.length-1].rowCount = [0,0,0];
			$scope.players[$scope.players.length-1].columnCount = [0,0,0];
			$scope.players[$scope.players.length-1].diagonalCount = [0,0,0];
			$scope.players[$scope.players.length-1].winCount = 0;
			$scope.players.$save($scope.players[$scope.players.length-1]);
		} else {
			$scope.players.$add( {
				xORo: 'x',
				rowCount: [0,0,0],
				columnCount: [0,0,0],
				diagonalCount: [0,0],
				winCount: 0
			});
			$scope.players.$add( {
				xORo: 'o',
				rowCount: [0,0,0],
				columnCount: [0,0,0],
				diagonalCount: [0,0],
				winCount: 0
			});
		}

		$scope.counter[0].turnCounter = 0;
		$scope.counter[0].currentPlayer = 'x';
		$scope.counter.$save($scope.counter[0]);
	}


});

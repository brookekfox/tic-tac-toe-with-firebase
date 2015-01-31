var app = angular.module('tictacApp', ['firebase']);

app.controller('tictacController', function ($scope, $firebase) {

	$scope.board = $firebase(new Firebase("https://my-tic-tac-toe-1.firebaseio.com/board")).$asArray();
	$scope.counter = $firebase(new Firebase("https://my-tic-tac-toe-1.firebaseio.com/counter")).$asArray();
	$scope.players = $firebase(new Firebase("https://my-tic-tac-toe-1.firebaseio.com/players")).$asArray();

	$scope.board.$loaded(function () {
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

		for (var i = 0; i < $scope.players.length; i++) {
			$scope.players.$remove($scope.players[i]);
		}
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

	$scope.counter.$loaded(function () {
		if ($scope.counter.length === 0) {
			$scope.counter.$add({turnCounter: 0, currentPlayer: 'x'});
		} else {
			$scope.counter[0].turnCounter = 0;
			$scope.counter[0].currentPlayer = 'x';
			$scope.counter.$save($scope.counter[0]);
		}
	});

	$scope.squareClick = function (index) {
		if (	$scope.counter[0].turnCounter % 2 == 0 && //if it's an even turn (for x)
				$scope.board[index].letterOnBoard == '' && //if the space is empty
				$scope.counter[0].currentPlayer == 'x' //if x is the current player
		  ) {
			$scope.board[index].letterOnBoard = 'x';
			$scope.board.$save($scope.board[index]);
			$scope.counter[0].turnCounter++;
			$scope.counter[0].currentPlayer = 'o';
			$scope.counter.$save($scope.counter[0]);
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

			if ($scope.counter[0].turnCounter >= 4) {
				$scope.winner();
			}

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
		} else if ($scope.board[index].letterOnBoard != '') {
			alert('that space is already taken, dum dum!');
		}
	}

	$scope.winner = function () {
		for (var k = 0; k < 3; k++) {
			if (	$scope.players[$scope.players.length-2].rowCount[k] == 3 ||
					$scope.players[$scope.players.length-2].columnCount[k] == 3 ||
					$scope.players[$scope.players.length-2].diagonalCount[k] == 3) {
				alert("The Nintendo controller wins!");
				$scope.players[$scope.players.length-2].winCount++;
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

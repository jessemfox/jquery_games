(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  // var readline = require('readline');
  // var READER = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });

  var Game = Hanoi.Game = function (towerCount) {
    towerCount = towerCount || 3;
    this.towers = this.setupTowers(towerCount);
    this.winLength = this.towerCount;
  };

  Game.prototype.setupTowers = function (count) {
    var tower1 = [];

    for (var i = count; i > 0; i -= 1) {
      console.log(i)
      tower1.push(i);
    }

    console.log(tower1)

    return [tower1, [], []];
  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == this.winLength) || (this.towers[1].length == this.winLength);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    var game = this;

    READER.question("Enter a starting tower: ",function (start) {
      var startTowerIdx = parseInt(start);
      READER.question("Enter an ending tower: ", function (end) {
        var endTowerIdx = parseInt(end);
        game.takeTurn(startTowerIdx,endTowerIdx);
      });
    });
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;

    if (game.move(start,end)) {
      console.log(game.towers);
    } else {
      console.log("Invalid move!")
    }

    if (game.isWon()) {
      console.log("You win!");
      READER.close();
    } else {
      game.run();
    }
  }
})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.


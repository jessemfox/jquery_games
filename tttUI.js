// $(document).ready(function() {
//
//   createBoard();
//
//   var game = new TTT.Game();
//   console.log(game.player);
//   console.log(game.winner());
//
//
//   $('.container').on('click', 'div', function(event) {
//     $target = $(event.target);
//
//     if ($target.children().length) {
//       alert("You cannot place your mark there!");
//     } else {
//       UIPlaceMark(event, game);
//
//     }
//
//   });
// });
//
// var createBoard = function() {
//   for (var i=0; i< 3; i++) {
//     for (var j=0; j<3; j++){
//       $cell = $('<div></div>');
//       $cell.attr("data-id", [i,j]);
//       $('.container').append($cell);
//     }
//
//   }
// }
//
// var UIPlaceMark = function(event, game){
//   $target = $(event.target);
//
//   $target.append('<span class="marker">'+ game.player  +'</span>');
//
//   var posX = parseInt($target.data().id[0], 10);
//
//   var posY = parseInt($target.data().id[2], 10);
//
//   game.placeMark([posX, posY]);
//   if (game.winner()) {
//     alert(game.player + "'s Have won!")
//     location.reload();
//   } else {
//       game.switchPlayer();
//   }
// }


(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var UI = TTT.UI = function(game){
    this.game = game;
  }

  UI.prototype.createBoard = function() {
    for (var i=0; i< 3; i++) {
      for (var j=0; j<3; j++){
        $cell = $('<div></div>');
        $cell.attr("data-id", [i,j]);
        $('.container').append($cell);
      }

    }
  }

  UI.prototype.placeMark = function(event) {
    $target = $(event.target);

    $target.append('<span class="marker">'+ this.game.player  +'</span>');

    var posX = parseInt($target.data().id[0], 10);

    var posY = parseInt($target.data().id[2], 10);

    this.game.placeMark([posX, posY]);
    if (this.game.winner()) {
      alert(this.game.player + "'s Have won!")
      location.reload();
    } else {
        this.game.switchPlayer();
    }
  }

  UI.prototype.bindClick = function(){
    var ui = this;
    $('.container').on('click', 'div', function(event) {
      $target = $(event.target);

      if ($target.children().length) {
        alert("You cannot place your mark there!");
      } else {
        ui.placeMark(event);

      }

    });
  }

  UI.prototype.start = function(){
    this.createBoard();
    this.bindClick();
  }


})(this);
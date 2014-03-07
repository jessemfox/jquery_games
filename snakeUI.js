(function(root) {
  var Snakes = root.Snakes = (root.Snakes || {});

  var SnakesUI = Snakes.SnakesUI = function(game) {
    this.game = game;
  }

  SnakesUI.prototype.render = function() {
    $('div.container').children().remove();
    var head = this.game.snake.head;
    var $coord = $('<div class="snake"></div>');
    this.placeDiv($coord, head);
    $('.container').append($coord)
    var segs = this.game.snake.segments

    for (var i=0; i < segs.length; i++ ){
      var $tail = $('<div class="snake"></div>');
      this.placeDiv($tail, segs[i])
      $('.container').append($tail)
    }

    var $food = $('<div class="food"></div>');
    this.placeDiv($food, this.game.food);
    $('.container').append($food);
  }

  SnakesUI.prototype.placeDiv = function(div, dest) {
    div.css("position", "absolute");
    div.css("left", dest.x);
    div.css("top", dest.y);
  }

  SnakesUI.prototype.move = function(){
    console.log('in move');
    this.game.snake.move();
    if (this.game.foodCollision()){
      this.game.snake.grow(3);
      this.game.food = this.game.generateFood();
    }
    this.render();
  }

  SnakesUI.prototype.start = function(){
    var snake = this;
    this.keyBind();
    this.render();
    setInterval(function(){snake.move()}, 100);
  }

  SnakesUI.prototype.keyBind = function() {
    var snake = this;
    key('up', function(){ snake.game.snake.changeDirection('N') })
    key('down', function(){ snake.game.snake.changeDirection('S') })
    key('left', function(){ snake.game.snake.changeDirection('W') })
    key('right', function(){ snake.game.snake.changeDirection('E') })
  }

})(this);
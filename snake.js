(function(root) {
  var Snakes = root.Snakes = (root.Snakes || {});

  // game size is 320x320

  var Snake = Snakes.Snake = function() {
    this.dir = "N";
    this.segments = [new Coord(240,248, this.dir), new Coord(240,256, this.dir) ];
    this.size = 7;
    this.head = new Coord(240,240, this.dir);
  }

  Snake.prototype.move = function() {
    console.log(this.dir)
    var prev_segmentx = this.head.x;
    var prev_segmenty = this.head.y;
    var prev_dir = this.dir;
    this.head.plus(this.dir, this.size);
    for (var i = 0; i < this.segments.length; i++) {
      var ogx = this.segments[i].x;
      var ogy = this.segments[i].y;
      var ogdir = this.segments[i].dir;
      this.segments[i].x = prev_segmentx;
      this.segments[i].y = prev_segmenty;
      this.segments[i].dir = prev_dir;
      prev_segmentx = ogx;
      prev_segmenty = ogy;
      prev_dir = ogdir;
    }
  }

  Snake.prototype.render = function(){
    this.segments.forEach(function(segment) {
      segment.render();
    });
  }

  Snake.prototype.changeDirection = function(dir){
    this.dir = dir;

  }

  Snake.prototype.grow = function(size) {
    for (var i = 0; i < size; i++) {
      var coord = new Coord();
      var tail = this.segments[this.segments.length - 1];
      switch(tail.dir) {
      case "N":
        coord.y = tail.y + 8;
        coord.x = tail.x;
        coord.dir = tail.dir;
        break;
      case "E":
        coord.y = tail.y;
        coord.x = tail.x - 8;
        coord.dir = tail.dir;
        break;
      case "S":
        coord.y = tail.y - 8;
        coord.x = tail.x;
        coord.dir = tail.dir;
        break;
      case "W":
        coord.y = tail.y;
        coord.x = tail.x + 8;
        coord.dir = tail.dir;
        break;
      default:
        console.log("You FUCKED UP something.");
      }

      this.segments.push(coord);
    }
  }



  var Coord = Snakes.Coord = function(x, y, direction) {
    this.x = x;
    this.y = y;
    this.dir = direction;
  }

  Coord.prototype.plus = function(direction, size) {
    switch(direction) {
    case "N":
      this.y -= size + 1;
      break;
    case "E":
      this.x += size + 1;
      break;
    case "S":
      this.y += size + 1;
      break;
    case "W":
      this.x -= size + 1 ;
      break;
    default:
      console.log("You FUCKED UP something.");
    }
  }

  Coord.prototype.render = function() {

  }

  var Board = Snakes.Board = function() {
    this.snake = new Snake();
    this.food = this.generateFood();
  }

  Board.prototype.render = function() {
    snake.render();
  }

  Board.prototype.generateFood = function() {
    var randX = Math.floor(Math.random() * 480) + 1;
    var randY = Math.floor(Math.random() * 480) + 1;

    randX += (8 - (randX % 8));
    randY += (8 - (randY % 8));

    return new Coord(randX, randY, "N");
  }

  Board.prototype.foodCollision = function(){
    var board = this;
    if (this.snake.head.x === this.food.x && this.snake.head.y === this.food.y){
      return true;
    }
    this.snake.segments.forEach(function(seg){
      if(board.food.x === seg.x && board.food.y === seg.y ){
        return true;
      }
    });
    return false;
  }


})(this);
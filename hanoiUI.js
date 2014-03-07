(function (root) {

  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var UI = Hanoi.UI = function(game){
    this.game = game;
    this.clicks = [];
  }

  UI.prototype.setupGame = function() {
    var width = 135;
    var marginLeft = width/9 ;
    var bottom = 0;
    var height = 100/(this.game.towers[0].length);

    for (var i = 0; i< this.game.towers[0].length; i++) {
      $parent = $('.tower').first();
      $disc = $('<div class="disc"></div>');
      $disc.css("width", width.toString()+"px");
      $disc.css("margin-left", marginLeft.toString()+"px");
      $disc.css("height", height.toString()+"px");
      $disc.css("bottom", bottom.toString()+"px");
      $parent.prepend($disc);
      marginLeft += (0.1*width);
      width *= .8;
      bottom +=height;
    }
  }

  UI.prototype.countClicked = function() {
    return this.clicks.length;
  }

  UI.prototype.turnClicked = function() {
    var ui = this;

    $('.tower').on('click', function(event) {
      $(this).addClass('clicked');
      var tower = parseInt($(this).data('tower'), 10);
      ui.clicks.push(tower);
      ui.moveDisc();

      if(ui.game.isWon()) {
        alert("You win!");
        window.location.reload();
      }
    });
  }

  UI.prototype.removeClicks = function() {
    $('.clicked').removeClass('clicked');
    this.clicks = [];
  }

  UI.prototype.moveDisc = function() {
    console.log(this.countClicked());

    if (this.countClicked() === 2) {
      if(this.game.move(this.clicks[0], this.clicks[1])) {
        console.log(this.game.towers)
        var $source = $("div.tower[data-tower=" + this.clicks[0].toString() + "]");
        var $dest = $("div.tower[data-tower=" + this.clicks[1].toString() + "]");
        var disc = $source.children().first();
        this.setDiscBottom(disc, $dest);
        $dest.prepend(disc);
      }

      this.removeClicks();
    }
  }

  UI.prototype.setDiscBottom = function(disc, tower) {
    var height = parseInt(disc.css("height"), 10);
    disc.css("bottom", (tower.children().length * height).toString() + "px");
  }


  UI.prototype.start = function(){
    this.setupGame();
    this.turnClicked();
  }

})(this);
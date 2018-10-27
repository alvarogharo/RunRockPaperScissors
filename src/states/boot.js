var RunRockPaperScissors = {}


RunRockPaperScissors.bootState = function(game) {

    var mode;
    var score;
}

RunRockPaperScissors.bootState.prototype = {

    preload: function() {
        game.load.bitmapFont('myFont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        game.load.bitmapFont('myFontB', 'assets/fonts/fontB.png', 'assets/fonts/fontB.fnt');
        game.load.bitmapFont('myFontR', 'assets/fonts/fontR.png', 'assets/fonts/fontR.fnt');
    },

    create: function() {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        score = new Array(1,3);
        mode = 3;
        game.state.start('gameState');
    },

    update: function() {

    }
}
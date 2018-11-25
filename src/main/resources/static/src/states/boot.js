var RunRockPaperScissors = {}

RunRockPaperScissors.bootState = function(game) {

    //Global game variables
    var mode;
    var score;
    var id;
    var otherId;
}

RunRockPaperScissors.bootState.prototype = {

    preload: function() {
        //Fonts
        game.load.bitmapFont('myFont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        game.load.bitmapFont('myFontB', 'assets/fonts/fontB.png', 'assets/fonts/fontB.fnt');
        game.load.bitmapFont('myFontR', 'assets/fonts/fontR.png', 'assets/fonts/fontR.fnt');
    },

    create: function() {
        //Initialization
        score = new Array(0,0);
        mode = 3;
        game.state.start('mainMenuState');
    }
}
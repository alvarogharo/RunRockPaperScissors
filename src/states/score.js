RunRockPaperScissors.scoreState = function(game) {

}

var timer;

RunRockPaperScissors.scoreState.prototype = {

    preload: function() {
    },

    create: function() {
        timer = 0;

        var text = game.add.bitmapText(130, 100+100, 'myFont', 'MATCH', 120);
        text = game.add.bitmapText(130, 260+100, 'myFont', 'Scoreboard', 120);

        text = game.add.bitmapText(260, 730, 'myFontB', 'P1', 120);
        text = game.add.bitmapText(730, 730, 'myFontR', 'P2', 120); 
        text = game.add.bitmapText(500, 900, 'myFont', '-', 160);

        text = game.add.bitmapText(300, 930, 'myFontB', score[0].toString(), 150);
        text = game.add.bitmapText(760, 930, 'myFontR',score[1].toString(), 150);
        text.smoothed = false;
        text.color = 'white';

    },

    update: function() {
        game.debug.text('Elapsed seconds: ' + timer, 32, 32);
        timer += game.time.physicsElapsed;

        if (timer >= 5){
            if (score[0] == mode){
                game.state.start('winnerState', true, false, 1);
            }else if (score[1] == mode){
                game.state.start('winnerState', true, false, 2);
            }else if(score[0] < mode && score[1] < mode) {
                game.state.start('gameState');
            }
            
        }
    }
}
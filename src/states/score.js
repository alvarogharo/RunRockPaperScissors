RunRockPaperScissors.scoreState = function(game) {

}

var timer;

RunRockPaperScissors.scoreState.prototype = {

    create: function() {
        //Timer initialization
        timer = 0;

        //Texts
        var texts = new Array();
        texts[0] = game.add.bitmapText(130, 100+100, 'myFont', 'MATCH', 120);
        texts[1] = game.add.bitmapText(130, 260+100, 'myFont', 'Scoreboard', 120);

        texts[2] = game.add.bitmapText(260, 730, 'myFontB', 'P1', 120);
        texts[3] = game.add.bitmapText(730, 730, 'myFontR', 'P2', 120); 
        texts[4] = game.add.bitmapText(500, 900, 'myFont', '-', 160);

        texts[5] = game.add.bitmapText(300, 930, 'myFontB', score[0].toString(), 150);
        texts[6] = game.add.bitmapText(760, 930, 'myFontR',score[1].toString(), 150);

        for(var t in texts){
            t.smoothed = false;
        }
    },

    update: function() {
        //Timer
        timer += game.time.physicsElapsed;

        if (timer >= 1){
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
RunRockPaperScissors.waitingState = function(game) {
    this.timer;
}

RunRockPaperScissors.waitingState.prototype = {

    create: function() {
        //Texts
        var texts = new Array();
        texts[0] = game.add.bitmapText(130, 440, 'myFont', 'WAITING', 120);
        texts[1] = game.add.bitmapText(130, 600, 'myFont', 'For', 120);
        texts[2] = game.add.bitmapText(130, 760, 'myFont', 'Other', 120);
        texts[3] = game.add.bitmapText(130, 920, 'myFont', 'Player...', 120);

        for(var t in texts){
            t.smoothed = false;
        }

        //Timer initialization
        this.timer = 0;
    },

    update: function() {
        //Timer waits for 3 seconds
        this.timer += game.time.physicsElapsed;

        if (this.timer >= 3){
            game.state.start('gameState');
        }
    }
}
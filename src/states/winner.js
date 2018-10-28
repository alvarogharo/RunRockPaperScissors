RunRockPaperScissors.winnerState = function(game) {
    this.winner;
}

RunRockPaperScissors.winnerState.prototype = {
    init: function(w){
        this.winner = w;
    },

    preload: function() {
        game.load.image('replayButton', 'assets/sprites/buttons/replayButton.png');
        game.load.image('mainMenuButton', 'assets/sprites/buttons/mainMenuButton.png');

        //Sounds
        game.load.audio('win', 'assets/sounds/win.wav');
    },

    create: function() {
        //Scale intialization
        var scale = 45;

        //Texts
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'WINNER', 120);
        text.smoothed = false;

        //Winner icon selction
        if (this.winner == 1){
            text = game.add.bitmapText(130, 260+100, 'myFontB', 'P1', 120);
            text.smoothed = false;
            var p1 = game.add.sprite(350, 550, 'p1');   
            p1.scale.set(scale,scale);
            p1.smoothed = false;
        }else if (this.winner == 2){
            text = game.add.bitmapText(130, 260+100, 'myFontR', 'P2', 120);
            text.smoothed = false;
            var p2 = game.add.sprite(350, 550, 'p2');   
            p2.scale.set(scale,scale);
            p2.smoothed = false;
        }
        text.smoothed = false;

        game.sound.play('win');

        //Buttons
        var replayButton = game.add.button(200, 1100, 'replayButton', this.replay, this, 2, 1, 0);
        var mainMenuButton = game.add.button(200, 1450, 'mainMenuButton', this.mainMenu, this, 2, 1, 0);

        replayButton.onInputOver.add(this.over, this);
        replayButton.onInputOut.add(this.out, this);
        replayButton.onInputUp.add(this.up, this);

        mainMenuButton.onInputOver.add(this.over, this);
        mainMenuButton.onInputOut.add(this.out, this);
        mainMenuButton.onInputUp.add(this.up, this);
    },

    //Button actions
    up: function() {
        console.log('button up', arguments);
    },
    
    over: function() {
        game.sound.play('buttonOver');
        console.log('button over');
    },
    
    out: function() {
        console.log('button out');
    },
    
    replay: function(){
        game.sound.play('buttonClicked');
        score = [0,0];
        game.state.start('gameState');
    },
    
    mainMenu: function(){
        game.sound.play('buttonClicked');
        game.state.start('mainMenuState');
    }

}


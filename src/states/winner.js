RunRockPaperScissors.winnerState = function(game) {
    this.winner;
    var replayButton;
    var mainMenuButton;
}

RunRockPaperScissors.winnerState.prototype = {
    init: function(w){
        this.winner = w;
    },

    preload: function() {
        game.load.image('replayButton', 'assets/sprites/buttons/replayButton.png');
        game.load.image('replayButtonOver', 'assets/sprites/buttons/replayButtonOver.png');
        game.load.image('replayButtonDown', 'assets/sprites/buttons/replayButtonDown.png');
        game.load.image('mainMenuButton', 'assets/sprites/buttons/mainMenuButton.png');
        game.load.image('mainMenuButtonOver', 'assets/sprites/buttons/mainMenuButtonOver.png');
        game.load.image('mainMenuButtonDown', 'assets/sprites/buttons/mainMenuButtonDown.png');

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
        replayButton = game.add.button(200, 1100, 'replayButton', this.replay, this, 2, 1, 0);
        mainMenuButton = game.add.button(200, 1450, 'mainMenuButton', this.mainMenu, this, 2, 1, 0);

        replayButton.onInputOver.add(this.overR, this);
        replayButton.onInputOut.add(this.outR, this);
        replayButton.onInputUp.add(this.up, this);
        replayButton.onInputDown.add(this.downR, this);

        mainMenuButton.onInputOver.add(this.overM, this);
        mainMenuButton.onInputOut.add(this.outM, this);
        mainMenuButton.onInputUp.add(this.up, this);
        mainMenuButton.onInputDown.add(this.downM, this);
    },

    //Button actions
    up: function() {
        console.log('button up', arguments);
    },
    
    overR: function() {
        game.sound.play('buttonOver');
        replayButton.loadTexture('replayButtonOver');
        console.log('button over');
    },
    
    outR: function() {
        replayButton.loadTexture('replayButton');
        console.log('button out');
    },

    downR: function() {
        game.sound.play('buttonOver');
        replayButton.loadTexture('replayButtonDown');
        console.log('button over');
    },

    overM: function() {
        game.sound.play('buttonOver');
        mainMenuButton.loadTexture('mainMenuButtonOver');
        console.log('button over');
    },
    
    outM: function() {
        mainMenuButton.loadTexture('mainMenuButton');
        console.log('button out');
    },

    downM: function() {
        game.sound.play('buttonOver');
        mainMenuButton.loadTexture('mainMenuButtonDown');
        console.log('button over');
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


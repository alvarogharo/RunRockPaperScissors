RunRockPaperScissors.gameModeState = function(game) {
    var best1Button;
    var best3Button;
    var best5Button;
}

RunRockPaperScissors.gameModeState.prototype = {

    preload: function() {
        //Buttons
        game.load.image('best1Button', 'assets/sprites/buttons/bestOf1Button.png');
        game.load.image('best1ButtonOver', 'assets/sprites/buttons/bestOf1ButtonOver.png');
        game.load.image('best1ButtonDown', 'assets/sprites/buttons/bestOf1ButtonDown.png');
        game.load.image('best3Button', 'assets/sprites/buttons/bestOf3Button.png');
        game.load.image('best3ButtonOver', 'assets/sprites/buttons/bestOf3ButtonOver.png');
        game.load.image('best3ButtonDown', 'assets/sprites/buttons/bestOf3ButtonDown.png');
        game.load.image('best5Button', 'assets/sprites/buttons/bestOf5Button.png');
        game.load.image('best5ButtonOver', 'assets/sprites/buttons/bestOf5ButtonOver.png');
        game.load.image('best5ButtonDown', 'assets/sprites/buttons/bestOf5ButtonDown.png');
    },

    create: function() {
        //Text
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'GAME', 120);
        text = game.add.bitmapText(130, 260+100, 'myFont', 'Mode', 120);
        text.smoothed = false;

        //Buttons
        best1Button = game.add.button(200, 750, 'best1Button', this.best1, this, 2, 1, 0);
        best3Button = game.add.button(200, 1100, 'best3Button', this.best3, this, 2, 1, 0);
        best5Button = game.add.button(200, 1450, 'best5Button', this.best5, this, 2, 1, 0);

        best1Button.onInputOver.add(this.over1, this);
        best1Button.onInputOut.add(this.out1, this);
        best1Button.onInputDown.add(this.down1, this);

        best3Button.onInputOver.add(this.over3, this);
        best3Button.onInputOut.add(this.out3, this);
        best3Button.onInputDown.add(this.down3, this);

        best5Button.onInputOver.add(this.over5, this);
        best5Button.onInputOut.add(this.out5, this);
        best5Button.onInputDown.add(this.down5, this);
    },

    //Button actions
    best1: function(){
        game.sound.play('buttonClicked');
        mode = 1;
        game.state.start('waitingState');
    },
    
    best3: function(){
        game.sound.play('buttonClicked');
        mode = 3;
        game.state.start('waitingState');
    },
    
    best5: function(){
        game.sound.play('buttonClicked');
        mode = 5;
        game.state.start('waitingState');
    },

    over1: function(){
        game.sound.play('buttonOver');
        best1Button.loadTexture('best1ButtonOver');
    },
    
    over3: function(){
        game.sound.play('buttonOver');
        best3Button.loadTexture('best3ButtonOver');
    },
    
    over5: function(){
        game.sound.play('buttonOver');
        best5Button.loadTexture('best5ButtonOver');
    },

    out1: function(){
        game.sound.play('buttonOver');
        best1Button.loadTexture('best1Button');
    },
    
    out3: function(){
        game.sound.play('buttonOver');
        best3Button.loadTexture('best3Button');
    },
    
    out5: function(){
        game.sound.play('buttonOver');
        best5Button.loadTexture('best5Button');
    },

    down1: function(){
        game.sound.play('buttonOver');
        best1Button.loadTexture('best1ButtonDown');
    },
    
    down3: function(){
        game.sound.play('buttonOver');
        best3Button.loadTexture('best3ButtonDown');
    },
    
    down5: function(){
        game.sound.play('buttonOver');
        best5Button.loadTexture('best5ButtonDown');
    }
}
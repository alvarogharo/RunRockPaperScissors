RunRockPaperScissors.creditsState = function(game) {
    var backButton;
}

RunRockPaperScissors.creditsState.prototype = {

    preload: function() {
        //Button
        game.load.image('backButton', 'assets/sprites/buttons/backButton.png');
        game.load.image('backButtonOver', 'assets/sprites/buttons/backButtonOver.png');
        game.load.image('backButtonDown', 'assets/sprites/buttons/backButtonDown.png');

        //Banner
        game.load.image('creditsBanner', 'assets/sprites/credits/creditsBanner.png');
    },

    create: function() {
        //Text
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'CREDITS', 120);
        text.smoothed = false;

        //Banner
        var credits = game.add.sprite(140, 600, 'creditsBanner');

        //Button
        backButton = game.add.button(200, 1450, 'backButton', this.back, this, 2, 1, 0);

        backButton.onInputOver.add(this.over, this);
        backButton.onInputOut.add(this.out, this);
        backButton.onInputDown.add(this.down, this);
    },

    //Buttons actions
    back: function(){
        game.sound.play('buttonClicked');
        game.state.start('mainMenuState');
    },

    over: function(){
        backButton.loadTexture('backButtonOver');
        game.sound.play('buttonOver');
    },

    down: function(){
        backButton.loadTexture('backButtonDown');
        game.sound.play('buttonOver');
    },

    out: function(){
        backButton.loadTexture('backButton');
        game.sound.play('buttonOver');
    }
}
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
        backButton = new Button(200,1450,'backButton',this.back,this);

    },

    //Buttons actions
    back: function(){
        game.sound.play('buttonClicked');
        game.state.start('mainMenuState');
    }
}
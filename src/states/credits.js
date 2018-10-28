RunRockPaperScissors.creditsState = function(game) {

}

RunRockPaperScissors.creditsState.prototype = {

    preload: function() {
        //Button
        game.load.image('backButton', 'assets/sprites/buttons/backButton.png');

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
        var backButton = game.add.button(200, 1450, 'backButton', this.back, this, 2, 1, 0);

        backButton.onInputOver.add(this.over, this);
    },

    //Buttons actions
    back: function(){
        game.sound.play('buttonClicked');
        game.state.start('mainMenuState');
    },

    over: function(){
        game.sound.play('buttonOver');
    }
}
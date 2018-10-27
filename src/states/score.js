RunRockPaperScissors.scoreState = function(game) {

}

RunRockPaperScissors.scoreState.prototype = {

    preload: function() {
        game.load.image('backButton', 'assets/sprites/buttons/backButton.png');
        game.load.image('creditsBanner', 'assets/sprites/credits/creditsBanner.png');
    },

    create: function() {
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'CREDITS', 120);
        text.smoothed = false;
        text.color = 'white';

        var credits = game.add.sprite(140, 600, 'creditsBanner');

        var backButton = game.add.button(200, 1450, 'backButton', back, this, 2, 1, 0);
    },

    update: function() {

    }
}
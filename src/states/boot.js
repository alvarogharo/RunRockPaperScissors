var RunRockPaperScissors = {}

RunRockPaperScissors.bootState = function(game) {

}

RunRockPaperScissors.bootState.prototype = {

    preload: function() {
        
    },

    create: function() {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('mainMenuState');
    },

    update: function() {

    }
}
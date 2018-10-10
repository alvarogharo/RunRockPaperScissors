var CatCatcher = {}

CatCatcher.bootState = function(game) {

}

CatCatcher.bootState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('preloadState');
    },

    update: function() {

    }
}
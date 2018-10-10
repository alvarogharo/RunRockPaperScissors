CatCatcher.menuState = function(game) {

}

CatCatcher.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
        var s = game.add.sprite(0, 0, 'menu');
        game.input.keyboard.onPressCallback = function(e){game.input.keyboard.onPressCallback = null, game.state.start('levelState');}
    },

    update: function() {

    }
}
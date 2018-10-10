CatCatcher.preloadState = function(game) {

}

CatCatcher.preloadState.prototype = {

    preload: function() {
        game.load.image('loading', 'assets/images/loading.gif');
        game.load.image('background', 'assets/images/bg.png');
        game.load.image('cat', 'assets/images/cat.png');
        game.load.image('catcher', 'assets/images/catcher.png');
        game.load.image('menu', 'assets/images/menu.png');

    },

    create: function() {
        var s = game.add.sprite(0, 0, 'loading');
        game.state.start('menuState');
    },

    update: function() {

    }
}
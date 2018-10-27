RunRockPaperScissors.gameState = function(game) {

}

var timer;

RunRockPaperScissors.gameState.prototype = {

    preload: function() {
        game.load.image('roomEmpty', 'assets/sprites/rooms/roomEmpty.png');
        game.load.image('map', 'assets/sprites/map/map.png');
        game.load.image('roomF', 'assets/sprites/room/roomFull.png');
        game.load.image('p1', 'assets/sprites/players/p1.png');
        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');
        game.load.image('nothing', 'assets/sprites/objects/nothing.png');
    },

    create: function() {
        var scale = 8;

        var text = game.add.bitmapText(90, 100, 'myFontB', 'P1', 80);
        text = game.add.bitmapText(880, 100, 'myFontR', 'P2', 80);
        text = game.add.bitmapText(480, 50, 'myFont', '10', 120);
        text.smoothed = false;
        text.color = 'white';

        var p1Room = game.add.sprite(230, 100, 'roomEmpty');
        var p2Room = game.add.sprite(700, 100, 'roomEmpty');

        p1Room.scale.set(scale,scale);
        p2Room.scale.set(scale,scale);

        p1Room.smoothed = false;
        p2Room.smoothed = false;

        var p1Obj = game.add.sprite(253, 123, 'rock');
        var p2Obj = game.add.sprite(723, 123, 'nothing');

        p1Obj.scale.set(10,10);
        p2Obj.scale.set(10,10);

        p1Obj.smoothed = false;
        p2Obj.smoothed = false;

        var map = game.add.sprite(45, 300, 'map');

        map.scale.set(scale,scale);
        map.smoothed = false;

        var room = game.add.sprite(270, 1350, 'roomF');

        room.scale.set(scale,scale);
        room.smoothed = false;

        var objBig = game.add.sprite(500, 1435, 'rock');

        objBig.scale.set(10,10);
        objBig.smoothed = false;

        var p1Big = game.add.sprite(430, 1550, 'p1');

        p1Big.scale.set(25,25);
        p1Big.smoothed = false;

        timer = 0;
    },

    update: function() {
        game.debug.text('Elapsed seconds: ' + timer, 32, 32);
        timer += game.time.physicsElapsed;

    }
}
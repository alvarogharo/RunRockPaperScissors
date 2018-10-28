RunRockPaperScissors.gameState = function(game) {

}

var map;
var timer;

RunRockPaperScissors.gameState.prototype = {

    preload: function() {
        game.load.image('roomEmpty', 'assets/sprites/rooms/roomEmpty.png');
        game.load.image('roomFull', 'assets/sprites/rooms/roomFull.png');
        game.load.image('roomP1Empty', 'assets/sprites/rooms/roomP1Empty.png');
        game.load.image('roomP1Full', 'assets/sprites/rooms/roomP1Full.png');
        game.load.image('roomP2Empty', 'assets/sprites/rooms/roomP2Empty.png');
        game.load.image('roomP2Full', 'assets/sprites/rooms/roomP2Full.png');

        game.load.image('map', 'assets/sprites/map/map.png');
        game.load.image('roomF', 'assets/sprites/room/roomFull.png');
        game.load.image('p1', 'assets/sprites/players/p1.png');
        game.load.image('p2', 'assets/sprites/players/p2.png');
        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');
        game.load.image('nothing', 'assets/sprites/objects/nothing.png');
    },

    create: function() {
        var scale = 8;

        //Textos superiores
        var text = game.add.bitmapText(90, 100, 'myFontB', 'P1', 80);
        text = game.add.bitmapText(880, 100, 'myFontR', 'P2', 80);
        text = game.add.bitmapText(480, 50, 'myFont', '10', 120);
        text.smoothed = false;
        text.color = 'white';

        //HUD Room p1 p2
        var p1Room = game.add.sprite(230, 100, 'roomEmpty');
        var p2Room = game.add.sprite(700, 100, 'roomEmpty');

        p1Room.scale.set(scale,scale);
        p2Room.scale.set(scale,scale);

        p1Room.smoothed = false;
        p2Room.smoothed = false;

        //HUD Obj p1 p2
        var p1Obj = game.add.sprite(253, 123, 'rock');
        var p2Obj = game.add.sprite(723, 123, 'nothing');

        p1Obj.scale.set(10,10);
        p2Obj.scale.set(10,10);

        p1Obj.smoothed = false;
        p2Obj.smoothed = false;

        //HUD Map
        var map = game.add.sprite(45, 300, 'map');

        map.scale.set(scale,scale);
        map.smoothed = false;

        //Bottom HUD room
        var room = game.add.sprite(270, 1350, 'roomF');

        room.scale.set(scale,scale);
        room.smoothed = false;

        //Bottom HUD obj
        var objBig = game.add.sprite(500, 1435, 'rock');

        objBig.scale.set(10,10);
        objBig.smoothed = false;

        var p1Big = game.add.sprite(430, 1550, 'p1');

        p1Big.scale.set(25,25);
        p1Big.smoothed = false;

        map = new Map();
        map.fullMap();
        map.rooms[0][3].type = 'paper';
        map.rooms[2][3].player = 'p2';
        aux2.rooms[2][3].type = 'paper';
        map.rooms[5][1].type = 'scissors';

        this.printMap(map);

        timer = 0;
    },

    update: function() {
        game.debug.text('Elapsed seconds: ' + timer, 32, 32);
        timer += game.time.physicsElapsed;

    },

    printMap: function(map){
        var offsetX = 100;
        var offsetY = 350;
        var spacing = 150;

        var objOffsetX = 32;
        var objOffsetY = 32;
        var paperOffsetX = 10;

        for(var i= 0; i<map.rooms[0].length;i++){
            for(var j= 0; j<map.rooms.length;j++){
                if ( map.rooms[i][j] != null ){
                    if (map.rooms[i][j].player != 'p1' && map.rooms[i][j].player != 'p2' && map.rooms[i][j].type == 'nothing'){
                        var room = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomEmpty');
                        room.scale.set(8,8);
                        room.smoothed = false;
                    }else if (map.rooms[i][j].player != 'p1' && map.rooms[i][j].player != 'p2' && map.rooms[i][j].type != 'nothing'){
                        var room = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomFull');
                        room.scale.set(8,8);
                        room.smoothed = false;
                    }else if (map.rooms[i][j].player == 'p1'&& map.rooms[i][j].type == 'nothing'){
                        var room = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP1Empty');
                        room.scale.set(8,8);
                        room.smoothed = false;
                    }else if (map.rooms[i][j].player == 'p1'&& map.rooms[i][j].type != 'nothing'){
                        var room = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP1Full');
                        room.scale.set(8,8);
                        room.smoothed = false;
                    }else if (map.rooms[i][j].player == 'p2'&& map.rooms[i][j].type == 'nothing'){
                        var room = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP2Empty');
                        room.scale.set(8,8);
                        room.smoothed = false;
                    }else if (map.rooms[i][j].player == 'p2'&& map.rooms[i][j].type != 'nothing'){
                        var room = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP2Full');
                        room.scale.set(8,8);
                        room.smoothed = false;
                    }

                    if (map.rooms[i][j].player != 'p1' && map.rooms[i][j].player != 'p2'){
                        switch(map.rooms[i][j].type){
                            case 'rock':
                                var obj = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'rock');
                                obj.scale.set(8,8);
                                obj.smoothed = false;
                                break;
                            case 'paper':
                                var obj = game.add.sprite(paperOffsetX+objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'paper');
                                obj.scale.set(8,8);
                                obj.smoothed = false;
                                break;
                            case 'scissors':
                                var obj = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'scissors');
                                obj.scale.set(8,8);
                                obj.smoothed = false;
                                break;
                        }
                    }

                    switch(map.rooms[i][j].player){
                        case 'p1':
                            var obj = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'p1');
                            obj.scale.set(8,8);
                            obj.smoothed = false;
                            break;
                        case 'p2':
                            var obj = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'p2');
                            obj.scale.set(8,8);
                            obj.smoothed = false;
                            break;
                    }
                }
            }
        }
    }
}
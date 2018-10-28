RunRockPaperScissors.gameState = function(game) {

}

var map;
var p1;
var p2;

var cursors;
var wasd;
var onceP1;
var onceP2;

var timer;
var timerObj;

var graphics
var countDown;
var countDownObj;
var play;

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
        game.load.image('roomE', 'assets/sprites/room/roomEmpty.png');
        game.load.image('p1', 'assets/sprites/players/p1.png');
        game.load.image('p2', 'assets/sprites/players/p2.png');
        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');
        game.load.image('nothing', 'assets/sprites/objects/nothing.png');
    },

    create: function() {
        var scale = 8;
        onceP1 = false;
        onceP2 = false;
        countDown = 3;
        timer = 5;
        play = false;

        map = new Map();
        map.createLevel(map.levels[Math.floor(Math.random() * map.levels.length)]);

        p1 = new Player(map.p1Pos[0],map.p1Pos[1],'p1');
        p2 = new Player(map.p2Pos[0],map.p2Pos[1],'p2');

        //Textos superiores
        var text = game.add.bitmapText(90, 100, 'myFontB', 'P1', 80);
        text.smoothed = false;
        text = game.add.bitmapText(880, 100, 'myFontR', 'P2', 80);
        timerObj = game.add.bitmapText(520, 50, 'myFont', Math.round(timer).toString(), 120);
        timerObj.smoothed = false;
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
        p1.hud1 = game.add.sprite(253, 123, 'rock');
        p2.hud1 = game.add.sprite(723, 123, 'nothing');

        

        p1.hud1.scale.set(10,10);
        p2.hud1.scale.set(10,10);

        p1.hud1.smoothed = false;
        p2.hud1.smoothed = false;

        //HUD Map
        var mapH = game.add.sprite(45, 300, 'map');

        mapH.scale.set(scale,scale);
        mapH.smoothed = false;

        //Bottom HUD room
        p1.hudRoom= game.add.sprite(270, 1350, 'roomE');

        p1.hudRoom.scale.set(scale,scale);
        p1.hudRoom.smoothed = false;

        //Bottom HUD obj
        p1.hud2 = game.add.sprite(500, 1435, 'rock');

        p1.hud2.scale.set(10,10);
        p1.hud2.smoothed = false;

        var p1Big = game.add.sprite(430, 1550, 'p1');

        p1Big.scale.set(25,25);
        p1Big.smoothed = false;

        cursors = game.input.keyboard.createCursorKeys();

        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };


        this.printMap(map);

        graphics = game.add.graphics(0,0);
        // draw a rectangle
        graphics.beginFill('black');
        graphics.drawRect(0, 1320, 1080, 600);
        graphics.endFill();

        countDownObj = game.add.bitmapText(480, 1450, 'myFont', countDown.toString(), 200);
    },

    update: function() {

        if (countDown >= -3){
            countDown -= game.time.physicsElapsed*3;
        }

        if (countDown >= 1){
            countDownObj.setText(Math.round(countDown).toString());
        }else if (countDown <= 0){
            countDownObj.x = 380;
            countDownObj.setText('GO!');
        }
        
        if (countDown <= -2){
            countDownObj.visible = false;
            graphics.destroy();
            play = true;
        }

        if (play && timer >= 0){

            timer -= game.time.physicsElapsed;
            timerObj.setText(Math.round(timer).toString());

            if(!onceP2){
                if (cursors.left.isDown){
                    onceP2 = true;
                    p2.move(map,'left', false);
                }else if (cursors.right.isDown){
                    onceP2 = true;
                    p2.move(map,'right', false);
                }else if (cursors.up.isDown){
                    onceP2 = true;
                    p2.move(map,'up', false);
                }else if (cursors.down.isDown){
                    onceP2 = true;
                    p2.move(map,'down', false);
                }
            }

            if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown){
                onceP2 = false;
            }

            if(!onceP1){
                if (wasd.left.isDown){
                    onceP1 = true;
                    p1.move(map,'left', false);
                }else if (wasd.right.isDown){
                    onceP1 = true;
                    p1.move(map,'right', false);
                }else if (wasd.up.isDown){
                    onceP1 = true;
                    p1.move(map,'up', false);
                }else if (wasd.down.isDown){
                    onceP1 = true;
                    p1.move(map,'down', false);
                }
            }

            if (!wasd.right.isDown && !wasd.left.isDown && !wasd.up.isDown && !wasd.down.isDown){
                onceP1 = false;
            }
        }else if (timer < 0){
            game.state.start('versusState', true, false, p1.item, p2.item);
        }
        
        p1.updateHUD();
        p2.updateHUD();

        this.rePrintMap(map);
    },


    printMap: function(map){
        var offsetX = 100;
        var offsetY = 350;
        var spacing = 150;

        var objOffsetX = 32;
        var objOffsetY = 32;
        var paperOffsetX = 10;

        var auxRoom;

        for(var i= 0; i<map.rooms[0].length;i++){
            for(var j= 0; j<map.rooms.length;j++){
                auxRoom = map.rooms[i][j];
                
                if ( auxRoom != null ){
                    if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type == 'nothing'){
                        map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomEmpty');
                        map.sprites[i][j].scale.set(8,8);
                        map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type != 'nothing'){
                        map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomFull');
                        map.sprites[i][j].scale.set(8,8);
                        map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p1'&& auxRoom.type == 'nothing'){
                        map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP1Empty');
                        map.sprites[i][j].scale.set(8,8);
                        map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p1'&& auxRoom.type != 'nothing'){
                        map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP1Full');
                        map.sprites[i][j].scale.set(8,8);
                        map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p2'&& auxRoom.type == 'nothing'){
                        map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP2Empty');
                        map.sprites[i][j].scale.set(8,8);
                        map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p2'&& auxRoom.type != 'nothing'){
                        map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP2Full');
                        map.sprites[i][j].scale.set(8,8);
                        map.sprites[i][j].smoothed = false;
                    }

                    if (auxRoom.player != 'p1' && auxRoom.player != 'p2'){
                        switch(auxRoom.type){
                            case 'rock':
                                map.objs[i][j] = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'rock');
                                map.objs[i][j].scale.set(8,8);
                                map.objs[i][j].smoothed = false;
                                break;
                            case 'paper':
                                map.objs[i][j] = game.add.sprite(paperOffsetX+objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'paper');
                                map.objs[i][j].scale.set(8,8);
                                map.objs[i][j].smoothed = false;
                                break;
                            case 'scissors':
                                map.objs[i][j] = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'scissors');
                                map.objs[i][j].scale.set(8,8);
                                map.objs[i][j].smoothed = false;
                                break;
                        }
                    }

                    switch(auxRoom.player){
                        case 'p1':
                            p1.sprite = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'p1');
                            p1.sprite.scale.set(8,8);
                            p1.sprite.smoothed = false;
                            break;
                        case 'p2':
                            p2.sprite = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'p2');
                            p2.sprite.scale.set(8,8);
                            p2.sprite.smoothed = false;
                            break;
                    }
                }
            }
        }
    },

    rePrintMap: function(map){
        for(var i= 0; i<map.rooms[0].length;i++){
            for(var j= 0; j<map.rooms.length;j++){
                var auxRoom = map.rooms[i][j];
                if (auxRoom != null){
                    if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type == 'nothing'){
                        map.sprites[i][j].loadTexture('roomEmpty');
                    }else if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type != 'nothing'){
                        map.sprites[i][j].loadTexture('roomFull');
                    }else if (auxRoom.player == 'p1'&& auxRoom.type == 'nothing'){
                        map.sprites[i][j].loadTexture('roomP1Empty');
                    }else if (auxRoom.player == 'p1'&& auxRoom.type != 'nothing'){
                        map.sprites[i][j].loadTexture('roomP1Full');
                    }else if (auxRoom.player == 'p2'&& auxRoom.type == 'nothing'){
                        map.sprites[i][j].loadTexture('roomP2Empty');
                    }else if (auxRoom.player == 'p2'&& auxRoom.type != 'nothing'){
                        map.sprites[i][j].loadTexture('roomP2Full');
                    }

                    if (map.objs[i][j] != null){
                        if (auxRoom.player == 'p1' || auxRoom.player == 'p2'){
                            map.objs[i][j].visible = false;
                        }else{
                            map.objs[i][j].visible = true;
                        }
                    }
                }
            }
        }

        
    }
}
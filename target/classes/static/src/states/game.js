RunRockPaperScissors.gameState = function(game) {
    this.map;
    this.p1;
    this.p2;

    this.cursors;
    this.wasd;
    this.onceP1;
    this.onceP2;

    this.timer;
    this.timerObj;

    this.graphics
    this.countDown;
    this.countDownObj;
    this.play;
}



RunRockPaperScissors.gameState.prototype = {

    preload: function() {
        //Room icons
        game.load.image('roomEmpty', 'assets/sprites/rooms/roomEmpty.png');
        game.load.image('roomFull', 'assets/sprites/rooms/roomFull.png');
        game.load.image('roomP1Empty', 'assets/sprites/rooms/roomP1Empty.png');
        game.load.image('roomP1Full', 'assets/sprites/rooms/roomP1Full.png');
        game.load.image('roomP2Empty', 'assets/sprites/rooms/roomP2Empty.png');
        game.load.image('roomP2Full', 'assets/sprites/rooms/roomP2Full.png');

        //HUD icons
        game.load.image('map', 'assets/sprites/map/map.png');
        game.load.image('roomF', 'assets/sprites/room/roomFull.png');
        game.load.image('roomE', 'assets/sprites/room/roomEmpty.png');

        //Sounds
        game.load.audio('objRoom', 'assets/sounds/objRoom.wav');
    },

    create: function() {
        var scale = 8;
        this.onceP1 = false;
        this.onceP2 = false;
        this.countDown = 3;
        this.timer = 5;
        this.play = false;

        //Creating the map
        this.map = new Map();
        this.map.createLevel(this.map.levels[Math.floor(Math.random() * this.map.levels.length)]);

        //Creating the players
        var p1Pos = this.map.p1Pos;
        var p2Pos = this.map.p2Pos;

        this.p1 = new Player(p1Pos[0],p1Pos[1],'p1');
        this.p2 = new Player(p2Pos[0],p2Pos[1],'p2');

        //Upper texts
        var text = game.add.bitmapText(90, 100, 'myFontB', 'P1', 80);
        text.smoothed = false;
        text = game.add.bitmapText(880, 100, 'myFontR', 'P2', 80);
        text.smoothed = false;

        this.timerObj = game.add.bitmapText(520, 50, 'myFont', Math.round(this.timer).toString(), 120);
        this.timerObj.smoothed = false;

        //HUD Room p1 p2
        var p1Room = game.add.sprite(230, 100, 'roomEmpty');
        var p2Room = game.add.sprite(700, 100, 'roomEmpty');

        p1Room.scale.set(scale,scale);
        p2Room.scale.set(scale,scale);

        p1Room.smoothed = false;
        p2Room.smoothed = false;

        //HUD Obj p1 p2
        this.p1.hud1 = game.add.sprite(253, 123, 'rock');
        this.p2.hud1 = game.add.sprite(723, 123, 'nothing');

        var hudObjScale = 10;
        this.p1.hud1.scale.set(hudObjScale,hudObjScale);
        this.p2.hud1.scale.set(hudObjScale,hudObjScale);

        this.p1.hud1.smoothed = false;
        this.p2.hud1.smoothed = false;

        //HUD Map
        var mapH = game.add.sprite(45, 300, 'map');

        mapH.scale.set(scale,scale);
        mapH.smoothed = false;

        //Bottom HUD room
        this.p1.hudRoom= game.add.sprite(270, 1350, 'roomE');

        this.p1.hudRoom.scale.set(scale,scale);
        this.p1.hudRoom.smoothed = false;

        //Bottom HUD obj
        this.p1.hud2 = game.add.sprite(500, 1435, 'rock');

        this.p1.hud2.scale.set(10,10);
        this.p1.hud2.smoothed = false;

        var p1Big = game.add.sprite(430, 1550, 'p1');

        p1Big.scale.set(25,25);
        p1Big.smoothed = false;

        //Player control intialization
        this.p1.createCursor();
        this.p2.createCursor();

        //Printing map
        this.printMap(this.map);

        //Countdown background
        graphics = game.add.graphics(0,0);
        graphics.beginFill('black');
        graphics.drawRect(0, 1320, 1080, 600);
        graphics.endFill();

        //Countdown text
        this.countDownObj = game.add.bitmapText(480, 1450, 'myFont', this.countDown.toString(), 200);
    },

    update: function() {

        //CountDown Managing
        this.updateCountdown();

        //Game loopwiththe timer
        if (this.play && this.timer >= 0){

            this.timer -= game.time.physicsElapsed;
            this.timerObj.setText(Math.round(this.timer).toString());

            this.p1.handleInput(this.map);
            this.p2.handleInput(this.map);

        }else if (this.timer < 0){ //When the time its over
            game.state.start('versusState', true, false, this.p1.item, this.p2.item);
        }
        
        //Updating hud
        this.p1.updateHUD();
        this.p2.updateHUD();

        //Updating the map
        this.rePrintMap(this.map);
    },

    //First printo of the map
    printMap: function(map){
        var offsetX = 100;
        var offsetY = 350;
        var spacing = 150;

        var objOffsetX = 32;
        var objOffsetY = 32;
        var paperOffsetX = 10;

        var auxRoom;

        for(var i= 0; i<this.map.rooms[0].length;i++){
            for(var j= 0; j<this.map.rooms.length;j++){
                auxRoom = this.map.rooms[i][j];
                //Printing rooms
                if ( auxRoom != null ){
                    if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type == 'nothing'){
                        this.map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomEmpty');
                        this.map.sprites[i][j].scale.set(8,8);
                        this.map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type != 'nothing'){
                        this.map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomFull');
                        this.map.sprites[i][j].scale.set(8,8);
                        this.map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p1'&& auxRoom.type == 'nothing'){
                        this.map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP1Empty');
                        this.map.sprites[i][j].scale.set(8,8);
                        this.map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p1'&& auxRoom.type != 'nothing'){
                        this.map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP1Full');
                        this.map.sprites[i][j].scale.set(8,8);
                        this.map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p2'&& auxRoom.type == 'nothing'){
                        this.map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP2Empty');
                        this.map.sprites[i][j].scale.set(8,8);
                        this.map.sprites[i][j].smoothed = false;
                    }else if (auxRoom.player == 'p2'&& auxRoom.type != 'nothing'){
                        this.map.sprites[i][j] = game.add.sprite(offsetX+(spacing*i), offsetY+(spacing*j), 'roomP2Full');
                        this.map.sprites[i][j].scale.set(8,8);
                        this.map.sprites[i][j].smoothed = false;
                    }

                    //printing objs
                    if (auxRoom.player != 'p1' && auxRoom.player != 'p2'){
                        switch(auxRoom.type){
                            case 'rock':
                                this.map.objs[i][j] = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'rock');
                                this.map.objs[i][j].scale.set(8,8);
                                this.map.objs[i][j].smoothed = false;
                                break;
                            case 'paper':
                                this.map.objs[i][j] = game.add.sprite(paperOffsetX+objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'paper');
                                this.map.objs[i][j].scale.set(8,8);
                                this.map.objs[i][j].smoothed = false;
                                break;
                            case 'scissors':
                                this.map.objs[i][j] = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'scissors');
                                this.map.objs[i][j].scale.set(8,8);
                                this.map.objs[i][j].smoothed = false;
                                break;
                        }
                    }
                    
                    //Printing players
                    switch(auxRoom.player){
                        case 'p1':
                            this.p1.sprite = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'p1');
                            this.p1.sprite.scale.set(8,8);
                            this.p1.sprite.smoothed = false;
                            break;
                        case 'p2':
                            this.p2.sprite = game.add.sprite(objOffsetX+offsetX+(spacing*i), objOffsetY+offsetY+(spacing*j), 'p2');
                            this.p2.sprite.scale.set(8,8);
                            this.p2.sprite.smoothed = false;
                            break;
                    }
                }
            }
        }
    },

    //updating map
    rePrintMap: function(map){
        for(var i= 0; i<this.map.rooms[0].length;i++){
            for(var j= 0; j<this.map.rooms.length;j++){
                var auxRoom = this.map.rooms[i][j];
                //Updating rooms
                if (auxRoom != null){
                    if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type == 'nothing'){
                        this.map.sprites[i][j].loadTexture('roomEmpty');
                    }else if (auxRoom.player != 'p1' && auxRoom.player != 'p2' && auxRoom.type != 'nothing'){
                        this.map.sprites[i][j].loadTexture('roomFull');
                    }else if (auxRoom.player == 'p1'&& auxRoom.type == 'nothing'){
                        this.map.sprites[i][j].loadTexture('roomP1Empty');
                    }else if (auxRoom.player == 'p1'&& auxRoom.type != 'nothing'){
                        this.map.sprites[i][j].loadTexture('roomP1Full');
                    }else if (auxRoom.player == 'p2'&& auxRoom.type == 'nothing'){
                        this.map.sprites[i][j].loadTexture('roomP2Empty');
                    }else if (auxRoom.player == 'p2'&& auxRoom.type != 'nothing'){
                        this.map.sprites[i][j].loadTexture('roomP2Full');
                    }
                    
                    //Updatng objs
                    if (this.map.objs[i][j] != null){
                        if (auxRoom.player == 'p1' || auxRoom.player == 'p2'){
                            this.map.objs[i][j].visible = false;
                        }else{
                            this.map.objs[i][j].visible = true;
                        }
                    }
                }
            }
        }

        
    },

    updateCountdown: function(){
        if (this.countDown >= -3){
            this.countDown -= game.time.physicsElapsed*3;
        }

        if (this.countDown >= 1){
            this.countDownObj.setText(Math.round(this.countDown).toString());
        }else if (this.countDown <= 0){
            this.countDownObj.x = 380;
            this.countDownObj.setText('GO!');
        }
        
        if (this.countDown <= -2){
            this.countDownObj.visible = false;
            graphics.destroy();
            this.play = true;
        }
    }
}
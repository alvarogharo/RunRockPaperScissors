RunRockPaperScissors.gameState = function(game) {
    //Reference variables
    this.map;
    this.p1;
    this.p2;

    this.cursors;

    //Timer variables
    var timer;
    this.timerObj;
    var countDown;
    this.countDownObj;

    //Graphics variable
    this.graphics
    
    //State variables
    var play;

    var p1Pos;
    var p2Pos;

    var auxP1;
    var auxP2;
    var onceg;
}

var auxMap;


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
        
        console.log("Id: "+id);
        console.log("otherId: "+otherId);

        var scale = 8;
        countDown = 3;
        timer = 5;
        play = false;
        onceg = false;

        this.intiWS();

        //Creating the map
        this.map = new Map();

        this.map.createLevel(serverMap);
        auxMap = this.map;
        
        p1Pos = this.map.p1Pos;
        p2Pos = this.map.p2Pos;

        this.p1 = new Player(p1Pos[0],p1Pos[1],'p1');
        this.p2 = new Player(p2Pos[0],p2Pos[1],'p2');
            
        //Updating player initial position
        this.p1.putPlayer();
        this.p2.putPlayer();

        //INTERFACE
        //Upper texts
        var text = game.add.bitmapText(90, 100, 'myFontB', 'P1', 80);
        text.smoothed = false;
        text = game.add.bitmapText(880, 100, 'myFontR', 'P2', 80);
        text.smoothed = false;

        this.timerObj = game.add.bitmapText(520, 50, 'myFont', Math.round(timer).toString(), 120);
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
        if (id == 1){
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
        }else{
            this.p2.hudRoom= game.add.sprite(270, 1350, 'roomE');

            this.p2.hudRoom.scale.set(scale,scale);
            this.p2.hudRoom.smoothed = false;

            //Bottom HUD obj
            this.p2.hud2 = game.add.sprite(500, 1435, 'rock');

            this.p2.hud2.scale.set(10,10);
            this.p2.hud2.smoothed = false;

            var p2Big = game.add.sprite(430, 1550, 'p2');

            p2Big.scale.set(25,25);
            p2Big.smoothed = false;
        }

        //Player control intialization
        if (id == 1){
            this.p1.createCursor();
        }else{
            this.p2.createCursor();
        }

        //Printing map
        this.printMap(this.map);

        //Countdown background
        graphics = game.add.graphics(0,0);
        graphics.beginFill('black');
        graphics.drawRect(0, 1320, 1080, 600);
        graphics.endFill();
        

        if (host){
            this.startTimer();
            this.resetReady();
        }

        //Countdown text
        this.countDownObj = game.add.bitmapText(480, 1450, 'myFont', countDown.toString(), 200);
    },

    update: function() {
        auxMap = this.map;

        //CountDown Managing
        this.updateCountdown();

        //Game loop with the timer
        if (play && timer >= 0){

            this.timerObj.setText(Math.round(timer).toString());

            //Handle local player input
            if (id == 1){
                this.p1.handleInput(this.map);
            }else{
                this.p2.handleInput(this.map);
            }
            auxP1 = this.p1;
            auxP2 = this.p2;
            
            //Get other player position
            this.getPlayer();

        }else if (timer < 0){ //When the time its over
            if (host){
                
                this.resetTimer();
                this.resetReady();
            }
            game.state.start('versusState', true, false, this.p1.item, this.p2.item);
        }
        
        //Updating hud
        this.p1.updateHUD();
        this.p2.updateHUD();

        //Updating the map
        this.rePrintMap(this.map);
    },

    /*Print the sprites depending on the map state
     *@param map: Object of class Map. Current map state
     */
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

    /*Updates the sprites depending on the map state
     *@param map: Object of class Map. Current map state
     */
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

    //Updates countdown and trigger actions depending on time
    updateCountdown: function(){
        this.getCountDown();

        if (countDown >= 1){
            this.countDownObj.setText(Math.round(countDown).toString());
        }else if (countDown <= 0){
            this.countDownObj.x = 380;
            this.countDownObj.setText('GO!');
        }
        
        if (countDown <= -2 && !play){
            this.countDownObj.visible = false;
            graphics.destroy();
            play = true;
            this.startTimer();
        }
    },

    intiWS: function(){
        ws.onmessage = function (message) {
            if (debug) {
                console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data);
            }

            var msg = JSON.parse(message.data);

            //console.log('INFO RECIBIDA ' + msg.type);

            switch (msg.type) {
                case "COUNTDOWN":
                    if (!play){
                        
                        countDown = 3-msg.countdown;
                    }else{
                        timer = 5-msg.countdown; 
                    }
                    break;
                case "PLAYER":
                    pos = eval(msg.position);

                    if(otherId == 1){
                        auxP1.moveServer(auxMap, pos);

                    }else{
                        auxP2.moveServer(auxMap, pos);
                    }
                    break;
            }
        }
    },

    //Get player position and executes callback when finished
    getPlayer: function(callback) {
        //console.log("Otherid: "+otherId);
        data = {
            type: 'GET_PLAYER',
            id: otherId
        }
        ws.send(JSON.stringify(data));
    },

    //Get timer server value and executes callback when finished
    getCountDown: function() {

        data = {
            type: 'GET_COUNTDOWN'
        }
        ws.send(JSON.stringify(data));
    },

    //Start server timer
    startTimer: function () {

        data = {
            type: 'START_TIMER'
        }
        ws.send(JSON.stringify(data));
    },

    //Resets server timer
    resetTimer: function(callback) {

        data = {
            type: 'RESTART_TIMER'
        }
        ws.send(JSON.stringify(data));
    },

    //Resets server ready people
    resetReady: function () {

        data = {
            type: 'RESET_READY'
        }
        ws.send(JSON.stringify(data));
    },

    //Increments ready players by one
    ready: function() {
        data = {
            type: 'READY'
        }
        ws.send(JSON.stringify(data));
    },

    //Gets the number of players ready
    getReady: function (callback) {
        data = {
            type: 'GET_READY'
        }
        ws.send(JSON.stringify(data));
    }
}
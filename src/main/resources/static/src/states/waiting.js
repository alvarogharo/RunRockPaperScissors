RunRockPaperScissors.waitingState = function(game) {
    

    //Reference variables
    var serverMap;
    var lastMap;

    //State variables
    var ready;
    this.timer;
    var once;
}

var texts;

RunRockPaperScissors.waitingState.prototype = {

    create: function() {
        this.intiWS();
        once = false;
        ready = 0;
        if (!restart && !replay){
            lastMap = null;
            serverMap = null;
        }
        //Texts
        texts = new Array();
        texts[0] = game.add.bitmapText(130, 440, 'myFont', 'WAITING', 120);
        texts[1] = game.add.bitmapText(130, 600, 'myFont', 'For', 120);
        texts[2] = game.add.bitmapText(130, 760, 'myFont', 'Other', 120);
        texts[3] = game.add.bitmapText(130, 920, 'myFont', 'Player...', 120);

        for(var t in texts){
            t.smoothed = false;
        }

        //Timer initialization
        this.timer = 0;

        //Get server map
        if (host){    
            this.getRandomGameMap();
        }else{
            if (!restart){
                this.getGameMap();
            }
        }
    },

    update: function() {
        this.updateTimer();

        if (!restart){
            this.getNumPlayers();
        }

        if (!host){
            this.getReady();

            if (ready == 1 && !once){
                once = true;
                this.getGameMap();
            }
        }else{
            this.getReady();
        }     
    },

    //Updates timmer and animate text
    updateTimer: function(){
        //Timer waits for 3 seconds
        this.timer += game.time.physicsElapsed;

        if (this.timer >= 3){
            this.timer = 0;
        }
        if (this.timer >= 2){
            texts[3].setText('Player...');
        }else if (this.timer >= 1){
            texts[3].setText('Player..');
        }else if (this.timer >= 0){
            texts[3].setText('Player.');
        }
    },

    intiWS: function(){
        ws.onmessage = function (message) {
            if (debug) {
                console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data);
            }

            //Increments ready players by one
            function ready() {
                data = {
                    type: 'READY'
                }
                ws.send(JSON.stringify(data));
            }

            var msg = JSON.parse(message.data);

            console.log('INFO RECIBIDA ' + msg.type);

            switch (msg.type) {
                case "RANDOM_MAP":
                    console.log('GameMap: '+ msg.gameMap);
                    serverMap = msg.gameMap;
                    lastMap = serverMap;
                    if (restart){
                        ready();
                    }
                    break;
                case "N_PLAYERS":
                    if(msg.nPlayers > 1){
                        if (host){
                            id = 1;
                            otherId = 2;
                        }else{
                            id = 2;
                            otherId = 1;
                        }
                        game.state.start('gameState');
                    }
                    break;
                case "GAMEMAP":
                    console.log('GameMap: '+ msg.gameMap);
                    serverMap = msg.gameMap;
                    ready();
                    lastMap = serverMap;
                    game.state.start('gameState');
                    break;
                case "READY":
                    ready = msg.ready;
                    if (ready > 1 && !host){
                        lastMap = serverMap;
                        game.state.start('gameState');
                    }
                    break;
            }
        }
    },

    //Gets the server gamemap
    getGameMap: function (callback) {
        data = {
            type: 'GET_GAMEMAP'
        }
        ws.send(JSON.stringify(data));
    },

    //Gets the number of players
    getNumPlayers: function (callback) {
        data = {
            type: 'GET_N_PLAYERS'
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
    },

    //Get a random server map
    getRandomGameMap: function () {
        data = {
            type: 'GET_RANDOM_MAP'
        }
        ws.send(JSON.stringify(data));
    }
}



//Compare to maps
function compareMaps (map1, map2) {
    for(var i= 0; i<map1[0].length;i++){
        for(var j= 0; j<map1.length;j++){
            if (map1[i][j] != map2[i][j]){
                return false;
            }
        }
    }
    return true;
}
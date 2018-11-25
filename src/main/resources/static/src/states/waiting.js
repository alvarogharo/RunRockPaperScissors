RunRockPaperScissors.waitingState = function(game) {
    this.timer;
    var serverMap;
    var lastMap;
    var ready;
}

var texts;

RunRockPaperScissors.waitingState.prototype = {

    create: function() {
        ready = 0;
        if (!restart){
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

        this.getGameMap(function(gameMap){
            
            serverMap = gameMap;
            console.log(serverMap);

            
            if (lastMap != null && compareMaps(serverMap,lastMap)){
                getRandomGameMap(function(gameMap){
                    //console.log(gameMap);
                    serverMap = gameMap;
                });
            }
            lastMap = serverMap;
            console.log('iguales'+compareMaps(serverMap,lastMap));
        });
    },

    update: function() {
        this.updateTimer();

        if (!restart){
            this.getNumPlayers(function(numPlayers){
                if(numPlayers.length > 1){
                    if (host){
                        id = 1;
                        otherId = 2;
                    }else{
                        id = 2;
                        otherId = 1;
                    }
                    game.state.start('gameState');
                }
            });
        }else{
            if (host){
                this.getReady(function(data){
                    console.log('Data '+ data);
                    if (data > 0){
                        game.state.start('gameState');
                    } 
                })
            }else{
                this.ready();
                game.state.start('gameState');
            }
        }
    },

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

    getGameMap: function (callback) {
        $.ajax({
            url: 'http://localhost:8080/map',
        }).done(function (data) {
            callback(data);
        })
    },

   

    getNumPlayers: function (callback) {
        $.ajax({
            url: 'http://localhost:8080/game',
        }).done(function (data) {
            callback(data);
        })
    },

    getReady: function (callback) {
        $.ajax({
            url: 'http://localhost:8080/ready',
        }).done(function (data) {
            callback(data);
        })
    },

    ready: function () {
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/ready',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
        })
    }
}

function getRandomGameMap (callback) {
    $.ajax({
        url: 'http://localhost:8080/randomMap',
    }).done(function (data) {
        callback(data);
    })
}

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
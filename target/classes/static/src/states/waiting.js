RunRockPaperScissors.waitingState = function(game) {
    

    //Reference variables
    var serverMap;
    var lastMap;

    //State variables
    var ready;
    this.timer;
    var once

}

var texts;

RunRockPaperScissors.waitingState.prototype = {

    create: function() {
        once = false;
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

        //Get server map
        this.getGameMap(function(gameMap){
            
            serverMap = gameMap;
            console.log(serverMap);

            //If map has already been played generate another one
            if (lastMap != null && compareMaps(serverMap,lastMap)){
                getRandomGameMap(function(gameMap){
                    //console.log(gameMap);
                    serverMap = gameMap;
                });
            }
            lastMap = serverMap;
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
                if(!once){
                    once = true;
                    this.ready();
                }
                this.getReady(function(data){
                    if (data > 1){
                        game.state.start('gameState');
                    } 
                })
            }else{
                if(!once){
                    once = true;
                    this.ready();
                }
                this.getReady(function(data){
                    if (data > 1){
                        game.state.start('gameState');
                    } 
                })
            }
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

    //Gets the server gamemap
    getGameMap: function (callback) {
        $.ajax({
            url: loc+'map',
        }).done(function (data) {
            callback(data);
        })
    },

    //Gets the number of players
    getNumPlayers: function (callback) {
        $.ajax({
            url: loc+'game',
        }).done(function (data) {
            callback(data);
        })
    },

    //Gets the number of players ready
    getReady: function (callback) {
        $.ajax({
            url: loc+'ready',
        }).done(function (data) {
            callback(data);
        })
    },

    //Increments ready players by one
    ready: function () {
        $.ajax({
            method: "POST",
            url: loc+'ready',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
        })
    }
}

//Get a random server map
function getRandomGameMap (callback) {
    $.ajax({
        url: loc+'randomMap',
    }).done(function (data) {
        callback(data);
    })
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
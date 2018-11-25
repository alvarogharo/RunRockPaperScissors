RunRockPaperScissors.waitingState = function(game) {
    this.timer;
    var serverMap;
}

var texts;

RunRockPaperScissors.waitingState.prototype = {

    create: function() {
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
            //console.log(gameMap);
            serverMap = gameMap;
        });
    },

    update: function() {
        this.updateTimer();

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
        console.log("GetMap");
        $.ajax({
            url: 'http://localhost:8080/map',
        }).done(function (data) {
            callback(data);
        })
    },

    getNumPlayers: function (callback) {
        console.log("GetNumplayers");
        $.ajax({
            url: 'http://localhost:8080/game',
        }).done(function (data) {
            callback(data);
        })
    }
}
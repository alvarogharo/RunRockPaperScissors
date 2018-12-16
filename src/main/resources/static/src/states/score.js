RunRockPaperScissors.scoreState = function(game) {

}

var timer;

RunRockPaperScissors.scoreState.prototype = {

    create: function() {

        this.intiWS();

        //Timer initialization
        timer = 0;

        //Texts
        var texts = new Array();
        texts[0] = game.add.bitmapText(130, 100+100, 'myFont', 'MATCH', 120);
        texts[1] = game.add.bitmapText(130, 260+100, 'myFont', 'Scoreboard', 120);

        texts[2] = game.add.bitmapText(260, 730, 'myFontB', 'P1', 120);
        texts[3] = game.add.bitmapText(730, 730, 'myFontR', 'P2', 120); 
        texts[4] = game.add.bitmapText(500, 900, 'myFont', '-', 160);

        texts[5] = game.add.bitmapText(300, 930, 'myFontB', score[0].toString(), 150);
        texts[6] = game.add.bitmapText(760, 930, 'myFontR',score[1].toString(), 150);

        for(var t in texts){
            t.smoothed = false;
        }

        game.sound.play('buttonClicked');
        if (host){
            this.startTimer();
        }
    },

    update: function() {

        this.getCountDown();

        if (timer >= 3){
            if (host) this.resetTimer();
            if (score[0] == mode){
                game.state.start('winnerState', true, false, 1);
            }else if (score[1] == mode){
                game.state.start('winnerState', true, false, 2);
            }else if(score[0] < mode && score[1] < mode) {
                replay = true;
                restart = true;
                once = false;
                game.state.start('waitingState');
            }
            
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
                    timer = msg.countdown;
                    break;
            }
        }
    },

    //Gets server timer
    getCountDown: function(callback) {

        data = {
            type: 'GET_COUNTDOWN'
        }
        ws.send(JSON.stringify(data));
    },

    //Resets server timer
    resetTimer: function() {
        data = {
            type: 'RESTART_TIMER'
        }
        ws.send(JSON.stringify(data));
    },

    //Starts server timer
    startTimer: function () {
        data = {
            type: 'START_TIMER'
        }
        ws.send(JSON.stringify(data));
    } 
}
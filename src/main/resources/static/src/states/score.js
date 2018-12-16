RunRockPaperScissors.scoreState = function(game) {

    this.end;

    var onces;
    var readys;
}

var timer;

RunRockPaperScissors.scoreState.prototype = {

    create: function() {

        this.intiWS();
        this.end = false;
        onces = false;
        readys = 0;

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
            this.resetReady();
        }
    },

    update: function() {

        this.getCountDown();

        if (timer >= 3){
            this.end = true;
        }

        if (this.end){

            this.getReady();
            if (!onces){
                onces = true;
                this.ready();
            }

            if (readys > 1){
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
                case "READY":
                    readys = msg.ready;
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
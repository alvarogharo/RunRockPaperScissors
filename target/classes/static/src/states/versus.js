RunRockPaperScissors.versusState = function(game) {
    timer;
    this.p1;
    this.p2;
    this.p1Wins;
    this.p2Wins;
    this.wins;
    this.scale;
    this.winner;
}

var one;


RunRockPaperScissors.versusState.prototype = {
    init: function(player1, player2){
        this.p1 = player1;
        this.p2 = player2;
    },

    create: function() {

        this.intiWS();
        
        //Initializing scale
        this.scale = 12;

        //Texts
        var texts = new Array();
        texts[0] = game.add.bitmapText(260, 450, 'myFontB', 'P1', 80);
        texts[1] = game.add.bitmapText(730, 450, 'myFontR', 'P2', 80);  
        texts[2] = game.add.bitmapText(450, 580, 'myFont', 'VS', 120);

        for (var t in texts){
            t.smoothed = false;
        }

        //Round winner texts
        this.p1Wins = game.add.bitmapText(260, 1000, 'myFontB', 'P1', 120);
        this.p1Wins.smoothed = false;
        this.p1Wins.visible = false;

        this.p2Wins = game.add.bitmapText(260, 1000, 'myFontR', 'P2', 120);
        this.p2Wins.smoothed = false
        this.p2Wins.visible = false;

        this.wins = game.add.bitmapText(260, 1200, 'myFont', 'Wins', 120);
        this.wins.smoothed = false;
        this.wins.visible = false;

        //Printing player final obj
        this.printPlayersObj();

        //Determining winner
        this.winner = 0;
        this.winner = this.determineWinner();

        //Updating global score
        this.updateScore();

        //Timer initialization
        timer = 0;
        if (host){
            this.startTimer();
        }

        one = true;
    },

    update: function() {
        this.getCountDown();

        if (timer >= 6){
            if (host) this.resetTimer();
            game.state.start('scoreState');
        }else if(timer >= 3){
            if (one){
                one = false;
                game.sound.play('buttonClicked');
            }
            if (this.winner == 1){
                this.p1Wins.visible = true;
                this.wins.visible = true;
            }else if (this.winner == 2){
                this.p2Wins.visible = true;
                this.wins.visible = true;
            }else{
                this.wins.visible = true;
                this.wins.setText('TIE');
            }
        }
    },
    
    //Print the corresponding player sprites
    printPlayersObj: function(){
        //Print player1 obj
        switch (this.p1){
            case 'rock':
                var obj1 = game.add.sprite(250, 640, 'rock');
                obj1.scale.set(this.scale,this.scale);
                obj1.smoothed = false;
                break;
            case 'paper':
                var obj1 = game.add.sprite(260, 640, 'paper');
                obj1.scale.set(this.scale,this.scale);
                obj1.smoothed = false;
                break;
            case 'scissors':
                var obj1 = game.add.sprite(250, 640, 'scissors');
                obj1.scale.set(this.scale,this.scale);
                obj1.smoothed = false;
                break;
            case 'nothing':
                var obj1 = game.add.sprite(250, 640, 'nothing');
                obj1.scale.set(this.scale,this.scale);
                obj1.smoothed = false;
                break;
        }
        //Print player2 obj
        switch (this.p2){
            case 'rock':
                var obj2 = game.add.sprite(740, 640, 'rock');
                obj2.scale.set(this.scale,this.scale);
                obj2.smoothed = false;
                break;
            case 'paper':
                var obj2 = game.add.sprite(750, 640, 'paper');
                obj2.scale.set(this.scale,this.scale);
                obj2.smoothed = false;
                break;
            case 'scissors':
                var obj2 = game.add.sprite(740, 640, 'scissors');
                obj2.scale.set(this.scale,this.scale);
                obj2.smoothed = false;
                break;
            case 'nothing':
                var obj2 = game.add.sprite(740, 640, 'nothing');
                obj2.scale.set(this.scale,this.scale);
                obj2.smoothed = false;
                break;
        }
    },

    //Determine de winning logic
    determineWinner: function(){
        if (this.p1 != this.p2){
            if (this.p1 == 'rock'){
                if (this.p2 == 'scissors' || this.p2 == 'nothing'){
                    return 1;
                }else{
                    return 2;
                }
            }else if (this.p1 == 'paper'){
                if (this.p2 == 'rock' || this.p2 == 'nothing'){
                    return 1;
                }else{
                    return 2;
                }
            }else if (this.p1 == 'scissors'){
                if (this.p2 == 'paper' || this.p2 == 'nothing'){
                    return 1;
                }else{
                    return 2;
                }
            }else if (this.p1 == 'nothing'){
                if (this.p2 != 'nothing'){
                    return 2;
                }
            }else{
                console.log("Objeto de jugador erroneo: P1: "+this.p1+", P2: "+this.p2);
            }
        }else{
            return 0;
        }
    },
    
    //Updates de global score
    updateScore: function(){
        if (this.winner == 1){
            score[0] += 1;
        }else if (this.winner == 2){
            score[1] += 1;
        }else if (this.winner != 0){
            console.log("Valor de ganador erroneo: "+ this.winner);
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
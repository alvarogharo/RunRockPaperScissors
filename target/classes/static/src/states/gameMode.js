RunRockPaperScissors.gameModeState = function(game) {
    var best1Button;
    var best3Button;
    var best5Button;
    var joinButton;
    var matchCreated;
    var host;
    var restart;
    var doOne;
}

RunRockPaperScissors.gameModeState.prototype = {

    preload: function() {
        //Buttons
        game.load.image('best1Button', 'assets/sprites/buttons/bestOf1Button.png');
        game.load.image('best1ButtonOver', 'assets/sprites/buttons/bestOf1ButtonOver.png');
        game.load.image('best1ButtonDown', 'assets/sprites/buttons/bestOf1ButtonDown.png');
        game.load.image('best3Button', 'assets/sprites/buttons/bestOf3Button.png');
        game.load.image('best3ButtonOver', 'assets/sprites/buttons/bestOf3ButtonOver.png');
        game.load.image('best3ButtonDown', 'assets/sprites/buttons/bestOf3ButtonDown.png');
        game.load.image('best5Button', 'assets/sprites/buttons/bestOf5Button.png');
        game.load.image('best5ButtonOver', 'assets/sprites/buttons/bestOf5ButtonOver.png');
        game.load.image('best5ButtonDown', 'assets/sprites/buttons/bestOf5ButtonDown.png');
        game.load.image('joinButton', 'assets/sprites/buttons/joinButton.png');
        game.load.image('joinButtonOver', 'assets/sprites/buttons/joinButtonOver.png');
        game.load.image('joinButtonDown', 'assets/sprites/buttons/joinButtonDown.png');
    },

    create: function() {
        doOne = true;
        matchCreated = null;
        restart = false;

        //Text
        var text = game.add.bitmapText(130, 100+50, 'myFont', 'GAME', 120);
        text.smoothed = false;
        text = game.add.bitmapText(130, 260+50, 'myFont', 'Mode', 120);
        text.smoothed = false;

        this.getNumPlayers(function (numPlayers) {
            console.log(numPlayers);
			if (numPlayers.length == 0) {
                matchCreated = false;
			}else{
                matchCreated = true;
            }
        });
    },
    update: function(){
        if (matchCreated != null && doOne){
            doOne =  false;
            this.createButtons();
        }
    },

    //Button actions
    best: function(m){
        game.sound.play('buttonClicked');
        this.createPlayer();
        mode = m;
        host = true;
        this.putMode();
        game.state.start('waitingState');
    },

    //Button actions
    join: function(){
        game.sound.play('buttonClicked');
        this.createPlayer();
        host = false;
        this.putMode();
        game.state.start('waitingState');
    },

    createButtons: function(){
        if (!matchCreated){
            //Buttons
            best1Button = new Button(200,700,'best1Button',function(){this.best(1)},this);
            best3Button = new Button(200,1000,'best3Button',function(){this.best(3)},this);
            best5Button = new Button(200,1300,'best5Button',function(){this.best(5)},this);
            
        }else{
            //Text
            text = game.add.bitmapText(130, 800, 'myFont', 'Match already', 90);
            text.smoothed = false;
            text = game.add.bitmapText(130, 1000, 'myFont', 'created...', 90);
            text.smoothed = false;

            //Join button
            joinButton = new Button(200,1550,'joinButton',function(){this.join()},this);
        }
    },

    getNumPlayers: function (callback) {
        console.log("Peticion");
        $.ajax({
            url: 'http://localhost:8080/game',
        }).done(function (data) {
            callback(data);
        })
    },
    
    createPlayer: function () {
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/game',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Player created: " + JSON.stringify(data));
            game.player1 = data
        })
    },

    putMode() {
        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/game/',
            data: JSON.stringify(mode),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
        	//console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
        })
    }
}
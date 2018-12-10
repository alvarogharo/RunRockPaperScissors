RunRockPaperScissors.winnerState = function(game) {
    //State variable
    this.winner;
    var playerReady;

    //Button variables
    var replayButton;
    var mainMenuButton;

}

RunRockPaperScissors.winnerState.prototype = {
    init: function(w){
        this.winner = w;
    },

    preload: function() {
        game.load.image('replayButton', 'assets/sprites/buttons/replayButton.png');
        game.load.image('replayButtonOver', 'assets/sprites/buttons/replayButtonOver.png');
        game.load.image('replayButtonDown', 'assets/sprites/buttons/replayButtonDown.png');
        game.load.image('mainMenuButton', 'assets/sprites/buttons/mainMenuButton.png');
        game.load.image('mainMenuButtonOver', 'assets/sprites/buttons/mainMenuButtonOver.png');
        game.load.image('mainMenuButtonDown', 'assets/sprites/buttons/mainMenuButtonDown.png');

        //Sounds
        game.load.audio('win', 'assets/sounds/win.wav');
    },

    create: function() {
        //Scale intialization
        var scale = 45;

        //Texts
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'WINNER', 120);
        text.smoothed = false;

        //Winner icon selction
        if (this.winner == 1){
            text = game.add.bitmapText(130, 260+100, 'myFontB', 'P1', 120);
            text.smoothed = false;
            var p1 = game.add.sprite(350, 550, 'p1');   
            p1.scale.set(scale,scale);
            p1.smoothed = false;
        }else if (this.winner == 2){
            text = game.add.bitmapText(130, 260+100, 'myFontR', 'P2', 120);
            text.smoothed = false;
            var p2 = game.add.sprite(350, 550, 'p2');   
            p2.scale.set(scale,scale);
            p2.smoothed = false;
        }
        text.smoothed = false;

        game.sound.play('win');

        //Buttons
        replayButton = new Button(200,1100,'replayButton',this.replay,this);
        mainMenuButton = new Button(200,1450,'mainMenuButton',this.mainMenu,this);
    },
    
    //Onclcik button method
    replay: function(){
        game.sound.play('buttonClicked');
        score = [0,0];
        restart = true;
        replay = false;
        game.state.start('waitingState');
    },

    //Onclcik button method
    mainMenu: function(){
        game.sound.play('buttonClicked');
        score = [0,0];
        host = false;
        id = 0;
        replay = false;
        this.getNumPlayers(function(data){
            console.log(data);
            if (data.length > 0){
                deleteEverything();
            }else{
                game.state.start('mainMenuState');
            }
        });
    },

    //Get the numbres of players in server
    getNumPlayers: function (callback) {
        $.ajax({
            url: loc+'game',
        }).done(function (data) {
            callback(data);
        })
    },
}

//Deletes everything from server
function deleteEverything() {
    $.ajax({
        method: "DELETE",
        url: loc+'game/',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (data) {
        game.state.start('mainMenuState');
    })
}


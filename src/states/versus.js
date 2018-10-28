RunRockPaperScissors.versusState = function(game) {

}

var timer;
var p1;
var p2;
var p1Wins;
var p2Wins;
var wins;
var scale;
var winner;

RunRockPaperScissors.versusState.prototype = {
    init: function(player1, player2){
        p1 = player1;
        p2 = player2;
    },

    preload: function() {
        game.load.image('backButton', 'assets/sprites/buttons/backButton.png');
        game.load.image('creditsBanner', 'assets/sprites/credits/creditsBanner.png');

        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');
        game.load.image('nothing', 'assets/sprites/objects/nothing.png');
    },

    create: function() {
        scale = 12;

        var text = game.add.bitmapText(260, 450, 'myFontB', 'P1', 80);
        text.smoothed = false;
        
        text = game.add.bitmapText(730, 450, 'myFontR', 'P2', 80);
        text.smoothed = false;
        
        var text = game.add.bitmapText(450, 580, 'myFont', 'VS', 120);
        text.smoothed = false;

        p1Wins = game.add.bitmapText(260, 1000, 'myFontB', 'P1', 120);
        p1Wins.smoothed = false;
        p1Wins.visible = false;

        p2Wins = game.add.bitmapText(260, 1000, 'myFontR', 'P2', 120);
        p2Wins.smoothed = false
        p2Wins.visible = false;

        wins = game.add.bitmapText(260, 1200, 'myFont', 'Wins', 120);
        wins.smoothed = false;
        wins.visible = false;

        switch (p1){
            case 'rock':
                var obj1 = game.add.sprite(250, 640, 'rock');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
            case 'paper':
                var obj1 = game.add.sprite(260, 640, 'paper');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
            case 'scissors':
                var obj1 = game.add.sprite(250, 640, 'scissors');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
            case 'nothing':
                var obj1 = game.add.sprite(250, 640, 'nothing');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
        }

        switch (p2){
            case 'rock':
                var obj2 = game.add.sprite(740, 640, 'rock');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
            case 'paper':
                var obj2 = game.add.sprite(750, 640, 'paper');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
            case 'scissors':
                var obj2 = game.add.sprite(740, 640, 'scissors');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
            case 'nothing':
                var obj2 = game.add.sprite(740, 640, 'nothing');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
        }
        winner = 0;
        winner = determineWinner();

        updateScore();

        timer = 0;
    },

    update: function() {
        timer += game.time.physicsElapsed;

        if (timer >= 3){
            game.state.start('scoreState');
        }else if(timer >= 1){
            if (winner == 1){
                p1Wins.visible = true;
                wins.visible = true;
            }else if (winner == 2){
                p2Wins.visible = true;
                wins.visible = true;
            }else{
                wins.visible = true;
                wins.setText('TIE');
            }
        }
    }
}

function determineWinner(){
    if (p1 != p2){
        if (p1 == 'rock'){
            if (p2 == 'scissors' || p2 == 'nothing'){
                return 1;
            }else{
                return 2;
            }
        }else if (p1 == 'paper'){
            if (p2 == 'rock' || p2 == 'nothing'){
                return 1;
            }else{
                return 2;
            }
        }else if (p1 == 'scissors'){
            if (p2 == 'paper' || p2 == 'nothing'){
                return 1;
            }else{
                return 2;
            }
        }else if (p1 == 'nothing'){
            if (p2 != 'nothing'){
                return 2;
            }
        }else{
            console.log("Objeto de jugador erroneo: P1: "+p1+", P2: "+p2);
        }
    }else{
        return 0;
    }
}

function updateScore(){
    if (winner == 1){
        score[0] += 1;
    }else if (winner == 2){
        score[1] += 1;
    }else if (winner != 0){
        console.log("Valor de ganador erroneo: "+ winner);
    }
}
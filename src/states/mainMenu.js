RunRockPaperScissors.mainMenuState = function(game) {

}

RunRockPaperScissors.mainMenuState.prototype = {

    preload: function() {
        game.load.image('playButton', 'assets/sprites/buttons/playButton.png');
        game.load.image('creditsButton', 'assets/sprites/buttons/creditsButton.png');
        game.load.image('p1', 'assets/sprites/players/p1.png');
        game.load.image('p2', 'assets/sprites/players/p2.png');
        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');

        game.load.bitmapFont('myFont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    },

    create: function() {

        var scale = 12;
        
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'RUN', 120);
        text = game.add.bitmapText(130, 260+100, 'myFont', 'Rock', 120);
        text = game.add.bitmapText(130, 420+100, 'myFont', 'Paper', 120);
        text = game.add.bitmapText(130, 580+100, 'myFont', 'Scissors', 120);
        text.smoothed = false;
        text.color = 'white';

        var p1 = game.add.sprite(780, 230, 'p1');   
        var p2 = game.add.sprite(930, 230, 'p2');
        var rock = game.add.sprite(855, 410, 'rock');
        var paper = game.add.sprite(865, 580, 'paper');
        var scissors = game.add.sprite(855, 740, 'scissors');

        p1.smoothed = false;
        p2.smoothed = false;
        rock.smoothed = false;
        paper.smoothed = false;
        scissors.smoothed = false;

        p1.scale.set(scale,scale);
        p2.scale.set(scale,scale);
        rock.scale.set(scale,scale);
        paper.scale.set(scale,scale);
        scissors.scale.set(scale,scale);

        //var playButton = game.add.sprite(200, 1100, 'playButton');
        var playButton = game.add.button(200, 1100, 'playButton', play, this, 2, 1, 0);
        var creditsButton = game.add.button(200, 1450, 'creditsButton', credits, this, 2, 1, 0);

        playButton.onInputOver.add(over, this);
        playButton.onInputOut.add(out, this);
        playButton.onInputUp.add(up, this);

        creditsButton.onInputOver.add(over, this);
        creditsButton.onInputOut.add(out, this);
        creditsButton.onInputUp.add(up, this);

        
    },

    update: function() {

    }

    
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function play () {
    game.state.start('gameModeState');
}

function credits () {
    game.state.start('creditsState');
}
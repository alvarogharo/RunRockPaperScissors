RunRockPaperScissors.mainMenuState = function(game) {

}

RunRockPaperScissors.mainMenuState.prototype = {

    preload: function() {
        //Buttons
        game.load.image('playButton', 'assets/sprites/buttons/playButton.png');
        game.load.image('creditsButton', 'assets/sprites/buttons/creditsButton.png');

        //Icons
        game.load.image('p1', 'assets/sprites/players/p1.png');
        game.load.image('p2', 'assets/sprites/players/p2.png');
        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');
        game.load.image('nothing', 'assets/sprites/objects/nothing.png');

        //Buton sounds
        game.load.audio('buttonOver', 'assets/sounds/buttonOver_walk.wav');
        game.load.audio('buttonClicked', 'assets/sounds/buttonClicked.wav');
    },

    create: function() {

        var scale = 12;
        
        //Texts
        var text = new Array(); 
        text[0] = game.add.bitmapText(130, 100+100, 'myFont', 'RUN', 120);
        text[1] = game.add.bitmapText(130, 260+100, 'myFont', 'Rock', 120);
        text[2] = game.add.bitmapText(130, 420+100, 'myFont', 'Paper', 120);
        text[3] = game.add.bitmapText(130, 580+100, 'myFont', 'Scissors', 120);

        for (var t in text){
            t.smoothed = false;
        }

        //Icons
        var icons = new Array();
        icons[0] = game.add.sprite(780, 230, 'p1');   
        icons[1]  = game.add.sprite(930, 230, 'p2');
        icons[2]  = game.add.sprite(855, 410, 'rock');
        icons[3]  = game.add.sprite(865, 580, 'paper');
        icons[4]  = game.add.sprite(855, 740, 'scissors');

        for(var i = 0; i<icons.length; i++){
            icons[i].smoothed = false;
            icons[i].scale.set(scale);
        }


        //Buttons
        var playButton = game.add.button(200, 1100, 'playButton', this.play, this, 2, 1, 0);
        var creditsButton = game.add.button(200, 1450, 'creditsButton', this.credits, this, 2, 1, 0);

        playButton.onInputOver.add(this.over, this);
        playButton.onInputOut.add(this.out, this);
        playButton.onInputUp.add(this.up, this);

        creditsButton.onInputOver.add(this.over, this);
        creditsButton.onInputOut.add(this.out, this);
        creditsButton.onInputUp.add(this.up, this);
    },

    //Button actions
    play: function  () {
        game.sound.play('buttonClicked');
        game.state.start('gameModeState');
    },
    
    credits: function  () {
        game.sound.play('buttonClicked');
        game.state.start('creditsState');
    },

    up: function() {
        console.log('button up', arguments);
    },
    
    over: function() {
        game.sound.play('buttonOver');
        console.log('button over');
    },
    
    out: function() {
        console.log('button out');
    }
    
}
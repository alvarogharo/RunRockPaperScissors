var RunRockPaperScissors = {}

RunRockPaperScissors.bootState = function(game) {

    //Global game variables
    var mode;
    var score;
    var id;
    var otherId;

    var loc;
    var ws;
    var debug;
}

RunRockPaperScissors.bootState.prototype = {

    preload: function() {
        //Fonts
        game.load.bitmapFont('myFont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        game.load.bitmapFont('myFontB', 'assets/fonts/fontB.png', 'assets/fonts/fontB.fnt');
        game.load.bitmapFont('myFontR', 'assets/fonts/fontR.png', 'assets/fonts/fontR.fnt');
    },

    create: function() {
        //Initialization
        debug = false;
        loc = window.location.href;
        score = new Array(0,0);
        mode = 3;

        this.initWS();

        game.state.start('mainMenuState');
    },

    initWS: function(){
        loc = loc.slice(4, loc.length);
        console.log("Loc: "+loc);

        ws = new WebSocket('ws'+loc+'runrps');

        ws.onopen = function (event) {
            if (debug) {
                console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.');
            }
        }

        ws.onerror = function (error) {
            console.log('[DEBUG-WS] Ha ocurrido un error: ' + error);
        }

        ws.onclose = function (event) {
            if (debug) {
                console.log('[DEBUG-WS] Se ha cerrado la conexion.');
            }
        }
    }
}
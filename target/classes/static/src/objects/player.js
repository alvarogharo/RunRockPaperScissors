function Player(x, y, id){

    //Position variables
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;

    //Control keys cursor
    this.cursor = null;

    //Identification variables
    this.id = id;
    this.item = 'nothing';

    //Auxiliar variable for one execution until reset
    this.once = false;

    //Visual variables
    this.hud1 = null;
    this.hud2 = null;
    this.hudRoom = null;
    this.sprite = null;

    //Mocking variables
    var spacing = 150;
    var offsetX = 132;
    var offsetY = 382;
    var first = true;

    /*Moves the player in the direction assigned if possible
     *@param map: Object of class Map. Current map state
     *@param dir: String in ('up','down','left,,'right'). Determines the direction to move
     *@param lastseconds: Boolean. Informs if it is the final seconds of the game or not
     */
    this.move = function(map,dir, lastSeconds){
        var auxX = this.x;
        var auxY = this.y;
        
        
        switch(dir){
            case 'up':
                auxY -= 1;
                break;
            case 'down':
                auxY += 1;
                break;
            case 'left':
                auxX -= 1;
                break;
            case 'right':
                auxX += 1; 
                break;
        }

        var outOfBounds = !(auxX >= 0 && auxX <= 5 && auxY >= 0 && auxY <= 5);

        if (!outOfBounds){
            var room = map.rooms[auxX][auxY];
        }

        if (room != null && !outOfBounds &&(auxX >= 0 && auxX <= 5 && auxY >= 0 && auxY <= 5) && (room.player == null || (room.player != null && room.type == 'nothing' && lastSeconds))){
            this.x = auxX;
            this.y = auxY;

            map.rooms[this.x][this.y].player = id;
            map.rooms[this.lastX][this.lastY].player = null;
            this.lastX = this.x;
            this.lastY = this.y;

            this.item = map.rooms[this.x][this.y].type;
            if (this.item != 'nothing'){
                game.sound.play('objRoom');
            }else{
                game.sound.play('buttonOver');
            }

            this.putPlayer();
        }
        this.sprite.x = offsetX+(spacing*this.x);
        this.sprite.y = offsetY+(spacing*this.y);
    }

    /*Move the player to the given position
     *@param map: Object of class Map. Current map state
     *@param pos: Int array of length 2. The position to move the player at
     */
    this.moveServer = function(map, pos){
        this.x = pos[0];
        this.y = pos[1];

        if (this.x != this.lastX ||  this.y != this.lastY){
            map.rooms[this.x][this.y].player = id;
            map.rooms[this.lastX][this.lastY].player = null;
            this.lastX = this.x;
            this.lastY = this.y;

            this.item = map.rooms[this.x][this.y].type;
            if (this.item != 'nothing'){
                game.sound.play('objRoom');
            }else{
                game.sound.play('buttonOver');
            }
        }
        this.sprite.x = offsetX+(spacing*this.x);
        this.sprite.y = offsetY+(spacing*this.y);
    }

    //Updates the player item HUD
    this.updateHUD = function(){
        
        if (this.hud1 != null){
            this.hud1.loadTexture(this.item);
            if (this.hud2 != null){
                this.hud2.loadTexture(this.item);
                this.hudRoom.loadTexture('roomF');
            }
            if (this.hud2 != null && this.item == 'nothing'){
                this.hudRoom.loadTexture('roomE');
            }
        }
    }

    //Creates the cursor with the player control keys
    this.createCursor = function(){
        this.cursor = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
    }

    /*Controls the player input and exceute actions.
     *@params map: Object of class Map. Current map state
     */
    this.handleInput = function(map){
        if(!this.once && this.cursor != null){
            if (this.cursor.left.isDown){
                this.once = true;
                this.move(map,'left', false);
            }else if (this.cursor.right.isDown){
                this.once = true;
                this.move(map,'right', false);
            }else if (this.cursor.up.isDown){
                this.once = true;
                this.move(map,'up', false);
            }else if (this.cursor.down.isDown){
                this.once = true;
                this.move(map,'down', false);
            }
        }

        if (this.cursor != null && !this.cursor.right.isDown && !this.cursor.left.isDown && !this.cursor.up.isDown && !this.cursor.down.isDown){
            this.once = false;
        }
    }

    //Updates player position in server sending a PUT message
    this.putPlayer = function() {
        let auxPos;
        auxPos = [this.x,this.y];
        
        $.ajax({
            method: "PUT",
            url: loc+'game/' + this.id.substring(1,2),
            data: JSON.stringify(auxPos),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
        })
    }

}
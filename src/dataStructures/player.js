function Player(x, y, id){
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.id = id;
    this.item = null;
    this.sprite = null;

    var spacing = 150;
    var offsetX = 132;
    var offsetY = 382;

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
        }
        this.sprite.x = offsetX+(spacing*this.x);
        this.sprite.y = offsetY+(spacing*this.y);
    }
}
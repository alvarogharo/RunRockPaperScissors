function Player(x, y, id){
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.id = id;
    this.item = null;

    this.move = function(map,dir){
        var auxX = this.x;
        var auxY = this.y;

        switch(dir){
            case 'up':
                auxY -= 1;
            case 'down':
                auxY += 1;
            case 'left':
                auxX -= 1;
            case 'right':
                auxX += 1; 
        }

        var room = map.rooms[auxX][auxY];

        if (room != null && room.player != 'p2' && room.player != 'p1'){
            this.x = auxX;
            this.y = auxY;

            map.rooms[x][y].player = id;
            map.rooms[lastX][lastY].player = null;
        }
    }
}
function Map(){

    this.rooms = [[null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null]];

    this.sprites = [[null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null]];

    this.objs = [[null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null]];
    
    this.fullMap = function(){
        for(var i= 0; i<this.rooms[0].length;i++){
            for(var j= 0; j<this.rooms.length;j++){
                this.rooms[i][j] = new Room(i,j,'nothing');
            }
        }
    }

    this.toString = function(){
        var st = '';

        for(var i= 0; i<this.rooms[0].length;i++){
            for(var j= 0; j<this.rooms.length;j++){
                st += '- '+this.rooms[i][j].x+', '+this.rooms[i][j].y;
            }
        }
        return st;
    }

}
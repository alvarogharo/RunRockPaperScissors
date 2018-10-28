function Map(){

    this.level0 = [[-1,-1, 0, 0,-1,-1],
                   [-1,-1, 0, 0,-1,-1],
                   [ 2, 0, 5, 4, 0, 1],
                   [ 0, 0, 4, 3, 0, 0],
                   [-1,-1, 0, 0,-1,-1],
                   [-1,-1, 0, 0,-1,-1]];

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

    this.createLevel = function(level){
        for(var i= 0; i<this.rooms[0].length;i++){
            for(var j= 0; j<this.rooms.length;j++){
                switch(level[i][j]){
                    case -1:
                        this.rooms[j][i] = null;
                        break;
                    case 0:
                        this.rooms[j][i] = new Room(i,j,'nothing');
                        break;
                    case 1:
                        this.rooms[j][i] = new Room(i,j,'nothing');
                        this.rooms[j][i].player = 'p1';
                        break;
                    case 2:
                        this.rooms[j][i] = new Room(i,j,'nothing');
                        this.rooms[j][i].player = 'p2';
                        break;
                    case 3:
                        this.rooms[j][i] = new Room(i,j,'rock');
                        break;
                    case 4:
                        this.rooms[j][i] = new Room(i,j,'paper');
                        break;
                    case 5:
                        this.rooms[j][i] = new Room(i,j,'scissors');
                        break;
                }
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
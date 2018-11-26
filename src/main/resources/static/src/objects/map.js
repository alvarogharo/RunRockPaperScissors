function Map(){

    //Predesigned levels
    var level0 = [[-1,-1,-1,-1,-1,-1],
                   [-1,-1,-1,-1,-1,-1],
                   [ 1, 0, 5, 4, 0, 2],
                   [ 0, 0, 4, 3, 0, 0],
                   [-1,-1,-1,-1,-1,-1],
                   [-1,-1,-1,-1,-1,-1]];
    
    var level1 = [[-1,-1,-1,-1, 1, 2],
                   [-1,-1,-1,-1, 0, 0],
                   [-1,-1,-1,-1, 0, 0],
                   [ 3, 0,-1,-1, 0, 0],
                   [ 0, 0, 0, 0, 0, 0],
                   [ 0, 0, 0, 0, 0, 0]];

    var level2 = [[-1,-1, 4, 0, 0, 2],
                   [-1,-1,-1, 0, 0, 0],
                   [ 5,-1,-1,-1, 0, 0],
                   [ 0, 0,-1,-1,-1, 3],
                   [ 0, 0, 0,-1,-1,-1],
                   [ 1, 0, 0, 4,-1,-1]];

    var level3 = [[ 5, 0,-1,-1, 0, 5],
                   [-1, 0, 0, 0, 0,-1],
                   [-1,-1, 0, 0,-1,-1],
                   [-1,-1, 0, 0,-1,-1],
                   [ 4,-1, 0, 0,-1, 4],
                   [ 1, 0, 0, 0, 0, 2]];

    var level4 = [[-1,-1, 0, 5,-1,-1],
                   [-1,-1, 0, 0,-1,-1],
                   [ 0, 0, 1, 0, 0, 4],
                   [ 4, 0, 0, 2, 0, 0],
                   [-1,-1, 0, 0,-1,-1],
                   [-1,-1, 3, 0,-1,-1]];
    
    //Current level var
    this.levels = [level0,level1,level2,level3,level4];

    //Map of rooms
    this.rooms = [[null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null],
                  [null,null,null,null,null,null]];

    //Map of sprites
    this.sprites = [[null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null]];

    //Map of objs
    this.objs = [[null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null],
                   [null,null,null,null,null,null]];
    
    //Player positions
    this.p1Pos = new Array();
    this.p2Pos = new Array();
    
    //Fill rooms array with empty rooms objects
    this.fullMap = function(){
        for(var i= 0; i<this.rooms[0].length;i++){
            for(var j= 0; j<this.rooms.length;j++){
                this.rooms[i][j] = new Room(i,j,'nothing');
            }
        }
    }

    /*Cast a 2D array level to a room level. This room level is stored in this.rooms array.
     *@params level: 2D int array
     */
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
                        this.p1Pos[0] = j;
                        this.p1Pos[1] = i;
                        break;
                    case 2:
                        this.rooms[j][i] = new Room(i,j,'nothing');
                        this.rooms[j][i].player = 'p2';
                        this.p2Pos[0] = j;
                        this.p2Pos[1] = i;
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

    //Cast rooms array to string
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
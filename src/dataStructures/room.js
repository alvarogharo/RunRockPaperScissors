function Room(x, y, type, player){
    this.x = x;
    this.y = y;
    this.type = type;
    this.player = player;

    this.changeType = function (type){
        this.type = type;
    }
}
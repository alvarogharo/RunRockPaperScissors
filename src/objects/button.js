function Button(x,y,sprite,onClick,state){

    var button;
    this.x = x;
    this.y = y;

    this.sprite = sprite;
    this.state = state;
    this.onClick = onClick;

    button = game.add.button(this.x, this.y, this.sprite, this.onClick, this.state, 2, 1, 0);

    function over(){
        button.loadTexture(sprite+'Over');
        game.sound.play('buttonOver');
    }

    function down(){
        button.loadTexture(sprite+'Down');
        game.sound.play('buttonOver');
    }

    function out(){
        button.loadTexture(sprite);
        game.sound.play('buttonOver');
    }

    button.onInputOver.add(over,this.state);
    button.onInputDown.add(down,this.state);
    button.onInputOut.add(out,this.state);

    
}
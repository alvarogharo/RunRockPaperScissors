function Button(x,y,sprite,onClick,state){

    var button;
    this.x = x;
    this.y = y;

    this.sprite = sprite;
    this.state = state;
    this.onClick = onClick;
    
    button = game.add.button(this.x, this.y, this.sprite, this.onClick, this.state, 2, 1, 0);

    //Method executed when mouse is over the button
    function over(){
        button.loadTexture(sprite+'Over');
        game.sound.play('buttonOver');
    }

    //Method executed when mouse is over the button and pressed
    function down(){
        button.loadTexture(sprite+'Down');
        game.sound.play('buttonOver');
    }

    //Method executed when mouse is not over the button
    function out(){
        button.loadTexture(sprite);
        game.sound.play('buttonOver');
    }

    //Button event listeners
    button.onInputOver.add(over,this.state);
    button.onInputDown.add(down,this.state);
    button.onInputOut.add(out,this.state); 
}
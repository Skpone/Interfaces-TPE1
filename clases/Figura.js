class Figura{
    constructor(posX, posY, ctx, style, selected){
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.style = style;
        this.selected = selected;
    }

    moveTo(x, y){
        this.posX = x;
        this.posY = y;
    }

    setSelected(selected){
        this.selected = selected;
    }

    isBeingSelected(pointerX,pointerY){
        // "abstract"
    }

    draw(){
        // "abstract"
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }
}
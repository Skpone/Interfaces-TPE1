class Rectangulo extends Figura{
    constructor(posX, posY, ctx, style, selected, width, height){
        super(posX, posY, ctx, style, selected);
        this.width = width;
        this.height = height;
    }

    isBeingSelected(pointerX,pointerY){
        return (pointerX >= this.posX && pointerX <= this.posX + this.width &&
                pointerY >= this.posY && pointerY <= this.posY + this.height);
    }

    draw()
    {
        this.ctx.fillStyle = this.style;
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
        if(this.selected){
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
}
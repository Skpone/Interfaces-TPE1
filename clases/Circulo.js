class Circulo extends Figura{
    constructor(posX, posY, ctx, style, selected, radius){
        super(posX, posY, ctx, style, selected);
        this.radius = radius;
    }

    isBeingSelected(pointerX,pointerY){
        //si la distancia es menor o igual al radio, entonces el punto está dentro del circulo.
        const distance = Math.sqrt((this.posX-pointerX)*(this.posX-pointerX) + (this.posY-pointerY)*(this.posY-pointerY));
        return distance <= this.radius;
    }

    draw(){
        this.ctx.fillStyle = this.style;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        if(this.selected){
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
}
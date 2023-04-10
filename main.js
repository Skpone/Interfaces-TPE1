"use strict";

const CANVAS = document.querySelector('#canvas');
const CTX = CANVAS.getContext('2d');
const CANVASWIDTH = CANVAS.width;
const CANVASHEIGHT = CANVAS.height;
CANVAS.setAttribute('tabindex', 0); //para que las figuras puedan ser movidas usando el keyboard

const FIGURAS = [];
const RADIUS_LIMIT = 35;
const MAX_FIGURAS = 70;

let dragFiguraListener = null; //ambos para que no se ejecuten las funciones cuando agregamos un evento
let moveFiguraListener = null;
let currentFigura = null;//para poder arrastrar y tambien mover con el teclado


//FUNCIONES

function main(){
    agregarFiguras(FIGURAS);

    pintarFiguras(FIGURAS);//dibujamos todas las figuras que apunta el arreglo
    
}

function pintarFiguras(arrayFiguras){
    for (let i = 0; i < arrayFiguras.length; i++) {
        arrayFiguras[i].draw();
    }
}

function agregarFiguras(arrayFiguras){
    for (let i = 0; i < (Math.floor(Math.random()*MAX_FIGURAS)) + 1; i++) { //crea una cantidad random de figuras limitado por MAX_FIGURAS
        arrayFiguras.push(crearFigura(false));
    }
}

function crearFigura(pointed) { //pueden ser de dos tipos
    let type = Math.round(Math.random());
    let randomX = Math.round(Math.random()*(CANVASWIDTH));
    let randomY = Math.round(Math.random()*(CANVASHEIGHT));
    let randomWidth = Math.floor((Math.random()*(CANVASWIDTH))/2);
    let randomHeight = Math.floor((Math.random()*(CANVASHEIGHT))/2);
    let randomStyle = randomRGBA();

    let newFigura = null;
    if (type == 0) {
        newFigura = new Rectangulo(randomX, randomY, CTX, randomStyle, pointed, randomWidth, randomHeight);
    }
    else
    {
        let randomRadius = Math.floor(Math.random()*RADIUS_LIMIT) + 1; //inclusive
        newFigura = new Circulo(randomX, randomY, CTX, randomStyle, pointed, randomRadius);
    }
    return newFigura;
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = Math.floor(0.7 + Math.random()*(1 - 0.7 + 1)); // con trasnparencia entre 0.7 y 1
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//FUNCIONES

//EVENTOS


CANVAS.addEventListener('mousedown', function (e) {
    if(currentFigura != null){//si ya habia una figura antes seleccionada
        currentFigura.setSelected(false);
        pintarFiguras(FIGURAS);
    }

    // Verificar si se hizo clic dentro de la figura
    currentFigura = findClickedFigure(e, FIGURAS);
    if (currentFigura != null) {
        currentFigura.setSelected(true);
        
        dragFiguraListener = function (e) {
            dragFigura(e, currentFigura);  
        };

        CANVAS.addEventListener('mousemove', dragFiguraListener);
    }
    CANVAS.removeEventListener('keydown', moveFiguraListener);
});

CANVAS.addEventListener('mouseup', function (e) {
    if(currentFigura != null){
        moveFiguraListener = function (e) {
            moveFigura(e, currentFigura);   
        };

        CANVAS.addEventListener('keydown', moveFiguraListener);
    }
    CANVAS.removeEventListener('mousemove', dragFiguraListener);
});

function dragFigura(e, figura){

    CTX.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);

    figura.moveTo(e.offsetX, e.offsetY);
    pintarFiguras(FIGURAS); //pintamos todas de nuevo asi no se borran
}


function moveFigura(e, figura){

    CTX.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);

    let x = currentFigura.getPosX();
    let y = currentFigura.getPosY();

    switch(e.key) {
        case 'ArrowLeft':
          x -= 10;
          break;
        case 'ArrowUp':
          y -= 10;
          break;
        case 'ArrowRight':
          x += 10;
          break;
        case 'ArrowDown':
          y += 10;
          break;
      }

    figura.moveTo(x,y);
    pintarFiguras(FIGURAS);
}

function findClickedFigure(e, arrayFiguras){
    for (let i = 0; i < arrayFiguras.length; i++) {
        //si no hago la resta, el mouse no va a apuntar correctamente
        if(arrayFiguras[i].isBeingSelected(e.offsetX, e.offsetY)){ 
            return arrayFiguras[i];
        }
    }
    return null;
}

//EVENTOS

main();
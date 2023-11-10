//world variables
let canvasX = 1080;
let canvasY = 1080;

//character variables
let character;
let characterX = canvasX/2;
let characterY = canvasY/2;

function setup(){
    new Canvas(canvasX,canvasY);
    background(0);
    character = new Sprite(characterX,characterY);
    character.rotation = 0;
}

function draw(){
    if(keyIsPressed){
        if(key === "d" || key === "D"){
            character.rotation+=2; 
        }
        if(key === "a" || key === "A"){
            character.rotation-=2; 
        }
    }
    console.log(character.rotation);
}
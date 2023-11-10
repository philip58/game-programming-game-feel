//world variables
let canvasX = 1080;
let canvasY = 1080;

//character variables
let character;
let characterX = canvasX/2;
let characterY = canvasY/2;

//projectile variables
let projectile;
let projectiles = [];

//call shoot when space is pressed
function keyPressed(){
    if(key === " "){
        shoot();
    }
    
}

//shoot function
function shoot(){
    if(character.rotation <= 20 && character.rotation >= -20){
        projectile = new Sprite(characterX,characterY-30,15);
        projectile.vel.y-=2;
    } else if(character.rotation >= -110 && character.rotation <= -70){
        projectile = new Sprite(characterX-30,characterY,15);
        projectile.vel.x-=2;
    } else if(character.rotation <= -160 && character.rotation >= -180 || character.rotation >= 160 && character.rotation <= 180){
        projectile = new Sprite(characterX,characterY+30,15);
        projectile.vel.y+=2;
    } else if(character.rotation >= 70 && character.rotation <= 110){
        projectile = new Sprite(characterX+30,characterY,15);
        projectile.vel.x+=2;
    } else if(character.rotation<=0 && character.rotation >= -90){
        projectile = new Sprite(characterX-30,characterY-30,15);
        projectile.vel.x-=2;
        projectile.vel.y-=2;
    } else if(character.rotation<=-90 && character.rotation >= -180){
        projectile = new Sprite(characterX-30,characterY+30,15);
        projectile.vel.x-=2;
        projectile.vel.y+=2;
    } else if(character.rotation>=0 && character.rotation<=90){
        projectile = new Sprite(characterX+30,characterY-30,15);
        projectile.vel.x+=2;
        projectile.vel.y-=2;
    } else{
        projectile = new Sprite(characterX+30,characterY+30,15);
        projectile.vel.x+=2;
        projectile.vel.y+=2;
    }
    projectile.color = "white";
    projectiles.push(projectile);
    console.log(projectile.x);
}

function setup(){
    new Canvas(canvasX,canvasY);
    character = new Sprite(characterX,characterY);
    character.rotation = 0;
    character.collider=("static");
    character.color = "white";
}

function draw(){
    clear();
    background(0);

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
//world variables
let canvasX = 1080;
let canvasY = 1080;
let count = 0;
let gameStarted = false;
let enemiesDestroyed = 0;
let gameLost = false;
let gameWon = false;

//character variables
let character;
let characterX = canvasX/2;
let characterY = canvasY/2;

//projectile variables
let projectile;
let projectiles = [];

//enemy variables
//let enemy;
let enemies = [];


//call shoot when space is pressed
function keyPressed(){
    if(key === " " && gameStarted){
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
}

function mouseClicked(){
    if(gameStarted === false && !gameLost){
        gameStarted = true;
    }
}

function setup(){
    new Canvas(canvasX,canvasY);
    character = new Sprite(characterX,characterY);
    character.rotation = 0;
    character.collider=("static");
    character.color = "white";
}

function spawnEnemy(){
    let rand = Math.floor(random(0,8));
    if(rand===0){
        let enemy = new Sprite(canvasX/2, 0, 50);
        enemy.color = "red";
        enemy.vel.y=2;
        enemies.push(enemy);
    }
    if(rand===2){
        let enemy = new Sprite(1080, 0, 50);
        enemy.color = "red";
        enemy.vel.x=-2;
        enemy.vel.y=2;
        enemies.push(enemy);
    }

    if(rand===2){
        let enemy = new Sprite(1080, canvasY/2, 50);
        enemy.color = "red";
        enemy.vel.x=-2;
        enemies.push(enemy);
    }

    if(rand===3){
        let enemy = new Sprite(1080, 1080, 50);
        enemy.color = "red";
        enemy.vel.x=-2;
        enemy.vel.y=-2;
        enemies.push(enemy);
    }

    if(rand===4){
        let enemy = new Sprite(canvasX/2, 1080, 50);
        enemy.color = "red";
        enemy.vel.y=-2;
        enemies.push(enemy);
    }

    if(rand===5){
        let enemy = new Sprite(0, 1080, 50);
        enemy.color = "red";
        enemy.vel.x=2;
        enemy.vel.y=-2;
        enemies.push(enemy);
    }

    if(rand===6){
        let enemy = new Sprite(0, canvasY/2, 50);
        enemy.color = "red";
        enemy.vel.x=2;
        enemies.push(enemy);
    }

    if(rand===7){
        let enemy = new Sprite(0, 0, 50);
        enemy.color = "red";
        enemy.vel.y=2;
        enemy.vel.x=2;
        enemies.push(enemy);
    }
}

function draw(){
    clear();
    background(0);
    if(gameWon && !gameStarted){
        fill(255);
        textSize(50);
        text("YOU WON!!!", canvasX/2-125, canvasY/2-100);
    } else if(gameLost && !gameStarted){
        fill(255);
        textSize(50);
        text("YOU LOST!", canvasX/2-125, canvasY/2-100);
    } else if(!gameStarted && !gameWon && !gameLost){
        fill(255);
        textSize(30);
        text("Click Anywhere To Start", 10, 50);
        text("Press Space Bar To Shoot", 10, 100);
        text("Press A and D To Rotate Player", 10, 150);
        text("Destroy 20 Enemies To Win The Game", 10, 200);
    }

    if(gameStarted){
        count++;
        fill(255);
        textSize(30);
        text("Enemies Destroyed: " + enemiesDestroyed, 400, 100);
        
        for(let i = 0; i < projectiles.length; i++){
            for(let j = 0; j < enemies.length; j++){
                if(projectiles[i].collides(enemies[j])){
                    enemies[j].remove();
                    projectiles[i].remove();
                    enemiesDestroyed++;
                    console.log("hit");
                }
            }
        }

        if(keyIsPressed){
            if(key === "d" || key === "D"){
                character.rotation+=4; 
            }
            if(key === "a" || key === "A"){
                character.rotation-=4; 
            }
        }
    
        if(Math.floor(count)%60===0){
            spawnEnemy();
        }
        
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].collides(character)){
                character.remove();
                gameLost = true;
                gameStarted = false;
            }
        }

        if(enemiesDestroyed===50){
            for(let i = 0; i < enemies.length; i++){
                enemies[i].remove();
            }
            gameWon = true;
            gameStarted = false;
        }
    }
}
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var gameoverImg;
var gameOver;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

//to preload image
function preload() {
    pathImg = loadImage("Road.png");
    boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
    cashImg = loadImage("cash.png");
    diamondsImg = loadImage("diamonds.png");
    jwelleryImg = loadImage("jwell.png");
    swordImg = loadImage("sword.png");
    endImg = loadAnimation("gameOver.png");
    gameoverImg = loadImage("r.png");
}

function setup() {

    //to create Canvas and fit it according to screen size
    createCanvas(windowWidth, windowHeight);

    // Moving background
    path = createSprite(width / 2, 200);
    path.addImage(pathImg);
    path.velocityY = 5;

    //creating boy running
    boy = createSprite(width / 2, height - 20, 20, 20);
    boy.addAnimation("SahilRunning", boyImg);
    boy.scale = 0.08;

    //to add gameover image
    gameOver = createSprite(width / 2, height / 2);
    gameOver.addImage(gameoverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    //to create groups
    cashG = new Group();
    diamondsG = new Group();
    jwelleryG = new Group();
    swordGroup = new Group();

}

function draw() {

    //to check if the game state is play
    if (gameState === PLAY) {
      
      //to change background
        background(0);
        boy.x = World.mouseX;

      //to disappera game over image
        gameOver.visible = false;

        //to create edges
        edges = createEdgeSprites();
        boy.collide(edges);

        //code to reset the background
        if (path.y > height) {
            path.y = height / 2;
        }

        createCash();
        createDiamonds();
        createJwellery();
        createSword();

        //to increase points if the boy is touching any object
        if (cashG.isTouching(boy)) {

            cashG.destroyEach();
            treasureCollection = treasureCollection + 50;

        } else if (diamondsG.isTouching(boy)) {

            diamondsG.destroyEach();
            treasureCollection = treasureCollection + 150;

        } else if (jwelleryG.isTouching(boy)) {

            jwelleryG.destroyEach();
            treasureCollection = treasureCollection + 100;

        } else {
            //to end the game is boy hit the sword
            if (swordGroup.isTouching(boy)) {

              //to change game state to end
                gameState = END;

                //to destroy every object if the boy hit the sword
                cashG.destroyEach();
                cashG.setVelocityEach(0);

                diamondsG.destroyEach();
                diamondsG.setVelocityEach(0);

                jwelleryG.destroyEach();
                jwelleryG.setVelocityEach(0);

                swordGroup.destroyEach();
                swordGroup.setVelocityEach(0);
            }
        }

        //to display text for reset if the game state is end and make the game over             image visible
        if (gameState === END) {
            gameOver.visible = true;
        }
        //to create sprite
        drawSprites();

        //to display score
        textSize(40);
        fill("red");
        text("Treasure: " + treasureCollection, width / 2, height - 500);
    }

    //to change game state to end if 'R' is presed in end state
    if (keyDown("r") && gameState === END) {
        gameState = PLAY;
        treasureCollection = 0;
    }
}

//to create cash
function createCash() {
    if (World.frameCount % 200 == 0) {
        var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        cash.addImage(cashImg);
        cash.scale = 0.12;
        cash.velocityY = 3;
        cash.lifetime = 200;
        cashG.add(cash);
    }
}

//to create diamonds
function createDiamonds() {
    if (World.frameCount % 320 == 0) {
        var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        diamonds.addImage(diamondsImg);
        diamonds.scale = 0.03;
        diamonds.velocityY = 3;
        diamonds.lifetime = 200;
        diamondsG.add(diamonds);
    }
}

//to create jewellery
function createJwellery() {
    if (World.frameCount % 410 == 0) {
        var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        jwellery.addImage(jwelleryImg);
        jwellery.scale = 0.13;
        jwellery.velocityY = 3;
        jwellery.lifetime = 200;
        jwelleryG.add(jwellery);
    }
}

//to create sword
function createSword() {
    if (World.frameCount % 530 == 0) {
        var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        sword.addImage(swordImg);
        sword.scale = 0.1;
        sword.velocityY = 3;
        sword.lifetime = 200;
        swordGroup.add(sword);
    }
}
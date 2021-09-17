/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var jungle, invisiblejungle;
var kangaroo , kangaroo_running , kangaroo_collided ;
var invisibleGround;
var shrubGroup, shrub1, shrub2, shrub3 ;
var obstacleGroup , obstacle1 ;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

  kangaroo = createSprite(50,200,20,50);
  kangaroo.addAnimation("Running",kangaroo_running);
  kangaroo.scale = 0.15;
  kangaroo.setCollider("circle",0,0,300);

  invisibleGround=  createSprite(400,350,1600,5);
  invisibleGround.visible = false ;

  
}

function draw() {
  //console.log(kangaroo.y);
  background(255);
  kangaroo.x= camera.position.x-250;
  if (gameState === PLAY){
    jungle.velocityX = -3 ;
    if (jungle.x < 100){
      jungle.x = 400 ;
    }
    if (keyDown("SPACE")&&kangaroo.y>302){
      kangaroo.velocityY = -15 ;
    }
    kangaroo.velocityY += 0.8 ;
  }
  kangaroo.collide(invisibleGround);

  if(obstaclesGroup.isTouching(kangaroo)){
    gameState = END;
}
  else if(shrubGroup.isTouching(kangaroo)){
    shrubGroup.destroyEach();
  }
  drawSprites();
}

function spawnShrubs() {
  if(frameCount % 60 === 150) {
    var shrub = createSprite(camera.positon.x+500,330,40,10);
    //obstacle.debug = true;
    shrub.velocityX = +(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }

    //giving a lifetime to the obstacles 
    shrub.scale = 0.5;
    shrub.lifetime = 500;

    //add each obstacle to the group
    shrubGroup.add(obstacle);

  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.positon.x+500,330,40,10);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
     
    obstacle.addImage(obstacle1);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


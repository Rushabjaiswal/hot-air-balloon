var bgImg,bg;
var bottomGround;
var topGround;
var balloon,balloonImg;
var obstacleTop,obsTop1,obsTop2;
var obstacleBottom,obsBottom1,obsBottom2,obsBottom3;
var gameOver,gameOverImg
var restart,restartImg
var score=0
var PLAY=1
var END=0
var gameState=PLAY

function preload(){

  bgImg = loadImage ("assets/bg.png")
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  obsTop1 = loadImage("assets/obsTop1.png")
  obsTop2 = loadImage("assets/obsTop2.png")
  obsBottom1 = loadImage("assets/obsBottom1.png")
  obsBottom2 = loadImage("assets/obsBottom2.png")
  obsBottom3 = loadImage("assets/obsBottom3.png")
  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")
  jumpSound = loadSound("assets/jump.mp3")
  dieSound = loadSound("assets/die.mp3")

}

function setup(){

  createCanvas(400,400)

  bg=createSprite(165,485,1,1)
  bg.addImage(bgImg)
  bg.scale=1.3

  bottomGround=createSprite(200,390,800,20)
  bottomGround.visible=false;

  topGround=createSprite(200,10,800,20)
  topGround.visible=false

  balloon=createSprite(100,200,20,50)
  balloon.addAnimation("balloon",balloonImg)
  balloon.scale=0.2

  topObstaclesGroup=new Group();
  bottomObstaclesGroup=new Group()
  barGroup=new Group();

  gameOver = createSprite(220,200)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.5
  gameOver.visible=false

  restart = createSprite(220,240)
  restart.addImage(restartImg)
  restart.scale=0.5
  restart.visible=false

}

function draw(){
  background('black')

if(gameState===PLAY){
  if(keyDown("space")){
    balloon.velocityY=-6
    jumpSound.play()
  }
  balloon.velocityY=balloon.velocityY+2;
  spawnObstaclesTop();
  spawnObstaclesBottom();
  bar();

  if(topObstaclesGroup.isTouching(balloon)||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)||bottomObstaclesGroup.isTouching(balloon)){
    gameState=END 
    dieSound.play()
  }
}
  //balloon.collide(bottomGround)
  
  if(gameState===END){
    gameOver.visible=true
    gameOver.depth=gameOver.depth+1
    restart.visible=true
    restart.depth=restart.depth+1
    balloon.velocityX=0
    balloon.velocityY=0
    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    barGroup.setVelocityXEach(0)
    topObstaclesGroup.setLifetimeEach(-1)
    bottomObstaclesGroup.setLifetimeEach(-1)
    balloon.y=200
    if(mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();
  Score()                                       
}

function spawnObstaclesTop(){
  if(frameCount%60===0){
    obstacleTop=createSprite(400,50,40,50)
    obstacleTop.scale=0.1;
    obstacleTop.velocityX=-4
    obstacleTop.y=Math.round(random(10,100))

    var rand=Math.round(random(1,2))
    switch(rand){
      case 1: obstacleTop.addImage(obsTop1);
      break;
      case 2: obstacleTop.addImage(obsTop2);
      break;
      default:break;

    }

    obstacleTop.lifeTime=100;
    balloon.depth=balloon.depth+1
    topObstaclesGroup.add(obstacleTop)



  }
}

function reset(){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  topObstaclesGroup.destroyEach()
  bottomObstaclesGroup.destroyEach()
  score=0
}

function spawnObstaclesBottom(){
  if(frameCount%60===0){
    obstacleBottom=createSprite(400,350,40,50)
    obstacleBottom.addImage(obsBottom1)
      
    obstacleBottom.debug=true
    obstacleBottom.scale=0.07
    obstacleBottom.velocityX=-4
    var rand=Math.round(random(1,3))
    switch(rand){
      case 1: obstacleBottom.addImage(obsBottom1)
      break;
      case 2: obstacleBottom.addImage(obsBottom2)
      break;
      case 3: obstacleBottom.addImage(obsBottom3)
      break;
      default:break;
    }
    obstacleBottom.lifeTime=100
    balloon.depth=balloon.depth+1
    bottomObstaclesGroup.add(obstacleBottom)
  }
}

function bar(){
  if(frameCount%60===0){
    var bar=createSprite(400,200,10,800);
    bar.velocityX=-6
    bar.depth=balloon.depth
    bar.lifetime=70
    bar.visible=true
    barGroup.add(bar)

  }
}

function Score(){
  if(balloon.isTouching(barGroup)){
    score=score+1;
  }
  textSize(25);
  textFont("algerian")
  fill("blue")
  text("Score = "+score,250,50)
}
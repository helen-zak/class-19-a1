var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);                                                                               
  ghost.scale=0.3
  doorGroup=new Group()
  railingGroup=new Group()
  invisibleBlockGroup=new Group()
  //spookySound.loop()
  //spookySound.setVolume(0.01)
  
}

function draw() {
  background(0);
  

  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("right")){
      ghost.x=ghost.x+2
    }
    if(keyDown("left")){
      ghost.x=ghost.x-2
    }
    if(keyDown("space")){
      ghost.velocityY=-12
    }
    ghost.velocityY=ghost.velocityY+1
    createDoor()
    if(ghost.isTouching(railingGroup)){
      ghost.velocityY=0
    }
    if(ghost.y>600||ghost.isTouching(invisibleBlockGroup)){
      gameState="end"
    }
    drawSprites()
  } 
  if(gameState=="end"){
    fill ("red")
    textSize(35)
    text("Game Over",250,300)

  }
  
}

function createDoor(){
  if(frameCount%240==0){
    door=createSprite(200,-50)
    railing=createSprite(200,10)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=railing.width
    invisibleBlock.height=2
    invisibleBlock.debug=true
    door.x=Math.round(random(120,400))
    railing.x=door.x
    invisibleBlock.x=door.x
    railing.addImage(climberImg)
    door.addImage(doorImg)
    door.velocityY=1
    railing.velocityY=1
    invisibleBlock.velocityY=1
    door.depth=ghost.depth
    ghost.depth=ghost.depth+1
    door.lifetime=800
    railing.lifetime=800
    invisibleBlock.lifetime=800
    doorGroup.add(door)
    railingGroup.add(railing)
    invisibleBlockGroup.add(invisibleBlock)
  }
}
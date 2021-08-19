var Fighter,FighterImage
var backGround
var Meteor,MeteorImage
var Laser
var score = 0
var count = 0

function preload(){
  FighterImage = loadImage("images/SpaceFighter.png")
  backGround = loadImage("images/Space.jpg")
  MeteorImage = loadImage("images/Meteor.png")
}

function setup() {

  createCanvas(1200,650);

  Fighter = createSprite(600,550)
  Fighter.addImage(FighterImage)
  Fighter.scale = 0.12

  MeteorGroup = new Group()
  LaserGroup = new Group()
}

function draw() {
  background(backGround); 
  
  Fighter.velocityX = 0
  Fighter.velocityY = 0

  Meteors()
 
  if(keyDown(RIGHT_ARROW)){
    Fighter.velocityX = 7
  }

  if(keyDown(LEFT_ARROW)){
    Fighter.velocityX = -7
  }

  if(keyWentDown("space") && count === 0 ){
    Laser = createSprite(Fighter.x,540,5,17)
    Laser.velocityY = -3
    Laser.lifetime = 200
    Laser.shapeColor = "red"
    LaserGroup.add(Laser)
    count = 1  
  }

  if(Laser!=undefined){
     if(Laser.lifetime<150){
       count = 0
     }
     console.log(Laser.lifetime)
  }

  if(MeteorGroup.isTouching(LaserGroup)){
    Meteor.destroy()
    score = score+50
  }

  Fighter.display() 
  drawSprites();
  textSize(18)
  fill("white")
  text("Score: "+score,1050,50)
}

function Meteors(){
  if(frameCount%150 === 0){
    var rand = Math.round(random(300,900))
    Meteor = createSprite(rand,-50)
    Meteor.addImage(MeteorImage)
    Meteor.velocityY = 4
    Meteor.scale = 0.07
    Meteor.lifetime = 200
    MeteorGroup.add(Meteor)
  }
}

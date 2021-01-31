var balloon, database, position
var balloon_Animation

function preload() {
  bg = loadImage("sprites/Hot Air Ballon-01.png")
  balloon_Animation = loadImage("sprites/Hot Air Ballon-02.png", "sprites/Hot Air Ballon-03.png", "sprites/Hot Air Ballon-04.png")
}

function setup() {
  database = firebase.database()
  createCanvas(500,500);

  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("Hot Air Ballon", balloon_Animation)
  balloon.scale = 0.5

  var balloonPosition = database.ref('balloon/height')
  balloonPosition.on("value", readPosition, showError)
}

function draw() {
  background(bg); 

  if(keyDown(LEFT_ARROW)){
    //balloon.x = balloon.x-10
    updateHeight(-10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2)
  }
  else if(keyDown(RIGHT_ARROW)){
    //balloon.x = balloon.x+10
    updateHeight(10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2)
  }
  else if(keyDown(UP_ARROW)){
    //balloon.y = balloon.x-10
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2)
  }
  else if(keyDown(DOWN_ARROW)){
    //balloon.y = balloon.x+10
    updateHeight(-10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2)
  } 

  fill(0)
  stroke("white")
  textSize(25)
  text("**Use arrow keys to move Hot Air Balloon!",40,40)
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readPosition(data){
  height = data.val();
  console.log(height.x)
  balloon.x = height.x
  balloon.y = height.y
}

function showError(){
  console.log("Error in writing to the database")
}
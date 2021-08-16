var sonic;
var score=0;
var points=0;
var gameState="play";
function preload(){
  ground1=loadImage("sonic ground1.png");
  background1=loadImage("sonic background.jpeg");
  sonic1=loadAnimation("sonic 1.png","sonic 2.png","sonic 3.png","sonic 4.png","sonic 5.png");
  coin1=loadImage("sonic coin.png");
  obstacle1=loadImage("sonic obstacle.png");
  //obstacle2=loadImage("bomb3.png");
  gameOverImage=loadImage("gameover.png");
  retryImage=loadImage("reload.png");
  // sonicStop=loadImage("sonic 6.png");
  sonicStop=loadAnimation("sonic 1.png","sonic 2.png","sonic 3.png","sonic 4.png","sonic 5.png")
  
}

function setup() {
  createCanvas(1200,500);
  sonic=createSprite(50, 460, 50, 50);
sonic.shapeColor="blue";
sonic.addAnimation("running",sonic1);
 sonic.addAnimation("sonicStop",sonicStop);
 
  ground=createSprite(680,490,60,20);
  // ground.x=340;
  ground.velocityX=-5;
  ground.addImage(ground1);
  gameOver = createSprite(600,150,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale=0.5;
  retry = createSprite(600,260,10,10);
  retry.addImage(retryImage);
  retry.scale = 0.1;
  retry.visible = false;

  obstaclesGroup=createGroup();
  coinGroup=createGroup();


  
  

}


function draw() {
  background(background1);  
  if(gameState==="play"){
    score = score + Math.round(getFrameRate()/40);
  ground.velocityX = -4;
  if(ground.x<550){
ground.x=ground.width/2;
  }
  if(keyDown("SPACE")){
    sonic.velocityY=-13;
   
  }
  sonic.velocityY+=0.8;
  sonic.collide(ground) ;
  obstacles();
  coin();
  if(sonic.isTouching(coinGroup)){
    points = points+5;
    
      coinGroup.destroyEach();
    }
    if(sonic.isTouching(obstaclesGroup)){
      gameState = "end";
     }


}
drawSprites();

fill("darkblue");
textSize(20);
text("SCORE: "+score,280,20);
text("POINTS: "+points,10,20);

 if(gameState === "end"){
 
 gameOver.visible = true;
   retry.visible = true;
 
 sonic.velocityY=0;
 ground.velocityX = 0;
      
 
 fill("white");
 text("SCORE: "+score,200,275);
 text("Press Reload Button to \nrestart!!",100,120);
   text("POINTS: "+points,80,275);
 
 obstaclesGroup.setLifetimeEach(-1);
   coinGroup.setLifetimeEach(-1);   
    sonic.changeAnimation("sonicStop",sonicStop);
 obstaclesGroup.setVelocityXEach(0);
   coinGroup.setVelocityXEach(0);
}

if(mousePressedOver(retry)){
  restart();
}

  

 

}
function obstacles(){

  if(frameCount % 130 === 0){

            var obstacle = createSprite(400,435,10,10);
            obstacle.addImage("obstacle",obstacle1);
            obstacle.scale = 0.5;
            obstacle.velocityX = -(4+score/100);
            obstacle.lifetime = 100;
           // var obstacle1 = createSprite(400,435,10,10);
           // obstacle1.addImage("obstacle1",obstacle2);
         //   obstacle1.scale = 0.5;
         //   obstacle1.velocityX = -(4+score/100);
         //   obstacle1.lifetime = 100;
    
    var rand = Math.round(random(1,4));
    
    
    
    obstaclesGroup.add(obstacle,obstacle1);
    
  }
  
 
}

function restart(){
       gameState = "play";
       retry.visible = false;
       gameOver.visible = false;
       obstaclesGroup.destroyEach();
       coinGroup.destroyEach();
      sonic.changeAnimation("sonic",sonicStop);
       sonic.scale=1.0;
       score = 0;
       points = 0;

}
function coin(){
 if(frameCount % 80 === 0){
       var coin = createSprite(400,230,10,10);
       coin.addImage(coin1);
       coin.velocityX= -(4+score/100);
       coin.scale=0.09;
       coinGroup.add(coin);
 }


}





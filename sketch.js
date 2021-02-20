var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var o , oi1,oi2,oi3,oi4,oi5,oi6

var og,cg

var hitsound,jumpsound
var a = "Nandana"

var gamestate = "play" 
var gameover,gi
var restart,ri
var score=0
var newImage;

function preload(){
  trex_running = loadAnimation("trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  oi1 = loadImage("obstacle1.png");
   oi2 = loadImage("obstacle2.png");
  oi3 = loadImage("obstacle3.png");
  oi4 = loadImage("obstacle4.png");
  oi5 = loadImage("obstacle5.png");
  oi6 = loadImage("obstacle6.png");
  ri=loadImage("restart.png");
  gi=loadImage("gameOver.png");
  
 hitsound= loadSound("download (1).mp3")
jumpsound= loadSound("download.mp3")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
 
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(3 + frameCount/100)
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  trex.debug=false
  trex.setCollider("rectangle",0,0,90,90)
  
  var n = 123
  console.log(n)
  og = createGroup ()
  cg = createGroup ()
  
  gameover=createSprite(300,100,20,50)
    gameover.addImage(gi)
    gameover.scale=0.5
    restart=createSprite(300,70,10,40)
    restart.addImage(ri)
    restart.scale=0.5
  gameover.visible=false
  restart.visible=false
}

function draw() {
  background("white");
  textFont("Angsana New")
  textSize(18)
  text("H I = " + score,400,30)
  if(gamestate == "play"){
                      if(keyDown("space")&& trex.y > 160) {
                            trex.velocityY = -13;
                            jumpsound.play()
                      }
                          trex.velocityY = trex.velocityY + 0.8
                     if (ground.x < 0){ 
                            ground.x = ground.width/2;
                     }
                     if(og.isTouching (trex)){
                       gamestate = "end"
                            hitsound.play()
                           
                       
                     } 
                        ground.velocityX = -4;
                      spawnClouds();
                      obstacle();
                    score+=Math.round(frameCount/100)
  }
    
  
  if(gamestate == "end" ){
                              ground.velocityX=0
                              og.setVelocityXEach(0)
                              cg.setVelocityXEach(0)
                              og.setLifetimeEach(200)
                              cg.setLifetimeEach(200)
                              gameover.visible=true
                              restart.visible=true
                   if(mousePressedOver(restart)){
                            gamestate="restart"
                            og.destroyEach();
                            cg.destroyEach();
                  }
  }
  
  if(gamestate == "restart"){
                            gameover.visible=false
                            restart.visible=false
                            gamestate="play"
  }
 
  
  

  
  trex.collide(invisibleGround);
  
  
  
  
  
  
  //spawn the clouds
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(550,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 1;
    cloud.velocityX = -(3 + frameCount/120)
    trex.depth=cloud.depth
    trex.depth=trex.depth+1
    cloud.lifetime=200
    cg.add(cloud)
 

    }
}

 function obstacle(){
   if(frameCount % 50 === 0) {
   o = createSprite(600,170,50,50)
  o.addImage(oi1)
  o.scale=0.5
   o.velocityX=-(3 + frameCount/100)
     
     og.add(o)
     o.lifetime=200
     
    var a=Math.round(random(1,6)) 
   switch(a){
          
          case 1 : o.addImage(oi1);
                  break;
          case 2 : o.addImage(oi2);
                      break;
          case 3 : o.addImage(oi3);
                  break;
          case 4 : o.addImage(oi4);
                      break;
          case 5 : o.addImage(oi5);
                  break;
          case 6 : o.addImage(oi6);
                      break;
         
                    
          }
   
   
   }
 }
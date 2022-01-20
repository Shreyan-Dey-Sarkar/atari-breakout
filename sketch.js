var engine, world;
var box, boxes;
var ball, ballImg;
var SERVE = 0;
var PLAY = 1
var END = 2;
var gameState = 0;
var edge;
var score = 0;
var life = 8;
function createRow(y,color){
    for(c=0;c<15;c++){
    box = createSprite(80+54*c,y,50,25);
    box.shapeColor = color;
    boxes.add(box);
}
}

function preload(){
ballImg = loadImage("ball.png");
}

function setup(){
    var canvas = createCanvas(1000,600);
    
    boxes = createGroup();
    edge =  createEdgeSprites();
    console.log(edge);
    paddle = createSprite(500,550,100,10);
    paddle.shapeColor = "skyblue";
   
    ball = createSprite(450,400,10,10)
    ball.addImage(ballImg);
    ball.scale = 0.04;
   
    createRow(80,"red");
    createRow(80+30,"red");
    createRow(80+60,"orange");
    createRow(80+90,"orange");
    createRow(80+120,"green");
    createRow(80+150,"green");
    createRow(80+180,"yellow");
    createRow(80+210,"yellow");
 

}


function draw(){
    background("black");
    //if(gameState == 0){
    //paddle.x = mouseX;
    ball.bounceOff(paddle);
    ball.bounceOff(edge[0]);
    ball.bounceOff(edge[1]);
    ball.bounceOff(edge[2]);
    if (keyDown("RIGHT_ARROW")) {
        paddle.x = paddle.x + 20;
      }
  
      if (keyDown("LEFT_ARROW")) {
        paddle.x = paddle.x - 20;
      }
      if(paddle.x > 1000){
        paddle.x = 0;
    }
    if(paddle.x < 0){
      paddle.x = 1000;
  }

    /*if(mousePressedOver(ball)){
        ball.velocityY = 30;
        ball.velocityY += 0.8
    }*/
    if(gameState === 0){
        ball.velocityX = 0;
        ball.velocityY = 0;
        ball.y = 400;
        ball.x = 450;
        if(keyDown("space") ){
            ball.velocityX = 6;
            ball.velocityY = 10;
            gameState=1;
           }        
      
    }
    if (gameState === 1){ 
     
    
    if (ball.y > 600){
        ball.y = 400;
        life --;
        gameState = 0;        
    }
    if(life <= 0){
        
        gameState=2;
    }

    if(score >= 5 && score<=20){
        ball.velocityX = 6+ score/100;
        ball.velocityY = 10+ score/100;
    }
    else if(score >= 21 && score<=40){
        ball.velocityX = 8+ score/100;
        ball.velocityY = 12+ score/100;
    }
    else if (score >= 41 && score<=80){
        ball.velocityX = 9+ score/100;
        ball.velocityY = 13+ score/100;
    }

    ball.bounceOff(boxes,ballHit);

    
    
}
   
    if(gameState === 2){    
        //life = 0;
        fill("red");
        textSize(70)
        text("GAME OVER!", 300,400);
        textSize(35);
        fill("White");
        text("Press 'Ctrl + R' to restart", 350,470);
        gameState=0;
        //if(keyDown("R") ){            
            //gameState=0;
            //life = 3;
          //  score = 0;
        //}  
    }
    textSize(32); 
    text("Score: " + score, 800,45)

    text("Lives: " + life, 100,45)
    drawSprites();
    
}
function ballHit(ball, box){
    box.remove()
    score ++;
}


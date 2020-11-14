  // Variables
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup
  var score
  var PLAY = 1
  var END  = 0
  var gameState = PLAY
  var survivalTime 
  var ground


  function preload(){

 // Loading ImagesAnd Animations
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");

  }



  function setup() {
    // Creating Canvas
    createCanvas(600,600)

    // Defining Groups
    FoodGroup = createGroup()
    obstacleGroup = createGroup()

    // Creating Sprites
    monkey = createSprite(50, 375, 10, 10)
    monkey.addAnimation("monkey",monkey_running)
    monkey.scale = 0.1

    ground = createSprite(70, 380, 800, 10)
    ground.velocityX = -4
    ground.x=ground.width/2

    // Score And Survival Time
    score = 0
    survivalTime = 0
  }


  function draw() {
    // Giving Background
   background("lightgreen")

    // Writing Text
    fill("grey")
    textSize(17)
    text("Score : " + score,500,50)

    fill("grey")
    textSize(17)
    survivalTime = Math.ceil(frameCount / frameRate())
    text("Survival Time : " + survivalTime,10,50)

    // Monkey Colliding
    monkey.collide(ground)


    // Gamestate Play
     if(gameState === PLAY){


     if (ground.x < 300){
        ground.x = ground.width/2
      }


     if(keyDown("space") && monkey.y >= 300) {
          monkey.velocityY = -12   
      }    


     if(FoodGroup.isTouching(monkey)){
        score = score + 1 
        FoodGroup.destroyEach()
      }


      monkey.velocityY = monkey.velocityY + 0.8


      obstacleGroup.setLifetimeEach(-1)


      food()
      obstacles()


      if(obstacleGroup.isTouching(monkey)){
          gameState = END
      }
    }

    // Gamestate End
      if (gameState === END) {
       obstacleGroup.destroyEach()
       FoodGroup.destroyEach()
        monkey.destroy()



       if (ground.x < 300){
        ground.x = ground.width/2
      }


      stroke("red")
      fill("red")
      textSize(72);
      text("Game Over", 150, 270);

      stroke("black")
      fill("black");
      textSize(50);
      text("Monkey Died", 170, 350);
     }



    // Drawing Sprites
    drawSprites()
  }



  function food() {
    if (frameCount % 80 === 0) {
      banana = createSprite(600,350,40,10);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(250,200));
      banana.scale = 0.1;

      banana.velocityX = -3;
      banana.lifetime = 200;

      FoodGroup.add(banana);
    }
  }



  function obstacles() {
    if (frameCount % 100 === 0){
      obstacle = createSprite(600,370,10,10)
      obstacle.addImage(obstacleImage)
      obstacle.velocityX = -3
      obstacle.lifetime = 200
      obstacle.scale = 0.1
      obstacleGroup.add(obstacle)
    }

  }





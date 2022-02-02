//To create Variables for the Game.
var bg,
  bgImg,
  ironMan,
  ironImage,
  stoneImg,
  stoneGroup,
  diamondImg,
  diamondGroup,
  spikeImg,
  spikeGroup,
  score = 0;
//This is the Variable of Gamestate and Restart Option.
var gameState = "PLAY";
var restart, restartImg;
//Preload Function is used to load the necessary assets for the Game.
function preload() {
  //The Below Statements are used to Load the Images for the Game.
  bgImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImg = loadImage("images/diamond.png");
  spikeImg = loadImage("images/spikes.png");
  restartImg = loadImage("images/restart.png");
  jumpSound = loadSound("sounds/fireRelease.wav");
  diamondSound = loadSound("sounds/firereward.wav");
  startSound = loadSound("sounds/start.wav");
  spikeSound = loadSound("sounds/stonefell.wav");
  stoneSound = loadSound("sounds/fireHit.wav");
  restartSound = loadSound("sounds/buttonClick.wav");
  endSound = loadSound("sounds/fireEnemy.wav");
}
//The Setup Function is used to execute a Block of Code only once.
function setup() {
  //To create Background for the Game.
  createCanvas(1500, 900);
  edges = createEdgeSprites();
  //This is for BackGround Image.
  bg = createSprite(580, 300);
  bg.addImage(bgImg);
  bg.scale = 3;
  bg.velocityX = -6;
  //This is for Ironman Image.
  ironMan = createSprite(300, 300, 15, 15);
  ironMan.addImage(ironImage);
  ironMan.scale = 0.3;
  //This is for Creating the Different Kind of Groups in the Game.
  stoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
  //This is for the Restart Option.
  restart = createSprite(750, 450);
  restart.addImage(restartImg);
  restart.visible = false;
}
//The Draw Function is used to execute a Block of Code Infinitely many times.
function draw() {
  //This is for the play state.
  if (gameState == "PLAY") {
    //Giving velocity to the BackGround Image.
    bg.velocityX = -6;
    if (bg.x < 50) {
      bg.x = bg.width / 4;
    }
    //To control the Ironman in the Direction of our Choice.
    if (keyDown("up")) {
      ironMan.velocityY = -10;
      jumpSound.play();
    }
    if (keyDown("down")) {
      ironMan.velocityY = 5;
      jumpSound.play();
    }
    if (keyDown("left")) {
      ironMan.velocityX = -5;
      jumpSound.play();
    }
    if (keyDown("right")) {
      ironMan.velocityX = 5;
      jumpSound.play();
    }
    //To prevent the Ironamn from vanishing in the edges.
    ironMan.bounceOff(edges[0]);
    ironMan.bounceOff(edges[1]);
    ironMan.bounceOff(edges[2]);
    //Calling the function to Generate Stones.
    generateStones();
    //To make the Ironman Collide with the Stones.
    for (var i = 0; i < stoneGroup.length; i++) {
      var temp = stoneGroup.get(i);
      if (temp.isTouching(ironMan)) {
        ironMan.collide(temp);
        stoneSound.play();
      }
    }
    //Calling the function to Generate Diamonds.
    generateDiamonds();
    //To increse the score by 1 while collecting one Diamond.
    for (var i = 0; i < diamondGroup.length; i++) {
      var temp = diamondGroup.get(i);
      if (temp.isTouching(ironMan)) {
        temp.destroy();
        score++;
        diamondSound.play();
      }
    }
    //Calling the function to Generate Spikes.
    generateSpikes();
    //To reduce the score by 5 when the Ironman touches the Spikes.
    for (var i = 0; i < spikeGroup.length; i++) {
      var temp = spikeGroup.get(i);
      if (temp.isTouching(ironMan)) {4
        spikeSound.play();
        ironMan.x = 300;
        ironMan.y = 300;
        score--;
        score--;
        score--;
        score--;
        score--;
        temp.destroy();
      }
    }
    //To end the game when the score reaches to -10.
    if (score <= -10) {
      gameState = "END";
      restart.visible = true;
      endSound.play();
    }
  } //end of play state.
  //This is the code for the end state.
  else if (gameState == "END") {
    bg.velocityX = 0;
    ironMan.velocityX = 0;
    ironMan.velocityY = 0;
    stoneGroup.setVelocityYEach(0);
    diamondGroup.setVelocityYEach(0);
    spikeGroup.setVelocityYEach(0);
    stoneGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);
    spikeGroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
      restartGame();
      restartSound.play();
      console.log("restart");
    }
  }
  //To draw the sprites which we have created in the setup function.
  drawSprites();
  //To display the Score Of the Player.
  textSize(40);
  text("Diamonds Collected : " + score, 1000, 50);
}
//This is the function to generate Stones.
function generateStones() {
  if (frameCount % 150 == 0) {
    var stone = createSprite(100, 100, 20, 20);
    stone.x = random(100, 1400);
    stone.velocityY = 3;
    stone.lifetime = 700;
    stone.addImage(stoneImg);
    stoneGroup.add(stone);
  }
}
//This is the function to generate Diamonds.
function generateDiamonds() {
  if (frameCount % 50   == 0) {
    var diamond = createSprite(100, 100, 20, 20);
    diamond.scale = 0.5;
    diamond.x = random(100, 1400);
    diamond.velocityY = 2;
    diamond.lifetime = 300;
    diamond.addImage(diamondImg);
    diamondGroup.add(diamond);
  }
}
//This is the function to generate Spikes.
function generateSpikes() {
  if (frameCount % 80 == 0) {
    var spike = createSprite(100, 100, 20, 20);
    spike.x = random(100, 1400);
    spike.velocityY = 3;
    spike.lifetime = 300;
    spike.addImage(spikeImg);
    spikeGroup.add(spike);
  }
}
//This is the function which happens while the player restarts his/her game.
function restartGame() {
  gameState = "PLAY";
  spikeGroup.destroyEach();
  stoneGroup.destroyEach();
  diamondGroup.destroyEach();
  score = 0;
  restart.visible = false;
}

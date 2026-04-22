let gameMaster = {};
let p1 = {};
let p2 = {};
let cloud1 = {};
let cloud2 = {};
let cloud3 = {};
let cloud4 = {};
let cloud5 = {};
// ^ Objects

let cloudHeight = 250
let cloudAboveScreen = 100
let cloudMaxSpeed = 4.5

function preload() {
  sky = loadImage('assets/sky.png');
  ground = loadImage('assets/ground.png');
  cloudSheet = loadImage('assets/clouds.png');
  playerSprite = loadImage('assets/spriteArt.png');
  joker = loadImage('assets/joker.png');
  failure = loadImage('assets/fail.png');
  goNow = loadImage('assets/now.png');
  pixel = loadFont('assets/VCR_OSD_MONO_1.001.ttf');
}

function setup() {
  createCanvas(1280, 720);
  frameRate(60);
  sky = loadImage('/assets/sky.png'); //background is loaded here. Sprites are all loaded within the player/master objects
  ground = loadImage('/assets/ground.png');
  background(sky);
  image(ground, 0, 0);
  
  gameOver = true;
  p1 = new Player(100, 325);
  p2 = new Player(width-280, 335);
  cloud1 = new Clouds(0 - width/2, int(random(0-cloudAboveScreen, cloudHeight)), (random(1, cloudMaxSpeed)), int(random(0, 6)));
  cloud2 = new Clouds(0 - width/2, int(random(0-cloudAboveScreen, cloudHeight)), (random(1, cloudMaxSpeed)), int(random(0, 6)));
  cloud3 = new Clouds(0 - width/2, int(random(0-cloudAboveScreen, cloudHeight)), (random(1, cloudMaxSpeed)), int(random(0, 6)));
  cloud4 = new Clouds(0 - width/2, int(random(0-cloudAboveScreen, cloudHeight)), (random(1, cloudMaxSpeed)), int(random(0, 6)));
  cloud5 = new Clouds(0 - width/2, int(random(0-cloudAboveScreen, cloudHeight)), (random(1, cloudMaxSpeed)), int(random(0, 6)));
  
  okToStart = true; graceTimer = 120; //graceTimer is set to 120 initially so there's no wait when launching the program
}

function playGame(){  //if the game is over, pressing spacebar will reset it
  if(key == ' '){
    gameOver = false;
    GO = false;
    p1shot = false; p2shot = false;
    earlyShot = false; p1try = 2; p2try = 2; p1fail = false; p2fail = false;
    frameTimer = 0; graceTimer = 0;
    alpha = 255; fadeTimer = 0;
  }
}

function draw() {
  background(sky);
  cloud1.Anim();
  cloud2.Anim();
  cloud3.Anim();
  cloud4.Anim();
  image(ground, 0, 0);
  p1.displayP1(); p2.displayP2();    //should always display player 1 + 2

  
  if(graceTimer < 110){
    graceTimer++;
  }
  
  if(graceTimer > 100){
  
  if(!gameOver && !earlyShot){       //if the game is active
    p1.count();
    p1.input(); p2.input();
  } else if(earlyShot){              //if a player shoots too early, disable inputs and reset the game. Also subtracts a life from the shooter
    p1.reset();
  }
    else if(gameOver){               //if the game is over, pressing spacebar will reset it
    playGame();
    
    if(p1shot || p2shot){    //If a player is succesful, play the white-fade
      p1.whiteFade();
    } else if (p1try < 1 || p2try < 1){    //If a player fails, tell them who won
      okToStart = false;
      if(fadeTimer < 200){
        fadeTimer++;  //Re-using fadeTimer so I don't have to make another variable. For loops are too fast
      }
      if(fadeTimer > 50){
        fill(color(255, 255)); textSize(100); textAlign(CENTER, CENTER); textFont(pixel); text("False Start", width/2, height-200);
        if(fadeTimer > 120){
          push();
            if(p2fail){
              fill(0, 0, 255); text("P1 WINS", 250, 630);
            } else {
              fill(255, 0, 0); text("P2 WINS", 1030, 630);
            }
          pop();
          if(fadeTimer > 190){  //When should [Press Space To Start] Appear?
            okToStart = true;
          }
        }
      }
    }
    if(okToStart){
      push();
        fill(255, 0, 0); textSize(100); textAlign(CENTER, CENTER); textFont(pixel); text("[Press Space]", width/2, 200);
      pop();
    }
  }
  
  //println("global", globalTimer, "whoShot", p1shot, p2shot, "frameCount", frameTimer, "GO", GO, "gameOver", gameOver, "early", earlyShot, "lives", p1try, p2try);
  // ^ Ultimate Debugger
  
  }
}

//Below is the input handler

function keyPressed(){
  if (key == 'w'){
    p1key = true;
  }
  if (keyCode == UP_ARROW){
    p2key = true;
  }
}

function keyReleased(){
  if (key == 'w'){
    p1key = false;
  }
  if (keyCode == UP_ARROW){
    p2key = false;
  }
}

let playerSprite;
let p1Stance; let p1Shoot; let p1Dead; let p1Hat;
let p2Stance; let p2Shoot; let p2Dead; let p2Hat;
// ^ player sprite sheets

let sky;
let ground;
let pixel;

let failure; let joker; let goNow;
// ^ UI

let globalTimer;  //How long has it been since the game started?
let whenThe;      //When will the players be prompted to fire?
let GO;       //If GO is false, players who fire will be penalized. If it's true, they win
let p1shot;   //Did player one shoot?
let p2shot;

let earlyShot;     //Should the shot be penalized?    
let p1try; let p2try;  //player one attempts left (You get two tries)
let p1fail; let p2fail;

let gameOver; let resetTimer; //Is the game over? resetTimer is essentially a grace period

let p1key; let p2key;     //Input handlers

let alpha; let fadeTimer;  let okToStart; //fade effect for the white rectangle

let graceTimer; //Timer for the grace period at the start of every round. During the "grace period," the round hasn't technically begun.

class Master{
  constructor(Reset, NOW){
    this.Reset = Reset;
    this.NOW = NOW;
    
    globalTimer = Reset;          //Once the game begins, the globalTimer is "reset" to 0 (assuming you spawned a Master object with parameter 0)
    whenThe = NOW;                //When should the player fire? When spawning the Master object, use int(random())
    
    GO = false;
    p1shot = false; p2shot = false;
    
    earlyShot = false; p1try = 2; p2try = 2;
    
    //goNow = loadImage('assets/now.png');    //Initialize firing prompt
    //pixel = loadFont('assets/VCR_OSD_MONO_1.001.ttf', 100);
    
    //cloudSheet = loadImage('assets/clouds.png');
    cloudSprites[0] = cloudSheet.get(0, 0, 500, 215);     cloudSprites[4] = cloudSheet.get(550, 50, 700, 170);
    cloudSprites[1] = cloudSheet.get(0, 230, 620, 540);   cloudSprites[5] = cloudSheet.get(760, 0, 1279, 230);
    cloudSprites[2] = cloudSheet.get(0, 590, 250, 719);   cloudSprites[6] = cloudSheet.get(660, 205, 1279, 719);
    cloudSprites[3] = cloudSheet.get(300, 540, 630, 719); 
  }
  
  count(){  //How many frames has it been? The if statement checks if it's the correct time to fire
    globalTimer++;
    if(globalTimer >= whenThe && (!p1shot || !p2shot)){
      GO = true;
      image(goNow, 350, 100);
    }
    if(GO){
      frameTimer++;
    }
  }
  
  Game(){  //i.e. Game set and match. This function ends the game once a player has won
    gameOver = true;
    globalTimer = 0;
  }
  
  whiteFade(){  //Essentially a cutscene
    okToStart = false;
    fadeTimer++;
    if(fadeTimer < 150){
      fill(color(255, alpha)); rect(0, 0, width, height);
      if(fadeTimer > 50){
        alpha -= 5;
      }
    } else if (fadeTimer > 160){
      fill(color(255, 255)); textSize(100); textAlign(CENTER, CENTER); textFont(pixel); text(frameTimer+" Frames", width/2, height-200);
      
      if(fadeTimer > 230){
        push();
          if(p1shot){
            fill(0, 0, 255); text("P1 WINS", 250, 630);
          } else if(p2shot){
            fill(255, 0, 0); text("P2 WINS", 1030, 630);
          }
        pop();
        if(fadeTimer > 300){    //When should [Press Space To Start] appear?
          okToStart = true;
        }
      }
    }
  }
  
  reset(){  //Used for resetting the game if a player shoots too early. Keeps player lives
    resetTimer++;
    if(resetTimer > 100){
      print("reset");
      globalTimer = 0; whenThe = int(random(300, 2500));
      frameTimer = 0;
      earlyShot = false; p1shot = false; p2shot = false;
      gameOver = false;
    }
  }
}

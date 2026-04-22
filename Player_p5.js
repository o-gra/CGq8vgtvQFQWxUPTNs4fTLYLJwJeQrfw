let playerStance = [p1Stance, p1Shoot, p1Dead, p1Hat, p2Stance, p2Shoot, p2Dead, p2Hat, failure];
let p1Sprite; let p2Sprite;
// ^ player sprite sheets

let frameTimer; //how many frames has it been since prompted to fire?

class Player extends Master{
  constructor(playerPosX, playerPosY){
    super(0, int(random(300, 2500))); //7-42 seconds
    this.playerPosX = playerPosX;
    this.playerPosY = playerPosY;
    p1Sprite = 0; p2Sprite = 4;
    frameTimer = 0;
    
    //playerSprite = loadImage('assets/spriteArt.png');
    playerStance[0] = playerSprite.get(0, 0, 150, 250);     playerStance[4] = playerSprite.get(385, 274, 150, 250);
    playerStance[1] = playerSprite.get(160, 0, 200, 250);   playerStance[5] = playerSprite.get(185, 274, 200, 250);
    playerStance[2] = playerSprite.get(375, 0, 150, 250);   playerStance[6] = playerSprite.get(15, 274, 150, 250);
    playerStance[3] = playerSprite.get(385, 0, 150, 100);   playerStance[7] = playerSprite.get(0, 275, 150, 85);
    playerStance[8] = failure;
    // ^ again, the player sprite sheet
    
    //joker = loadImage('assets/joker.png');
  }
  
  count(){ //Initiates the round
    super.count();
    if((p1shot || p2shot) || (p1try < 1 || p2try < 1) && !earlyShot){
      super.Game();
    }
  }
  
  displayP1(){  //Which sprite should the player be?
    image(playerStance[p1Sprite], this.playerPosX, this.playerPosY);
    if(!earlyShot){
      if(!p1shot && !p2shot){
        p1Sprite = 0;
      } else if (p1shot){
        p1Sprite = 1;
      } else if (p2shot){
        p1Sprite = 2;
      }
    } else if (earlyShot && p1shot){
      p1Sprite = 8;
    }
    
    let lifePosX = 10; let lifePosY = 10; let lifeScale = 2;
    if(p1try == 0){  //life system. If player one fails a shot, a joker card is added. If they reach 2 joker cards, game over
      image(joker, lifePosX, lifePosY, joker.width/lifeScale, joker.height/lifeScale); image(joker, lifePosX + 30, lifePosY + 30, joker.width/lifeScale, joker.height/lifeScale);
      p1fail = true;
    } else if(p1try == 1){
      image(joker, lifePosX, lifePosY, joker.width/lifeScale, joker.height/lifeScale);
    }
  }
  
  displayP2(){
    image(playerStance[p2Sprite], this.playerPosX, this.playerPosY);
    if(!earlyShot){
      if(!p1shot && !p2shot){
        p2Sprite = 4;
      } else if (p1shot){
        p2Sprite = 6;
      } else if (p2shot){
        p2Sprite = 5;
      }
    } else if (earlyShot && p2shot){
      p2Sprite = 8;
    }
    
    let lifePosX = width-joker.width+45; let lifePosY = 10; let lifeScale = 2;
    if(p2try == 0){
      image(joker, lifePosX, lifePosY, joker.width/lifeScale, joker.height/lifeScale); image(joker, lifePosX + 30, lifePosY + 30, joker.width/lifeScale, joker.height/lifeScale);
      p2fail = true;
    } else if(p2try == 1){
      image(joker, lifePosX, lifePosY, joker.width/lifeScale, joker.height/lifeScale);
    }
  }
  
  input(){  //The game's logic. If it's past the time to fire, whoever fires first wins. If it's not, they are penalized.
    if(GO){
      earlyShot = false;
      if(p1key && !p2shot){
        p1shot = true;
      }
      if(p2key && !p1shot){
        p2shot = true;
      }
    } 
    if(!GO){
      if(p1key){
        p1shot = true;
        earlyShot = true; resetTimer = 0;
        p1try--;
        p1Sprite = 8;
        super.reset();
        p1key = false;
      }
      if(p2key){
        p2shot = true;
        earlyShot = true; resetTimer = 0;
        p2try--;
        super.reset();
        p2Sprite = 8;
        p2key = false;
      }
    }
  }
}

let cloudSheet = {};
let cloudSprite1; let cloudSprite2; let cloudSprite3; let cloudSprite4; let cloudSprite5; let cloudSprite6; let cloudSprite7;
let cloudSprites = [cloudSprite1, cloudSprite2, cloudSprite3, cloudSprite4, cloudSprite5, cloudSprite6, cloudSprite7];
//^ Cloud sprite sheet


class Clouds{
  constructor(cloudPosX, cloudPosY, cloudSpeed, cloudSprite){
    this.spriteSize   = random(0.2, 1.2);
    this.cloudPosX    = cloudPosX;
    this.cloudPosY    = cloudPosY;
    this.cloudSpeed   = cloudSpeed;
    this.cloudSprite  = cloudSprite;
    
    //cloudSheet = loadImage('/assets/clouds.png');
    cloudSprites[0] = cloudSheet.get(0, 0, 500, 215);     cloudSprites[4] = cloudSheet.get(480, 50, 320, 170);
    cloudSprites[1] = cloudSheet.get(0, 230, 620, 340);   cloudSprites[5] = cloudSheet.get(760, 0, 1279, 230);
    cloudSprites[2] = cloudSheet.get(0, 590, 250, 719);   cloudSprites[6] = cloudSheet.get(660, 205, 1279, 719);
    cloudSprites[3] = cloudSheet.get(300, 540, 330, 719);
    //^ Cloud sprite sheet
  }
  
  Anim(){ //move the clouds
    let spriteW = cloudSprites[this.cloudSprite].width;
    let spriteH = cloudSprites[this.cloudSprite].height;
    image(cloudSprites[this.cloudSprite], this.cloudPosX, this.cloudPosY, spriteW*this.spriteSize, spriteH*this.spriteSize);
    this.cloudPosX += this.cloudSpeed * this.spriteSize;
    
    if(this.cloudPosX > width + width/2){
      this.cloudPosX = 0 - width/2;
      this.cloudSpeed = (random(1, cloudMaxSpeed));
      this.cloudPosY = int(random(0-cloudAboveScreen, cloudHeight));
      this.cloudSprite = int(random(0, 6));
      this.spriteSize = random(0.2, 1.2);
    }
  }
}

//All this script does is have clouds move at varying speeds across the background

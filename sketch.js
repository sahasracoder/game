var bg, bgImg,bgImg2
var kid, kidImg, gender, name
var score=0;
var trampImg,tramp
var mask, maskImg, vaccine,vaccineImg
var virus, virusImg
var invisibleGround
var TrampGrp, VaccineGrp, MaskGrp, VirusGrp,  DoorGrp, IbGrp;
var SERVE = 0;
var PLAY=1;
var END=2;

var gameState = SERVE;


function preload(){
  
  
bgImg=loadImage("assets/beach.jpg");
//bgImg2=loadImage("assets/desert.jpg")
trampImg=loadImage("assets/tr.png");
maskImg=loadImage("assets/mask.png");
vaccineImg=loadImage("assets/vaccine.png");
virusImg=loadImage("assets/virus.png");
kidImg=loadImage("assets/girl.png");
girlwmImg=loadImage("assets/gwm.png");
}




function setup() {

  createCanvas(displayWidth,displayHeight);
  bg=createSprite(width/2, height/2);
  bg.scale=2;
  bg.addImage(bgImg);

  kid=createSprite(100,100,50,20);
  kid.addImage(kidImg);
  kid.scale= 0.7;
  kid.debug=true;

 invisibleGround=createSprite(210,710,displayWidth/2,20);
 invisibleGround.visible = false;
 

  kid.collide(invisibleGround);

  TrampGrp=new Group();
  MaskGrp=new Group();
  VirusGrp=new Group();
  DoorGrp=new Group();
  VaccineGrp=new Group();
  IbGrp=new Group();
  
  
   if(gameState=== SERVE){
     kid.velocityY =0;
    swal({
      title: "Player Details",
      text: "Write Your Name:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Write Your Name"
    },
    function(inputValue){
      if (inputValue === null) return false;
      
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false
      }


      
      
      swal("Nice!", "You wrote: " + inputValue, "success");
    
    });
    

  } 

  
}

function draw() {
  if(keyDown("space")){
    gameState = PLAY;

      }

      if(gameState===PLAY){
       
        bg.velocityY=+2
       
        if(bg.y>displayHeight-150){
        bg.y=displayHeight/2
      
        }
        spawnTrampoline();
        spawnMask();
        spawnVaccine();
        spawnVirus();

        
        if(keyDown (LEFT_ARROW)){
          kid.x= kid.x-5
          }
       if(keyDown(RIGHT_ARROW)){
          kid.x= kid.x+5
          }
          if(keyDown ("space")){    
          kid.velocityY=-3
            }
             //gravity//
   kid.velocityY = kid.velocityY + 0.8  
          

         // kid.y +=0.9
         if(kid.isTouching(TrampGrp)){
          kid.velocity=0
         }

          if(kid.collide(VirusGrp)){

         gameState = END;
         swal("oops, you have been infected");
         //   VirusGrp.destroyEach();
          }
          if(kid.collide(MaskGrp)){
          kid.addImage(girlwmImg);
            kid.scale= 0.5;
          }
            
                  
      

      if(gameState===END)
      {
        kid.velocityX=0;
        kid.velocityY=0;
        bg.velocityY=0;
        bg.velocityX=0;
        TrampGrp.destroyEach();
        VirusGrp.destroyEach();
        IbGrp.destroyEach();
        MaskGrp.destroyEach();
        VaccineGrp.destroyEach();
        VirusGrp.destroyEach();
      }

    
      console.log(gameState)


  drawSprites();

 // text(mouseX+','+mouseY,mouseX,mouseY)
}
}


function spawnTrampoline(){
  if(frameCount %200===0){
    var tramp=createSprite(200,200,220,150)
   tramp.x= Math.round(random(100,800))
   tramp.debug=true
    //add image//
    tramp.addImage(trampImg)
    tramp.velocityY=+2
    tramp.scale=0.3;
    kid.depth=tramp.depth
    kid.depth+=1
    TrampGrp.add(tramp)
    var Ib=createSprite(200,300,tramp.width/2,2)
    Ib.x= tramp.x
    Ib.velocityY=tramp.velocityY
    Ib.visible=false;
    IbGrp.add(Ib)
  }
}
function spawnMask(){
  if(frameCount %450===0){
    var mask=createSprite(100,100,700,700)
   mask.x= Math.round(random(950,900))
    //add image//
    mask.addImage(maskImg)
    mask.velocityY=+2
    mask.scale=0.3;
    kid.depth=mask.depth
    kid.depth+=1
    MaskGrp.add(mask)
    
  }
}

function spawnVaccine(){
  if(frameCount %550===0){
    var vaccine=createSprite(50,50,600,600)
   vaccine.x= Math.round(random(500,100))
    //add image//
    vaccine.addImage(vaccineImg)
    vaccine.velocityY=+2
    vaccine.scale=0.3;
    kid.depth=vaccine.depth
    kid.depth+=1
    VaccineGrp.add(vaccine)
  }
}
   

function spawnVirus(){
  if(frameCount %600===0){
    var virus=createSprite(30,30,500,500)
   virus.x= Math.round(random(300,1000))
    //add image//
    virus.addImage(virusImg)
    virus.velocityY=+2
    virus.scale=0.2;
    kid.depth=virus.depth
    kid.depth+=1
    VirusGrp.add(virus)
  }
}           
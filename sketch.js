var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/Happy.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/WashRoom.png");
bedroom=loadImage("images/BedRoom.png");
milk=loadImage("images/milk.png");
livingRoom=loadImage("images/Living Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  foodObj = new Food();
   
  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
 milkbottle1=createSprite(140,435,10,10);
 milkbottle1.addImage(milk);
 milkbottle1.scale=0.025;

 milkbottle2=createSprite(210,280,10,10);
 milkbottle2.addImage(milk);
 milkbottle2.scale=0.025;
 milkbottle2.visible=false;
}

function draw() {
  // background("green");
  foodObj.display();
  writestock(foodS);
  if(foodS==0){
    dog.addImage(happyDog);
    milkbottle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkbottle2.visible=true;
  }
  var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState=data.val();
  });

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }

  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkbottle2.visible=false;
    dog.y=250;
  }

    var Bath=createButton("I want to take bath");
    Bath.position(580,125);
    if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===3){
   dog.addImage(washroom);
   dog.scale=1;
   milkbottle2.visible=false;
}

    var Sleep=createButton("I am very sleepy");
    Sleep.position(710,125);
    if(Sleep.mousePressed(function(){
      gameState=4;
      database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===4){
      dog.addImage(bedroom);
      dog.scale=1;
      milkbottle2.visible=false;
    }
    var Play=createButton("Lets play !");
    Play.position(500,160);
    if(Play.mousePressed(function(){
      gameState=5;
      database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===5){
      dog.addImage(livingRoom);
      dog.scale=1;
      milkbottle2.visible=false;
    }


    var PlayGarden=createButton("Lets play in park");
    PlayGarden.position(585,160);
    if(PlayGarden.mousePressed(function(){
      gameState=6;
      database.ref('/').update({'gameState':gameState});
    }));
    if(gameState===6){
      dog.y=175;
      dog.addImage(garden);
      dog.scale=1;
      milkbottle2.visible=false;
    }
  drawSprites();
  text("milkbottles remaing: "+foodS,170,440);
}

//function to read food Stock
function readStock(data)
{
  foodS=data.val();
 
}

function writestock(x){
  database.ref('/').update({
    food:x
  })
}


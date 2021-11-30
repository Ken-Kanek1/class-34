const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground,rope2,rope3;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var starImg;
var star,star2;

var bg_img;
var food;
var rabbit;


var button,blower,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var blower;
var canW,canH;
var emptyStar,star1,Star2;
var starScore;
var count = 0;
var count1 = 0;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  starImg = loadImage('star.png');
  emptyStar = loadAnimation('empty.png');
  star1 = loadAnimation('one_star.png');
  Star2 = loadAnimation('stars.png');
  

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
canW = displayWidth;
canH = displayHeight;
creatCanvas(canW + 80,canH);

  }
  else{
canW = windowWidth;
canH = windowHeight;
createCanvas(canW,canH);
  }
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(canW/2-150,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(canW/2,30);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(canW/2+150,canH/2-250);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  mute_btn = createImg("mute.png");
  mute_btn.position(canW-100,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blower = createImg("balloon.png");
  blower.position(canW/2,350);
  blower.size(100,100);
  blower.mouseClicked(airBlow);
  

  star = createSprite(canW/2,100);
  star.addImage(starImg);
  star.scale = 0.025;

  star2 = createSprite(canW/2-100,400);
  star2.addImage(starImg);
  star2.scale = 0.025;

  starScore = createSprite(60,30);
  starScore.addAnimation('empty',emptyStar);
  starScore.scale = 0.25;
  
  starScore.addAnimation('1',star1);

  starScore.addAnimation('2',Star2);

  rope = new Rope(10,{x:canW/2-140,y:30});
  ground = new Ground(canW,canH-10,canW,20);

  rope2 = new Rope(7,{x:canW/2 + 30,y:35});

  rope3 = new Rope(6,{x:canW/2+180,y:canH/2-220});

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(canW/2,canH - 80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  fruit_con_2 = new Link(rope2,fruit);

  fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW + 80,canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    World.remove(engine.world,fruit);
              fruit = null;
    eating_sound.play();
  }

  if(collide(fruit,star,30)==true){

    star.visible = false;
    count = 1;
   console.log(count);
  }

  if(collide(fruit,star2,30)==true){

    star2.visible = false;
    count1=1;
     console.log(count);
  }
 if(count>=1 || count1>=1 ){

 starScore.changeAnimation('1');

 }

 else if(count>=1 && count1>=1 ){

  starScore.changeAnimation('2');
 
  }


  if(fruit!=null && fruit.position.y>=canH)
  {
    bunny.changeAnimation('crying');
    fruit=null; 
    bk_song.stop();
    sad_sound.play();
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
}

function drop2(){

rope2.break();
fruit_con_2.detach();
fruit_con_2 = null;
cut_sound.play();

}

function drop3(){

  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
  cut_sound.play();
  
  }


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}
function airBlow(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
air.play();


}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
bk_song.play();


  }



}

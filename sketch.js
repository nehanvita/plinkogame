var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var divisions = [];
var particles = [];
var plinkos = [];

var divisionHeight=300;
var score =0;
var particle = null;
var count = 0;
var balls = 5;
var name = "balls";

gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //for making divisions
  for(var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //for making obstacles for particles
  for(var j = 75; j <=width; j=j+50) {
     plinkos.push(new Plinko(j,75));
  }

  for(var j = 50; j <=width-10; j=j+50) {
     plinkos.push(new Plinko(j,175));
  }

  for(var j = 75; j <=width; j=j+50) {
     plinkos.push(new Plinko(j,275));
  }

  for(var j = 50; j <=width-10; j=j+50) {
     plinkos.push(new Plinko(j,375));
  }
}
 
function draw() {
  background("black");
  textSize(20);
  text("Score : "+score,20,30);

  Engine.update(engine);
 
  ground.display();
  for(var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
  }
   
  for(var k = 0; k < divisions.length; k++) {
     divisions[k].display();
  }

  if(particle !== null) {
    particle.display();

    if(particle.body.position.y > 750) {

      if(particle.body.position.x > 0 && particle.body.position.x < 240) {
        score = score + 500;
      }
       
      if(particle.body.position.x > 240 && particle.body.position.x < 480) {
        score = score + 300;
      }

      if(particle.body.position.x > 480 && particle.body.position.x < 800) {
        score = score + 200;
      }

       particle = null;
       count = count + 1;
    }
    
    if(count === 5) {
       gameState = "end";
       name = "balls";
    }
  }

  //console.log(count);
  //console.log(particle);
  textSize(27);
  text("500",20,530);
  text("500",100,530);
  text("500",180,530);
  text("300",260,530);
  text("300",340,530);
  text("300",420,530);
  text("200",500,530);
  text("200",580,530);
  text("200",660,530);
  text("200",740,530);

  if(gameState === "end") {
    textSize(40);
    text("GAME OVER!",280,350);
    textSize(27);
    text("your score : " + score ,300,430);
   }

   if(count === 4) {
     name = "ball";
   } 

   if(particle === null) {
     text("you have " + balls + " " + name +" left",270,30);
   }
}

function mousePressed() {

  if(gameState !== "end" && particle === null) {
    if(count <= 5) {
      particle = new Particle(mouseX,10,10,10);
      particle.display();
      balls = balls - 1;
    }
  }
}
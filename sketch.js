// create our creature class

class Creature {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.friction = new createVector(0, 0); 
    this.desired = new createVector(0, 0); 
    this.diameter = random(10,40);
    this.speedLimit = random(1,this.diameter/10);
    this.full = 0;
  }

  moveToFood(x, y){

    // 如果她喂饱了
    if(this.full>0){
      return false;
    }

    this.desired.x = x;
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); 

    if (direction.mag() < this.diameter/2){
      this.full = 1000;
      return true;
    } 

    //only move if they are close to the target x & y locations
    if(direction.mag() < 200){
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
      this.velocity.add(direction);
    }

    return false;
  } 
 
  update() {
    if(this.full<50){
    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);
    }
    
    //limit how fast each one can go
    this.velocity.limit(this.speedLimit);
    // Add velocity to the location.
    this.location.add(this.velocity);


    // Bounce off edges (updated from last term to work better with canvas resize)
    // 边缘反弹
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }
  
    // 如果它吃饱了，饱度--
    if(this.full > 0){
      this.full--;
    }

    // Display circle at location vector
    noStroke();
  
    fill(map(this.full,0,1000,0,255),0,155);
    circle(this.location.x,this.location.y,this.diameter)
  }
}

//Main sketch below
// an array to store the creatures
let creatures = [];
let food = [];

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  addGUI();
  addGUI_B();
  addGUI_C();

  //圆球的初始位置
  for(let i = 0; i < 80; i++){
    let c = new Creature(random(width), random(height));
    creatures.push(c);
  }

}

function draw() {
  background(44,204,113);
  
    // loop through all the creatrure and animate them each frame by accessing their update function
   
    for (let c of creatures) {
      c.update();
      if(food.length > 0){
  
      //如果返回false
        if(c.moveToFood(food[food.length-1].x,food[food.length-1].y)){
          food.pop();
        }
      } 
    }
  
    updateFood();
  
    if(button.hasClass("inactive") && food.length == 0 ){
    
      //circle(this.location.x -100,this.location.y -100,this.diameter);
    }
}
function updateFood(){
  for(let i = food.length-1; i >= 0 ; i--){
    fill(100);
    circle(food[i].x,food[i].y,food[i].d);
    food[i].y += 1;
    if(food[i].y > height){
      food.splice(i,1);//remove one from array at index i
    }
  }
}

function addGUI()
{
  button = createButton("FEED");

  button.addClass("button");

  button.parent("gui-container");

  button.mousePressed(handleButtonPress);

}

function addGUI_B()
{
  button = createButton("Play");

  button.addClass("buttonB");

  button.parent("gui-container");

  button.mousePressed(handleButtonPress_B);

}

function addGUI_C()
{
  button = createButton("Clean");

  button.addClass("buttonC");

  button.parent("gui-container");

  button.mousePressed(handleButtonPress_C);

}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}

function handleButtonPress()
{
    if(food.length == 0 && !button.hasClass("inactive")){
      food.push({
          x:random(width),
          y:random(height),
          d:random(5,20)
        });
    }
  
    // 食物放出，但是没有吃到
    if(food.length > 0){
      
    }
  
}

function handleButtonPress_B()
{
  for(let i = 0; i < 20; i++){
    let c = new Creature(random(width), random(height));
    creatures.push(c);
  }
}

function handleButtonPress_C()
{
  creatures.pop();
}


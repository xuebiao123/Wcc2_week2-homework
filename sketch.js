// create our creature class    创建生物的类

let button;

class Creature {   //创建生物的类
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape   新的生物的位置
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape 随机出它的速度
    this.friction = new createVector(0, 0);  
    this.desired = new createVector(0, 0);    //预期的
    this.diameter = random(10,40);           // 圆的直径
    this.speedLimit = random(1,this.diameter/10);   //速度的限制
  }

  moveToFood(x, y){         //移动到食物的所在地

    this.desired.x = x; 
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points
    // 得到两个点之间的直径

    // mag / magnitude is the length of the distance between the two points //两点之间的距离长度
    if (direction.mag() < this.diameter/2){
      return true; //stops moving as it returns before adding direction to velocity below
    } 
  
    //only move if they are close to the target x & y locations 只有当他们接近目标X和Y的位置时才会移动
    if(direction.mag() < 200){
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction ) 归一化给我们的是长度为1的单位向量（即只是方向）
      this.velocity.add(direction);
    }

    return false;
  } 
 
  update() {

    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);

    //limit how fast each one can go
    this.velocity.limit(this.speedLimit);
    // Add velocity to the location.
    this.location.add(this.velocity);


    // Bounce off edges (updated from last term to work better with canvas resize)
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
  
    // Display circle at location vector
    noStroke();
    fill(0,0,255);
    circle(this.location.x,this.location.y,this.diameter);
  }
}

//Main sketch below
// an array to store the creatures
let creatures = [];

function setup() {

  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element


  for(let i = 0; i < 50; i++){
    let c = new Creature(random(width), random(height));
    creatures.push(c);
  }
}

function draw() {
  background(200);
  
    // loop through all the creatrure and animate them each frame by accessing their update function
  for (let c of creatures) {
    c.update();

    if(c.moveToFood(mouseX,mouseY)){

      //You will need to think about
      //a) managing food in the main sketch
      //b) keeping track of FED or FULL state in your creature class

      console.log("Arrived");

    }
  
  }

  // addGUI();

}

function addGUI()
{

  //add a button
  button = createButton("FEED");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  //button.mousePressed(handleButtonPress); 

}

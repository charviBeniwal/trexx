//Create variables here
var dog, happyDog, benji, bedroom_img, garden_img, washroom_img;
var database, foodS, foodStock;
var feed, addFood;
var lastFed, fedTime;
var foodObj, food;
var gameState = "Start";
var readState;

function preload() {
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  bedroom_img = loadImage("Bed Room.png");
  garden_img = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");
  sadDog = loadImage("Lazy.png");

}

function setup() {

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  readState = database.ref('gameState');
  readState.on("value", function (data) {
    gameState = data.val();
  });

  createCanvas(1000, 500);
  benji = createSprite(250, 250, 5, 5);
  benji.addImage(dog);
  benji.scale = 0.1;

  foodObj = new Food();

  

  fedTime = database.ref('lastFed');
  fedTime.on("value", readStock);

  feed = createButton(" Feed the dog");
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  textSize(13);
  fill(0, 0, 0);
  text("food Stock: " + foodS, 200, 205);

  fedTime = database.ref('FedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  if (lastFed >= 12) {
    text("Last Feed ; " + lastFed % 12 + "PM", 350, 30)
  } else if (lastFed > 0 && lastFed < 12) {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }

  currentTime = hour();
  if (currentTime == (lastFed + 1)) {
    update("Playing");
    foodObj.garden();
  } else if (currentTime == (lastFed + 2)) {
    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
    foodObj.washroom();
  } else {
    update("Hungry");
    foodObj.display();
  }

  if (gameState !== "Hungry") {
    feed.hide();
    addFood.hide();
    benji.remove();
  } else {
    feed.show();
    addFood.show();
    benji.addImage(sadDog);
  }

  drawSprites();
}

// Function to read values
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

// Function to write values
function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })

}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog() {


  benji.addImage(happyDog);
  console.log("addImage");


  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FedTime: hour()
  })
  console.log("feedDog");
}

// function to update gameState in database
function update(state){
  database.ref('/').update({
    gameState : state
  })
}
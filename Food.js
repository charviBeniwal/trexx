class Food {

    constructor() {
        this.image = loadImage("Milk.png");
        this.foodStock = null;
        this.lastFed = null;
    }

    display() {
        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.foodStock !== 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

    getFoodStock() {
      return this.foodStock;
    }

    updateFoodStock(foodStock) {
        /* database.ref('/').update({
            foodStock: count
        }); */
        this.foodStock = foodStock;
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }

    bedroom(){
        background(bedroom_img, 500,500);
    }

    garden(){
        background(garden_img, 500,500);
    }

    washroom(){
        background(washroom_img, 500,500);
    }
}
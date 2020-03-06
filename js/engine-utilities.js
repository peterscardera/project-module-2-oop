// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function, 
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = enemies => {
    // enemySpots will refer to the number of spots available (can you calculate it?)
    const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
    // To find out where to place an enemy, we first need to find out which are the spots available.
    // We don't want to place two enemies in the same lane. To accomplish this, we first create an 
    // array with 5 elements (why 5?) and each element is false. 
    // We then use forEach to iterate through all the enemies.
    // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
    // We can use this property to modify the spotsTaken array.
    const spotsTaken = [false, false, false, false, false];
    enemies.forEach(enemy => {
        spotsTaken[enemy.spot] = true;
    });
    let candidate = undefined;
    while (candidate === undefined || spotsTaken[candidate]) {
        // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
        candidate = Math.floor(Math.random() * enemySpots);
    }
    return candidate;
}

//STARS BACKGROUND 
const addBackground = root => {
    // We create a new img DOM node.
    const bg = document.querySelector("canvas");
    bg.style.height = `${GAME_HEIGHT}px`;
    bg.style.width = `${GAME_WIDTH}px`;
    bg.style.backgroundImage = "url(images/backG.jpg)"

    root.append(bg);
//Iinserted a canvas in the HTML file
//ill use ticker variable below as a timer as a timer 
var ticker = 0;
var c = bg.getContext("2d"); // assigning context to c. Were returning a drawing context to the variable c
//created an obj. 
function Circle(x,y,velocityY) {
    this.x = x;
    this.y = y;
    this.velocityY = velocityY

    this.draw = function() {
        c.beginPath()
        // /void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise])
        c.arc(this.x,this.y,1,0,Math.PI*2 ,false);
        c.shadowColor = '#E3EAEF';
        c.shadowBlur = 9; //smaller the more blur
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = "#E3EAEF";
        c.fill();
        c.stroke()
    }
    this.update  = function() {
        this.y += this.velocityY;
        this.draw();
    }
}
//storing the details of each star into an array
var starArray = [];
for(let i = 0; i < 220;i++){
    var x = Math.random()* 800;
    var y = Math.random()* 800;
    var velocityY = (Math.random() +.5) * 1.2;
    starArray.push(new Circle(x,y,velocityY))
}

//console.log(starArray)
function animate() {
    //create loop between the two
    requestAnimationFrame(animate);
    //we have to clear the canvas everytime or we get multiple circles
    c.clearRect(0,0,innerWidth,innerHeight)

    for (let i = 0; i < starArray.length; i++) {
        starArray[i].update()
    }

    ticker++
    var x = Math.random()* 600;
    var y = Math.random()* 600;
    var velocityY = (Math.random() +.5) * 2;

    //everytime its divisible by 2 we push more stars im pretty sure we wont have much memory and the browser will slow down at one point
    if(ticker %2 == 0) {
    starArray.push(new Circle(x,y,velocityY))
    //console.log(ticker)
    }
}
animate();


//MAKING ALIENS DISAPPEAR
    const whiteBox = document.createElement("div");
    // We put a high z-index so that the div is placed over all other DOM nodes
    whiteBox.style.zIndex = 100;
    whiteBox.style.position = 'absolute';
    whiteBox.style.top = `${GAME_HEIGHT}px`;
    whiteBox.style.height = `${ENEMY_HEIGHT}px`;
    whiteBox.style.width = `${GAME_WIDTH}px`;
    whiteBox.style.background = '#fff';
    root.append(whiteBox);
}



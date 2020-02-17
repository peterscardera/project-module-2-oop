// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
    // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
    // You need to provide the DOM node when you create an instance of the class
    constructor(theRoot) {
        // We need the DOM element every time we create a new enemy so we
        // store a reference to it in a property of the instance.
        this.root = theRoot;
        // We create our hamburger.
        // Please refer to Player.js for more information about what happens when you create a player
        this.player = new Player(this.root);
        // Initially, we have no enemies in the game. The enemies property refers to an array
        // that contains instances of the Enemy class
        this.enemies = [];
        // We add the background image to the game
        addBackground(this.root);
        this.score = new Scoreboard();
        this.hearts = [new Lives(theRoot)];
        this.counter = 3;
        this.beam = new Beams(theRoot);
    }

    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    gameLoop = () => {
        // this.score.level()
        this.score.timer()
        // This code is to see how much time, in milliseconds, has elapsed since the last
        // time this method was called.
        // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
        if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime();
        let timeDiff = (new Date).getTime() - this.lastFrame;
        this.lastFrame = (new Date).getTime();
       
        // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
        // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });
        // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
        // We use filter to accomplish this.
        // Remember: this.enemies only contains instances of the Enemy class.
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        // We need to perform the addition of enemies until we have enough enemies.
        while (this.enemies.length < MAX_ENEMIES) {
            // We find the next available spot and, using this spot, we create an enemy.
            // We add this enemy to the enemies array 
            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
            
        }   
        if (this.isPlayerDead() && this.counter === 3 ) {
            this.counter -=1
            console.log(this.counter)
            document.getElementById("lives1").style.visibility = "hidden"
            window.alert("2 lives left");
            setTimeout(this.gameLoop, 20)
            return;
    } else if(this.isPlayerDead() && this.counter === 2 ) {
            this.counter -=1
            console.log(this.counter)
            document.getElementById("lives2").style.visibility = "hidden"
            window.alert("1 life left");
            setTimeout(this.gameLoop, 20)
            return;
    } else if (this.isPlayerDead() && this.counter === 1){
            this.counter -=1
            console.log(this.counter);
            document.getElementById("lives3").style.visibility = "hidden"
            window.alert("game over");
            // setTimeout(this.gameLoop, 20)
            reset()
            return;
    } else {
            setTimeout(this.gameLoop, 20)
    }         
        
}

    isPlayerDead = () => {
        let isDead = false;
        this.enemies.forEach(enemy => {    
        if(enemy.x === this.player.x && enemy.y + ENEMY_HEIGHT >= this.player.y) {
                isDead = true;
             }
        })
        return isDead;
    }
}

function reset() {
    let reset = document.createElement("button");
    let main = document.querySelector("body");
    reset.innerHTML = "RESTART!";
    reset.id = "endGameMsg";
    reset.classList.add("pressButton")
    main.appendChild(reset);
    reset.addEventListener("click",buttonEventHandler)
}

function buttonEventHandler(event) {
    colorChanger(event);
    location.reload();

}

function colorChanger(event) {
    let pressed = event.target.id;
    let button = document.getElementById(pressed);
    button.classList.toggle("clicked");
}



// function spaceBar() {
//     console.log("laser beam")
//     this.beam.style.visibility = "visible"
//     this.beam.x = this.x ;
//     this.beam.y = this.y ;
//     const audio = new Audio("sounds/laser.wav")
//     audio.play()
// }

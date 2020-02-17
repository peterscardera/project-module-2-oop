class Scoreboard {
    constructor(){

        this.score = 0;
        let app = document.getElementById("app");
        let timer = document.createElement("span");
        timer.style.position = "absolute"
        timer.style.left = "0px"
        timer.id = "timer";
        app.appendChild(timer);

        this.level = 0;
        let levelUp = document.createElement("span");
        levelUp.id = "levelUp";
        app.appendChild(levelUp);
    }
    timer = () => {
       this.score += 1;
       document.getElementById("timer").innerHTML = `${this.score}`;
       if( this.score %250 === 0) {
        this.level+=1;
        const audio = new Audio("sounds/level.wav")
        audio.play()
           document.getElementById("levelUp").innerHTML = `LEVEL ${this.level}`;
       }
     }


     
}



class Beams {
    constructor(x,y){
        this.beam = document.createElement("img");
        this.beam.src ="images/beam.png";
        let main = document.getElementById("app");
        main.appendChild(this.beam);
        this.beam.style.position = "absolute";
      
        this.beam.style.left = x + 88;
        this.beam.style.top = y - 56 ;

            
        let bullets = 0;
        let timer = setInterval(() => {
            bullets +=1 ;
            // console.log('here i am', bullets)
            this.beam.style.top = (y - 50) - bullets;
            //console.log(this.beam.style.top, 'hi');
        }, 1);
        
      
        
    }

    

}






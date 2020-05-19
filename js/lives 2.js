class Lives {
    constructor(root) {
      
        // this.lifeSpan = document.createElement("span");
        // this.lifeSpan.id = "lives"
        // document.getElementById("app").appendChild(this.lifeSpan);

        this.lives1 = document.createElement("img");
        root.appendChild(this.lives1);
        this.lives1.src = "images/lives.png";
        this.lives1.id = "lives1";
        
        this.lives2 = document.createElement("img");
        root.appendChild(this.lives2);
        this.lives2.src = "images/lives.png";
        this.lives2.id = "lives2";

        this.lives3 = document.createElement("img");
        root.appendChild(this.lives3);
        this.lives3.src = "images/lives.png";
        this.lives3.id = "lives3";

    }
}
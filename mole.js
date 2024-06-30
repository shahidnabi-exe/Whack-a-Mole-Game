
let CurrMoleTile;
let CurrPlantTile;
let score = 0;
let GameOver = false;

window.onload = function() {
    setGame();
}

function  getRandomTile() {

// math.random (0-1) * 9 => (0 - 9) --> round down to (0-8) integers
    let num = Math.floor (Math.random() * 9 );
    return num.toString();
}

function setGame () {

    for ( let i = 0; i < 9; i++) {
        // <div id = "0-8"> </div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile)
        document.getElementById("board").appendChild(tile);

    }

    setInterval( function setMole ()  {

        if (GameOver) {
            return;
        }
        if (CurrMoleTile) {
            CurrMoleTile.innerHTML = "";
        }

        let mole = document.createElement("img");
        mole.src = "./Images/monty-mole.png";
    
        let num = getRandomTile();
        if ( CurrPlantTile && CurrPlantTile.id === num) {
            return;
        }
        CurrMoleTile = document.getElementById(num);
        CurrMoleTile.appendChild(mole);
               
    },1000);

    setInterval( function setPlant () {

        if (GameOver) {
            return;
        }
        if (CurrPlantTile) {
            CurrPlantTile.innerHTML = "";
        }
        let plant = document.createElement("img");
        plant.src = "./Images/piranha-plant.png";
    
        let num = getRandomTile();
        if ( CurrMoleTile && CurrMoleTile.id === num) {
            return;
        }
        CurrPlantTile = document.getElementById(num);
        CurrPlantTile.appendChild(plant); 
        
    }, 2000);

    
}

function selectTile () {
    if (GameOver) {
        return;
    }

        //this refers to click 
    if ( this === CurrMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if ( this === CurrPlantTile) {
        document.getElementById("score").innerText = " Game Over: " +score.toString();  
        GameOver = true;
    }
    
}








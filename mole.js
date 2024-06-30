let CurrMoleTile;
let CurrPlantTiles = [];
let score = 0;
let GameOver = false;
let timeLeft = 60;

window.onload = function() {
    setGame();
}

function getRandomTile(exclude = []) {
    let num;
    do {
        num = Math.floor(Math.random() * 9).toString();
    } while (exclude.includes(num));
    return num;
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(function setMole() {
        if (GameOver) return;
        if (CurrMoleTile) CurrMoleTile.innerHTML = "";

        let mole = document.createElement("img");
        mole.src = "./Images/monty-mole.png";

        let num = getRandomTile(CurrPlantTiles.map(tile => tile.id));
        CurrMoleTile = document.getElementById(num);
        CurrMoleTile.appendChild(mole);
    }, 1000);

    setInterval(function setPlants() {
        if (GameOver) return;

        CurrPlantTiles.forEach(tile => tile.innerHTML = "");
        CurrPlantTiles = [];

        let plantCount = Math.floor(Math.random() * 3) + 1;
        let usedTiles = CurrMoleTile ? [CurrMoleTile.id] : [];

        for (let i = 0; i < plantCount; i++) {
            let plant = document.createElement("img");
            plant.src = "./Images/piranha-plant.png";

            let num = getRandomTile(usedTiles);
            let plantTile = document.getElementById(num);
            plantTile.appendChild(plant);
            CurrPlantTiles.push(plantTile);
            usedTiles.push(num);
        }
    }, 2000);

    let timerInterval = setInterval(function() {
        if (GameOver || timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("score").innerText = "Game Over: " + score.toString();
            GameOver = true;
        } else {
            document.getElementById("timer").innerText = "Time Left: " + timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function selectTile() {
    if (GameOver) return;

    if (this === CurrMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString();
    } else if (CurrPlantTiles.includes(this)) {
        document.getElementById("score").innerText = "Game Over: " + score.toString();
        GameOver = true;
    }
}

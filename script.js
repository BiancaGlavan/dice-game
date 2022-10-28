// html elements that need update
const diceImage = document.querySelector('.dice-image');
const totalScoreP1 = document.querySelector('.total-score-p1');
const totalScoreP2 = document.querySelector('.total-score-p2');
const currentScoreP1 = document.querySelector('.current-score-p1');
const currentScoreP2 = document.querySelector('.current-score-p2');
const playerTurn = document.querySelector('.player-turn');
const winner = document.querySelector('.winner');


// game logic

const Game = {

    playerTurn: 1,
    isGameActive: true,

    player1TotalScore: 0,
    player2TotalScore: 0,
    player1CurrentScore: 0,
    player2CurrentScore: 0,


    startGame: () => {

    },

    resetGame: () => {
        Game.isGameActive = true;
        Game.player1TotalScore = 0;
        Game.player2TotalScore = 0;
        Game.player1CurrentScore = 0;
        Game.player2CurrentScore = 0;
        Game.playerTurn = 1;
        winner.innerHTML = '';
        //update html blocks

        Game.printGame();
    },

    changePlayerTurn: () => {

        if(Game.playerTurn === 1) {
            Game.playerTurn = 2;
        } else {
            Game.playerTurn = 1;
        }


    },

    randomIntFromInterval: (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    rollDice: () => {
        if (!Game.isGameActive) {

            
            return false;  // This will stop roll dice function here
        }

        let diceValue = Game.randomIntFromInterval(1, 6);
        diceImage.src = `./images/inverted-dice-${diceValue}.svg`;

        if(diceValue === 1) {
            if(Game.playerTurn === 1) {
                Game.player1CurrentScore = 0;
                
            } else {
                Game.player2CurrentScore = 0;
                
            }

            Game.changePlayerTurn();

        } else {
            if(Game.playerTurn === 1) {
                Game.player1CurrentScore = Game.player1CurrentScore + diceValue;
            } else {
                Game.player2CurrentScore = Game.player2CurrentScore + diceValue;
            }
        }

      

        Game.printGame();
    },

    holdCurrentScore: () => {
        if(Game.playerTurn === 1) {
            Game.player1TotalScore = Game.player1TotalScore + Game.player1CurrentScore;
            Game.player1CurrentScore = 0;
        } else {
            Game.player2TotalScore = Game.player2TotalScore + Game.player2CurrentScore;
            Game.player2CurrentScore = 0;
        }
        Game.changePlayerTurn();
        Game.printGame();
        Game.checkWinner();

    },

    checkWinner: () => {
        if (Game.player1TotalScore >= 100) {
            winner.innerHTML = 'Player 1 won.';
            Game.isGameActive = false;
        }

        if (Game.player2TotalScore >= 100) {
            winner.innerHTML = 'Player 2 won.';
            Game.isGameActive = false;
        }


    },

    printGame: () => {
        currentScoreP1.innerHTML = `${Game.player1CurrentScore}`;
        currentScoreP2.innerHTML = `${Game.player2CurrentScore}`;
        totalScoreP1.innerHTML = `${Game.player1TotalScore}`;
        totalScoreP2.innerHTML = `${Game.player2TotalScore}`;
        playerTurn.innerHTML = `Player ${Game.playerTurn} turn.`;
        
    }


}
// Cache DOM QUESTION: Is this best practice?
const DOM = (function() {
  const startMenu = document.getElementById('start-menu');
  const board = document.getElementById('board');
  const playerDisplay = document.getElementById('player-display');
  const playerOneHighlight = document.querySelector('.player-one');
  const playerTwoHighlight = document.querySelector('.player-two');
  const scoreboard = document.getElementById('scoreboard')
  const scoreX = document.querySelector('.x')
  const scoreO = document.querySelector('.o')
  const scoreDraw = document.querySelector('.draw')
  const askUserPlayAgain = document.getElementById('play-again')

  let removeCurrentPlayerHighlight = () => {
    DOM.playerOneHighlight.classList.remove('highlight')
    DOM.playerTwoHighlight.classList.remove('highlight')
  }

  let toggleCurrentPlayerHighlight = (player) => {
    if (player == 2) {
      DOM.playerOneHighlight.classList.remove('highlight')
      DOM.playerTwoHighlight.classList.remove('highlight')
      DOM.playerOneHighlight.classList.add('highlight')
    } else if (player == 1) {
      DOM.playerOneHighlight.classList.remove('highlight')
      DOM.playerTwoHighlight.classList.remove('highlight')
      DOM.playerTwoHighlight.classList.add('highlight')
    }
    
  }

  let highlightWinningTiles = (gameResult) => {
    for (let i = 0; i < gameResult.winningCombo.length; i++) {
      let highlight = document.getElementById(gameResult.winningCombo[i])
      highlight.style.backgroundColor = 'rgba(11, 144, 209, 0.5)';
    }
  }

  return {
    startMenu,
    board,
    playerDisplay,
    playerOneHighlight,
    playerTwoHighlight,
    scoreboard,
    scoreX,
    scoreO,
    scoreDraw,
    askUserPlayAgain,
    removeCurrentPlayerHighlight,
    toggleCurrentPlayerHighlight,
    highlightWinningTiles
  }
})();

// Play a round
const playGame = () => {
  let playerTurn = 1;
  DOM.board.addEventListener('click', e => {
    e.preventDefault()
    let tileId = e.target.getAttribute('data-id')
    let tileSelected = e.target.textContent
    if (tileSelected == '') { 
      if (playerTurn == 1) {
        player1.play(tileId)
        DOM.toggleCurrentPlayerHighlight(1)
        playerTurn += 1;
      } else {
        player2.play(tileId)
        DOM.toggleCurrentPlayerHighlight(2)
        playerTurn -= 1;
      }
    }
  })
}

const gameBoard = (function() {
  let tiles = [null, null, null, null, null, null, null, null, null];
  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  let wins = {
    x: 0,
    o: 0,
    draw: 0
  }


  
  let moves = 0;
  const moveCounter = () => {
    moves += 1;
  }

  checkWinner = (pieceId) => { // Returns winning piece ('x' or 'o'), or "draw"
    for (let i = 0; i < winningPattern.length; i++) {
      if (tiles[winningPattern[i][0]] == pieceId && 
        tiles[winningPattern[i][1]] == pieceId && 
        tiles[winningPattern[i][2]] == pieceId) {
        
        // grab winning combo to return + highlight squares
        let winningCombo = [
          winningPattern[i][0],
          winningPattern[i][1],
          winningPattern[i][2]
        ]

        let returnVal = {
           winningCombo,
           pieceId
          }
          return returnVal
      }   
    } 
    if (moves == 9) {
      let returnVal = {
        winningCombo: 'draw',
        pieceId: 'draw'
      }
      return returnVal
    }
    return false
  }

  resetBoard = () => {
    // blur board
    DOM.board.style.filter = 'blur(5px)';

    // ask if they want to play again
    DOM.askUserPlayAgain.style.display = 'flex'
    DOM.askUserPlayAgain.addEventListener('click', e => {
      if (e.target.classList.contains('yes')) {
        // clear tiles
        for (let i = 0; i < 9; i++) { // nine tiles
          let tile = document.getElementById(i)
          tile.textContent = ''
          tiles[i] = null
          console.log(tile)
          console.log(tiles)
          tile.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';         
        } 
        DOM.board.style.filter = 'none';
        DOM.askUserPlayAgain.style.display = 'none'
        moves = 0;
        playGame();
      } 
      if (e.target.classList.contains('.no')) {
        console.log("Game over")
        // TODO put game over screen
      }
    })
} 
      
  // Public
  playMove = (position, pieceId) => {
    if (tiles[position] != null) {
      return false
    } else if (tiles[position] == null) {
        gameBoard.moveCounter() 
        // update array
        tiles[position] = pieceId
        // update screen
        let screenPosition = document.getElementById(position)
        screenPosition.innerText = pieceId.toUpperCase()

        let gameResult = checkWinner(pieceId) // gameResult is object that has winningCombo and piece 

        if (gameResult.pieceId == "x") {
          console.log("X won.")
          DOM.removeCurrentPlayerHighlight()
          DOM.highlightWinningTiles(gameResult)
          wins.x += 1
          DOM.scoreX.innerText = wins.x
          // reset board
          resetBoard()

        } else if (gameResult.pieceId == "o") {
          console.log("O won.") 
          DOM.removeCurrentPlayerHighlight()
          DOM.highlightWinningTiles(gameResult)
          wins.o += 1
          DOM.scoreO.innerText = wins.o
          // reset board
          resetBoard()

        } else if (gameResult.pieceId == "draw") {
          console.log("Draw")
          DOM.removeCurrentPlayerHighlight()
          wins.draw += 1
          DOM.scoreDraw.innerText = wins.draw
          // reset board
          resetBoard()
        }
     }
  }

  return {
    playMove,
    moveCounter
  }
})();

const displayController = (function() {
  // Hide game board elements for start menu
  DOM.board.style.display = 'none'
  DOM.playerDisplay.style.display = 'none'
  DOM.scoreboard.style.display = 'none'
  DOM.askUserPlayAgain.style.display = 'none'

  // Select number of players
  DOM.startMenu.addEventListener('click', e => {
    if (e.target.classList.contains('one-player')) {
      DOM.startMenu.style.display = 'none'
      renderBoard()
      // #TODO add CPU here

    } else if (e.target.classList.contains('two-players')) {
      DOM.startMenu.style.display = 'none'
      renderBoard()
    }

    function renderBoard() {
      DOM.board.style.display = 'grid'
      DOM.playerDisplay.style.display = 'flex'
      DOM.scoreboard.style.display = 'flex'
      for (let i = 0; i < 9; i++) { // nine tiles
        let tile = document.createElement('div')
        tile.classList.add('board-tile');
        tile.setAttribute('data-id', i);
        tile.setAttribute('id', i);
        board.appendChild(tile);
      }
    } 
  })

  playGame()

})();

// Factory function to create players
const Player = (name, pieceId) => {
  const play = (position) => {
    // update number of moves
    gameBoard.playMove(position, pieceId)  
  }
  return {
    play,
    name,
    pieceId
  }
}

let player1 = Player("Bob", "x")
let player2 = Player("CPU", "o")

// Cache DOM QUESTION: Is this best practice?
const DOM = (function() {
  const startMenu = document.getElementById('start-menu');
  const board = document.getElementById('board');
  const playerDisplay = document.getElementById('player-display');
  const playerOneHighlight = document.querySelector('.player-one');
  const playerTwoHighlight = document.querySelector('.player-two');
  const scoreboard = document.getElementById('scoreboard')
  const xScore = document.querySelector('.x')
  const oScore = document.querySelector('.o')

  return {
    startMenu,
    board,
    playerDisplay,
    playerOneHighlight,
    playerTwoHighlight,
    scoreboard,
    xScore,
    oScore
  }
})();

const gameBoard = (function() {
  const tiles = [null, null, null, null, null, null, null, null, null];
  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  // QUESTION: Move counter is to determine draw, but this 
  // piece of code feels like it could be improved.
  let moves = 0;
  const moveCounter = () => {
    moves += 1;
  }

  let wins = {
    x: 0,
    o: 0,
    draw: 0
  }

  checkWinner = (pieceId) => { // Returns winning piece ('x' or 'o'), or "draw"
    for (let i = 0; i < winningPattern.length; i++) {
      if (tiles[winningPattern[i][0]] == pieceId && 
        tiles[winningPattern[i][1]] == pieceId && 
        tiles[winningPattern[i][2]] == pieceId) {
          return pieceId
      }   
    } 
    if (moves == 9) {
      return "draw"
    }
  }

  // Public
  updateBoard = (position, pieceId) => {
    // update array
    tiles[position] = pieceId
    // update screen
    let screenPosition = document.getElementById(position)
    screenPosition.innerText = pieceId.toUpperCase()
    let gameResult = checkWinner(pieceId)
    if (gameResult == "x") {
      console.log("X won.")
      wins.x += 1
      DOM.xScore.innerText = gameBoard.wins.x
      
    } else if (gameResult == "o") {
      console.log("O won.") 
      wins.o += 1
      DOM.oScore.innerText = gameBoard.wins.o

    } else if (gameResult == "draw") {
      console.log("Draw")
      wins.draw += 1
    }
  }

  return {
    updateBoard,
    moveCounter,
    wins
  }
})();

const displayController = (function() {
  // Hide game board elements for start menu
  DOM.board.style.display = 'none'
  DOM.playerDisplay.style.display = 'none'
  DOM.scoreboard.style.display = 'none'

  // Select number of players
  DOM.startMenu.addEventListener('click', e => {
    if (e.target.classList.contains('one-player')) {
      DOM.startMenu.style.display = 'none'
      initiateBoard()
      // #TODO add CPU here

    } else if (e.target.classList.contains('two-players')) {
      DOM.startMenu.style.display = 'none'
      initiateBoard()
    }

    function initiateBoard() {
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

    // Toggle logic
    let playerTurn = 1;
    DOM.board.addEventListener('click', e => {
      e.preventDefault()
      let tileId = e.target.getAttribute('data-id')
      if (playerTurn == 1) {
        DOM.playerOneHighlight.classList.toggle('highlight')
        DOM.playerTwoHighlight.classList.toggle('highlight')
        player1.play(tileId)
        playerTurn += 1;
      } else {
        DOM.playerOneHighlight.classList.toggle('highlight')
        DOM.playerTwoHighlight.classList.toggle('highlight')
        player2.play(tileId)
        playerTurn -= 1;
      }
    })

  })

  function resetBoard() {
    for (let i = 0; i < 9; i++) {
      tiles[i] = null;
      let tile = document.getElementById(i)
      tile.remove()
    }
  }

})();

// Factory function
const Player = (name, pieceId) => {
  const play = (position) => {
    // update number of moves
    gameBoard.moveCounter() 
    gameBoard.updateBoard(position, pieceId)  
  }
  return {
    play,
    name,
    pieceId
  }
}

let player1 = Player("Bob", "x")
let player2 = Player("CPU", "o")

const effects = (function () {
  const fadeOut = (element) => {
    var opacity = 1; // inital opacity is 100%
    function decrease() {
      opacity -= 0.05;
      if (opacity <= 0) {
        // complete
        element.style.opacity = 0;
        return true;
      }
      element.style.opacity = opacity;
      requestAnimationFrame(decrease)
    }
    decrease();
  }
  return {
    fadeOut
  }
})();

const gameBoard = (function() {
  // private
  const tiles = [null, null, null, null, null, null, null, null, null];
  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  let moves = 0;

  const addMove = () => {
    moves += 1;
  }

  checkWinner = (pieceId) => { 
    for (let i = 0; i < winningPattern.length; i++) {
      if (tiles[winningPattern[i][0]] == pieceId && 
        tiles[winningPattern[i][1]] == pieceId && 
        tiles[winningPattern[i][2]] == pieceId) {
          console.log(`${pieceId.toUpperCase()} wins.`)
          // #TODO: run reset, end game
      }   
    } 
    if (moves == 9) {
      console.log("DRAW")
      // #TODO: opacity gameboard 50%, div to ask to play again?
    }
    
  }

  // Public
  updateBoard = (position, pieceId) => {
    // update array
    tiles[position] = pieceId
    // update screen
    let screenPosition = document.getElementById(position)
    screenPosition.innerText = pieceId.toUpperCase()
    checkWinner(pieceId)
  }

  return {
    updateBoard,
    addMove
  }
})();

const displayController = (function() {
  const startMenu = document.getElementById('start-menu');
  const board = document.getElementById('board');
  const playerDisplay = document.getElementById('player-display');
  let playerOneHighlight = document.querySelector('.player-one')
  let playerTwoHighlight = document.querySelector('.player-two')
  
  // Hide game board elements for start menu
  board.style.display = 'none'
  playerDisplay.style.display = 'none'

  // Select number of players
  startMenu.addEventListener('click', e => {
    if (e.target.classList.contains('one-player')) {
      effects.fadeOut(startMenu)
      // #TODO make callback fn (so fadeOut doesn't collide with display none)
      startMenu.style.display = 'none'
      initiateBoard()

    } else if (e.target.classList.contains('two-players')) {
      effects.fadeOut(startMenu); // fade out
      // #TODO make callback fn (so fadeOut doesn't collide with display none)
      startMenu.style.display = 'none'
      initiateBoard()
    }

    let playerTurn = 1;

    board.addEventListener('click', e => {
      
      e.preventDefault()
      let tileId = e.target.getAttribute('data-id')
      if (playerTurn == 1) {
        playerOneHighlight.classList.toggle('highlight')
        playerTwoHighlight.classList.toggle('highlight')
        player1.play(tileId)
        playerTurn += 1;
      } else {
        playerOneHighlight.classList.toggle('highlight')
        playerTwoHighlight.classList.toggle('highlight')
        player2.play(tileId)
        playerTurn -= 1;
      }
    })

  })

  function initiateBoard(players) {
    board.style.display = 'grid'
    playerDisplay.style.display = 'flex'
    for (let i = 0; i < 9; i++) { // nine tiles
      let tile = document.createElement('div')
      tile.classList.add('board-tile');
      tile.setAttribute('data-id', i);
      tile.setAttribute('id', i);
      board.appendChild(tile);
    }
  }  

})();

// Factory function
const Player = (name, pieceId) => {
  
  const play = (position) => {
    // update number of moves
    gameBoard.addMove() 
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

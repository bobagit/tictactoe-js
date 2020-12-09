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
  
  checkWinner = (pieceId) => { 
    for (let i = 0; i < winningPattern.length; i++) {
      if (tiles[winningPattern[i][0]] == pieceId && 
        tiles[winningPattern[i][1]] == pieceId && 
        tiles[winningPattern[i][2]] == pieceId) {
          console.log(`${pieceId.toUpperCase()} wins.`)
      }   
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
    updateBoard
  }
})();

const displayController = (function() {
  const startMenu = document.getElementById('start-menu');
  const board = document.getElementById('board');
  // Hide board for start menu
  board.style.display = 'none'

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

    // #TODO
    // setup setter for player turn to keep track of when player plays 
    // setTurn? setter and getter?
    let playerTurn = 1;

    board.addEventListener('click', e => {
      e.preventDefault()
      let tileId = e.target.getAttribute('data-id')
      // match up the div data-id with the gameBoard.tile array
      if (playerTurn == 1) {
      player1.play(tileId)
      playerTurn += 1;
      } else {
        player2.play(tileId)
        playerTurn -= 1;
      }
    })

  })

  function initiateBoard(players) {
    board.style.display = 'grid'
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

// 0   1   2
// 3   4   5
// 6   7   8
//player1.play(0) // winner
//player1.play(1) // winner
//player1.play(2) // winner


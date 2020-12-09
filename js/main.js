// TODO Cache DOM
// TODO create gameBoard module
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

  // public
  updateBoard = (position, pieceId) => {
    tiles[position] = pieceId
    checkWinner(pieceId)
  }

  return {
    updateBoard
  }
})();

const displayController = (function() {
  const startMenu = document.getElementById('start-menu');
  const board = document.getElementById('board');
  // hide board
  board.style.display = 'none'
  
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

  // Select One or Two players
  startMenu.addEventListener('click', e => {
    if (e.target.classList.contains('one-player')) {
      fadeOut(startMenu)
      // #TODO make callback fn (so fadeOut doesn't collide with display none)
      startMenu.style.display = 'none'
      initiateBoard(1)

      // fade out
    } else if (e.target.classList.contains('two-players')) {
      fadeOut(startMenu); // fade out
      // #TODO make callback fn (so fadeOut doesn't collide with display none)
      startMenu.style.display = 'none'
      initiateBoard(2)
    }
  })
  


  function initiateBoard(players) {
    // game setup for two players
    if (players == 2) {
      board.style.display = 'flex'
      for (let i = 0; i < 9; i++) { // nine tiles
        let tile = document.createElement('div')
        tile.classList.add('board-tile');
        tile.setAttribute('data-id', i);
        board.appendChild(tile);
      }

    }
  }

})();

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
player1.play(0) // winner
player1.play(1) // winner
player1.play(2) // winner


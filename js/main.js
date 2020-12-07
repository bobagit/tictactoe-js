// TODO Cache DOM


// TODO create gameBoard module
const gameBoard = (function() {

  // private
  const tiles = [
    null, null, null, null, null, null, null, null, null
  ]

  // render board 
  // determine winner logic
  const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ]
  
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
    // render board
    console.log(tiles)
    checkWinner(pieceId)
  }


  return {
    updateBoard
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

// #TODO send pieceId to module

let player1 = Player("Bob", "x")
let player2 = Player("CPU", "o")

player1.play(0)
player2.play(3)
player1.play(1)
player2.play(4)
player1.play(2)

// TODO create player factory function


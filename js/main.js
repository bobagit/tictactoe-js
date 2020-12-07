// TODO Cache DOM


// TODO create gameBoard module
const gameBoard = (function() {

  // private
  const tiles = [null, null, null, null, null, null, null, null, null]
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
    // console.log(tiles)
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

let player1 = Player("Bob", "x")
let player2 = Player("CPU", "o")
// 0   1   2
// 3   4   5
// 6   7   8
player1.play(3) // winner
player1.play(4) // winner
player1.play(5) // winner


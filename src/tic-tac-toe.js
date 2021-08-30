const FIRST_PLAYER = 'x'
const SECOND_PLAYER = 'o'
const NEXT_PLAYER = {
  [FIRST_PLAYER]: SECOND_PLAYER,
  [SECOND_PLAYER]: FIRST_PLAYER
}
class TicTacToe {

    constructor() {
      this.CurrentPlayerSymbol = FIRST_PLAYER
      this.gameField = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    }

    getCurrentPlayerSymbol() {
      return this.CurrentPlayerSymbol
    }

    nextTurn(rowIndex, columnIndex) {
      if (this.gameField[rowIndex][columnIndex] !== null) return
      this.gameField[rowIndex][columnIndex] = this.CurrentPlayerSymbol
      this.CurrentPlayerSymbol = NEXT_PLAYER[this.CurrentPlayerSymbol]
    }

    isFinished() {
      return !!this.getWinner() || this.noMoreTurns()
    }

    getWinner() {
      const winByRow = this.gameField.map(row => row
                                     .every(v => v === NEXT_PLAYER[this.CurrentPlayerSymbol]))
                                     .findIndex(v => v)
      if (winByRow >= 0) return this.gameField[winByRow][0]

      const winByCol = this.gameField[0].map((_, columnIndex) => this.gameField
                                        .map(row => row[columnIndex])
                                        .every(v => v === NEXT_PLAYER[this.CurrentPlayerSymbol]))
                                        .findIndex(v => v)
      if (winByCol >= 0) return this.gameField[0][winByCol]

      const winByCrossA = this.gameField.map((row, i) => row[i])
                                        .every((v, j, arr) => v === arr[0])
      if (winByCrossA) return this.gameField[1][1] //main diag

      const winByCrossB = this.gameField.map((row, i) => row[2-i])
                                        .every((v, j, arr) => v === arr[2])
      if (winByCrossB) return this.gameField[1][1] //not main diag

      return null
    }

    noMoreTurns() {
      return this.gameField.every(row => row.every(col => col))
    }

    isDraw() {
      return this.noMoreTurns() && !this.getWinner()
    }

    getFieldValue(rowIndex, colIndex) {
      return this.gameField[rowIndex][colIndex]
    }
}

module.exports = TicTacToe;

class SudokuSolver {
  constructor() {
    this.grid = [];
  }

  validate(puzzleString) {
    if (!puzzleString) {
      return "Required field missing";
    }

    if (!/^([0-9]|\.)+$/.test(puzzleString)) {
      return "Invalid characters in puzzle";
    }

    if (puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }

    return null;
  }

  checkRowPlacement(row, value) {
    for (let j = 0; j < 9; j++) {
      if (this.grid[row][j] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(column, value) {
    for (let i = 0; i < 9; i++) {
      if (this.grid[i][column] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(row, column, value) {
    const rowIndex = row - (row % 3);
    const columnIndex = column - (column % 3);

    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        if (this.grid[i][j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    const validationError = this.validate(puzzleString);
    if (validationError) {
      return false;
    }

    this.grid = [];
    for (let i = 0; i < 81; i += 9) {
      this.grid.push(puzzleString.slice(i, i + 9).split(""));
    }

    const solveSudoku = () => {
      let row = -1;
      let col = -1;
      let isEmpty = false;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.grid[i][j] === ".") {
            row = i;
            col = j;
            isEmpty = true;
            break;
          }
        }
        if (isEmpty) {
          break;
        }
      }

      if (!isEmpty) {
        return true;
      }

      for (let num = 1; num <= 9; num++) {
        const value = String(num);
        const isSafeToPlace =
          this.checkRowPlacement(row, value) &&
          this.checkColPlacement(col, value) &&
          this.checkRegionPlacement(row, col, value);

        if (isSafeToPlace) {
          this.grid[row][col] = value;
          if (solveSudoku()) {
            return true;
          }
          this.grid[row][col] = ".";
        }
      }

      return false;
    };

    if (solveSudoku()) {
      return this.grid.map((row) => row.join("")).join("");
    } else {
      return false;
    }
  }
}

module.exports = SudokuSolver;

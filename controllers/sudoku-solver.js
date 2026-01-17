class SudokuSolver {
  constructor(puzzleString) {
    this.puzzleString = puzzleString;
    this.grid = this.populateGrid(puzzleString);
  }

  populateGrid(puzzleString) {
    const grid = [];
    if (puzzleString) {
      for (let i = 0; i < 81; i += 9) {
        grid.push(puzzleString.slice(i, i + 9).split(""));
      }
    }
    return grid;
  }

  validate() {
    if (!this.puzzleString) {
      return "Required field missing";
    }

    if (!/^([0-9]|\.)+$/.test(this.puzzleString)) {
      return "Invalid characters in puzzle";
    }

    if (this.puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }

    return null;
  }

  checkRowPlacement(grid, row, value) {
    for (let j = 0; j < 9; j++) {
      if (grid[row][j] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(grid, column, value) {
    for (let i = 0; i < 9; i++) {
      if (grid[i][column] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(grid, row, column, value) {
    const rowIndex = row - (row % 3);
    const columnIndex = column - (column % 3);

    for (let i = rowIndex; i < rowIndex + 3; i++) {
      for (let j = columnIndex; j < columnIndex + 3; j++) {
        if (grid[i][j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  check(coordinate, value) {
    const validationError = this.validate();
    if (validationError) {
      return { error: validationError };
    }

    const row = coordinate.match(/[a-i]/i);
    const col = coordinate.match(/[1-9]/);

    if (coordinate.length !== 2 || !row || !col) {
      return { error: "Invalid coordinate" };
    }

    if (!/^[1-9]$/.test(value)) {
      return { error: "Invalid value" };
    }

    const rowIndex = coordinate.toUpperCase().charCodeAt(0) - 65;
    const colIndex = parseInt(col[0]) - 1;

    if (this.grid[rowIndex][colIndex] === value) {
      return { valid: true };
    }

    const tempGrid = this.grid.map((row) => [...row]);
    const originalValue = tempGrid[rowIndex][colIndex];
    if (originalValue !== ".") {
      tempGrid[rowIndex][colIndex] = ".";
    }

    const conflicts = [];
    if (!this.checkRowPlacement(tempGrid, rowIndex, value)) {
      conflicts.push("row");
    }
    if (!this.checkColPlacement(tempGrid, colIndex, value)) {
      conflicts.push("column");
    }
    if (!this.checkRegionPlacement(tempGrid, rowIndex, colIndex, value)) {
      conflicts.push("region");
    }

    if (conflicts.length > 0) {
      return { valid: false, conflict: conflicts };
    }

    return { valid: true };
  }

  solve() {
    const validationError = this.validate();
    if (validationError) {
      return false;
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
          this.checkRowPlacement(this.grid, row, value) &&
          this.checkColPlacement(this.grid, col, value) &&
          this.checkRegionPlacement(this.grid, row, col, value);

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

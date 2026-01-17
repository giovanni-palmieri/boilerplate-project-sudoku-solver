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

  check(puzzle, coordinate, value) {
    const validationError = this.validate(puzzle);
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

    this.grid = [];
    for (let i = 0; i < 81; i += 9) {
      this.grid.push(puzzle.slice(i, i + 9).split(""));
    }

    if (this.grid[rowIndex][colIndex] === value) {
      return { valid: true };
    }

    const originalValue = this.grid[rowIndex][colIndex];
    if (originalValue !== ".") {
      this.grid[rowIndex][colIndex] = ".";
    }

    const conflicts = [];
    if (!this.checkRowPlacement(rowIndex, value)) {
      conflicts.push("row");
    }
    if (!this.checkColPlacement(colIndex, value)) {
      conflicts.push("column");
    }
    if (!this.checkRegionPlacement(rowIndex, colIndex, value)) {
      conflicts.push("region");
    }

    if (originalValue !== ".") {
      this.grid[rowIndex][colIndex] = originalValue;
    }

    if (conflicts.length > 0) {
      return { valid: false, conflict: conflicts };
    }

    return { valid: true };
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

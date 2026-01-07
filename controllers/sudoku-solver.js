class SudokuSolver {
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

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;

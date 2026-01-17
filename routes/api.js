"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    const validationError = solver.validate(puzzle);
    if (validationError) {
      return res.json({ error: validationError });
    }

    const row = coordinate.match(/[a-i]/i);
    const col = coordinate.match(/[1-9]/);

    if (coordinate.length !== 2 || !row || !col) {
      return res.json({ error: "Invalid coordinate" });
    }

    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    const rowIndex = coordinate.toUpperCase().charCodeAt(0) - 65;
    const colIndex = parseInt(col[0]) - 1;

    solver.grid = [];
    for (let i = 0; i < 81; i += 9) {
      solver.grid.push(puzzle.slice(i, i + 9).split(""));
    }

    if (solver.grid[rowIndex][colIndex] === value) {
      return res.json({ valid: true });
    }

    const originalValue = solver.grid[rowIndex][colIndex];
    if (originalValue !== ".") {
      solver.grid[rowIndex][colIndex] = ".";
    }

    const conflicts = [];
    if (!solver.checkRowPlacement(rowIndex, value)) {
      conflicts.push("row");
    }
    if (!solver.checkColPlacement(colIndex, value)) {
      conflicts.push("column");
    }
    if (!solver.checkRegionPlacement(rowIndex, colIndex, value)) {
      conflicts.push("region");
    }

    if (originalValue !== ".") {
      solver.grid[rowIndex][colIndex] = originalValue;
    }

    if (conflicts.length > 0) {
      return res.json({ valid: false, conflict: conflicts });
    }

    res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;

    const error = solver.validate(puzzle);

    if (!error) {
      const solution = solver.solve(puzzle);

      if (solution) {
        res.json({ solution });
      } else {
        res.json({ error: "Puzzle cannot be solved" });
      }
    } else {
      res.json({ error });
    }
  });
};

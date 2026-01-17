"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    const solver = new SudokuSolver(puzzle);
    const validationError = solver.validate();
    if (validationError) {
      return res.json({ error: validationError });
    }

    res.json(solver.check(coordinate, value));
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;

    const solver = new SudokuSolver(puzzle);
    const error = solver.validate();

    if (!error) {
      const solution = solver.solve();

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

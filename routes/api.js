"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    res.json(solver.check(puzzle, coordinate, value));
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

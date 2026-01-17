"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    res.json({});
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

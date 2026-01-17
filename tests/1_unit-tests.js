const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", () => {
    const input =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(input);
    const solution =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";

    assert.equal(solver.solve(), solution);
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
    const input =
      "1.5..a.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(input);
    assert.equal(solver.solve(), false);
  });

  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    const input =
      "1.5..1.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37";
    const solver = new Solver(input);
    assert.equal(solver.solve(), false);
  });

  test("Logic handles a valid row placement", () => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(puzzleString);
    assert.isTrue(solver.checkRowPlacement(solver.grid, 0, "3"));
  });

  test("Logic handles an invalid row placement", () => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(puzzleString);
    assert.isFalse(solver.checkRowPlacement(solver.grid, 0, "1"));
  });

  test("Logic handles a valid column placement", () => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(puzzleString);
    assert.isTrue(solver.checkColPlacement(solver.grid, 0, "5"));
  });

  test("Logic handles an invalid column placement", () => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(puzzleString);
    assert.isFalse(solver.checkColPlacement(solver.grid, 0, "1"));
  });

  test("Logic handles a valid region (3x3 grid) placement", () => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(puzzleString);
    assert.isTrue(solver.checkRegionPlacement(solver.grid, 0, 0, "3"));
  });

  test("Logic handles an invalid region (3x3 grid) placement", () => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(puzzleString);
    assert.isFalse(solver.checkRegionPlacement(solver.grid, 0, 0, "1"));
  });
});

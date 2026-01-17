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

  test("Valid puzzle strings pass the solver", () => {
    const input =
      "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
    const solution =
      "568913724342687519197254386685479231219538467734162895926345178473891652851726943";
    const solver = new Solver(input);
    assert.equal(solver.solve(), solution);
  });

  test("Invalid puzzle strings fail the solver", () => {
    const input =
      "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const solver = new Solver(input);
    assert.equal(solver.solve(), false);
  });

  test("Solver returns the expected solution for an incomplete puzzle", () => {
    const input =
      "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1";
    const solution =
      "218396745753284196496157832531672984649831257827549613962415378185763429374928561";
    const solver = new Solver(input);
    assert.equal(solver.solve(), solution);
  });
});

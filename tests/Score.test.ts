import Score, { Scores } from "../src/Score";

describe("Scores", () => {
  it("can init base score counts", () => {
    let result = new Score(6);

    expect(result.counts).toEqual({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    });
  });

  it("can can add new counts", () => {
    let result = new Score(6);
    result.add(2).add(2).add(3);

    expect(result.counts).toEqual({
      1: 0,
      2: 2,
      3: 1,
      4: 0,
      5: 0,
      6: 0,
    });
  });

  it("can calculate trips of 1", () => {
    let result = new Score(6);
    result.add(1).add(1).add(1);

    expect(result.total()).toBe(Scores.TripOne);
  });

  it("can calculate trips of non 1", () => {
    let result = new Score(6);
    result.add(3).add(3).add(3);

    expect(result.total()).toBe(3 * Scores.Trips);
  });

  it("can calculate flush", () => {
    let result = new Score(6);
    result.add(1).add(2).add(3).add(4).add(5);

    expect(result.total()).toBe(Scores.Flush);
  });

  it("can calculate flush starting from 2", () => {
    let result = new Score(6);
    result.add(2).add(3).add(4).add(5).add(6);

    expect(result.total()).toBe(Scores.Flush);
  });

  it("can calculate ones", () => {
    let result = new Score(6);
    result.add(1);

    expect(result.total()).toBe(Scores.One);
  });

  it("can calculate fives", () => {
    let result = new Score(6);
    result.add(5);

    expect(result.total()).toBe(Scores.Five);
  });

  it("can calculate combo of five and trip 3s", () => {
    let result = new Score(6);
    result.add(5).add(3).add(3).add(3);

    expect(result.total()).toBe(Scores.Five + 3 * Scores.Trips);
  });

  it("can calculate combo of trip 1s and trip 3s", () => {
    let result = new Score(6);
    result.add(1).add(1).add(1);
    result.add(3).add(3).add(3);

    expect(result.total()).toBe(Scores.TripOne + 3 * Scores.Trips);
  });
});

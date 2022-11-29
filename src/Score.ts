type ScoreCount = {
  [index: number]: number;
};

export enum Scores {
  Flush = 1250,
  TripOne = 700,
  Trips = 100,
  One = 100,
  Five = 50,
}

export default class Score {
  diceMax: number;

  counts: ScoreCount = {};

  constructor(diceMax: number) {
    this.diceMax = diceMax;

    if (this.diceMax > 0) {
      this.initCounts();
    }
  }

  private initCounts(): void {
    for (var i = 0; i < this.diceMax; i++) {
      this.counts[i + 1] = 0;
    }
  }

  add(item: number): Score {
    if (item > this.diceMax) {
      throw new Error(`${item} is larger than max: ${this.diceMax}`);
    }

    this.counts[item] = this.counts[item] + 1;

    return this;
  }

  total(): number {
    let total = 0;

    if (this.checkIsFlush(this.counts)) {
      return Scores.Flush;
    }

    Object.entries(this.counts)
      .filter(([_, total]) => {
        return total == 3;
      })
      .forEach(([type, _]) => {
        total += this.calculateTrips(parseInt(type));
      });

    total += this.calculateSingles(this.counts);

    return total;
  }

  private checkIsFlush(score: ScoreCount): boolean {
    let top = Object.assign({}, score);
    let bottom = Object.assign({}, score);

    delete top[1];
    delete bottom[this.diceMax];

    if (
      Object.values(top).every((value) => value === 1) ||
      Object.values(bottom).every((value) => value === 1)
    ) {
      return true;
    }

    return false;
  }

  private calculateTrips(type: number): number {
    if (type === 1) {
      return Scores.TripOne;
    }

    return type * Scores.Trips;
  }

  private calculateSingles(score: ScoreCount): number {
    let total = 0;

    if (score[1] < 3 && score[1] !== 0) {
      total += Scores.One * score[1];
    }

    if (score[5] < 3 && score[5] !== 0) {
      total += Scores.Five * score[5];
    }

    return total;
  }
}

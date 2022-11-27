import { hello } from "../src/main";

describe("test can say hello", () => {
  it("can say hello", () => {
    expect(hello("Vaugen")).toEqual("Hello Vaugen");
  });
});

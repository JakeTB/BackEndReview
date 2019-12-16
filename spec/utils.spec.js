const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates()", () => {
  describe("Invalid entry", () => {
    it("If passed an empty array returns with an empty array", () => {
      expect(formatDates([])).to.eql([]);
    });
  });
  describe("Check that the original data has not been mutated and the new data is a copy", () => {
    it("Expect the original data not to be mutated", () => {
      const input = [];
      formatDates(input);
      expect(input).to.eql(input);
    });
    it("Expect that the functions returns a new array", () => {
      const input = [];
      expect(formatDates(input)).not.to.equal(input);
    });
  });
  describe("Checking functionality", () => {
    let correctDate = new Date(1492252444928);
    let dateFormat = `${correctDate}`;
    it("When passed an array containing an object with one key of `created_at` changes the key to being date", () => {
      expect(formatDates([{ created_at: 1492252444928 }])).to.eql([
        { date: { dateFormat } }
      ]);
    });
    it("When passed an array with an object containing muliplt keys only converts the correct", () => {
      let correctDate = new Date(1473106094229);
      let dateFormat = `${correctDate}`;
      const input = [
        {
          body:
            "Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum.",
          belongs_to: "Running a Node App",
          created_by: "cooljmessy",
          votes: 2,
          created_at: 1473106094229
        }
      ];
      const output = [
        {
          body:
            "Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum.",
          belongs_to: "Running a Node App",
          created_by: "cooljmessy",
          votes: 2,
          date: { dateFormat }
        }
      ];
      console.log(output);
      expect(formatDates([input])).to.equal(output);
    });
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});

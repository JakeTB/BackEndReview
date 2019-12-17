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
    it("When passed an array with an object containing multiple keys only converts the correct", () => {
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
          created_at: correctDate
        }
      ];

      expect(formatDates(input)).to.eql(output);
    });
    it("When passed an array containing multiple objects, returns an array with the objects converts", () => {
      let firstCorrectDate = new Date(1489789669732);
      let firstDateFormat = `${firstCorrectDate}`;
      let secondCorrectDate = new Date(1504946266488);
      let secondDateFormat = `${secondCorrectDate}`;
      const input = [
        {
          body:
            "Reiciendis enim soluta a sed cumque dolor quia quod sint. Laborum tempore est et quisquam dolore. Qui voluptas consequatur cumque neque et laborum unde sed. Impedit et consequatur tempore dignissimos earum distinctio cupiditate.",
          belongs_to:
            "Who are the most followed clubs and players on Instagram?",
          created_by: "happyamy2016",
          votes: 17,
          created_at: firstCorrectDate
        },
        {
          body:
            "Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: 3,
          created_at: secondCorrectDate
        }
      ];
      const output = [
        {
          body:
            "Reiciendis enim soluta a sed cumque dolor quia quod sint. Laborum tempore est et quisquam dolore. Qui voluptas consequatur cumque neque et laborum unde sed. Impedit et consequatur tempore dignissimos earum distinctio cupiditate.",
          belongs_to:
            "Who are the most followed clubs and players on Instagram?",
          created_by: "happyamy2016",
          votes: 17,
          created_at: firstCorrectDate
        },
        {
          body:
            "Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.",
          belongs_to: "A BRIEF HISTORY OF FOOD—NO BIG DEAL",
          created_by: "weegembump",
          votes: 3,
          created_at: secondCorrectDate
        }
      ];

      expect(formatDates(input)).to.eql(output);
    });
  });
});

describe("makeRefObj", () => {
  describe("Invalid entry", () => {
    it("When passed an empty array returns an empty array", () => {
      expect(makeRefObj([])).to.eql([]);
    });
  });
  describe("Check that the original data has not been mutated and the new data is a copy", () => {
    it("Expect that the original data has not been mutated", () => {
      const input = [];
      makeRefObj(input);
      expect(input).to.eql(input);
    });
    it("Expect that the function returns a new array", () => {
      const input = [];
      expect(makeRefObj(input)).not.to.equal(input);
    });
  });
  describe("Checking functionality", () => {
    it("When passed an array containing a single object returns an reference object must be keyed by each item's title, with the values being each item's corresponding id", () => {
      expect(makeRefObj([{ article_id: 1, title: "A" }])).to.eql({ A: 1 });
    });
    it("When passed an array containing multiple objects contains the lookup object for each", () => {
      expect(
        makeRefObj([
          { article_id: 1, title: "A" },
          { article_id: 2, title: "B" },
          { article_id: 3, title: "C" }
        ])
      ).to.eql({ A: 1, B: 2, C: 3 });
    });
  });
});

describe("formatComments", () => {
  describe("Invalid entry", () => {
    it("When passed an empty array return an empty array", () => {
      expect(formatComments([])).to.eql([]);
    });
  });
  describe("Check for mutation", () => {
    it("The function should return a new function", () => {
      const input = [];
      expect(formatComments(input)).to.not.equal(input);
    });
  });
  describe("Functionality", () => {
    it("Should convert the propertys oof each of the arrays objects", () => {
      const input = [
        {
          created_by: "James",
          belongs_to: "James Ltd",
          created_at: 1473106094229
        }
      ];
      const referenceObj = { "James Ltd": 1 };
      const output = [
        {
          author: "James",
          article_id: 1,
          created_at: new Date(1473106094229)
        }
      ];
      expect(formatComments(input, referenceObj)).to.eql(output);
    });
  });
});

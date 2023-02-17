const chai = require("chai");
const expect = chai.expect;
const { Calculator, selectors } = require("../script.js");
let calculator;
let displayData;
const calculateSum = (sum) => {
  sum.split("").forEach((char) => {
    if (char.match(/\+|\-|\/|\*/)) {
      calculator.readOperator(char);
    } else {
      calculator.readSymbol(char);
    }
  });
  calculator.calculate();
};

describe("Calculator", () => {
  beforeEach(() => {
    displayData = undefined;
    calculator = new Calculator((data) => {
      displayData = data.detail;
    });
  });
  describe("Addition", () => {
    const sums = new Map([
      ["0+0", "0"],
      ["999+0", "999"],
      ["2+2", "4"],
      ["50+30", "80"],
      ["10.5+2.3", "12.8"],
      ["90+90+90", "270"],
    ]);
    Array.from(sums.entries()).forEach((sum) => {
      it(`should calculate ${sum[0]}`, () => {
        calculateSum(sum[0]);
        expect(displayData.current).to.equal(sum[1]);
      });
    });
  });
  describe("Subtraction", () => {
    const sums = new Map([
      ["0-0", "0"],
      ["999-0", "999"],
      ["2-2", "0"],
      ["50-30", "20"],
      ["10.5-2.3", "8.2"],
      ["2-10", "-8"],
      ["90-90-90", "-90"],
    ]);
    Array.from(sums.entries()).forEach((sum) => {
      it(`should calculate ${sum[0]}`, () => {
        calculateSum(sum[0]);
        expect(displayData.current).to.equal(sum[1]);
      });
    });
  });
  describe("Multiplication", () => {
    const sums = new Map([
      ["0*0", "0"],
      ["999*2", "1,998"],
      ["2*2", "4"],
      ["50*30", "1,500"],
      ["10.5*2.3", "24.15"],
      ["2*10", "20"],
      ["90*90*90", "729,000"],
    ]);
    Array.from(sums.entries()).forEach((sum) => {
      it(`should calculate ${sum[0]}`, () => {
        calculateSum(sum[0]);
        expect(displayData.current).to.equal(sum[1]);
      });
    });
  });
  describe("Division", () => {
    const sums = new Map([
      ["0/1", "0"],
      ["999/3", "333"],
      ["2/2", "1"],
      ["50/30", "1.6666666666666667"],
      ["10.5/2.3", "4.565217391304349"],
      ["2/10", "0.2"],
      ["45/90/20", "0.025"],
    ]);
    Array.from(sums.entries()).forEach((sum) => {
      it(`should calculate ${sum[0]}`, () => {
        calculateSum(sum[0]);
        expect(displayData.current).to.equal(sum[1]);
      });
    });
  });
  describe("Delete", () => {
    it(`should delete symbols successfully`, () => {
      calculator.readSymbol("2");
      calculator.readSymbol("5");
      calculator.readSymbol("5");
      expect(displayData.current).to.equal("255");
      calculator.deleteSymbol();
      expect(displayData.current).to.equal("25");
      calculator.deleteSymbol();
      expect(displayData.current).to.equal("2");
      calculator.deleteSymbol();
      expect(displayData.current).to.equal("");
    });
  });
  describe("All Clear", () => {
    it(`should clear state successfully`, () => {
      calculator.readSymbol("2");
      calculator.readSymbol("5");
      calculator.readOperator("*")
      calculator.readSymbol("5");
      expect(displayData.previous).to.equal("25 *");
      expect(displayData.current).to.equal("5");
      calculator.clearDisplay();
      expect(displayData.current).to.equal("");
      expect(displayData.previous).to.equal("");
    });
  });
});

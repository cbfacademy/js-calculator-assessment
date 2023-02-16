/**
 * Represents a calculator
 */
class Calculator {
  #emitRefresh;
  
  /**
   * Initialises an instance
   * @constructor
   * @param {function} emitRefresh A callback function to be executed when the display UI needs to be refreshed
   */
  constructor(emitRefresh) {
    this.#emitRefresh = emitRefresh;
    this.clearDisplay();
  }

  // Private methods

  /**
   * Formats a numeric value for display
   * @param {number} number 
   * @returns {string} Formatted value
   * @private
   */
  #format(number) {
    const numericString = number.toString();
    const integerDigits = parseFloat(numericString.split(".")[0]);
    const decimalDigits = numericString.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /**
   * Returns the data needed to update the display UI
   * @returns {object} An object containing the previous and current operands
   * @private
   */
  #getDisplayData() {
    const currentOperand = this.#format(this.currentOperand);
    const previousOperand =
      this.operator != null
        ? `${this.#format(this.previousOperand)} ${this.operator}`
        : "";

    return {
      detail: { current: currentOperand, previous: previousOperand },
    };
  }

  /**
   * Fires the refresh callback to enable the display UI to be updated
   * @private
   */
  #refreshDisplay() {
    this.#emitRefresh(this.#getDisplayData())
  }

  /**
   * Calculates the result based on the current operator and operands
   */
  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operator = undefined;
    this.previousOperand = "";
    this.#refreshDisplay();
  }

  /**
   * Clears the display data
   */
  clearDisplay() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = undefined;
    this.#refreshDisplay();
  }

  /**
   * Deletes a symbol from the current operand
   */
  deleteSymbol() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.#refreshDisplay();
  }

  /**
   * Reads an operator
   * @param {string} operator A character representing an operator
   */
  readOperator(operator) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.#refreshDisplay();
  }

  /**
   * 
   * @param {string} symbol A character representing an operand symbol
   * @returns 
   */
  readSymbol(symbol) {
    if (symbol === "." && this.currentOperand.includes(".")) return;

    this.currentOperand = this.currentOperand.toString() + symbol.toString();
    this.#refreshDisplay();
  }
}

export default Calculator;

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
    this.#emitRefresh(this.#getDisplayData());
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

class UI {
  #calculator;
  #displayElement;
  #symbolButtons;
  #operatorButtons;
  #equalsButton;
  #deleteButton;
  #allClearButton;
  #previousOperandElement;
  #currentOperandElement;

  constructor(selectors) {
    this.#configureElements(selectors);
    this.#configureListeners();
  }

  #configureElements(selectors) {
    this.#displayElement = document.querySelector(selectors.displayElement);
    this.#symbolButtons = document.querySelectorAll(selectors.symbolButtons);
    this.#operatorButtons = document.querySelectorAll(
      selectors.operatorButtons
    );
    this.#equalsButton = document.querySelector(selectors.equalsButton);
    this.#deleteButton = document.querySelector(selectors.deleteButton);
    this.#allClearButton = document.querySelector(selectors.allClearButton);
    this.#previousOperandElement = document.querySelector(
      selectors.previousOperandElement
    );
    this.#currentOperandElement = document.querySelector(
      selectors.currentOperandElement
    );
    this.#calculator = new Calculator((data) => {
      this.#displayElement.dispatchEvent(new CustomEvent("refresh", data));
    });
  }

  #configureListeners() {
    const calculator = this.#calculator;

    document.addEventListener("keydown", function (event) {
      let symbolPattern = /[0-9.]/g;
      let operatorPattern = /[+\-*\/]/g;

      if (event.key.match(symbolPattern)) {
        event.preventDefault();
        calculator.readSymbol(event.key);
      }
      if (event.key.match(operatorPattern)) {
        event.preventDefault();
        calculator.readOperator(event.key);
      }
      if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculator.calculate();
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        calculator.deleteSymbol();
      }
      if (event.key === "Delete" || event.key === "Escape") {
        event.preventDefault();
        calculator.clearDisplay();
      }
    });

    this.#displayElement.addEventListener("refresh", (event) => {
      const { current, previous } = event.detail;
      if (typeof current === "string") {
        this.#currentOperandElement.innerText = current;
      }
      if (typeof previous === "string") {
        this.#previousOperandElement.innerText = previous;
      }
    });

    this.#symbolButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.readSymbol(button.innerText);
      });
    });

    this.#operatorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.readOperator(button.innerText);
      });
    });

    this.#equalsButton.addEventListener("click", (button) => {
      calculator.calculate();
    });

    this.#allClearButton.addEventListener("click", (button) => {
      calculator.clearDisplay();
    });

    this.#deleteButton.addEventListener("click", (button) => {
      calculator.deleteSymbol();
    });
  }
}

const selectors = {
  displayElement: ".display",
  symbolButtons: "[data-role='symbol']",
  operatorButtons: "[data-role='operator']",
  equalsButton: "[data-role='equals']",
  deleteButton: "[data-role='delete']",
  allClearButton: "[data-role='all-clear']",
  previousOperandElement: "[data-role='previous-operand']",
  currentOperandElement: "[data-role='current-operand']",
};

if (typeof document !== "undefined") {
  new UI(selectors);
}

module.exports = { Calculator: Calculator, selectors: selectors };

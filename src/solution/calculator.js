class Calculator {
  constructor(emitRefresh) {
    this.#emitRefresh = emitRefresh;
    this.clearDisplay();
  }

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

  #refreshDisplay() {
    this.#emitRefresh(this.#getDisplayData())
  }

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

  clearDisplay() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = undefined;
    this.#refreshDisplay();
  }

  deleteSymbol() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.#refreshDisplay();
  }

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

  readSymbol(symbol) {
    if (symbol === "." && this.currentOperand.includes(".")) return;

    this.currentOperand = this.currentOperand.toString() + symbol.toString();
    this.#refreshDisplay();
  }
}

export default Calculator;

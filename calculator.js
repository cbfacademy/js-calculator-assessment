class Calculator {
    constructor() {
      this.symbolButtons = document.querySelectorAll("[data-role='symbol']");
      this.operatorButtons = document.querySelectorAll("[data-role='operator']");
      this.equalsButton = document.querySelector("[data-role='equals']");
      this.deleteButton = document.querySelector("[data-role='delete']");
      this.allClearButton = document.querySelector("[data-role='all-clear']");
      this.previousOperandElement = document.querySelector(
        "[data-role='previous-operand']"
      );
      this.currentOperandElement = document.querySelector(
        "[data-role='current-operand']"
      );
      this.clear();
      this.#addHandlers();
    }
  
    #addHandlers() {
      const calculator = this;
  
      document.addEventListener("keydown", function (event) {
        let symbolPattern = /[0-9.]/g;
        let operatorPattern = /[+\-*\/]/g;
  
        if (event.key.match(symbolPattern)) {
          event.preventDefault();
          calculator.appendSymbol(event.key);
        }
        if (event.key.match(operatorPattern)) {
          event.preventDefault();
          calculator.apply(event.key);
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
          calculator.clear();
        }
      });
    }
  
    #updateDisplay() {
      this.currentOperandElement.innerText = this.format(this.currentOperand);
  
      if (this.operator != null) {
        this.previousOperandElement.innerText = `${this.format(
          this.previousOperand
        )} ${this.operator}`;
      } else {
        this.previousOperandElement.innerText = "";
      }
    }
  
    clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operator = undefined;
      this.#updateDisplay();
    }
  
    deleteSymbol() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      this.#updateDisplay();
    }
  
    appendSymbol(symbol) {
      if (symbol === "." && this.currentOperand.includes(".")) return;
  
      this.currentOperand = this.currentOperand.toString() + symbol.toString();
      this.#updateDisplay();
    }
  
    apply(operator) {
      if (this.currentOperand === "") return;
  
      if (this.previousOperand !== "") {
        this.calculate();
      }
  
      this.operator = operator;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
      this.#updateDisplay();
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
      this.#updateDisplay();
    }
  
    format(number) {
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
  }
  
  export default new Calculator();
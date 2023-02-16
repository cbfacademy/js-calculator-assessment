import Calculator from "./calculator.js";

const displayElement = document.querySelector(".display");
const calculator = new Calculator((data) => {
  displayElement.dispatchEvent(
    new CustomEvent("refresh", data)
  );
});
const symbolButtons = document.querySelectorAll("[data-role='symbol']");
const operatorButtons = document.querySelectorAll("[data-role='operator']");
const equalsButton = document.querySelector("[data-role='equals']");
const deleteButton = document.querySelector("[data-role='delete']");
const allClearButton = document.querySelector("[data-role='all-clear']");
const previousOperandElement = document.querySelector(
  "[data-role='previous-operand']"
);
const currentOperandElement = document.querySelector(
  "[data-role='current-operand']"
);
displayElement.addEventListener("refresh", (event) => {
  const { current, previous } = event.detail;
  if (typeof current === "string") {
    currentOperandElement.innerText = current;
  }
  if (typeof previous === "string") {
    previousOperandElement.innerText = previous;
  }
});

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

/**
 * Your code goes here
 */
symbolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.readSymbol(button.innerText);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.readOperator(button.innerText);
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clearDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.deleteSymbol();
});

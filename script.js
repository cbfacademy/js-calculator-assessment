import calculator from "./calculator.js";

calculator.symbolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendSymbol(button.innerText);
  });
});

calculator.operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.apply(button.innerText);
  });
});

calculator.equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
});

calculator.allClearButton.addEventListener("click", (button) => {
  calculator.clear();
});

calculator.deleteButton.addEventListener("click", (button) => {
  calculator.deleteSymbol();
});

const buttons = document.getElementById("buttons-container");
const display = document.getElementById("display-digits");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let num1 = 0;
let num2;
let operator;
let result;

function clearInput() {
  num1 = 0;
  num2 = null;
  operator = null;
}

function renderDisplay() {
  display.textContent = num1;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate() {
  if (operator === "plus") {
    num1 = add(+num1, +num2);
  } else if (operator === "minus") {
    num1 = subtract(+num1, +num2);
  } else if (operator === "times") {
    num1 = multiply(+num1, +num2);
  } else if (operator === "divide") {
    num1 = divide(+num1, +num2);
  }

  num2 = 0;
  renderDisplay();
}

function getUserInput(e) {
  if (e.target.id === "clear") {
    clearInput();
    return;
  }
  if (e.target.className.includes("operator")) {
    handleOperator(e);
    return;
  } else if (e.target.className.includes("number")) {
    handleNumbers(e);
  }
}

function handleNumbers(e) {
  const num = e.target.id;
  if (!num1) {
    num1 = num;
    renderDisplay();
    return;
  }
  if (num1 && !operator) {
    num1 += num;
    renderDisplay();
    return;
  }
  if (!num2) {
    num2 = num;
    renderDisplay();
    return;
  }

  num2 += num;
}

function handleOperator(e) {
  if (num1 && num2) {
    operate();
  }
  operator = e.target.id;
}

buttons.addEventListener("click", (e) => {
  getUserInput(e);
});

clearBtn.addEventListener("click", () => {
  clearInput();
  renderDisplay();
});

equalsBtn.addEventListener("click", (e) => {
  if (num1 && num2) {
    operate();
  }
});

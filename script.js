const buttons = document.getElementById("buttons-container");
const display = document.getElementById("display-digits");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let num1 = null;
let num2 = null;
let operator = null;
let result = null;

function clearInput() {
  num1 = null;
  num2 = null;
  operator = null;
}

function renderDisplay() {
  console.log(result);
  display.textContent = result;
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
    result = add(+num1, +num2);
  } else if (operator === "minus") {
    result = subtract(+num1, +num2);
  } else if (operator === "times") {
    result = multiply(+num1, +num2);
  } else if (operator === "divide") {
    result = divide(+num1, +num2);
  }

  renderDisplay();
  clearInput();
}

function getUserInput(e) {
  if (e.target.className.includes("operator")) {
    handleOperator(e);
  } else if (e.target.className.includes("number")) {
    result = handleNumbers(e);
  }

  renderDisplay();
}

function handleNumbers(e) {
  const num = e.target.id;

  if (!num1) {
    return (num1 = num);
  }
  if (num1 && !operator) {
    return (num1 += num);
  }
  if (!num2) {
    return (num2 = num);
  }

  return (num2 += num);
}

function handleOperator(e) {
  if (!num1) {
    return;
  }

  if (num1 && !num2) {
    operator = e.target.id;
    return;
  }

  if (num1 && num2) {
    operator = e.target.id;
    operate();
  }
}

buttons.addEventListener("click", getUserInput);

clearBtn.addEventListener("click", () => {
  result = 0;
  clearInput();
  renderDisplay();
});

equalsBtn.addEventListener("click", (e) => {
  if (!num1 || !num2) {
    return;
  }
  operate();
});

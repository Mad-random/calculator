const btns = document.getElementById("buttons-container");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");

const divideBy0Error = "sorry";

let firstOperand = null;
let secondOperand = null;
let operator = null;
let isCalculationFinshed = false;

let displayedNumber = 0;

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
  if (secondOperand === 0) {
    return divideBy0Error;
  } else if (firstOperand === 0) {
    return 0;
  }
  return firstOperand / secondOperand;
}

function renderDisplay() {
  const displayNumbersEl = document.getElementById("display-numbers");

  if (
    !Number.isInteger(+displayedNumber) &&
    displayedNumber !== divideBy0Error
  ) {
    displayNumbersEl.textContent = displayedNumber.toFixed(3);
    return;
  }

  displayNumbersEl.textContent = displayedNumber;
}

function clearInput() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
}

function resetForNextInput(clickedOperator) {
  firstOperand = displayedNumber;
  secondOperand = null;
  operator = clickedOperator;
}

function operate(firstOperand, operator, secondOperand) {
  if (operator === "add") {
    return add(+firstOperand, +secondOperand);
  } else if (operator === "subtract") {
    return subtract(+firstOperand, +secondOperand);
  } else if (operator === "multiply") {
    return multiply(+firstOperand, +secondOperand);
  } else if (operator === "divide") {
    return divide(+firstOperand, +secondOperand);
  }
}

function assignOperands(number) {
  if (!firstOperand) {
    firstOperand = number;
    displayedNumber = firstOperand;
  } else if (firstOperand && !operator) {
    firstOperand += number;
    displayedNumber = firstOperand;
  } else if (!secondOperand) {
    secondOperand = number;
    displayedNumber = secondOperand;
  } else if (secondOperand) {
    secondOperand += number;
    displayedNumber = secondOperand;
  }

  renderDisplay();
}

function assignOperator(clickedOperator) {
  if (!firstOperand) {
    return;
  }

  if (isCalculationFinshed) {
    resetForNextInput(clickedOperator);
    renderDisplay();
    isCalculationFinshed = false;
    return;
  }

  if (!operator) {
    operator = clickedOperator;
    return;
  } else if (!secondOperand) {
    operator = clickedOperator;
    return;
  } else if (firstOperand && secondOperand && operator) {
    displayedNumber = operate(firstOperand, operator, secondOperand);
    renderDisplay(displayedNumber);

    resetForNextInput(clickedOperator);
  }
}

btns.addEventListener("click", (e) => {
  if (e.target.classList.contains("number")) {
    if (isCalculationFinshed) {
      clearInput();
      isCalculationFinshed = false;
    }

    const number = e.target.id;
    displayedNumber = assignOperands(number);
  } else if (e.target.classList.contains("operator")) {
    const clickedOperator = e.target.id;
    displayedNumber = assignOperator(clickedOperator);
  }
});

equalsBtn.addEventListener("click", (e) => {
  if (!firstOperand || !secondOperand) {
    return;
  }
  displayedNumber = operate(firstOperand, operator, secondOperand);
  renderDisplay();
  isCalculationFinshed = true;
});

clearBtn.addEventListener("click", () => {
  displayedNumber = 0;
  clearInput();
  renderDisplay();
});

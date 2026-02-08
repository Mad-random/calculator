const displayNumbersEl = document.getElementById("display-numbers");
const clearBtn = document.getElementById("clear");
const backSpaceBtn = document.getElementById("backspace");
const btns = document.getElementById("buttons-container");
const equalsBtn = document.getElementById("equals");

const divideBy0Error = "sorry";

//calculator modes
const firstOperandMode = 1;
const secondOperandMode = 2;
const standByMode = "standBy";

let calculatorMode = firstOperandMode;

let firstOperand = null;
let secondOperand = null;
let operator = null;

let userInputValue = "";
let calculationResult = "";
let displayValue = "0";

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  // console.log(firstOperand);
  // console.log(secondOperand);
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

function updateDisplay() {
  if (displayValue === "") {
    displayValue = "0";
  }
  displayNumbersEl.textContent = displayValue;
}

function clearOperationValues() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
}

function clearUserInput() {
  userInputValue = "";
}

function deleteLastNumber() {
  userInputValue = userInputValue.slice(0, -1);
  displayValue = userInputValue;
  updateDisplay();
}

function operate(firstOperand, operator, secondOperand) {
  if (operator === "add") {
    return add(firstOperand, secondOperand);
  } else if (operator === "subtract") {
    return subtract(firstOperand, secondOperand);
  } else if (operator === "multiply") {
    return multiply(firstOperand, secondOperand);
  } else if (operator === "divide") {
    return divide(firstOperand, secondOperand);
  }
}

function assignFirstOperand(value) {
  if (value === "") {
    return;
  }
  firstOperand = Number(value);
  return true;
}

function assignSecondOperand(value) {
  if (value === "") {
    return;
  }
  console.log(value);
  secondOperand = Number(value);
  return true;
}

function calculate() {
  calculationResult = operate(firstOperand, operator, secondOperand);
  displayValue = calculationResult;
  updateDisplay();
  clearUserInput();
  clearOperationValues();
}

clearBtn.addEventListener("click", () => {
  clearOperationValues();
  clearUserInput();
  displayValue = "0";
  updateDisplay();
  calculatorMode = firstOperandMode;
});

backSpaceBtn.addEventListener("click", () => {
  deleteLastNumber();
});

equalsBtn.addEventListener("click", (e) => {
  if (calculatorMode === secondOperandMode) {
    if (assignSecondOperand(userInputValue)) {
      calculate();
      calculatorMode = standByMode;
    }
  }
});

document.addEventListener("keyup", (e) => {
  handleKeyboard(e);
});

btns.addEventListener("click", (e) => {
  if (e.target.classList.contains("number")) {
    if (calculatorMode === standByMode) {
      calculatorMode = firstOperandMode;
    }
    const input = e.target.id;
    handleNumberInput(input);
  } else if (e.target.classList.contains("operator")) {
    const clickedOperator = e.target.id;
    handleModes(clickedOperator);
  }
});

function handleModes(clickedOperator) {
  if (calculatorMode === firstOperandMode) {
    if (assignFirstOperand(userInputValue)) {
      operator = clickedOperator;
      clearUserInput();
      calculatorMode = secondOperandMode;
    }
  } else if (calculatorMode === secondOperandMode) {
    if (assignSecondOperand(userInputValue)) {
      calculate();
      assignFirstOperand(calculationResult);
    }
    operator = clickedOperator;
  } else if (calculatorMode === standByMode) {
    assignFirstOperand(calculationResult);
    operator = clickedOperator;
    calculatorMode = secondOperandMode;
  }
}

function handleKeyboard(e) {
  let key = e.key;

  switch (e.key) {
    case ".":
      handleNumberInput(key);
      break;
    case "0":
      handleNumberInput(key);
      break;
    case "1":
      handleNumberInput(key);
      break;
    case "2":
      handleNumberInput(key);
      break;
    case "3":
      handleNumberInput(key);
      break;
    case "4":
      handleNumberInput(key);
      break;
    case "5":
      handleNumberInput(key);
      break;
    case "6":
      handleNumberInput(key);
      break;
    case "7":
      handleNumberInput(key);
      break;
    case "8":
      handleNumberInput(key);
      break;
    case "9":
      handleNumberInput(key);
      break;
    case "Backspace":
      deleteLastNumber();
      break;
    case "+":
      handleModes("add");
      break;
    case "-":
      handleModes("subtract");
      break;
    case "/":
      handleModes("divide");
      break;
    case "*":
      handleModes("multiply");
      break;
    case "Enter":
      if (calculatorMode === secondOperandMode) {
        assignSecondOperand(userInputValue);
        calculate();
        calculatorMode = standByMode;
      }
      break;
  }
}

function handleNumberInput(input) {
  if (input === "." && userInputValue.includes(".")) {
    return;
  }

  userInputValue += input;
  displayValue = userInputValue;
  updateDisplay();
}

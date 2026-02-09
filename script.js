const displayNumbersEl = document.getElementById("display-numbers");
const clearBtn = document.getElementById("clear");
const backSpaceBtn = document.getElementById("backspace");
const btns = document.getElementById("buttons-container");
const operatorBtns = document.querySelectorAll(".operator");
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

function clearOperationValues() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
}

function deleteLastNumber() {
  userInputValue = userInputValue.slice(0, -1);
  if (userInputValue.length < 1) {
    displayValue = "0";
  } else {
    displayValue = userInputValue;
  }

  updateDisplay();
}

function updateDisplay() {
  if (displayValue.length > 8) {
    displayValue = displayValue.slice(0, 8);
  }
  displayNumbersEl.textContent = displayValue;
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

function assignOperator(op) {
  operator = op;

  operatorBtns.forEach((btn) => {
    if (btn.id !== op) {
      btn.classList.remove("clicked-operator");
    } else if (btn.id === op) {
      btn.classList.add("clicked-operator");
    }
  });
}

function removeOperatorbg() {
  operatorBtns.forEach((btn) => {
    if (btn.classList.contains("clicked-operator")) {
      btn.classList.remove("clicked-operator");
    }
  });
}

function calculate() {
  calculationResult = operate(firstOperand, operator, secondOperand);
  displayValue = calculationResult.toString();
  updateDisplay();
  userInputValue = "";
  clearOperationValues();
}

function handleNumberInput(input) {
  if (input === "." && userInputValue.includes(".")) {
    return;
  }

  userInputValue += input;
  displayValue = userInputValue;
  updateDisplay();
}

function handleModes(clickedOperator) {
  if (calculatorMode === firstOperandMode) {
    if (assignFirstOperand(userInputValue)) {
      assignOperator(clickedOperator);
      userInputValue = "";
      calculatorMode = secondOperandMode;
    }
  } else if (calculatorMode === secondOperandMode) {
    if (assignSecondOperand(userInputValue)) {
      calculate();
      assignFirstOperand(calculationResult);
    }
    assignOperator(clickedOperator);
  } else if (calculatorMode === standByMode) {
    assignFirstOperand(calculationResult);
    assignOperator(clickedOperator);
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

clearBtn.addEventListener("click", () => {
  clearOperationValues();
  userInputValue = "";
  displayValue = "0";
  updateDisplay();
  calculatorMode = firstOperandMode;
  removeOperatorbg();
});

backSpaceBtn.addEventListener("click", () => {
  deleteLastNumber();
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

equalsBtn.addEventListener("click", (e) => {
  if (calculatorMode === secondOperandMode) {
    if (assignSecondOperand(userInputValue)) {
      calculate();
      calculatorMode = standByMode;

      removeOperatorbg();
    }
  }
});

document.addEventListener("keyup", (e) => {
  handleKeyboard(e);
});

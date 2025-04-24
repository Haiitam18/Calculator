// Get elements
const screen = document.querySelector(".screen");
const keys = document.querySelectorAll(".key");

let currentInput = "";
let previousInput = "";
let operation = null;

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent;

    // Clear screen
    if (value === "C") {
      currentInput = "";
      previousInput = "";
      operation = null;
      updateScreen();
      return;
    }

    // Clear current entry
    if (value === "CE") {
      currentInput = "";
      updateScreen();
      return;
    }

    // Handle numbers and dot
    if (!isNaN(value) || value === ".") {
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
      updateScreen();
      return;
    }

    // Handle operations
    if (["+", "-", "×", "/", "%"].includes(value)) {
      if (currentInput === "") return;
      if (previousInput !== "") calculate();
      operation = value;
      previousInput = currentInput;
      currentInput = "";
      return;
    }

    // Handle equals
    if (value === "=") {
      if (currentInput === "" || previousInput === "") return;
      calculate();
      updateScreen();
    }
  });
});

function updateScreen() {
  screen.textContent = currentInput || "0";
}

function calculate() {
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  if (isNaN(a) || isNaN(b)) return;

  switch (operation) {
    case "+":
      currentInput = (a + b).toString();
      break;
    case "-":
      currentInput = (a - b).toString();
      break;
    case "×":
      currentInput = (a * b).toString();
      break;
    case "/":
      currentInput = b === 0 ? "Error" : (a / b).toString();
      break;
    case "%":
      currentInput = (a % b).toString();
      break;
  }

  operation = null;
  previousInput = "";
}

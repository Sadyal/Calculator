const prevDisplay = document.querySelector(".prev-display");
const currDisplay = document.querySelector(".curr-display");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operator = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("number")) {
      appendNumber(value);
    } else if (btn.classList.contains("operation")) {
      chooseOperation(value);
    } else if (btn.classList.contains("equal")) {
      compute();
    } else if (btn.classList.contains("clear")) {
      clear();
    } else if (btn.classList.contains("delete")) {
      deleteNumber();
    }
    updateDisplay();
  });

  // GSAP hover animation
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.1, duration: 0.2 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.2 });
  });
});

function appendNumber(number) {
  if (number === "." && current.includes(".")) return;
  current += number;
}

function chooseOperation(op) {
  if (current === "") return;
  if (previous !== "") compute();
  operator = op;
  previous = current;
  current = "";
}

function compute() {
  let result;
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "*": result = prev * curr; break;
    case "/": result = prev / curr; break;
    default: return;
  }
  current = result.toString();
  operator = null;
  previous = "";
}

function clear() {
  current = "";
  previous = "";
  operator = null;
}

function deleteNumber() {
  current = current.toString().slice(0, -1);
}

function updateDisplay() {
  currDisplay.textContent = current || "0";
  prevDisplay.textContent = previous + (operator || "");
}

// Animate calculator entrance
gsap.from(".calculator", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});

// Animate background circles
gsap.to(".circle1", {
  y: 20,
  repeat: -1,
  yoyo: true,
  duration: 5,
  ease: "sine.inOut"
});

gsap.to(".circle2", {
  x: -30,
  repeat: -1,
  yoyo: true,
  duration: 6,
  ease: "sine.inOut"
});

gsap.to(".circle3", {
  y: -25,
  repeat: -1,
  yoyo: true,
  duration: 7,
  ease: "sine.inOut"
});

gsap.to(".circle4", {
  x: 30,
  repeat: -1,
  yoyo: true,
  duration: 5,
  ease: "sine.inOut"
});

//Capturando elementos do DOM
const viewer = document.getElementById("viewer");
const numbers = document.querySelectorAll(".number");
const clearButton = document.getElementById("clear");
const delButton = document.getElementById("del");
const equals = document.getElementById("equals");
const operadores = document.querySelectorAll(".operador");
const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

viewer.textContent = ""; //Resetando o visor

//Função para escrever no visor
function write(v) {
  clear.textContent = "C";
  viewer.textContent = `${viewer.textContent}${v}`;
}
function clear() {
  viewer.textContent = "";
  clearButton.textContent = "AC";
}
function erase() {
  viewer.textContent = viewer.textContent.slice(0, -1);
}
function listenerGenerate(domObj, toWrite) {
  domObj.addEventListener("click", () => {
    if (keys.indexOf(viewer.textContent[viewer.textContent.length - 1]) != -1) {
      write(` ${toWrite} `);
    }
  });
}
function calculate(rawExpression = "") {
  let expression = rawExpression.split(" ");

  // Realizando as operações de multiplicação e divisão
  calcMult_Div(expression);

  // Realizando as operações de adição e subtração
  calcSub_Sum(expression);
  if (expression[0] == Infinity) {
    viewer.textContent = "previsível piassi";
  } else {
    viewer.textContent = expression[0];
  }
}

function calcMult_Div(expression) {
  let operators = ["*", "/"];

  for (let operator of operators) {
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === operator) {
        const beforeValue = +expression[i - 1];
        const afterValue = +expression[i + 1];
        const result =
          operator === "*"
            ? beforeValue * afterValue
            : beforeValue / afterValue;

        expression.splice(i - 1, 3, result);
        i--;
      }
    }
  }
}

function calcSub_Sum(expression) {
  let operators = ["+", "-"];

  for (let operator of operators) {
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === operator) {
        const beforeValue = +expression[i - 1];
        const afterValue = +expression[i + 1];
        const result =
          operator === "+"
            ? beforeValue + afterValue
            : beforeValue - afterValue;

        expression.splice(i - 1, 3, result);
        i--;
      }
    }
  }
}
//Event Listners
//Operadores
operadores.forEach((operador) => {
  toWrite = "";
  if (operador.textContent == "X") {
    toWrite = "*";
  } else {
    toWrite = operador.textContent;
  }
  listenerGenerate(operador, toWrite);
});
//Números
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    write(number.textContent);
  });
});
//Ferramentas
clearButton.addEventListener("click", () => clear());
delButton.addEventListener("click", () => erase());
equals.addEventListener("click", () => calculate(viewer.textContent));
//Possibilitando o usuário de clicar na tecla
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const keyCode = event.keyCode;
  if (keys.indexOf(key) != -1) {
    write(key);
  }
  console.log(keyCode);
  switch (keyCode) {
    case 27:
      clear();
      break;
    case 8:
      erase();
      break;
    case 43:
      write(" + ");
      break;
    case 173:
      write(" - ");
      break;
    case 191:
      write(" / ");
      break;
    case 42:
      write(" * ");
      break;
    default:
      break;
  }
});

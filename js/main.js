let first = 0;
let second = 1;
let y;
let x;

// function fibonacci(x) {
//   for (let i = 2; i <= x; i++) {
//     y = first + second;
//     first = second;
//     second = y;
//     console.log(y);
//     document.getElementById("Y").innerHTML = y;
//   }
// }
// function fibRecursive(x) {
//   if (x < 2) return x;
//   return fibRecursive(x - 1) + fibRecursive(x - 2);
// }

document.getElementById("loader").style.visibility = "hidden";
document.getElementById("errorBox").style.visibility = "hidden";
document.getElementById("Y").style.visibility = "hidden";
let inputRed = document.querySelector(".inputRed");
inputRed.classList.remove("inputRed");

function getFibonacci(x) {
  document.getElementById("loader").style.visibility = "visible";

  fetch(`http://localhost:5050/fibonacci/${x}`).then(response => {
    console.log(response);
    if (response.status === 400) {
      console.log("is this a 400 error?");
      response.text().then(function(text) {
        console.log(text);
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("meaningOfLife").innerHTML = text;
      });
    } else {
      return response.json().then(function(data) {
        let y = data.result;
        console.log(y);
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("Y").style.visibility = "visible";
        document.getElementById("Y").innerHTML = y;
      });
    }
  });
}

function validateX(x) {
  try {
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x > 50) throw "Can't be larger than 50";
  } catch (error) {
    console.log("error!");
    // document.getElementById("fibonacciAnswer").style.visibility = "hidden";
    // const errorBox = `<div class="errorBox"></div>`;
    // document.getElementById("errorBox").innerHTML = errorBox;

    document.getElementById("thrownError").innerHTML = error;
    document.getElementById("loader").style.visibility = "hidden";
    document.getElementById("errorBox").style.visibility = "visible";
    inputRed.classList.add("inputRed");
    document.getElementById("meaningOfLife").innerHTML = text;
  }
}

function buttonClicked() {
  let x = document.getElementById("X").value;
  validateX(x);
  document.getElementById("Y").innerHTML = getFibonacci(x);
  console.log(x);
}
document.getElementById("myButton").addEventListener("click", buttonClicked);

// function getLoader() {
//   let loader = `<div class="loader"></div>`;
//   document.getElementById("Y").innerHTML = loader;
// }
// document.getElementById("myButton").addEventListener("click", getLoader);

// async function getFibonacci(x) {
//   const response = await fetch(`http://localhost:5050/fibonacci/:number`);
//   const y = await response.y();
//   console.log(y);
//   document.getElementById("Y").innerHTML = y;

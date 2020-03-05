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

function getFibonacci(x) {
  const loader = `<div class="loader"></div>`;
  document.getElementById("loaderHere").innerHTML = loader;
  try {
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x > 50) throw "Can't be larger than 50";
  } catch (error) {
    console.log("error!");
    const errorBox = `<div class="errorBox"></div>`;
    const loaderhidden = `<div class="loader:after"></div>`;
    document.getElementById("thrownError").innerHTML = error;
    document.getElementById("loaderHere").innerHTML = loaderhidden;
    document.getElementById("errorBox").innerHTML = errorBox;
  }
  fetch(`http://localhost:5050/fibonacci/${x}`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      let y = data.result;
      console.log(y);
      document.getElementById("Y").innerHTML = y;
      const loaderhidden = `<div class="loader:after"></div>`;
      document.getElementById("loaderHere").innerHTML = loaderhidden;
    });
}

// async function getFibonacci(x) {
//   const response = await fetch(`http://localhost:5050/fibonacci/:number`);
//   const y = await response.y();
//   console.log(y);
//   document.getElementById("Y").innerHTML = y;

function getX() {
  let x = document.getElementById("X").value;
  document.getElementById("Y").innerHTML = getFibonacci(x);
  console.log(x);
}
document.getElementById("myButton").addEventListener("click", getX);

function getLoader() {
  let loader = `<div class="loader"></div>`;
  document.getElementById("Y").innerHTML = loader;
}
document.getElementById("myButton").addEventListener("click", getLoader);

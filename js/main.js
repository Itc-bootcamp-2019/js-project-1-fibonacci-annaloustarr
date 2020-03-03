let first = 0;
let second = 1;
let y;
let x;

function fibonacci(x) {
  for (let i = 2; i <= x; i++) {
    y = first + second;
    first = second;
    second = y;
    console.log(y);
    document.getElementById("Y").innerHTML = y;
  }
}

function getX() {
  let x = document.getElementById("X").value;
  fibonacci(x);
  console.log(x);
}
document.getElementById("myButton").addEventListener("click", getX);

// function giveY() {
//   document.getElementById("Y").innerHTML = y;
// }
// document.getElementById("myButton").addEventListener("click", giveY);

// X.innerText = x;
// Y.innerText = y;

// let x = prompt("Enter a value for X", 0);
// document.write(first + ", ");
// document.write(second + ", ");
// document.write(y);

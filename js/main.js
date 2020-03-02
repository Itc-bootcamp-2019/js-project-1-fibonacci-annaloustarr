let first = 0;
let second = 1;
let y;

function fibonacci(x) {
  for (let i = 3; i <= x; i++) {
    y = first + second;
    first = second;
    second = y;
    document.getElementById("Y").innerHTML = y;
    document.getElementById("X").innerHTML = x;
  }
}
fibonacci(8);

// X.innerText = x;
// Y.innerText = y;

// let x = prompt("Enter a value for X", 0);
// document.write(first + ", ");
// document.write(second + ", ");

//   document.write(y);
// }

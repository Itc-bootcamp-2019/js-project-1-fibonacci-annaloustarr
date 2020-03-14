let y;
let x;

// hide answers and errors when opening page
document.getElementById("loader").classList.add("hidden");
document.getElementById("errorBox").classList.add("hidden");
document.getElementById("Y").classList.add("hidden");
let inputRed = document.querySelector(".input-red");
inputRed.classList.remove("input-red");

// hide answers and errors on button click
function clickReset() {
  document.getElementById("thrownError").classList.add("hidden");
  document.getElementById("errorBox").classList.add("hidden");
  inputRed.classList.remove("inputRed");
  document.getElementById("Y").classList.add("hidden");
  document.getElementById("meaningOfLife").classList.add("hidden");
  document.getElementById("inputToHide").classList.remove("hidden");
}

// calculate fib locally
function fibonacci(x) {
  let y = 1; // incase user enters 1
  let first = 0;
  let second = 1;
  for (let i = 2; i <= x; i++) {
    y = first + second;
    first = second;
    second = y;
  }
  document.getElementById("Y").innerHTML = y;
  document.getElementById("Y").classList.remove("hidden");
}

// get fib from the server and call function to get result list
async function getFibonacci(x) {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("thrownError").classList.add("hidden");
  let response = await fetch(`http://localhost:5050/fibonacci/${x}`);
  if (response.status === 400) {
    let text = await response.text();
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("meaningOfLife").classList.remove("hidden");
    document.getElementById("meaningOfLife").innerHTML = text;
  } else {
    let data = await response.json();
    let y = data.result;
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("Y").classList.remove("hidden");
    document.getElementById("Y").innerHTML = y;
    listFibonacci();
  }
}

// Ensure entered X is valid or show error message
function validateX(x) {
  try {
    if (x === "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x > 50) throw "Can't be larger than 50";
    if (x <= 0) throw "Can't be zero or less";
  } catch (error) {
    document.getElementById("thrownError").innerHTML = error;
    document.getElementById("thrownError").classList.remove("hidden");
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("errorBox").classList.remove("hidden");
    document.getElementById("inputToHide").classList.add("hidden");
    inputRed.classList.add("inputRed");
    document.getElementById("meaningOfLife").innerHTML = text;
  }
}

// resets page, validates X and gets fib locally or on server depending on checkbox, after button click
function buttonClicked() {
  clickReset();
  let x = document.getElementById("X").value;
  validateX(x);
  let myCheckbox = document.querySelector("#saveCalc");
  if (myCheckbox.checked === true) {
    getFibonacci(x);
  } else {
    fibonacci(x);
  }
}

// gets the dropdown selection and then creates a new results list
let selected;
let dropdown = document.getElementById("dropButton");

function getValue() {
  selected = document.getElementById("dropButton").value;
  listFibonacci();
}

// removes the results list
let listDiv = document.getElementById("dataList");

function clearList() {
  let child = listDiv.lastElementChild;
  while (child) {
    listDiv.removeChild(child);
    child = listDiv.lastElementChild;
  }
}

// creates a results list depending on droplist (default sort is desc date creation)
async function listFibonacci() {
  document.getElementById("loader2").classList.remove("hidden");
  let response = await fetch(`http://localhost:5050/getFibonacciResults`);
  let dataList = await response.json();

  let myList = dataList;
  let listArray = myList.results;
  clearList();

  if (selected === "numAsc") {
    listArray.sort((a, b) => new Date(a.number) - new Date(b.number));
  } else if (selected === "numDesc") {
    listArray.sort((a, b) => new Date(b.number) - new Date(a.number));
  } else if (selected === "dateAsc") {
    listArray.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
  } else {
    listArray.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }

  for (let i = 0; i < listArray.length; i++) {
    let li = document.createElement("li");

    let text1 = document.createElement("span");
    text1.innerText = "The Fibonacci Of ";
    let text2 = document.createElement("span");
    text2.innerText = " is ";
    let text3 = document.createElement("span");
    let myDate = new Date(listArray[i].createdDate).toString();
    text3.innerText = ". Calculated at ";
    let numberX = document.createElement("span");
    numberX.className = "bold";
    numberX.innerText = listArray[i].number;
    let resultY = document.createElement("span");
    resultY.className = "bold";
    resultY.innerHTML = listArray[i].result;

    li.append(text1, numberX, text2, resultY, text3, myDate);
    listDiv.appendChild(li);
  }
  document.getElementById("loader2").classList.add("hidden");
}

//Event Listeners
document.getElementById("myButton").addEventListener("click", buttonClicked);
document.getElementById("dropButton").addEventListener("change", getValue);
document.addEventListener("DOMContentLoaded", listFibonacci);

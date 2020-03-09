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

function clickReset() {
  document.getElementById("thrownError").style.visibility = "hidden";
  document.getElementById("errorBox").style.visibility = "hidden";
  inputRed.classList.remove("inputRed");
  document.getElementById("Y").style.visibility = "hidden";
  document.getElementById("meaningOfLife").style.visibility = "hidden";
}

function getFibonacci(x) {
  document.getElementById("loader").style.visibility = "visible";

  fetch(`http://localhost:5050/fibonacci/${x}`).then(response => {
    console.log(response);
    if (response.status === 400) {
      console.log("is this a 400 error?");
      response.text().then(function(text) {
        console.log(text);
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("meaningOfLife").style.visibility = "visible";
        document.getElementById("meaningOfLife").innerHTML = text;
      });
    } else {
      return response.json().then(function(data) {
        let y = data.result;
        console.log(y);
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("Y").style.visibility = "visible";
        document.getElementById("Y").innerHTML = y;
        listFibonacci();
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

    document.getElementById("thrownError").innerHTML = error;
    document.getElementById("thrownError").style.visibility = "visible";
    document.getElementById("loader").style.visibility = "hidden";
    document.getElementById("errorBox").style.visibility = "visible";
    inputRed.classList.add("inputRed");
    document.getElementById("meaningOfLife").innerHTML = text;
  }
}

function buttonClicked() {
  clickReset();
  let x = document.getElementById("X").value;
  validateX(x);
  document.getElementById("Y").innerHTML = getFibonacci(x);
  console.log(x);
}
document.getElementById("myButton").addEventListener("click", buttonClicked);

function listFibonacci() {
  fetch(`http://localhost:5050/getFibonacciResults`).then(response => {
    console.log(response);

    return response.json().then(function(dataList) {
      console.log(dataList);
      let myList = dataList;
      console.log(myList.results);
      let listArray = myList.results;
      console.log(listArray[0]);

      let listDiv = document.getElementById("dataList");

      for (let i = 0; i < listArray.length; i++) {
        let myDate = new Date(listArray[i].createdDate);
        let li = document.createElement("li");
        li.innerHTML =
          "The Fibonacci of " +
          listArray[i].number +
          " is " +
          listArray[i].result +
          ". Created at: " +
          myDate;
        listDiv.appendChild(li);
      }
      document.getElementById("loader2").style.visibility = "hidden";
    });
  });
}

document.addEventListener("DOMContentLoaded", listFibonacci);

// Date()

// function makeUL(listArray) {
//   let listDiv = document.getElementById("resultsList");
//   let ul = document.createElement("ul");
//   for (let i = 0; i < listArray.length; i++) {
//     let li = document.createElement("li");
//     li.innerHTML = listArray[i].resultsList;
//     ul.appendChild(li);
//   }
//   listDiv.appendChild(ul);
// }

// let dataOject = JSON.parse(listArray);
//       let listItemString = $("#listItem").html();
//       listArray.forEach(buildNewList);

//       function buildNewList(item, index) {
//         let listItem = $("<li>" + listItemString + "</li>");
//         let listItemNumber = $(".number", listItem);
//         listItemNumber.html(item.number);
//         var listItemResult = $(".result", listItem);
//         listItemResult.html(item.result);
//         var listItemDate = $(".date", listItem);
//         listItemDate.html(item.createdDate);
//         $("#dataList").append(listItem);
//       }

// async function getFibonacci(x) {
//   const response = await fetch(`http://localhost:5050/fibonacci/:number`);
//   const y = await response.y();
//   console.log(y);
//   document.getElementById("Y").innerHTML = y;

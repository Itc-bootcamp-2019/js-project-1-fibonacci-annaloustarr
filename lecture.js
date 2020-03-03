let num = 0;
while (num < 4) {
  console.log("I'm in the while loop");
  num++;
}
for (let number = 0; number < 4; number++) {
  console.log("I'm in the for loop");
  console.log(number);
}
let names = ["Anna", "Ben", "Catherine", "Daniel", "Erin"];
console.log(names[2]);
names[2] = "Cat";
console.log(names);
names.push("Fred"); // add to end of array
console.log(names[5]);
console.log(names.indexOf("Fred"));
console.log(names.indexOf("Freddie")); // not there, so -1
console.log(names.length);

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
for (let currentName of names) {
  console.log(currentName);
} // shortcut to loop over an array, replaces the usual conditions.

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8]
];
console.log(matrix[1]);
console.log(matrix[1][1]);
let arrayOfNumbers = matrix[2];
console.log(arrayOfNumbers);

let myCar = {
  name: "Corolla",
  year: 2018,
  isElectric: false
};
console.log(myCar.name);
myCar.name = "prius";
console.log(myCar);

function printIfNameIsLong(countryName) {
  if (countryName.length > 6) {
    console.log(countryName + " is a long country name");
  }
}
printIfNameIsLong("USA"); // does not meet condition
printIfNameIsLong("Australia"); // will print

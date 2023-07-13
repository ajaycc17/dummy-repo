// console.log("Hello World");

// // product
// const prod = (a, b) => a * b;
// console.log(prod(9, 8));

// // student object
// const student = {
//     name: "Ajay",
//     age: "22",
//     greet() {
//         console.log("Hi! I am " + this.name);
//     },
// };
// student.greet();

// // copied student using spread operator
// const Student2 = { ...student };
// console.log(Student2);

// // arrays
// const hobbies = ["Sports", "Cooking"];
// for (hobby of hobbies) {
//     console.log(hobby);
// }

// console.log(
//     hobbies.map((hobby) => {
//         return "Hobby: " + hobby;
//     })
// );
// console.log(hobbies);

// const fruits = ["apple", "oranges", " ", "mango", " ", "lemon"];
// // Transform it into ['apple', 'oranges' , 'empty string', 'mango', 'empty string', 'lemon']
// const fruitsMod = fruits.map((fruit) => {
//     if (fruit === " ") {
//         return "empty string";
//     }
//     return fruit;
// });
// console.log(fruitsMod);

// // objects and arrays are reference types
// // spread and rest operators
// const hobbies = ["Sports", "Cooking"];
// // const copiedArr = hobbies.slice();
// const copiedArr = [...hobbies, "Music"]; // spread operator

// console.log(copiedArr);
// console.log(hobbies);

// // rest operator
// const toArray = (...args) => {
//     return args;
// };
// console.log(toArray(1, 2, 4, 5, 6));

// // destructuring
// const obj1 = { key1: 1, key2: 2, key3: 1000 };
// let { key1, key3 } = obj1;
// console.log(key1, key3);

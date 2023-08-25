// // print a string to the console
console.log("Hello World");

// // fat arrow function to return product of two numbers a and b
const prod = (a, b) => a * b;
console.log(prod(9, 8));

// // arrays
const hobbies = ["Sports", "Cooking"];
for (hobby of hobbies) {
    console.log(hobby);
}

// // map function
console.log(
    hobbies.map((hobby) => {
        return "Hobby: " + hobby;
    })
);
console.log(hobbies);

const fruits = ["apple", "oranges", " ", "mango", " ", "lemon"];
// Transform fruits array into ['apple', 'oranges' , 'empty string', 'mango', 'empty string', 'lemon']
const fruitsMod = fruits.map((fruit) => {
    if (fruit === " ") {
        return "empty string";
    }
    return fruit;
});
console.log(fruitsMod);

// // objects and arrays are reference types
// // spread and rest operators
// // student object using this keyword
const student = {
    name: "Ajay",
    age: "23",
    greet() {
        console.log("Hi! I am " + this.name);
    },
};
student.greet();

// // copied student using spread operator
const Student2 = { ...student };
console.log(Student2);

const hobbies2 = ["Sports", "Cooking"];
const slicedArr = hobbies2.slice();
const copiedArr = [...hobbies2, "Music"]; // spread operator

console.log(hobbies2);
console.log(slicedArr);
console.log(copiedArr);

// // rest operator
const toArray = (...args) => {
    return args;
};
console.log(toArray(1, 2, 4, 5, 6));

// // destructuring
const obj1 = { key1: 1, key2: 2, key3: 1000 };
let { key1, key3 } = obj1;
console.log(key1, key3);

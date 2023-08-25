// // next gen JS - without the use of constructors
class Human {
    gender = "male";
    printGender = () => {
        console.log(this.gender);
    };
}

// // inherit properties from Human class
class Person extends Human {
    name = "Ajay";
    age = 23;
    printMyName = () => {
        console.log(this.name);
    };
    printAge = () => {
        console.log(this.age);
    };
}

const person1 = new Person();
person1.printMyName();
person1.printAge();
person1.printGender();

// // spread and rest operators
const nums = [1, 2, 3, 4, 5];
const newNums = [...nums, 6];
console.log(newNums);

// for objects
const person = {
    name: "Ajay",
};
const newPerson = { ...person, age: 32 };
console.log(newPerson);

// rest operator
const filter = (...args) => {
    return args.filter((el) => el !== 1);
};
console.log(filter(1, 2, 4, 5, 6));

// destructuring
// const nums = [1, 2, 3, 4, 5];
const [a, b, , d] = nums;
console.log(a, b, d);

// destructuring object
const { name, age } = newPerson;
console.log(name, age);

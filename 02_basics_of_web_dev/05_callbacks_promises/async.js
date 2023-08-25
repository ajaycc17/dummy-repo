console.log("person 1: shows ticket");
console.log("person 2: shows ticket");

// using promises ---hazy
// const promiseWifeBringTicket = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("ticket");
//     }, 3000);
// });
// const getPopCorn = promiseWifeBringTicket.then((t) => {
//     console.log("wife: here is the ticket");
//     console.log("husband: should we go in");
//     console.log("wife: no i am hungry");
//     return new Promise((resolve, reject) => resolve(`${t} popcorn`));
// });

// const getButter = getPopCorn.then((t) => {
//     console.log("husband: i got some popcorn");
//     console.log("husband: should we go in");
//     console.log("wife: i need butter on my popcorn");
//     return new Promise((resolve, reject) => resolve(`${t} butter`));
// });

// const getDrinks = getButter.then((t) => {
//     console.log("husband: i got some butter");
//     console.log("husband: should we go in");
//     console.log("wife: how about some cold drinks?");
//     return new Promise((resolve, reject) => resolve(`${t} cold drinks`));
// });

// getDrinks.then((t) => console.log(t));

// using async
const preMovie = async () => {
    const promiseWifeBringTicket = new Promise((resolve, reject) => {
        setTimeout(() => resolve("ticket"), 3000);
    });
    const getPopCorn = new Promise((resolve, reject) => resolve("popcorn"));
    const addButter = new Promise((resolve, reject) => resolve("butter"));
    const coldDrinks = new Promise((resolve, reject) => resolve("cold drinks"));

    let ticket = await promiseWifeBringTicket;

    console.log(`wife: here is the ${ticket}`);
    console.log("husband: should we go in");
    console.log("wife: no i am hungry");

    let popcorn = await getPopCorn;

    console.log(`husband: i got some ${popcorn}`);
    console.log("husband: should we go in");
    console.log("wife: i need butter on my popcorn");

    let butter = await addButter;

    console.log(`husband: i got some ${butter}`);
    console.log("husband: anything else darling?");
    console.log("wife: how about some cold drinks?");
    console.log("husband: sure");

    let drinks = await coldDrinks;

    console.log(`husband: i got some ${drinks}`);
    console.log("husband: should we go now?");
    console.log("wife: let's go we're getting late");
    console.log("husband: thank you for the reminder *grins*");

    //using promise.all
    // let [popcorn, candy, coke] = await Promise.all([
    //     getPopCorn,
    //     getCandy,
    //     getCoke,
    // ]);
    // console.log(`${popcorn}, ${candy}, ${coke}`);

    return ticket;
};
preMovie().then((m) => console.log(`person 3: shows ${m}`));

console.log("person 4: shows ticket");
console.log("person 5: shows ticket");

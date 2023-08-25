// // setTimeout is asynchronous function: uses callback function
setTimeout(() => {
    console.log("Hello");
}, 3000);
console.log("JS waits for none");

// // using promises
console.log("a");
console.log("b");

const PrintC = () => {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => resolve("c"), 3000);
    });
    return promise1;
};
const PrintD = () => {
    const promise2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve("d"), 3000);
    });
    return promise2;
};

PrintC()
    .then((res) => {
        console.log(res);
        return PrintD();
    })
    .then((res) => {
        console.log(res);
    })
    .then(() => {
        console.log("e");
    });

// using promises in async await structure - better readability
async function printLetters() {
    console.log("a");
    console.log("b");

    let cdata = await PrintC(); // function declared above
    console.log(cdata);
    let ddata = await PrintD(); // function declared above
    console.log(ddata);
    console.log("e");
}
printLetters();

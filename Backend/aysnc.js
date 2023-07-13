// setTimeout(() => {
//     console.log("Heloo");
// }, 3000);

// console.log("No delay");
// using promises

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
        setTimeout(() => resolve("d"), 0);
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

// using async await

async function printLetters() {
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
            setTimeout(() => resolve("d"), 0);
        });

        return promise2;
    };

    let cdata = await PrintC();

    console.log(cdata);

    let ddata = await PrintD();

    console.log(ddata);

    console.log("e");
}

printLetters();

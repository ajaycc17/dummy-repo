const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const btn = document.getElementById("add-btn")!;

// generic type works on class objects
const numResults: Array<number> = [];
const strResults: string[] = [];

function add(num1: number | string, num2: number | string) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    } else if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + " " + num2;
    }
    // forced conversion to number
    return +num1 + +num2;
}

type ResultObj = { val: number; timeStamp: Date };
interface ResultInt {
    val: number;
    timeStamp: Date;
}

function printResult(resultObj: ResultInt) {
    console.log(resultObj.val);
}

btn.addEventListener("click", () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    numResults.push(result as number);
    const stringResult = add(num1, num2);
    strResults.push(stringResult as string);
    console.log(result);
    console.log(stringResult);
    console.log(printResult({ val: result as number, timeStamp: new Date() }));
    console.log(numResults, strResults);
});

// promise generic type
const myProm = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve("It worked");
    }, 3000);
});

myProm.then((res) => {
    console.log(res.split("w"));
});

// MANIPULATING THE DOM
const ul = document.querySelector(".items");
ul.firstElementChild.textContent = "Hello";
ul.children[1].innerText = "Brad";
ul.lastElementChild.innerHTML = "<h1>Hello</h1>";

// Make the first <li> tag which has HELLO -> green in color
const un_list = document.querySelector(".items");
un_list.firstElementChild.style.color = "green";

// Make the second Li tag yellow in color
un_list.children[1].style.color = "yellow";

const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const userList = document.querySelector("#users");
const msg = document.querySelector(".msg");
// on submit
myForm.addEventListener("submit", onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if (nameInput.value === "" || emailInput.value === "") {
        msg.classList.add("error");
        msg.innerHTML = "Please enter all fields";
        setTimeout(() => msg.remove(), 3000);
    } else {
        console.log(`Name: ${nameInput.value}`);
        console.log(`Email: ${emailInput.value}`);
    }
}
// events
// click event
const btn = document.querySelector(".btn-event");
btn.addEventListener("click", (e) => {
    console.log("Clicked");
});
// mouseover
myForm.addEventListener("mouseover", (e) => {
    console.log("Mouse over the form");
});
myForm.addEventListener("mouseout", (e) => {
    console.log("Mouse out of the form");
});

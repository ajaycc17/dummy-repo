// Manipulate the title of the page
document.title = "Random title";
// console.log(document.body);

var headerElement = document.getElementById("header-title");
headerElement.textContent = "Hello Ajay";

// Make the title have a black border
var header = document.getElementById("main-header");
header.style.borderBottom = "3px solid black";

// Now make ADD ITEM bold and chage the font color to greeen
var add_items = document.getElementsByClassName("title");
console.log(add_items);
add_items[0].style.fontWeight = "bold";
add_items[0].style.color = "green";

// Make the 3rd element in the list have green background color
var items = document.getElementsByClassName("list-group-item");
items[2].style.backgroundColor = "green";
for (let i = 0; i < items.length; i++) {
    items[i].style.fontWeight = "bold";
    items[i].style.color = "blue";
}

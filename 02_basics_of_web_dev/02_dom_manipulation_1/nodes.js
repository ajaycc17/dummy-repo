var itemList = document.querySelector("#items");
// parent node
console.log(itemList.parentNode);
console.log(itemList.parentNode.parentNode);

// parentElement
console.log(itemList.parentElement);
console.log(itemList.parentElement.parentElement);

// childNodes
console.log(itemList.childNodes); // also includes line breaks

// children
console.log(itemList.children);
console.log(itemList.firstChild); // gives a line break
console.log(itemList.firstElementChild); // gives li

console.log(itemList.lastChild); // gives a line break
console.log(itemList.lastElementChild); // gives li

// sibling
console.log(itemList.nextSibling);
console.log(itemList.nextElementSibling);

console.log(itemList.previousSibling);
console.log(itemList.previousElementSibling);

// createElement
var newDiv = document.createElement("div");
newDiv.className = "hello";
newDiv.id = "hello1";
newDiv.setAttribute("title", "Hello Div");
// create a new text node
var newDivText = document.createTextNode("Hello World");
newDiv.appendChild(newDivText);
var container = document.querySelector("header .container");
var h1 = document.querySelector("header h1");
container.insertBefore(newDiv, h1);
console.log(newDiv);

// create a new textnode
var newText = document.createTextNode("Hello");
var firstItem = itemList.firstElementChild;
itemList.insertBefore(newText, firstItem);

console.log(itemList);

const myForm = document.querySelector("#my-form");
const expenseInp = document.querySelector("#amount");
const amountDesc = document.querySelector("#desc");
const categoryInp = document.querySelector("#category");
const details = document.querySelector("#details");
const msg = document.querySelector("#msg");

// add eventListeners
details.addEventListener("click", removeItem);
window.addEventListener("load", showItems);

// on submit
myForm.addEventListener("submit", onSubmit);
function onSubmit(e) {
    e.preventDefault();
    // validation
    if (expenseInp.value === "" || amountDesc.value === "") {
        msg.classList.add("alert");
        msg.innerHTML = "Please enter all fields";
        setTimeout(() => {
            msg.innerHTML = "";
            msg.classList.remove("alert");
        }, 3000);
    } else {
        // store in localstorage
        let myExp = {
            amount: "",
            desc: "",
            category: "",
        };
        myExp.amount = expenseInp.value;
        myExp.desc = amountDesc.value;
        myExp.category = categoryInp.value;

        let id = Date.now();
        let myExpSerialized = JSON.stringify(myExp);
        localStorage.setItem(id, myExpSerialized);

        // display
        // create list
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";
        li.appendChild(document.createTextNode(expenseInp.value));
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(document.createTextNode(amountDesc.value));
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(document.createTextNode(categoryInp.value));
        // create a button div
        var btnDiv = document.createElement("div");

        // add a delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger delete me-2";
        deleteBtn.appendChild(document.createTextNode("Delete"));

        // add a edit button
        var editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-secondary edit";
        editBtn.appendChild(document.createTextNode("Edit"));

        // add btns to btnDiv
        btnDiv.appendChild(deleteBtn);
        btnDiv.appendChild(editBtn);

        // hidden key

        var keyElem = document.createElement("span");
        keyElem.className = "visually-hidden";
        keyElem.appendChild(document.createTextNode(id));
        btnDiv.appendChild(keyElem);

        // add btnDiv to li
        li.appendChild(btnDiv);

        // append li to details
        details.appendChild(li);
    }
}

// fetch and display item
function showItems() {
    let keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
        // create list
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";
        li.appendChild(
            document.createTextNode(
                JSON.parse(localStorage.getItem(keys[i])).amount
            )
        );
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(
            document.createTextNode(
                JSON.parse(localStorage.getItem(keys[i])).desc
            )
        );
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(
            document.createTextNode(
                JSON.parse(localStorage.getItem(keys[i])).category
            )
        );
        // create a button div
        var btnDiv = document.createElement("div");

        // add a delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger delete me-2";
        deleteBtn.appendChild(document.createTextNode("Delete"));

        // add a edit button
        var editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-secondary edit";
        editBtn.appendChild(document.createTextNode("Edit"));

        // add btns to btnDiv
        btnDiv.appendChild(deleteBtn);
        btnDiv.appendChild(editBtn);

        // hidden key

        var keyElem = document.createElement("span");
        keyElem.className = "visually-hidden";
        keyElem.appendChild(document.createTextNode(keys[i]));
        btnDiv.appendChild(keyElem);

        // add btnDiv to li
        li.appendChild(btnDiv);

        // append li to details
        details.appendChild(li);
    }
}

// Remove and edit item
function removeItem(e) {
    // for deleting record
    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement.parentElement;
        var key = Number(li.childNodes[5].childNodes[2].textContent);
        details.removeChild(li);
        localStorage.removeItem(key);
    }
    // for editing records
    else if (e.target.classList.contains("edit")) {
        var li = e.target.parentElement.parentElement;
        var key = Number(li.childNodes[5].childNodes[2].textContent);
        // get item from localstorage
        var localItem = JSON.parse(localStorage.getItem(key));
        console.log(localItem);
        // copy to form
        var amount = localItem.amount;
        var desc = localItem.desc;
        var category = localItem.category;
        expenseInp.value = amount;
        amountDesc.value = desc;
        categoryInp.value = category;
        // delete
        details.removeChild(li);
        localStorage.removeItem(key);
    }
}

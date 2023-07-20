const myForm = document.querySelector("#my-form");
const expenseInp = document.querySelector("#amount");
const amountDesc = document.querySelector("#desc");
const categoryInp = document.querySelector("#category");
const details = document.querySelector("#details");
const msg = document.querySelector("#msg");

// add eventListeners
details.addEventListener("click", removeItem);
window.addEventListener("load", showItems);
var itemId = "";

// fetch and display item
function showItems() {
    details.innerHTML = "";
    let data = [];
    axios
        .get("http://localhost:3000")
        .then((res) => {
            data = res.data;
            for (var i = 0; i < data.length; i++) {
                // create list
                var li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between";
                li.appendChild(document.createTextNode("$" + data[i].amount));
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(document.createTextNode(data[i].description));
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(document.createTextNode(data[i].category));

                // create a button div
                var btnDiv = document.createElement("div");

                // add a edit button
                var editBtn = document.createElement("button");
                editBtn.className = "btn btn-sm btn-secondary me-2 edit";
                editBtn.appendChild(document.createTextNode("Edit"));

                // add a delete button
                var deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-sm btn-danger delete";
                deleteBtn.appendChild(document.createTextNode("Delete"));

                // add btns to btnDiv
                btnDiv.appendChild(editBtn);
                btnDiv.appendChild(deleteBtn);

                // hidden key

                var keyElem = document.createElement("span");
                keyElem.className = "visually-hidden";
                keyElem.appendChild(document.createTextNode(data[i].id));
                btnDiv.appendChild(keyElem);

                // add btnDiv to li
                li.appendChild(btnDiv);

                // append li to details
                details.appendChild(li);
            }
        })
        .catch((err) => console.log(err));
}

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

        // // for localstorage
        // let id = Date.now();
        // let myExpSerialized = JSON.stringify(myExp);
        // localStorage.setItem(id, myExpSerialized);

        // for server
        if (itemId === "") {
            axios
                .post("http://localhost:3000/add-item", myExp)
                .then((res) => {
                    expenseInp.value = "";
                    amountDesc.value = "";
                    categoryInp.value = "";
                    showItems();
                })
                .catch((err) => console.log(err));
        } else {
            let url = "http://localhost:3000/edit-item/" + itemId;
            axios
                .post(url, myExp)
                .then((res) => {
                    expenseInp.value = "";
                    amountDesc.value = "";
                    categoryInp.value = "";
                    showItems();
                    itemId = "";
                })
                .catch((err) => console.log(err));
        }
    }
}

// Remove and edit item
function removeItem(e) {
    // for deleting record
    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement.parentElement;
        var key = li.childNodes[5].childNodes[2].textContent;
        let url = "http://localhost:3000/delete-item/" + key;
        axios
            .post(url)
            .then((res) => {
                details.removeChild(li);
            })
            .catch((err) => console.log(err));
    }
    // for editing records
    else if (e.target.classList.contains("edit")) {
        var li = e.target.parentElement.parentElement;
        var key = li.childNodes[5].childNodes[2].textContent;
        itemId = key;
        console.log(itemId);
        // // get item from localstorage
        // var localItem = JSON.parse(localStorage.getItem(key));
        // console.log(localItem);
        // get from server
        let url = "http://localhost:3000/get-item/" + itemId;
        axios
            .get(url)
            .then((res) => {
                // copy to form
                expenseInp.value = res.data.amount;
                amountDesc.value = res.data.description;
                categoryInp.value = res.data.category;

                // delete from view only
                details.removeChild(li);
                // localStorage.removeItem(key);
            })
            .catch((err) => console.log(err));
    }
}

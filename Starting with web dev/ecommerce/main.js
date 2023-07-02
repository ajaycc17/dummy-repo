const myForm = document.querySelector("#my-form");
const expenseInp = document.querySelector("#amount");
const amountDesc = document.querySelector("#desc");
const details = document.querySelector("#details");
const msg = document.querySelector("#msg");
var totalPrice = document.querySelector("#totalPrice");

// add eventListeners
details.addEventListener("click", removeItem);
window.addEventListener("load", showItems);

// create itemlist function
function createItem(amount, desc, id) {
    // set total price
    let totalPriceNow = Number(totalPrice.innerText) + Number(amount);
    totalPrice.innerText = totalPriceNow;
    // create list
    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.appendChild(document.createTextNode(amount));
    li.appendChild(document.createTextNode(" - "));
    li.appendChild(document.createTextNode(desc));

    // add a delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger delete me-2";
    deleteBtn.appendChild(document.createTextNode("Delete"));

    // add btn to li
    li.appendChild(deleteBtn);

    // hidden id
    var idElem = document.createElement("span");
    idElem.className = "visually-hidden";
    idElem.appendChild(document.createTextNode(id));

    // add id to li
    li.appendChild(idElem);

    // append li to details
    details.appendChild(li);
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
        // store in crudcrud
        let myExp = {
            amount: "",
            desc: "",
        };
        myExp.amount = expenseInp.value;
        myExp.desc = amountDesc.value;
        axios
            .post(
                "https://crudcrud.com/api/2fe657d7c1a14433abe6886d2b0645cf/shop",
                myExp
            )
            .then((res) => {
                createItem(res.data.amount, res.data.desc, res.data._id);
            })
            .catch((err) => console.log(err));
    }
}

// fetch and display item
function showItems() {
    axios
        .get("https://crudcrud.com/api/2fe657d7c1a14433abe6886d2b0645cf/shop")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                createItem(
                    res.data[i].amount,
                    res.data[i].desc,
                    res.data[i]._id
                );
            }
        });
}

// Remove and edit item
function removeItem(e) {
    // for deleting record
    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement;
        var id = li.childNodes[4].childNodes[0].textContent;
        var price = li.childNodes[0].textContent;
        let url =
            "https://crudcrud.com/api/2fe657d7c1a14433abe6886d2b0645cf/shop/" +
            id;
        details.removeChild(li);
        axios
            .delete(url)
            .then(() => {
                console.log(`Deleted a record of ID: ${id}`);
                // set total price
                let totalPriceNow =
                    Number(totalPrice.innerText) - Number(price);
                totalPrice.innerText = totalPriceNow;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

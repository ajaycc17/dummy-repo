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
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.appendChild(document.createTextNode(amount));
    li.appendChild(document.createTextNode(" - "));
    li.appendChild(document.createTextNode(desc));

    // add a delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger delete me-2";
    deleteBtn.appendChild(document.createTextNode("Delete"));

    // add btn to li
    li.appendChild(deleteBtn);

    // hidden id
    let idElem = document.createElement("span");
    idElem.className = "visually-hidden";
    idElem.appendChild(document.createTextNode(id));

    // add id to li
    li.appendChild(idElem);

    // append li to details
    details.appendChild(li);
}

// on submit
myForm.addEventListener("submit", onSubmit);
async function onSubmit(e) {
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
        try {
            const putData = await axios.post(
                "https://crudcrud.com/api/80e82e5d2ebd4505918fbb2df36a8d69/shop",
                myExp
            );

            createItem(
                putData.data.amount,
                putData.data.desc,
                putData.data._id
            );
        } catch (err) {
            console.log(err);
        }
    }
}

// fetch and display item
async function showItems() {
    try {
        const resData = await axios.get(
            "https://crudcrud.com/api/80e82e5d2ebd4505918fbb2df36a8d69/shop"
        );
        for (let i = 0; i < resData.data.length; i++) {
            createItem(
                resData.data[i].amount,
                resData.data[i].desc,
                resData.data[i]._id
            );
        }
    } catch (err) {
        console.log(err);
    }
}

// Remove and edit item
async function removeItem(e) {
    // for deleting record
    if (e.target.classList.contains("delete")) {
        let li = e.target.parentElement;
        let id = li.childNodes[4].childNodes[0].textContent;
        let price = li.childNodes[0].textContent;
        let url =
            "https://crudcrud.com/api/80e82e5d2ebd4505918fbb2df36a8d69/shop/" +
            id;
        details.removeChild(li);
        try {
            await axios.delete(url);
            console.log(`Deleted a record of ID: ${id}`);
            // set total price
            let totalPriceNow = Number(totalPrice.innerText) - Number(price);
            totalPrice.innerText = totalPriceNow;
        } catch (err) {
            console.log(err);
        }
    }
}

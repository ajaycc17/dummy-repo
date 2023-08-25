const details = document.getElementById("table-body");
const nameInp = document.querySelector("#itemName");
const descInp = document.querySelector("#desc");
const priceInp = document.querySelector("#price");
const qtyInp = document.querySelector("#qty");
const itemForm = document.querySelector("#item-form");
const msg = document.querySelector("#msg");

const baseUrl = "http://localhost:3000";
var itemId = "";

// add eventListeners
details.addEventListener("click", changeItem);
itemForm.addEventListener("submit", handleSubmit);
window.addEventListener("load", showItems);

function showItems() {
    details.innerHTML = "";
    let data = [];
    axios
        .get(baseUrl)
        .then((res) => {
            data = res.data;
            for (let i = 0; i < data.length; i++) {
                // create row
                const tr = document.createElement("tr");

                // add name
                const tdName = document.createElement("td");
                tdName.appendChild(document.createTextNode(data[i].title));
                tr.appendChild(tdName);

                // add desc
                const tdDesc = document.createElement("td");
                tdDesc.appendChild(
                    document.createTextNode(data[i].description)
                );
                tr.appendChild(tdDesc);

                // add price
                let tdPrice = document.createElement("td");
                tdPrice.appendChild(document.createTextNode(data[i].price));
                tr.appendChild(tdPrice);

                // add qty
                let tdQty = document.createElement("td");
                tdQty.appendChild(document.createTextNode(data[i].quantity));
                tr.appendChild(tdQty);

                // create btnEdit
                let tdBtnEdit = document.createElement("td");
                let btnEdit = document.createElement("button");
                btnEdit.className = "btn btn-sm btn-primary edit";
                btnEdit.appendChild(document.createTextNode("Edit"));
                tdBtnEdit.appendChild(btnEdit);

                // create btn 1
                let tdBtn1 = document.createElement("td");
                let btn1 = document.createElement("button");
                btn1.className = "btn btn-sm btn-success buy buy1";
                btn1.appendChild(document.createTextNode("Buy 1"));
                tdBtn1.appendChild(btn1);

                // create btn 3 - custom
                let tdBtn2 = document.createElement("td");
                tdBtn2.className = "d-flex";

                let customInp = document.createElement("input");
                customInp.type = "number";
                customInp.placeholder = "Quantity";
                customInp.className = "w-50 form-control form-control-sm me-2";

                let btn3 = document.createElement("button");
                btn3.className = "btn btn-sm btn-danger buy buy2";
                btn3.appendChild(document.createTextNode("Buy Now"));

                tdBtn2.appendChild(customInp);
                tdBtn2.appendChild(btn3);

                // put all the button columns
                tr.appendChild(tdBtnEdit);
                tr.appendChild(tdBtn1);
                tr.appendChild(tdBtn2);

                // append id - hidden
                let id = document.createElement("span");
                id.appendChild(document.createTextNode(data[i].id));
                id.className = "visually-hidden";
                tr.appendChild(id);

                details.appendChild(tr);
            }
        })
        .catch((err) => console.log(err));
}

// onsubmit
function handleSubmit(e) {
    e.preventDefault();
    let myItem = {
        title: "",
        desc: "",
        price: "",
        qty: "",
    };
    myItem.title = nameInp.value;
    myItem.desc = descInp.value;
    myItem.price = priceInp.value;
    myItem.qty = qtyInp.value;

    // add item to database
    if (itemId === "") {
        let url = baseUrl + "/add-item";
        axios
            .post(url, myItem)
            .then((res) => {
                nameInp.value = "";
                descInp.value = "";
                priceInp.value = "";
                qtyInp.value = "";
                showItems();
            })
            .catch((err) => console.log(err));
    } else {
        let url = baseUrl + "/edit-item/" + itemId;
        axios
            .post(url, myItem)
            .then((res) => {
                nameInp.value = "";
                descInp.value = "";
                priceInp.value = "";
                qtyInp.value = "";
                showItems();
                itemId = "";
            })
            .catch((err) => console.log(err));
    }
}

// on change
async function changeItem(e) {
    if (e.target.classList.contains("buy")) {
        let amount;
        const tr = e.target.parentElement.parentElement;
        if (e.target.classList.contains("buy1")) {
            amount = 1;
        } else if (e.target.classList.contains("buy2")) {
            amount = e.target.parentElement.childNodes[0].value;
        }
        const key = tr.childNodes[7].childNodes[0].textContent;
        let existingQty = Number(tr.childNodes[3].childNodes[0].textContent);

        // validation
        if (
            amount > existingQty ||
            amount === undefined ||
            amount === "" ||
            amount < 1
        ) {
            msg.classList.add("alert");
            msg.innerHTML = "Enough stock not available!";
            setTimeout(() => {
                msg.innerHTML = "";
                msg.classList.remove("alert");
            }, 3000);
        } else {
            // change server data
            let url = baseUrl + "/buy-item/" + key + "/" + amount;
            try {
                await axios.post(url);
                showItems();
            } catch {
                console.log(err);
            }
        }
    } else if (e.target.classList.contains("edit")) {
        const tr = e.target.parentElement.parentElement;
        const key = tr.childNodes[7].childNodes[0].textContent;
        itemId = key;

        // fetch item details from db
        let url = baseUrl + "/get-item/" + key;
        try {
            const res = await axios.get(url);
            // copy to form
            nameInp.value = res.data.title;
            descInp.value = res.data.description;
            priceInp.value = res.data.price;
            qtyInp.value = res.data.quantity;

            // delete from view only
            details.removeChild(tr);
        } catch {
            console.log(err);
        }
    }
}

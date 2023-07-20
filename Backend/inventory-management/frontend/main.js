const details = document.getElementById("table-body");
const nameInp = document.querySelector("#itemName");
const descInp = document.querySelector("#desc");
const priceInp = document.querySelector("#price");
const qtyInp = document.querySelector("#qty");
const itemForm = document.querySelector("#item-form");

const baseUrl = "http://localhost:3000";
var itemid = "";

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

                // create btn 1
                let tdBtn1 = document.createElement("td");
                let btn1 = document.createElement("btn");
                btn1.className = "btn btn-sm btn-success me-2 buy buy1";
                btn1.appendChild(document.createTextNode("Buy 1"));
                tdBtn1.appendChild(btn1);

                // create btn 2
                let tdBtn2 = document.createElement("td");
                let btn2 = document.createElement("btn");
                btn2.className = "btn btn-sm btn-success me-2 buy buy2";
                btn2.appendChild(document.createTextNode("Buy 2"));
                tdBtn2.appendChild(btn2);

                // create btn 3
                let tdBtn3 = document.createElement("td");
                let btn3 = document.createElement("btn");
                btn3.className = "btn btn-sm btn-success buy buy3";
                btn3.appendChild(document.createTextNode("Buy 3"));
                tdBtn3.appendChild(btn3);

                tr.appendChild(tdBtn1);
                tr.appendChild(tdBtn2);
                tr.appendChild(tdBtn3);

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
}

// on change
function changeItem(e) {
    if (e.target.classList.contains("buy")) {
        let amount;
        const tr = e.target.parentElement.parentElement;
        if (e.target.classList.contains("buy1")) {
            amount = 1;
        } else if (e.target.classList.contains("buy2")) {
            amount = 2;
        } else if (e.target.classList.contains("buy3")) {
            amount = 3;
        }
        const key = tr.childNodes[7].childNodes[0].textContent;
        console.log(key);
        // change server data
        let url = baseUrl + "/buy-item/" + key + "/" + amount;
        axios
            .post(url)
            .then((res) => {
                showItems();
            })
            .catch((err) => console.log(err));
    }
}

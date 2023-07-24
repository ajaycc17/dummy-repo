// frontend
const myForm = document.querySelector("#my-form");
const expenseInp = document.querySelector("#amount");
const amountDesc = document.querySelector("#desc");
const categoryInp = document.querySelector("#category");
const details = document.querySelector("#details");
const msg = document.querySelector("#msg");
const msgSuccess = document.querySelector("#msgSuccess");

const baseUrl = "http://localhost:3000/expense";

// add eventListeners
details.addEventListener("click", removeItem);
window.addEventListener("load", showItems);
var itemId = "";

// fetch and display item
function showItems() {
    details.innerHTML = "";
    let data = [];
    const token = localStorage.getItem("token");
    axios
        .get(baseUrl, { headers: { Authorization: token } })
        .then((res) => {
            data = res.data;
            for (var i = 0; i < data.length; i++) {
                // create list
                var li = document.createElement("li");
                li.className = "flex items-center justify-between";
                li.appendChild(document.createTextNode("₹" + data[i].expense));
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(document.createTextNode(data[i].description));
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(document.createTextNode(data[i].category));

                // create a button div
                var btnDiv = document.createElement("div");

                // add a edit button
                var editBtn = document.createElement("button");
                editBtn.className = "px-3 py-1 bg-black text-white mr-2 edit";
                editBtn.appendChild(document.createTextNode("Edit"));

                // add a delete button
                var deleteBtn = document.createElement("button");
                deleteBtn.className = "px-3 py-1 bg-red-700 text-white delete";
                deleteBtn.appendChild(document.createTextNode("Delete"));

                // add btns to btnDiv
                btnDiv.appendChild(editBtn);
                btnDiv.appendChild(deleteBtn);

                // hidden key

                var keyElem = document.createElement("span");
                keyElem.className = "hidden";
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

    // store in server
    let myExp = {
        amount: "",
        desc: "",
        category: "",
    };
    myExp.amount = expenseInp.value;
    myExp.desc = amountDesc.value;
    myExp.category = categoryInp.value;

    // for server
    if (itemId === "") {
        let url = baseUrl + "/add-expense";
        const token = localStorage.getItem("token");
        axios
            .post(url, myExp, { headers: { Authorization: token } })
            .then((res) => {
                expenseInp.value = "";
                amountDesc.value = "";
                categoryInp.value = "";
                showItems();
                // show success message
                msgSuccess.classList.remove("hidden");
                msgSuccess.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${res.data.message}`;
                setTimeout(() => {
                    msgSuccess.innerHTML = "";
                    msgSuccess.classList.add("hidden");
                }, 3000);
            })
            .catch((err) => console.log(err));
    } else {
        let url = baseUrl + "/edit-expense/" + itemId;
        const token = localStorage.getItem("token");
        axios
            .post(url, myExp, { headers: { Authorization: token } })
            .then((res) => {
                expenseInp.value = "";
                amountDesc.value = "";
                categoryInp.value = "";
                showItems();
                itemId = "";
                // show success message
                msgSuccess.classList.remove("hidden");
                msgSuccess.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${res.data.message}`;
                setTimeout(() => {
                    msgSuccess.innerHTML = "";
                    msgSuccess.classList.add("hidden");
                }, 3000);
            })
            .catch((err) => console.log(err));
    }
}

// Remove and edit item
function removeItem(e) {
    // for deleting record
    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement.parentElement;
        var key = li.childNodes[5].childNodes[2].textContent;
        let url = baseUrl + "/delete-expense/" + key;
        const token = localStorage.getItem("token");
        axios
            .post(url, null, { headers: { Authorization: token } })
            .then((res) => {
                details.removeChild(li);
                // show success message
                msgSuccess.classList.remove("hidden");
                msgSuccess.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${res.data.message}`;
                setTimeout(() => {
                    msgSuccess.innerHTML = "";
                    msgSuccess.classList.add("hidden");
                }, 3000);
            })
            .catch((err) => console.log(err));
    }
    // for editing records
    else if (e.target.classList.contains("edit")) {
        var li = e.target.parentElement.parentElement;
        var key = li.childNodes[5].childNodes[2].textContent;
        itemId = key;

        // get from server
        let url = baseUrl + "/get-expense/" + itemId;
        const token = localStorage.getItem("token");
        axios
            .get(url, { headers: { Authorization: token } })
            .then((res) => {
                // copy to form
                expenseInp.value = res.data.expense;
                amountDesc.value = res.data.description;
                categoryInp.value = res.data.category;

                // delete from view only
                details.removeChild(li);
            })
            .catch((err) => console.log(err));
    }
}

// razorpay
document.getElementById("rzp-btn").onclick = async function (e) {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/purchase/premium", {
        headers: { Authorization: token },
    });
    console.log(response);
    var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
            await axios.post(
                "http://localhost:3000/purchase/update-transaction-status",
                {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                },
                { headers: { Authorization: token } }
            );
            alert("You are a premium user now");
        },
    };
    const rzpl = new Razorpay(options);
    rzpl.open();
    e.preventDefault();

    rzpl.on("payment.failed", async function (response) {
        await axios.post(
            "http://localhost:3000/purchase/update-failed-status",
            {
                order_id: response.error.metadata.order_id,
                payment_id: response.error.metadata.payment_id,
            },
            { headers: { Authorization: token } }
        );
        console.log(response.error.metadata);
        alert("Something went wrong");
    });
};

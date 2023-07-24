// frontend
const myForm = document.querySelector("#my-form");
const expenseInp = document.querySelector("#amount");
const amountDesc = document.querySelector("#desc");
const categoryInp = document.querySelector("#category");
const details = document.querySelector("#table-body");
const msg = document.querySelector("#msg");
const msgSuccess = document.querySelector("#msgSuccess");
const premiumMsg = document.querySelector("#premium-msg");
const leaderboard = document.querySelector("#leaderboard");
const leaderboardBtn = document.querySelector("#leaderboard-btn");
const leaderboardHead = document.querySelector("#leaderboardHead");

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
            data = res.data.data;
            const isPremium = res.data.isPremium;
            if (isPremium) {
                premiumMsg.className =
                    "w-full bg-green-100 px-3 py-1 mb-3 border-2 border-green-200";
                premiumMsg.innerHTML =
                    '<i class="bi bi-patch-check-fill mr-2 text-green-600"></i>You are a premium member.';
                leaderboardBtn.classList.remove("hidden");
                leaderboardBtn.addEventListener("click", showLeaderboard);
            }
            for (var i = 0; i < data.length; i++) {
                // add a table row
                const tr = document.createElement("tr");

                // add expense
                const tdExp = document.createElement("td");
                tdExp.appendChild(
                    document.createTextNode("₹" + data[i].expense)
                );
                tr.appendChild(tdExp);

                // add desc
                const tdDesc = document.createElement("td");
                tdDesc.appendChild(
                    document.createTextNode(data[i].description)
                );
                tr.appendChild(tdDesc);

                // add category
                const tdCategory = document.createElement("td");
                tdCategory.appendChild(
                    document.createTextNode(data[i].category)
                );
                tr.appendChild(tdCategory);

                // create btnEdit
                const tdActions = document.createElement("td");
                const btnEdit = document.createElement("button");
                btnEdit.className = "px-3 py-1 bg-black text-white mr-2 edit";
                btnEdit.appendChild(document.createTextNode("Edit"));

                const btnDelete = document.createElement("button");
                btnDelete.className = "px-3 py-1 bg-red-700 text-white delete";
                btnDelete.appendChild(document.createTextNode("Delete"));

                tdActions.appendChild(btnEdit);
                tdActions.appendChild(btnDelete);
                tr.appendChild(tdActions);

                // append id - hidden
                let id = document.createElement("span");
                id.className = "hidden";
                id.appendChild(document.createTextNode(data[i].id));
                tr.appendChild(id);

                details.appendChild(tr);
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
        var tr = e.target.parentElement.parentElement;
        var key = tr.childNodes[4].textContent;
        let url = baseUrl + "/delete-expense/" + key;
        const token = localStorage.getItem("token");
        axios
            .post(url, null, { headers: { Authorization: token } })
            .then((res) => {
                details.removeChild(tr);
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
        var key = li.childNodes[4].textContent;
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

function showLeaderboard() {
    leaderboard.innerHTML = "";
    leaderboardHead.classList.remove("hidden");
    let data = [];
    const token = localStorage.getItem("token");
    let url = "http://localhost:3000" + "/premium/get-leaderboard";
    axios
        .get(url, { headers: { Authorization: token } })
        .then((res) => {
            data = res.data;
            for (var i = 0; i < data.length; i++) {
                // create list
                var li = document.createElement("li");
                li.className = "flex items-center justify-between";
                li.appendChild(document.createTextNode("Name: "));
                li.appendChild(document.createTextNode(data[i].name));
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(
                    document.createTextNode(
                        "Total Expense: ₹" + data[i].totalExpense
                    )
                );

                // append li to details
                leaderboard.appendChild(li);
            }
        })
        .catch((err) => console.log(err));
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
            const res = await axios.post(
                "http://localhost:3000/purchase/update-transaction-status",
                {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                },
                { headers: { Authorization: token } }
            );
            localStorage.setItem("token", res.data.token);
            premiumMsg.className =
                "bg-green-100 px-3 py-2 mb-3 border-2 border-green-200";
            premiumMsg.innerHTML =
                '<i class="bi bi-patch-check-fill mr-2 text-green-600"></i>You are a premium member now.';
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
        // console.log(response.error.metadata);
        alert("Something went wrong");
    });
};

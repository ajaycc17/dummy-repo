// frontend
const myForm = document.querySelector("#my-form");
const expenseInp = document.querySelector("#amount");
const amountDesc = document.querySelector("#desc");
const categoryInp = document.querySelector("#category");
const details = document.querySelector("#table-body");
const msg = document.querySelector("#msg");
const msgSuccess = document.querySelector("#msgSuccess");
const premiumMsg = document.querySelector("#premium-msg");
const leaderboardHead = document.querySelector("#leaderboardHead");
const leaderboard = document.querySelector("#leaderboard");
const leaderboardTable = document.querySelector("#leaderboard-table");
const downloadBtn = document.querySelector("#download-report");

const baseUrl = "http://localhost:3000/expense";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// add eventListeners
details.addEventListener("click", removeItem);
window.addEventListener("load", showItems);
var itemId = "";

// fetch and display item
function showItems() {
    details.innerHTML = "";
    let data = [];
    const token = localStorage.getItem("token");
    let daily, monthly, yearly, prevdaily, prevmonthly, prevyearly;
    let dailyExp = 0,
        monthlyExp = 0,
        yearlyExp = 0,
        tillNowExp = 0;

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
                showLeaderboard();
            }
            for (var i = 0; i < data.length; i++) {
                let fetchedDate = data[i].createdAt;
                fetchedDate = new Date(fetchedDate);
                if (isPremium) {
                    // get day, month and year
                    daily = fetchedDate;
                    monthly = fetchedDate.getMonth();
                    yearly = fetchedDate.getFullYear();

                    if (daily !== prevdaily && prevdaily !== undefined) {
                        const dailyTr = document.createElement("tr");
                        dailyTr.classList = "bg-yellow-50";
                        const tdEmp1 = document.createElement("td");
                        const tdEmp2 = document.createElement("td");
                        const tdEmp3 = document.createElement("td");
                        const tdEmp4 = document.createElement("td");
                        tdEmp4.appendChild(
                            document.createTextNode(
                                months[monthly] +
                                    " " +
                                    daily.getDate() +
                                    ", " +
                                    yearly
                            )
                        );
                        const tdTotal = document.createElement("td");
                        tdTotal.appendChild(
                            document.createTextNode("₹" + dailyExp)
                        );
                        dailyTr.appendChild(tdEmp1);
                        dailyTr.appendChild(tdEmp2);
                        dailyTr.appendChild(tdEmp3);
                        dailyTr.appendChild(tdEmp4);
                        dailyTr.appendChild(tdTotal);
                        details.appendChild(dailyTr);
                        dailyExp = 0;
                    }
                    if (
                        ((monthly !== prevmonthly && yearly !== prevyearly) ||
                            (monthly !== prevmonthly &&
                                yearly === prevyearly) ||
                            (monthly === prevmonthly &&
                                yearly !== prevyearly)) &&
                        prevmonthly !== undefined
                    ) {
                        const monthlyTr = document.createElement("tr");
                        monthlyTr.classList = "bg-indigo-50";
                        const tdEmp1 = document.createElement("td");
                        const tdEmp2 = document.createElement("td");
                        const tdEmp3 = document.createElement("td");
                        const tdEmp4 = document.createElement("td");
                        tdEmp4.appendChild(
                            document.createTextNode(
                                months[monthly] + " " + yearly
                            )
                        );
                        const tdTotal = document.createElement("td");
                        tdTotal.appendChild(
                            document.createTextNode("₹" + monthlyExp)
                        );
                        monthlyTr.appendChild(tdEmp1);
                        monthlyTr.appendChild(tdEmp2);
                        monthlyTr.appendChild(tdEmp3);
                        monthlyTr.appendChild(tdEmp4);
                        monthlyTr.appendChild(tdTotal);
                        details.appendChild(monthlyTr);
                        monthlyExp = 0;
                    }
                    if (yearly !== prevyearly && prevyearly !== undefined) {
                        const yearlyTr = document.createElement("tr");
                        const tdEmp1 = document.createElement("td");
                        const tdEmp2 = document.createElement("td");
                        const tdEmp3 = document.createElement("td");
                        const tdEmp4 = document.createElement("td");
                        tdEmp4.appendChild(document.createTextNode(yearly));
                        const tdTotal = document.createElement("td");
                        tdTotal.appendChild(
                            document.createTextNode("₹" + yearlyExp)
                        );
                        yearlyTr.appendChild(tdEmp1);
                        yearlyTr.appendChild(tdEmp2);
                        yearlyTr.appendChild(tdEmp3);
                        yearlyTr.appendChild(tdEmp4);
                        yearlyTr.appendChild(tdTotal);
                        details.appendChild(yearlyTr);
                        yearlyExp = 0;
                    }
                    dailyExp += Number(data[i].expense);
                    monthlyExp += Number(data[i].expense);
                    yearlyExp += Number(data[i].expense);
                    tillNowExp += Number(data[i].expense);
                }

                // add a table row
                const tr = document.createElement("tr");

                // add date
                const tdDate = document.createElement("td");
                tdDate.appendChild(
                    document.createTextNode(
                        fetchedDate.getDate() +
                            "-" +
                            fetchedDate.getMonth() +
                            "-" +
                            fetchedDate.getFullYear()
                    )
                );
                tr.appendChild(tdDate);

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

                if (isPremium) {
                    prevdaily = daily;
                    prevmonthly = monthly;
                    prevyearly = yearly;
                }
            }
            if (isPremium) {
                let nowDate = new Date();
                {
                    const dailyTr = document.createElement("tr");
                    dailyTr.classList = "bg-yellow-50";
                    const tdEmp1 = document.createElement("td");
                    const tdEmp2 = document.createElement("td");
                    const tdEmp4 = document.createElement("td");
                    const tdEmp3 = document.createElement("td");
                    tdEmp3.appendChild(
                        document.createTextNode(
                            nowDate.getDate() +
                                "-" +
                                nowDate.getMonth() +
                                "-" +
                                nowDate.getFullYear()
                        )
                    );
                    const tdTotal = document.createElement("td");
                    tdTotal.appendChild(
                        document.createTextNode("₹" + dailyExp)
                    );
                    dailyTr.appendChild(tdEmp1);
                    dailyTr.appendChild(tdEmp2);
                    dailyTr.appendChild(tdEmp4);
                    dailyTr.appendChild(tdEmp3);
                    dailyTr.appendChild(tdTotal);
                    details.appendChild(dailyTr);
                    dailyExp = 0;
                }
                {
                    const monthlyTr = document.createElement("tr");
                    monthlyTr.classList = "bg-blue-50";
                    const tdEmp1 = document.createElement("td");
                    const tdEmp2 = document.createElement("td");
                    const tdEmp4 = document.createElement("td");
                    const tdEmp3 = document.createElement("td");
                    tdEmp3.appendChild(
                        document.createTextNode(months[nowDate.getMonth()])
                    );
                    const tdTotal = document.createElement("td");
                    tdTotal.appendChild(
                        document.createTextNode("₹" + monthlyExp)
                    );
                    monthlyTr.appendChild(tdEmp1);
                    monthlyTr.appendChild(tdEmp2);
                    monthlyTr.appendChild(tdEmp4);
                    monthlyTr.appendChild(tdEmp3);
                    monthlyTr.appendChild(tdTotal);
                    details.appendChild(monthlyTr);
                    monthlyExp = 0;
                }
                {
                    const yearlyTr = document.createElement("tr");
                    yearlyTr.classList = "bg-red-50";
                    const tdEmp1 = document.createElement("td");
                    const tdEmp2 = document.createElement("td");
                    const tdEmp4 = document.createElement("td");
                    const tdEmp3 = document.createElement("td");
                    tdEmp3.appendChild(
                        document.createTextNode(nowDate.getFullYear())
                    );
                    const tdTotal = document.createElement("td");
                    tdTotal.appendChild(
                        document.createTextNode("₹" + yearlyExp)
                    );
                    yearlyTr.appendChild(tdEmp1);
                    yearlyTr.appendChild(tdEmp2);
                    yearlyTr.appendChild(tdEmp4);
                    yearlyTr.appendChild(tdEmp3);
                    yearlyTr.appendChild(tdTotal);
                    details.appendChild(yearlyTr);
                    yearlyExp = 0;
                }
                {
                    const tillNowTr = document.createElement("tr");
                    tillNowTr.classList = "bg-sky-50 font-semibold";
                    const tdEmp1 = document.createElement("td");
                    const tdEmp2 = document.createElement("td");
                    const tdEmp4 = document.createElement("td");
                    const tdEmp3 = document.createElement("td");
                    tdEmp3.appendChild(document.createTextNode("Total:"));
                    const tdTotal = document.createElement("td");
                    tdTotal.appendChild(
                        document.createTextNode("₹" + tillNowExp)
                    );
                    tillNowTr.appendChild(tdEmp1);
                    tillNowTr.appendChild(tdEmp2);
                    tillNowTr.appendChild(tdEmp4);
                    tillNowTr.appendChild(tdEmp3);
                    tillNowTr.appendChild(tdTotal);
                    details.appendChild(tillNowTr);
                }
                const downBtn = document.createElement("button");
                downBtn.classList =
                    "px-3 py-1 mt-3 bg-green-700 text-white delete";
                downBtn.appendChild(document.createTextNode("Download report"));
                downloadBtn.appendChild(downBtn);
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
    let data = [];
    const token = localStorage.getItem("token");
    let url = "http://localhost:3000" + "/premium/get-leaderboard";
    axios
        .get(url, { headers: { Authorization: token } })
        .then((res) => {
            data = res.data;
            leaderboardHead.classList.remove("hidden");
            leaderboardHead.classList.add("flex");
            leaderboardTable.classList.remove("hidden");
            for (var i = 0; i < data.length; i++) {
                const tr = document.createElement("tr");

                // add name
                const tdName = document.createElement("td");
                tdName.appendChild(document.createTextNode(data[i].name));
                tr.appendChild(tdName);

                // add expense
                const tdExp = document.createElement("td");
                tdExp.appendChild(
                    document.createTextNode("₹" + data[i].totalExpense)
                );
                tr.appendChild(tdExp);
                leaderboard.appendChild(tr);
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

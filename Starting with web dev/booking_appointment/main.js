const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const details = document.querySelector("#details");
const msg = document.querySelector("#msg");
// on submit
myForm.addEventListener("submit", onSubmit);
window.addEventListener("load", showItems);
// to decide put or post
var userId = "";

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
                li.className = "list-group-item";
                li.appendChild(document.createTextNode(data[i].email));
                li.appendChild(document.createTextNode(": "));
                li.appendChild(document.createTextNode(data[i].phone));
                // hidden key
                var keyElem = document.createElement("span");
                keyElem.style.display = "none";
                keyElem.appendChild(document.createTextNode(data[i].id));
                li.appendChild(keyElem);

                // add a delete button
                var deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-sm btn-danger delete";
                // Append text node
                deleteBtn.appendChild(document.createTextNode("Delete"));

                // add a edit btn
                var editBtn = document.createElement("button");
                editBtn.className = "btn btn-sm btn-warning edit";
                // Append text node
                editBtn.appendChild(document.createTextNode("Edit"));

                // add btns to li
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);

                // append li
                details.appendChild(li);
            }
        })
        .catch((err) => console.log(err));
}
function onSubmit(e) {
    e.preventDefault();
    if (
        nameInput.value === "" ||
        emailInput.value === "" ||
        phoneInput.value === ""
    ) {
        msg.classList.add("alert");
        msg.innerHTML = "Please enter all fields";
        setTimeout(() => msg.remove(), 3000);
    } else {
        let myObj = {
            name: "",
            email: "",
            phone: "",
        };
        myObj.name = nameInput.value;
        myObj.email = emailInput.value;
        myObj.phone = phoneInput.value;

        // let myObjSerialized = JSON.stringify(myObj);
        // localStorage.setItem(emailInput.value, myObjSerialized);
        // save to server
        if (userId === "") {
            axios
                .post("http://localhost:3000/add-appointment", myObj)
                .then((res) => {
                    nameInput.value = "";
                    emailInput.value = "";
                    phoneInput.value = "";
                    showItems();
                })
                .catch((err) => console.log(err));
        } else {
            console.log("user id: ", userId);
            let url1 = "http://localhost:3000/edit-appointment/" + userId;
            axios
                .post(url1, myObj)
                .then((res) => {
                    nameInput.value = "";
                    emailInput.value = "";
                    phoneInput.value = "";
                    showItems();
                    userId = "";
                })
                .catch((err) => console.log(err));
        }
    }
}
details.addEventListener("click", removeItem);
// Remove item
function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement;
        var key = li.childNodes[3].childNodes[0].textContent;
        var url = "http://localhost:3000/delete-appointment/" + key;

        axios
            .post(url)
            .then(details.removeChild(li))
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("edit")) {
        var li = e.target.parentElement;
        var key = li.childNodes[3].childNodes[0].textContent;
        userId = key;
        console.log(key);
        var url = "http://localhost:3000/get-appointment/" + key;
        // get item from localstorage
        axios
            .get(url)
            .then((res) => {
                // copy to form
                var name = res.data.name;
                var email = res.data.email;
                var phone = res.data.phone;
                nameInput.value = name;
                emailInput.value = email;
                phoneInput.value = phone;
            })
            .catch((err) => console.log(err));

        // delete
        details.removeChild(li);
    }
}

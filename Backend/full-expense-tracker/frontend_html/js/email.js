const emailForm = document.querySelector("#email-form");
const emailInp = document.querySelector("#email");
const msg = document.querySelector("#msg");
const msgSuccess = document.querySelector("#msgSuccess");

const baseUrl = "http://localhost:3000";

// event listeners
emailForm.addEventListener("submit", onSubmit);

// on submit
function onSubmit(e) {
    e.preventDefault();

    // login process
    let myUser = {
        email: "",
    };
    myUser.email = emailInp.value;

    // for server
    let url = baseUrl + "/password/forgotpassword";
    axios
        .post(url, myUser)
        .then((res) => {
            msgSuccess.classList.remove("hidden");
            msgSuccess.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${res.data.message}`;
            setTimeout(() => {
                msgSuccess.innerHTML = "";
                msgSuccess.classList.add("hidden");
            }, 3000);
            emailInp.value = "";
            window.location.href = "http://127.0.0.1:5500/frontend/login.html";
        })
        .catch((err) => {
            msg.classList.remove("hidden");
            msg.innerHTML = `<i class="bi bi-exclamation-triangle-fill mr-2"></i> ${err.response.data.message}`;
            setTimeout(() => {
                msg.innerHTML = "";
                msg.classList.add("hidden");
            }, 3000);
        });
}

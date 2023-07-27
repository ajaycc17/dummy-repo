const signupForm = document.querySelector("#signup-form");
const nameInp = document.querySelector("#username");
const emailInp = document.querySelector("#email");
const password1Inp = document.querySelector("#password1");
const password2Inp = document.querySelector("#password2");
const msg = document.querySelector("#msg");
const msgSuccess = document.querySelector("#msgSuccess");

const baseUrl = "http://localhost:3000";

// event listeners
signupForm.addEventListener("submit", onSubmit);

// on submit
function onSubmit(e) {
    e.preventDefault();

    // validation
    if (password1Inp.value !== password2Inp.value) {
        msg.classList.remove("hidden");
        msg.innerHTML =
            '<i class="bi bi-exclamation-triangle-fill mr-2"></i> Passwords do not match!';
        setTimeout(() => {
            msg.innerHTML = "";
            msg.classList.add("hidden");
        }, 3000);
    } else {
        // signup process
        let myUser = {
            name: "",
            email: "",
            password: "",
        };
        myUser.name = nameInp.value;
        myUser.email = emailInp.value;
        myUser.password = password1Inp.value;

        // for server
        let url = baseUrl + "/user/signup";
        axios
            .post(url, myUser)
            .then((res) => {
                if (res.status !== 201) {
                    msg.classList.remove("hidden");
                    msg.innerHTML = `<i class="bi bi-exclamation-triangle-fill mr-2"></i> ${res.data.message}`;
                    setTimeout(() => {
                        msg.innerHTML = "";
                        msg.classList.add("hidden");
                    }, 3000);
                } else {
                    msgSuccess.classList.remove("hidden");
                    msgSuccess.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${res.data.message}`;
                    setTimeout(() => {
                        msgSuccess.innerHTML = "";
                        msgSuccess.classList.add("hidden");
                    }, 3000);
                }
                nameInp.value = "";
                emailInp.value = "";
                password1Inp.value = "";
                password2Inp.value = "";
                window.location.href =
                    "http://127.0.0.1:5500/frontend/login.html";
            })
            .catch((err) => console.log(err));
    }
}

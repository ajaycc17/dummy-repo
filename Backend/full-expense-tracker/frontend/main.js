const signupForm = document.querySelector("#signup-form");
const nameInp = document.querySelector("#username");
const emailInp = document.querySelector("#email");
const password1Inp = document.querySelector("#password1");
const password2Inp = document.querySelector("#password2");
const msg = document.querySelector("#msg");

// event listeners
signupForm.addEventListener("submit", onSubmit);

// on submit
function onSubmit(e) {
    e.preventDefault();

    // validation
    if (password1Inp.value !== password2Inp.value) {
        console.log(password1Inp.value);
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
        axios
            .post("http://localhost:3000/user/signup", myUser)
            .then((res) => {
                nameInp.value = "";
                emailInp.value = "";
                password1Inp.value = "";
                password2Inp.value = "";
            })
            .catch((err) => console.log(err));
    }
}

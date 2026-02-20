let usernameElement = document.getElementById("username");
let passwordElement = document.getElementById("password");
let emailElement = document.getElementById("email");
let registerButtonElement = document.getElementById("registerButton");
let containerElement = document.getElementById("container");
let errorMessagesElement = document.getElementById("errorMessages")

registerButtonElement.addEventListener("click", () => {
    errorMessagesElement.innerHTML = "";

    let userData = {
        username: usernameElement.value,
        password: passwordElement.value,
        email: emailElement.value,
    }
    console.log("hello", userData);
    registerUser(userData);
})

async function registerUser(userData) {
    try {

        let apiResponse = await fetch("https://api.freeapi.app/api/v1/users/register",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData),
            })
        let jsondata = await apiResponse.json();
        if (!apiResponse.ok) {
            if (jsondata.errors) {
                displayErrors(jsondata.errors);
            } else {
                displayErrors([{ message: jsondata.data.errorMessage }]);
            }
            return;
        }
        errorMessagesElement.innerHTML =
            `<p class="text-green-600 font-bold">Registered Successfully</p>`;
        Toastify({
            duration: 3000,
            text: "User Register Successfully!!",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to left, #00b09b, #7f8574)",
            }
        }).showToast();

        setTimeout(() => {
            window.location = "login.html"

        }, 2000)
        console.log("Success:", jsondata);

    }
    catch (error) {

        console.log("error")
    }

    function displayErrors(errors) {
        console.log(errors);
        let html = errors.map(error => {
            let errorMessage = "";
            if (error.email) {
                errorMessage = error.email;
            }
            else if (error.password) {
                errorMessage = error.password;
            }
            else {
                errorMessage = error.username;
            }
            return `<p class="text-red-600 text-sm mt-1">${errorMessage}</p>`
        }).join("");

        errorMessagesElement.innerHTML = html;

    }

}


let usernameElement = document.getElementById("username");
let passwordElement = document.getElementById("password");
let emailElement = document.getElementById("email");
let registerButtonElement = document.getElementById("registerButton");
let containerElement = document.getElementById("container");

registerButtonElement.addEventListener("click", () => {

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
        console.log(jsondata);

        let html = "";
        html += `<h2 class="font-bold text-red-600">Errors</h2>
        <ul>
            <li class="font-bold text-red-600">username</li>
            <li class="font-bold text-red-600">password</li>
            <li class="font-bold text-red-600">email</li>
        </ul>`

        containerElement.innerHTML = html;
    }
    catch (error) {

        console.log("error")
    }
}


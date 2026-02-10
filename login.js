let usernameElement = document.getElementById("input");
let passwordElement = document.getElementById("password");
let loginButtonElement = document.getElementById("loginButton");

loginButtonElement.addEventListener("click", () => {
    let userData = {
        username: usernameElement.value,
        password: passwordElement.value,
    }
    console.log("hii", userData);
    loginUser(userData)
})

async function loginUser(userData) {
    try {
        let apiresponse = await fetch("https://api.freeapi.app/api/v1/users/login",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData),
            })
        let jsondata = await apiresponse.json();
        console.log(jsondata);
        let accessToken = jsondata.data.accessToken;
        console.log(accessToken);
        localStorage.setItem("accessToken", accessToken);
    }
    catch (error) {

        console.log("error")
    }
}
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
        console.log("apiResponse here", apiresponse);
        let jsondata = await apiresponse.json();
        console.log(jsondata);
        let accessToken = jsondata.data.accessToken;
        let userDetail = jsondata.data.user;
        userDetail = JSON.stringify(userDetail)
        console.log("userDetail here", userDetail);
        console.log(accessToken);
        localStorage.setItem("accessToken", accessToken);

        localStorage.setItem("userDetail", userDetail);
        Toastify({
            duration: 3000,
            text: "Log in Successfull!!",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
                background: "linear-gradient(to left, #00b09b, #7f8574)",
            }
        }).showToast();
        setTimeout(() => {
            window.location = "get-All-Users.html"

        }, 2000)


    }
    catch (error) {

        console.log("error")
    }
}
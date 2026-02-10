
console.log("get all user page");
async function getUser() {

    let accessToken = localStorage.getItem("accessToken")
    try {
        let apiresponse = await fetch("https://api.freeapi.app/api/v1/chat-app/chats/users",
            {
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )

        let jsonData = await apiresponse.json();
        console.log("jsonData is displayed here!!", jsonData);
    }
    catch (error) {
        console.log(error);
    }
}

getUser();
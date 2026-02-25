
let containerElement = document.getElementById("Container");

async function getUserChat() {

    let accessToken = localStorage.getItem("accessToken");
    try {

        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/chat-app/chats`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        )
        let jsonData = await apiResponse.json()
        console.log("users list here with cureent chat", jsonData);
        displayDirectMessage(jsonData.data);
    }

    catch (error) {
        console.log(error);
    }
}

function displayDirectMessage(users) {
    let html = "";
    users.forEach(user => {
        let username = user.participants[0].username;
        let lastMessage = user.lastMessage?.content || "no message";
        html += `<div class="flex gap-4 bg-white p-6 shadow-sm rounded-full mt-2">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-lg font-semibold">${username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div class="flex flex-col">

                        <p class="text-gray-500 text-sm mt-1">${username}</p>
                        <p class="text-gray-600 font-medium">DirectMessage</p>
                        <p class="text-gray-600 font-medium">${lastMessage}</p>

                    </div>
                </div>`
    }
    )
    containerElement.innerHTML = html;
}
getUserChat();
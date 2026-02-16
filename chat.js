let nameDisplayElement = document.getElementById("nameDisplay");
let backButtonElement = document.getElementById("backButton");
let inputFieldElement = document.getElementById("inputField");
let sendButtonElement = document.getElementById("sendButton");
let messageContainerElement = document.getElementById("messageContainer");


let urlString = window.location.search;
console.log("urlString", urlString);

let urlParams = new URLSearchParams(urlString);
const id = urlParams.get("id");
console.log("id", id);

let accessToken = localStorage.getItem("accessToken");



async function createChat(id) {

    try {
        let apiresponse = await fetch(`https://api.freeapi.app/api/v1/chat-app/chats/c/${id}`, {

            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        let jsondata = await apiresponse.json();

        let participants = jsondata.data.participants;

        let chatId = jsondata.data._id;

        localStorage.setItem("chatId", chatId);

        getMessages();
        let participant = participants.find((participant, index) => {
            if (id == participant._id) {
                return (participant);

            }
        })

        nameDisplayElement.innerHTML = participant.username;
    }
    catch (error) {
        console.log(error);
    }
}

createChat(id);

sendButtonElement.addEventListener("click", () => {

    let chatId = localStorage.getItem("chatId");
    sendMessage(chatId);
})

async function sendMessage(chatId) {
    try {

        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/chat-app/messages/${chatId}`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },

                body: JSON.stringify({ content: inputFieldElement.value })
            })
        getMessages();

    } catch (error) {
        console.log(error);

    }
}

async function getMessages() {
    let chatId = localStorage.getItem("chatId")
    try {

        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/chat-app/messages/${chatId}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },

            })

        let jsonData = await apiResponse.json();

        let messages = jsonData.data;
        displayMessages(messages);
    }

    catch (error) {
        console.log(error)
    }
}

function displayMessages(messages) {
    console.log(messages);
    let userDetail = localStorage.getItem("userDetail");
    userDetail = JSON.parse(userDetail);
    let userId = userDetail._id;
    let messageId = message.sender._id;
    let html = "";
    messages.forEach((message) => {

        html += `<div class="bg-gray-50 p-3 rounded-lg">
             <div>
                 <h1 class="bg-gray-200 px-4 py-2 rounded-xl text-black w-[200px]">${message.content}</h1>
             </div>
 
             <div class="flex justify-end">
                 <h1 class="bg-blue-600 px-4 py-2 rounded-xl text-white w-[200px]"> messages2</h1>
             </div>
 
 
         </div>`
        


        if (userId == messageId) {
            console.log("this message is from my side", message.content);
            <div class="flex justify-end">

            </div>

        }

        else {
            console.log(" this message is from other user", message.content);

        } <div class="flex justify-start">

        </div>


    })

    messageContainerElement.innerHTML = html;
}
//displayMessages(message);

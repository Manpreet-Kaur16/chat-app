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
    //console.log(messages);
    messages.reverse();
    console.log("revesed aray", messages);
    let userDetail = localStorage.getItem("userDetail");
    userDetail = JSON.parse(userDetail);

    let html = "";
    messages.forEach((message) => {

        let userId = userDetail._id;
        let messageId = message.sender._id;
        let myMessage = userId === messageId;

        html += `<div class="bg-gray-50 p-3 rounded-lg">
             <div class="flex ${myMessage ? "justify-end" : "justify-start"} mb-2">
                 <h1 class= "${myMessage ? "bg-gray-400 px-4 py-2 rounded-xl text-white w-[200px]" : "bg-blue-400 px-4 py-2 rounded-xl text-black w-[200px]"}">${message.content}
                <div class=" flex justify-end ${myMessage ? "" : "hidden"}"> <button class="text-white px-2 py-1 rounded-lg" onclick="deleteMessage(event)" data-id="${(message._id)}">Delete</button><div></h1>

             </div>
         </div>`
    })

    messageContainerElement.innerHTML = html;
}

async function deletemyMessage(messageId) {
    let chatId = localStorage.getItem("chatId")
    //let messageId = messages.message._id;
    console.log(chatId, messageId);
    try {

        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/chat-app/messages/${chatId}/${messageId}`,
            {
                method: "DELETE",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },


            })

        getMessages();

    }

    catch (error) {
        console.log(error);
    }
}

function deleteMessage(event) {
    let userConsent = confirm("do you want to delete this message?");
    console.log("this is in delete message function event handler");

    if (userConsent) {
        deletemyMessage(event.target.getAttribute("data-id"))
    }
}

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

function apiCall(url, method = "GET", headers = {}, body = null) {
    return fetch("https://api.freeapi.app/api/v1" + url, {
        method: method,
        headers: {
            ...headers,
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`

        },
        body: body ? JSON.stringify(body) : null,
    });
}

async function createChat(id) {

    try {
        let apiresponse = await apiCall(`/chat-app/chats/c/${id}`, "POST");
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


    sendMessage();
})

async function sendMessage() {
    try {

        let chatId = localStorage.getItem("chatId");
        let apiResponse = await apiCall(`/chat-app/messages/${chatId}`, "POST",
            {},
            { content: inputFieldElement.value },)


        if (!inputFieldElement.value.trim()) return;
        getMessages();
        inputFieldElement.value = "";

    } catch (error) {
        console.log(error);

    }
}

async function getMessages() {
    let chatId = localStorage.getItem("chatId")
    try {

        let apiResponse = await apiCall(`/chat-app/messages/${chatId}`, "GET",
            {},)

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
                 <h1 class= "${myMessage ? "bg-blue-400 px-4 py-2 rounded-xl text-white w-[200px]" : "bg-gray-400 px-4 py-2 rounded-xl text-black w-[200px]"}">${message.content}
                <div class=" flex justify-end ${myMessage ? "" : "hidden"}"> <button class="text-white px-2 py-1 rounded-lg" onclick="deleteMessage(event)" data-id="${(message._id)}">Delete</button></div></h1>

             </div>
         </div>`
    })

    messageContainerElement.innerHTML = html;
}

async function deletemyMessage(messageId) {
    let chatId = localStorage.getItem("chatId")
    console.log(chatId, messageId);
    try {

        let apiResponse = await apiCall(`/chat-app/messages/${chatId}/${messageId}`, "DELETE",
            {},)

        getMessages();

    }

    catch (error) {
        console.log(error);
    }
}

function deleteMessage(event) {
    let userConsent = confirm("do you want to delete this message?");
    console.log("this is in delete message function event handler");

    Toastify({
        duration: 3000,
        text: "Message Deleted Succesfully!!",
        className: "info",

        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to left, #00b09b, #7f8574)",
        }
    }).showToast();
    if (userConsent) {
        deletemyMessage(event.target.getAttribute("data-id"))
    }
}

//setInterval(getMessages, 2000);

inputFieldElement.addEventListener("keyup", (event) => {
    console.log("you pressed keyboard key here", event);
    if (event.key == "Enter") {
        sendMessage();
    }
})



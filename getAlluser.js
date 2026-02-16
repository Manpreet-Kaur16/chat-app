let containerElement = document.getElementById("container");
let noChatsYetContainerElement = document.getElementById("noChatsYetContainer");
let reloadButtonElement = document.getElementById("reloadButton");
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
        displayOnlineUser(jsonData.data);
    }
    catch (error) {
        console.log(error);
    }
}

function displayOnlineUser(users) {
    console.log("user list is here", users);
    if (users.length > 0) {
        noChatsYetContainerElement.classList.add("hidden");
        containerElement.innerHTML = "";


    } else {
        noChatsYetContainerElement.classList.remove("hidden");
    }
    let html = "";
    users.forEach(user => {
        console.log("user", user);
        html += `   <div
                class="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                <div class="p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="relative flex-shrink-0">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-lg font-semibold">${user.username.charAt(0).toUpperCase()}</span>
                                </div>
                                <div
                                    class="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white">
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 truncate">${user.username}</h3>
                                <p class="text-sm text-green-500 font-medium flex items-center"><span
                                        class="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>Active
                                    now</p>
                            </div>
                        </div><button
                            class="flex-shrink-0 p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                            fdprocessedid="cpp5t"><svg class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                </path>
                            </svg></button>
                    </div>
                </div>
                <div
                    class="px-4 py-3 bg-gray-50 border-t border-gray-100 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <button
                        class="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center"
                        fdprocessedid="1zcfqn"><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                            </path>
                        </svg><a href="chat.html?id=${user._id}">Send Message</a></button>
                </div>
    
                </div>
    </div> `
    }
    )

    containerElement.innerHTML = html;
}

reloadButtonElement.addEventListener("click", getUser)

getUser();
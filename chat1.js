



let urlString=window.location.search;
console.log(urlString);
let urlParams= new URLSearchParams(urlString);
let receiverId= urlParams.get("receiverId");
console.log(userId);

let accessToken=localStorage.setItem("accessToken")


async function createChat()

{
    try{
        let apiResponse = await fetch(`https://api.freeapi.app/api/v1/chat-app/chats/c/${receiverId}`,
            {
                method:"POST",
                headers: {Authorization: `Bearer ${accessToken}` }
            }, 
        )
    }

    catch (error)
    {
        console.log(error);
    }
}
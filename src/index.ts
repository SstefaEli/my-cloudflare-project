import {handleGetRequest, handleNotFoundRequest, handlePostRequest,} from "./handlers";

addEventListener('fetch', (event) => {
    const {request} = event

    if (request.method === 'POST' && request.url.endsWith("/users")) {
        event.respondWith(handlePostRequest(request))
    } else if (request.method === "GET" && request.url.includes("/user/")) {
        event.respondWith(handleGetRequest(request))
    } else {
        event.respondWith(handleNotFoundRequest())
    }
})

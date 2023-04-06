import {handleNotFoundRequest, handleShortenRequest, handleShortUrlRequest} from "./handlers";

addEventListener('fetch', (event) => {
    const {request} = event

    const url = new URL(request.url)

    if (url.pathname === '/shorten') {
        event.respondWith(handleShortenRequest(request))
    } else if (url.pathname.startsWith('/')) {
        event.respondWith(handleShortUrlRequest(request))
    } else {
        event.respondWith(handleNotFoundRequest())
    }
})

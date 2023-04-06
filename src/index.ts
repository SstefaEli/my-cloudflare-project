import { handleShortenRequest, handleShortUrlRequest, handleNotFoundRequest } from './handlers/worker'

addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url)

    switch (pathname) {
        case '/shorten':
            return handleShortenRequest(request)
        default:
            if (pathname.length === 7) {
                return handleShortUrlRequest(request)
            } else {
                return handleNotFoundRequest()
            }
    }
}

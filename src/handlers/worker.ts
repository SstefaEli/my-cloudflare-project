import { KVNamespace } from '@cloudflare/workers-types'
import {generateShortCode} from "../utils";

declare global {
    const MY_NAMESPACE : KVNamespace
}


export async function handleShortenRequest(request: Request): Promise<Response> {
    const { url } = await request.json() as { url: string }

    const shortCode = generateShortCode()

    // Store the short code and long URL in Cloudflare KV
    await MY_NAMESPACE.put(shortCode, url)

    const shortUrl = `https://my-shortener.com/${shortCode}`
    return new Response(shortUrl, { status: 200 })
}

export async function handleShortUrlRequest(request: Request): Promise<Response> {
    const urlCode = request.url.slice(1)

    // Look up the long URL in Cloudflare KV using the short code
    const longUrl = await MY_NAMESPACE.get(urlCode)

    if (longUrl) {
        return Response.redirect(longUrl, 301)
    } else {
        return new Response('404 not found', { status: 404 })
    }
}

export function handleNotFoundRequest(): Response {
    return new Response('404 not found', { status: 404 })
}

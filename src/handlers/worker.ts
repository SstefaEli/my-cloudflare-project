import { KVNamespace } from '@cloudflare/workers-types'
import { Request } from '@cloudflare/workers-types';


declare global {
    const MY_NAMESPACE : KVNamespace
}


export async function handlePostRequest(request: Request): Promise<Response> {
    try {
        const { name, email } = await request.json() as { name: string; email: string };
        await MY_NAMESPACE.put(name, email);
        return new Response(`User data for "${name}" stored successfully!`);
    } catch (e) {
        console.error(`Error storing user data: ${e}`);
        return new Response("Error storing user data", { status: 500 });
    }
}

export async function handleGetRequest(request: Request): Promise<Response> {
    try {
        const url = new URL(request.url);
        const name = url.pathname.split("/")[2];
        const email = await MY_NAMESPACE.get(name);
        if (email) {
            return new Response(`Name: ${name}, Email: ${email}`);
        } else {
            return new Response(`No user data found for "${name}"`, { status: 404 });
        }
    } catch (e) {
        console.error(`Error getting user data: ${e}`);
        return new Response("Error getting user data", { status: 500 });
    }
}

export function handleNotFoundRequest(): Response {
    return new Response('404 not found', { status: 404 })
}

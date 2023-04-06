A user submits a long URL to the URL shortener service.

The URL shortener service generates a short code for the URL, using a random string generator or other algorithm.

The service stores the short code and long URL in Cloudflare KV.

When a user visits the short URL, the service looks up the corresponding long URL in Cloudflare KV and redirects the user to the long URL.

If the short URL is not found in Cloudflare KV, the service returns a "404 not found" error.
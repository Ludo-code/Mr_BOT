import fetch from "node-fetch";
import "dotenv/config";

let accessToken = null;
let tokenExpiresAt = 0;

export async function getRedditToken() {
    const now = Date.now();
    if (!accessToken || !tokenExpiresAt || now > tokenExpiresAt - 600000) {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        const response = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString("base64"),
                "User-Agent": `${process.env.REDDIT_USER_AGENT}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });
        const data = await response.json();
        accessToken = data.access_token;
        tokenExpiresAt = now + (data.expires_in * 1000);
    }
    return accessToken;
}

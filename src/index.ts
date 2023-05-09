import fetch from 'node-fetch';
import { getClientId, getClientSecret } from "./environment.js";

const url = 'https://accounts.spotify.com/api/token';
var authOptions = {
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic ' + (Buffer.from(getClientId() + ':' + getClientSecret()).toString('base64')),
    },
    body: new URLSearchParams({
        'grant_type': 'client_credentials'
    })
};

const response = await fetch(url, authOptions)
const body = await response.text();
const parsed = JSON.parse(body); // TODO: type guard, see https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript

if (parsed?.access_token) {
    const access_token = parsed?.access_token;
    console.log(`Access token: ${access_token}`);
}

import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { getClientId, getClientSecret } from "./environment.js";

interface SpotifyTokenResponse {
    access_token: string
}

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
const body = await response.json() as SpotifyTokenResponse; // TODO: type guard, see https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript

// Analyse track.
// https://open.spotify.com/track/49X0LAl6faAusYq02PRAY6?si=a7784942a7ef4a0a
// TODO: get for all tracks in liked list.
// TODO: link to track metadata (title, artist).

const analyseAudio = async (accessToken: string, trackId: string) => {
    const url = `https://api.spotify.com/v1/audio-analysis/${trackId}`;
    const options = {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
    }
    const response = await fetch(url, options);
    const body = await response.json();
    // console.log(body);
    // console.log(response.status);

    writeFileSync("tracks/lady-hear-me-tonight.json", JSON.stringify(body, null, 2));
}

if (body?.access_token) {
    const accessToken = body?.access_token;
    // console.log(`Access token: ${accessToken}`);

    const trackId = '49X0LAl6faAusYq02PRAY6?si=a7784942a7ef4a0a';
    await analyseAudio(accessToken, trackId);
} else {
    throw Error("Invalid token response from Spotify API.");
}

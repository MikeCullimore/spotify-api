import fetch from 'node-fetch';
import { getClientId, getClientSecret } from "./environment.js";

// your application requests authorization
const url = 'https://accounts.spotify.com/api/token';
// const url = 'http://en.wikipedia.org';
var authOptions = {
    // url,
    method: 'get',
    headers: {
        'Authorization': 'Basic ' + (Buffer.from(getClientId() + ':' + getClientSecret()).toString('base64'))
    },
    // form: {
    //     grant_type: 'client_credentials'
    // },
    // json: true
};

const response = await fetch(url, authOptions)
const body = await response.text();
console.log(body);
console.log(response.status);

// request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {

//         // use the access token to access the Spotify Web API
//         var token = body.access_token;
//         var options = {
//             url: 'https://api.spotify.com/v1/users/jmperezperez',
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             },
//             json: true
//         };
//         request.get(options, function (error, response, body) {
//             console.log(body);
//         });
//     }
// })

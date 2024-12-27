/*this is where we'll handle the user authorization, 
code verification and accessing the spotify api */

import { response } from "express";

const clientId = "clientID"; //client id from spotify
//const redirectUri = 'http://localhost:3000';
let code = new URLSearchParams(window.location.search).get("code");

const Spotify = {
  getAccessToken() {
    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = getAccessToken(clientId, code);
    }

    async function redirectToAuthCodeFlow(clientId) {
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);
      localStorage.setItem("verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", "http://localhost:3000");
      params.append("scope", "user-read-private user-read-email");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    function generateCodeVerifier(length) {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    async function generateCodeChallenge(codeVerifier) {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    async function getAccessToken(clientId, code) {
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:3000");
      params.append("code_verifier", verifier);

      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const { access_token } = await result.json();
      return access_token;
    }

    //search function
    async function search(input) {
      const accessToken = Spotify.getAccessToken();
      //fetch request based on the user's input
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${input}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        });
    }

    //function implements saving to a spotify playlist
    async function savePlaylist(name, trackArray) {
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let user_id;
      let playlist_id;

      //check if the playlist exists or is empty
      if (!name || !trackArray.length) {
        return;
      } else {
        try {
          return fetch("https://api.spotify.com/v1/me", { headers: headers })
            .then((response) => response.json())
            .then(async (jsonResponse) => {
              user_id = jsonResponse.id;
              const response = await fetch(
                `https://api.spotify.com/v1/users/${user_id}/playlists`,
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ name: name }),
                }
              );
              const jsonResponse_1 = await response.json();
              const playlist_id = jsonResponse_1.id;
              return await fetch(
                `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ uris: trackArray }),
                }
              );
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}

export default Spotify;

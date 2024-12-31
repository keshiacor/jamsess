/*this is where we'll handle the user authorization, 
code verification and accessing the spotify api */

const clientId = "06a9a154ff0a4cf69e2a6ded5835ab4e"; //client id from spotify
const redirectUri = 'http://localhost:3000';
let accessToken;
 
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
/*
const Spotify = {
  getAccessToken() {
    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = getAccessToken(clientId, code);
    }

    function redirectToAuthCodeFlow(clientId) {
      const verifier = generateCodeVerifier(128);
    
      // Assuming generateCodeChallenge returns a Promise, use .then() to handle it
      generateCodeChallenge(verifier)
        .then((challenge) => {
          localStorage.setItem("verifier", verifier);
    
          const params = new URLSearchParams();
          params.append("client_id", clientId);
          params.append("response_type", "code");
          params.append("redirect_uri", "http://localhost:3000");
          params.append("scope", "user-read-private user-read-email");
          params.append("code_challenge_method", "S256");
          params.append("code_challenge", challenge);
    
          document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
        })
        .catch((error) => {
          console.error("Error during authentication redirect:", error);
        });
    }
  },

    function generateCodeVerifier(length) {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },

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
    function search(input) {
      const accessToken = Spotify.getAccessToken();
      // Return the promise chain to handle the response
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${input}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
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
        })
        .catch((error) => {
          console.error('Error during search:', error);
          return [];
        });
    }
    
  

    //function implements saving to a spotify playlist
    function savePlaylist(name, trackArray) {
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      
      if (!name || !trackArray.length) {
        return;
      }
    
      return fetch("https://api.spotify.com/v1/me", { headers: headers })
        .then((response) => response.json())
        .then((jsonResponse) => {
          const user_id = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ name: name })
          })
            .then((response) => response.json())
            .then((jsonResponse) => {
              const playlist_id = jsonResponse.id;
              
              return fetch(
                `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ uris: trackArray }),
                }
              );
            });
        })
        .catch((error) => {
          console.error("Error saving playlist:", error);
        });
    }
  

export default Spotify;*/

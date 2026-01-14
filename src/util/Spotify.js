const clientId = process.env.REACT_APP_CLIENT_ID; // replace with your client id from Spotify Developer Dashboard
// Redirect URI must exactly match one of the URIs in the Spotify Dashboard.
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
let accessToken;

// --- PKCE helpers --- //
function generateCodeVerifier(length = 128) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  let base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+/g, "");
}

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Handle return from Spotify (Authorization Code with PKCE)
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      const codeVerifier =
        sessionStorage.getItem("spotify_code_verifier") || "";
      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }).toString();

      const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const tokenJson = await tokenRes.json();
      if (tokenJson.access_token) {
        accessToken = tokenJson.access_token;
        const expiresIn = Number(tokenJson.expires_in || 3600);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // Clear query params while keeping the current path
        window.history.replaceState(null, "", window.location.pathname);
        return accessToken;
      }
      throw new Error(
        tokenJson.error_description ||
          tokenJson.error ||
          "Token exchange failed"
      );
    }

    // Start Authorization Code + PKCE
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    sessionStorage.setItem("spotify_code_verifier", codeVerifier);

    const scope = "playlist-modify-public"; // Add more scopes as needed
    const authorizeUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${encodeURIComponent(codeChallenge)}`;

    window.location.assign(authorizeUrl);
    return "";
  },

  async search(term) {
    const token = await Spotify.getAccessToken();
    if (!token) return [];
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        term
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonResponse = await response.json();
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
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris || !trackUris.length) return;
    const token = await Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const meRes = await fetch("https://api.spotify.com/v1/me", { headers });
    const me = await meRes.json();
    const userId = me.id;

    const playlistRes = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const playlist = await playlistRes.json();

    await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlist.id}/tracks`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  },
};
export default Spotify;

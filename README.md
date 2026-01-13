# JamSess

![JamSess app](https://github.com/keshiacor/jamsess/blob/main/src/interface.png)

⚠️⚠️⚠️ App is currently being migrated to use PKCE extension instead of implicit grant due to changes made by Spotify ⚠️⚠️⚠️

## Description

JamSess is a web application that allows users to search for songs, albums, and artists using the Spotify API. Users can add or remove a song to a playlist that can be saved to their Spotify account. The application is built using React, uses the Spotify API and deployed on Netlify.
For a running version of the app, visit [JamSess](https://jamsess.netlify.app/).

## 🌟 Demo

To see a demo video of the app, you can checkout this [Loom video](https://www.loom.com/share/582f6ad357484d099640dd1c6266b21b).

## Getting Started

- Clone the repository

```
https://github.com/keshiacor/jamsess.git
```

- Navigate to the project directory and install npm

```
npm install
```

- You will need to create a Spotify Developer account and create a new app to obtain a client ID and secret. Follow the instructions on the [Spotify API documentation](https://developer.spotify.com/documentation/web-api/concepts/apps) to get started
- Run the project

```
npm start
```

## Technologies

- React: React library is used here to build the user interface, create components, manage state and props.
- Spotify WebAPI:
- Netlify:
- Html: The structure of the web page is built using HTML.
- CSS: The styling of the app is done using CSS mainly.
- JavaScript: Used as programming language to handle the interactive functionality of the app.

## Features

- Users can search for a song based on title, artist or album
- Users can add a song to a playlist by clicking the "+" icon
- Users can remove a song from the playlist by clicking the "-" icon
- Users can save a the playlist to their Spotify account
- Users are redirected to sign in to their Spotify account upon searching for a song
- Users can provide a custom name to their playlist
- Users cannot save an empty playlist

## Important Dependencies

- React
- React-DOM
- React-Scripts
- NPM
- Node
- Spotify web API

## Roadmap/Upcoming Features and Work

- [ ] Preview of the track: Users will be able to preview the track by clicking on the play button.
- [ ] Track image: Users will be able to see the album image of the track. This will appear with their search results.
- [ ] More testing coverage
- [ ] Mobile app support for iOS

<div>
   <p align="left">
    <br />
     <h3>Want to help me make this app better</h3>
    <a href="https://github.com/keshiacor/todolist/issues/new?template=feature_request.md">Request Feature</a>
     <br/>
    <a href="https://github.com/keshiacor/todolist/issues/new?template=bug_report.md">Report Bug</a>
  </p>
</div>

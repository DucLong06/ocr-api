import React from 'react';
import Routers from "./router/Routers";

// Cyber APIs Hub Config
import $ from 'jquery'
import faviconUrl from './assets/media/logos/favicon.png'
import appleTouchIconUrl from './assets/media/logos/favicon.png'
const descriptionContent = 'CyberAPIs Hub'
const pageTitle = 'CyberAPIs Hub'

function App() {
    $('#cyber-icon').attr('href', faviconUrl)
    $('#cyber-apple-touch-icon').attr('href', appleTouchIconUrl)
    $('#cyber-description').attr('content', descriptionContent)
    $('#cyber-title').html(pageTitle)

    return <Routers />

}

export default App;

// ==UserScript==
// @name         AOTY Tidal Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a Tidal button to album pages on AOTY
// @match        https://www.albumoftheyear.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function addTidalButton() {
        console.log("Tidal Button script Triggers");
        const albumLinks = document.querySelector('div.albumLinks');
        if (!albumLinks || document.querySelector('a[title="Tidal"]')) return;

        const artist = document.querySelector('[itemprop="byArtist"] [itemprop="name"]')?.textContent.trim();
        const album = document.querySelector('h1.albumTitle [itemprop="name"]')?.textContent.trim();

        let tidalUrl;
        if (artist && album) {
            tidalUrl = `https://listen.tidal.com/search?q=${encodeURIComponent(artist + ' ' + album)}`;
        } else if (artist) {
            tidalUrl = `https://listen.tidal.com/search?q=${encodeURIComponent(artist)}`;
        } else if (album) {
            tidalUrl = `https://listen.tidal.com/search?q=${encodeURIComponent(album)}`;
        } else {
            tidalUrl = '#';
        }

        const tidalLink = document.createElement('a');
        tidalLink.href = tidalUrl;
        tidalLink.rel = 'nofollow';
        tidalLink.target = 'blank';
        tidalLink.title = 'Tidal';
        tidalLink.setAttribute('data-track-action', 'Tidal');
        tidalLink.innerHTML = `<div class="albumButton tidal"><i class="fa fa-external-link" aria-hidden="true"></i><span>Tidal</span></div>`;

        albumLinks.appendChild(tidalLink);
    }

    // Run after page load
    // window.addEventListener('load', addTidalButton);
    addTidalButton();
})();

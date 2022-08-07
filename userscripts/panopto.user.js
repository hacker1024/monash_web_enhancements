// ==UserScript==
// @name         Panopto Patcher
// @version      0.1.0
// @description  Adds various improvements to Panopto and Moodle.
// @author       hacker1024
// @homepageURL  https://github.com/hacker1024/monash_web_enhancements
// @iconURL      https://www.google.com/s2/favicons?sz=64&domain=monash.edu
// @match        https://lms.monash.edu/*
// @match        https://monash.au.panopto.com/Panopto/Pages/Viewer.aspx*
// @match        https://monash.au.panopto.com/Panopto/Pages/Embed.aspx*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // OPTIONS

    // Sets the default video quality.
    //
    // null: Don't set
    // 0: Low
    // 1: Medium
    // 2: High
    const defaultQuality = 2;

    // Replaces the embedded Panopto player with the full-featured player.
    const useFullPlayer = true;

    // Resizes the embedded player frame to a more useful size.
    // Enabling recommended especially when using the full player.
    const resizePlayer = true;

    // Disables the caption notice at the beginning of video playback.
    const hideCaptionNotice = true;

    // Enables captions by default.
    const defaultEnableCaptions = false;

    // Enables automatic log uploads. Leaving enabled recommended to avoid academic integrity concerns.
    const enableAutomaticLogsUpload = true;

    // PATCHES

    if (window.location.host === 'lms.monash.edu') {
        const panoptoFrames = [];
        const iframes = document.body.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; ++i) {
            const iframe = iframes.item(i);
            if (iframe.src.startsWith('https://monash.au.panopto.com/Panopto/Pages/Embed.aspx')) {
                panoptoFrames.push(iframe);
            }
        }

        for (const panoptoFrame of panoptoFrames) {
            if (resizePlayer) {
                panoptoFrame.width = '100%';
                panoptoFrame.height = 'auto';
                panoptoFrame.style.aspectRatio = '16 / 10';
            }
            if (useFullPlayer) {
                panoptoFrame.src = 'https://monash.au.panopto.com/Panopto/Pages/Viewer.aspx' + panoptoFrame.src.substring(54);
            }
        }
    }

    if (window.location.host === 'monash.au.panopto.com' && (window.location.pathname.endsWith('Viewer.aspx') || window.location.pathname.endsWith('Embed.aspx'))) {
        // noinspection JSUnresolvedVariable
        const viewer = window.Panopto.viewer;
        viewer.defaultMBRBitrate = defaultQuality;
        viewer.defaultSSFBitrate = defaultQuality;
        viewer.enableAutomaticLogsUpload = enableAutomaticLogsUpload;
        viewer.captionsEnabledByDefault = defaultEnableCaptions;
        viewer.showCopyrightNotice = !hideCaptionNotice;
    }
})();
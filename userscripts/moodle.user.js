// ==UserScript==
// @name         Moodle Modifier
// @version      0.1.0
// @description  Adds various improvements to Moodle.
// @author       hacker1024
// @homepageURL  https://github.com/hacker1024/monash_web_enhancements
// @iconURL      https://www.google.com/s2/favicons?sz=64&domain=monash.edu
// @match        https://lms.monash.edu/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // OPTIONS

    // Hides the copyright warning at the bottom of the page.
    const hideCopyrightWarning = true;

    // PATCHES

    if (hideCopyrightWarning) {
        for (const className of ['copyright', 'copyright-full', 'tool_dataprivacy']) {
            for (const element of document.body.getElementsByClassName(className)) {
                element.style.display = 'none';
            }
        }
    }

    // Hide the footer if it has no visible elements (otherwise, it will be visible due to padding).
    let footerPopulated = false;
    for (const footerElement of document.body.querySelectorAll('#page-footer .footer-container > :not(script)')) {
        if (footerElement.style.display !== 'none') {
            footerPopulated = true;
            break;
        }
    }
    if (!footerPopulated) document.getElementById('page-footer').style.display = 'none';
})();
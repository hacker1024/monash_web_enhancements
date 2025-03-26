// ==UserScript==
// @name         Moodle Modifier
// @version      0.2.0
// @description  Adds various improvements to Moodle.
// @author       hacker1024
// @homepageURL  https://github.com/hacker1024/monash_web_enhancements
// @iconURL      https://www.google.com/s2/favicons?sz=64&domain=monash.edu
// @match        https://learning.monash.edu/*
// @match        https://lms.monash.edu/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // OPTIONS

    // Hides the copyright warning at the bottom of the page.
    const hideCopyrightWarning = true;

    // Rewrites unit dashboard links using semantic HTML (e.g. fixes Ctrl+Click)
    const fixUnitDashboardLinks = true;

    // PATCHES

    function doHideCopyrightWarning() {
        for (const className of ['copyright', 'copyright-full', 'tool_dataprivacy']) {
            for (const element of document.body.getElementsByClassName(className)) {
                element.style.display = 'none';
            }
        }
    }

    function doFixUnitDashboardLinks() {
        if (!(window.location.pathname === '/course/view.php' && !new URLSearchParams(window.location.search).has('section'))) return;
        const nav = document.getElementsByClassName('mst-current-focus-nav');
        if (!nav) return;
        for (const element of [...nav[0].getElementsByClassName('mst-current-focus-nav-item')]) {
            // Extract the link.
            const linkCode = element.getAttribute('onclick');
            if (!linkCode || !(linkCode.startsWith("location.href='") && linkCode.endsWith("';"))) continue;
            const link = linkCode.slice("location.href='".length, -"';".length);

            // Prepare a parent anchor element.
            const parent = element.parentNode;
            const linkElement = document.createElement("a");
            element.removeAttribute('onclick');
            linkElement.href = link;
            for (const clazz of [...element.classList]) {
                if (clazz.startsWith('mst-current-focus-nav')) {
                    element.classList.remove(clazz);
                    linkElement.classList.add(clazz);
                }
            }

            // Wrap the old element.
            parent.replaceChild(linkElement, element);
            linkElement.appendChild(element);
        }
    }

    if (hideCopyrightWarning) doHideCopyrightWarning();
    if (fixUnitDashboardLinks) doFixUnitDashboardLinks();

    // Hide the footer if it has no visible elements (otherwise, it will be visible due to padding).
    // TODO: Handle tool_dataprivacy parent container on Moodle 4.x
    let footerPopulated = false;
    for (const footerElement of document.body.querySelectorAll('#page-footer .footer-container > :not(script)')) {
        if (footerElement.style.display !== 'none') {
            footerPopulated = true;
            break;
        }
    }
    if (!footerPopulated) document.getElementById('page-footer').style.display = 'none';
})();
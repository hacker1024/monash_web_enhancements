// ==UserScript==
// @name         Allocate+ Additions
// @version      0.2.0
// @description  Adds various improvements to Allocate+.
// @author       hacker1024
// @homepageURL  https://github.com/hacker1024/monash_web_enhancements
// @iconURL      https://www.google.com/s2/favicons?sz=64&domain=monash.edu
// @match        https://my-timetable.monash.edu/*/student*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Expand the window.
    document.getElementsByClassName('aplus-container')[0].style.maxWidth = "none";

    // Fix unsafe hasAlternativesActivities function.
    const originalHasAlternativesActivities = window.hasAlternativesActivities;
    window.hasAlternativesActivities = function (subjectCode, activityGroupCode, activityCode) {
        if (activityCode == null) return false;
        return originalHasAlternativesActivities(subjectCode, activityGroupCode, activityCode);
    }
})();
/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function (document) {
    'use strict';

    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    app.displayInstalledToast = function () {
        document.querySelector('#caching-complete').show();
    };

    app.playVideo = function () {
        document.querySelector('#promo-video-dialog').open();
        document.querySelector('#promo-video').play();
    };
    app.closeVideoCard = function () {
        document.querySelector('#promo-video-dialog').close();
        document.querySelector('#promo-video').pause();
        document.querySelector('#promo-video').seekTo(0);
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function () {
        console.log('Hello, folks! Welcome to GDG DevFest Paris 2016 website.');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function () {
        // imports are loaded and elements have been registered
    });
    // Done in HTMLImportsLoaded so I18nMsg will be defined by the time you set I18nMsg.lang.
    // This timing is necessary under the polyfill and is not needed if the browser supports HTML Imports, natively.
    document.addEventListener('HTMLImportsLoaded', function () {
        var language = 'en';
        if (navigator !== undefined && navigator.locales) {
            language = navigator.languages[0].substring(0, 2);
        }
        window.I18nMsg.lang = language;
        window.I18nMsg.url = 'locales'; // optionally use custom folder for locales.
    });

    app.getMarkdownUrl = function (markdownFile) {
        return '../../posts/' + window.I18nMsg.lang + '/' + markdownFile;
    };

    // Close drawer after menu item is selected if drawerPanel is narrow
    app.onMenuSelect = function () {
        var drawerPanel = document.querySelector('#paperDrawerPanel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    };
    /* jshint ignore:start */
    app.findByPropertyValue = function (array, property, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][property] == value) {
                return array[i];
            }
        }
    };
    /* jshint ignore:end */

    app.scrollToTop = function () {
        var heros = document.querySelectorAll('#hero');
        for (var i = heros.length - 1; i >= 0; i--) {
            app.smoothScroll(heros[i], 1000);
        }
    };

    app.generateClass = function (value) {
        return value.replace(/\s+/g, '-').toLowerCase();
    };

    app.smoothScroll = function (el, optDuration, optCallback) {
        var duration = optDuration || 1;

        var scrollContainer = document.querySelector('paper-drawer-panel [main]');

        var startTime = window.performance.now();
        var endTime = startTime + duration;
        var startTop = scrollContainer.scrollTop;
        var destY = el.getBoundingClientRect().top;

        if (destY === 0) {
            if (optCallback) {
                optCallback();
            }
            return; // already at top of element.
        }

        var callback = function (timestamp) {
            if (timestamp < endTime) {
                requestAnimationFrame(callback);
            }

            function smoothStep(start, end, point) {
                if (point <= start) {
                    return 0;
                }
                if (point >= end) {
                    return 1;
                }
                var x = (point - start) / (end - start);
                return x * x * (3 - 2 * x);
            }

            var point = smoothStep(startTime, endTime, timestamp);
            var scrollTop = Math.round(startTop + (destY * point));

            scrollContainer.scrollTop = scrollTop;

            if (point === 1 && optCallback) {
                optCallback();
            }
        };
        callback(startTime);
    };

})(document);

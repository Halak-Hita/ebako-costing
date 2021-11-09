/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});



// Nifty-demo.js
// ====================================================================
// Set user options for current page.
// This file is only used for demonstration purposes.
// ====================================================================
// - ThemeOn.net -


$(document).ready(function () {

    // SETTINGS WINDOW
    // =================================================================

    var demoSetBody = $('#demo-set');
    var demoSetIcon = $('#demo-set-icon');
    var demoSetBtnGo = $('#demo-set-btngo');

    if (demoSetBody.length) {
        $('html').on('click', function (e) {
            if (demoSetBody.hasClass('open')) {
                if (!$(e.target).closest('#demo-set').length) {
                    demoSetBody.removeClass('open');
                }
            }
        });
        $('#demo-set-btn').on('click', function (e) {
            e.stopPropagation();
            demoSetBody.toggleClass('open');
        });

        function are_cookies_enabled() {
            var cookieEnabled = (navigator.cookieEnabled) ? true : false;
            if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
                document.cookie = "testcookie";
                cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
            }
            return (cookieEnabled);
        }

        if (are_cookies_enabled() == false) {
            $.niftyNoty({
                type: 'danger',
                message: "Your browser's <strong>cookie</strong> functionality is turned off. Some settings won\'t work as expected....",
                container: '#demo-set-alert',
                closeBtn: false
            });

            $('#demo-set').addClass('no-cookie');
        }

    };

    setCookie('settings-animation', true);
    setCookie('settings-box-layout', 1);
    setCookie('settings-nav-fixed', false);
    setCookie('settings-nav-offcanvas', "slide");
    setCookie('settings-theme-name', "theme-ocean");
    setCookie('settings-theme-type', "a");
    
    // INIT - Check and apply all settings are available.
    // =================================================================

    if (typeof window.demoLayout !== 'undefined') return;


    var cookieList = [
        'settings-animation',
        'settings-box-layout',
        'settings-nav-fixed',
        'settings-nav-collapsed',
        'settings-nav-offcanvas',
        'settings-asd-visibility',
        'settings-asd-fixed',
        'settings-asd-align',
        'settings-asd-theme',
        'settings-navbar-fixed',
        'settings-footer-fixed',
        'settings-theme-type',
        'settings-theme-name'
    ],
        setCookie = function (name, value) {
            if (value == false) {
                $.removeCookie(name, {
                    path: '/'
                });
            } else {
                $.cookie(name, ((value === true) ? '1' : value), {
                    expires: 7,
                    path: '/'
                });
            }
        },
        removeAllCookie = function () {
            for (var i = 0; i < cookieList.length; i++) {
                $.removeCookie(cookieList[i], {
                    path: '/'
                });
            }
        };

     // Animation cookie
        if ($.cookie('settings-animation')) {
            if ($.cookie('settings-animation') == 'none') {
                nifty.container.removeClass('effect ' + effectList);
                animCheckbox.niftyCheck('toggleOff');
                transitionVal.prop('disabled', true).selectpicker('refresh');
            } else {
                animCheckbox.niftyCheck('toggleOn');
                nifty.container.addClass('effect ' + $.cookie('settings-animation'));
                transitionVal.selectpicker('val', $.cookie('settings-animation'))
            }
        }


        // Boxed Layout
        if ($.cookie('settings-box-layout') != 1) {
            boxedLayoutCheckbox.niftyCheck('toggleOn');
            nifty.container.addClass('boxed-layout');
        } else {
            boxedLayoutCheckbox.niftyCheck('toggleOff');
            nifty.container.removeClass('boxed-layout');
        };



        // Fixed navigation
        if ($.cookie('settings-nav-fixed') == 1 || nifty.container.hasClass('mainnav-fixed')) {
            navFixedCheckbox.niftyCheck('toggleOn');
            $.niftyNav('fixedPosition');
        } else {
            navFixedCheckbox.niftyCheck('toggleOff');
            $.niftyNav('staticPosition');
        };





        // Collapsed navigation
        if ($.cookie('settings-nav-collapsed') == 1) {
            collapsedCheckbox.niftyCheck('toggleOn');
            $.niftyNav('collapse');
            $('.mainnav-toggle').removeClass('push slide reveal')
        } else {
            collapsedCheckbox.niftyCheck('toggleOff');
            if ($.cookie('settings-nav-offcanvas')) {
                nifty.container.removeClass('mainnav-in mainnav-sm mainnav-lg');
                $.niftyNav($.cookie('settings-nav-offcanvas') + 'Out');
                $('.mainnav-toggle').removeClass('push slide reveal').addClass($.cookie('settings-nav-offcanvas'));
            }
        };



        if (nifty.container.hasClass('aside-in')) {
            asdVisCheckbox.niftyCheck('toggleOn');
        } else {
            asdVisCheckbox.niftyCheck('toggleOff');
        }



        if (nifty.container.hasClass('aside-fixed')) {
            asdFixedCheckbox.niftyCheck('toggleOn');
        } else {
            asdFixedCheckbox.niftyCheck('toggleOff');
        }


        if (nifty.container.hasClass('aside-left')) {
            asdPosCheckbox.niftyCheck('toggleOn');
        } else {
            asdPosCheckbox.niftyCheck('toggleOff');
        }


        if (nifty.container.hasClass('aside-left')) {
            asdThemeCheckbox.niftyCheck('toggleOn');
        } else {
            asdThemeCheckbox.niftyCheck('toggleOff');
        }





        // Fixed navbar
        if ($.cookie('settings-navbar-fixed') == 1 || nifty.container.hasClass('navbar-fixed')) {
            navbarFixedCheckbox.niftyCheck('toggleOn');
            nifty.container.addClass('navbar-fixed');

            // Refresh the aside, to enable or disable the "Bootstrap Affix" when the navbar is in a "static position".
            nifty.mainNav.niftyAffix('update');
            nifty.aside.niftyAffix('update');
        } else {
            navbarFixedCheckbox.niftyCheck('toggleOff');
            nifty.container.removeClass('navbar-fixed');

            // Refresh the aside, to enable or disable the "Bootstrap Affix" when the navbar is in a "static position".
            nifty.mainNav.niftyAffix('update');
            nifty.aside.niftyAffix('update');
        };


    // Fixed navbar
    if ($.cookie('settings-navbar-fixed') == 1 || nifty.container.hasClass('navbar-fixed')) {
        navbarFixedCheckbox.niftyCheck('toggleOn');
        nifty.container.addClass('navbar-fixed');

        // Refresh the aside, to enable or disable the "Bootstrap Affix" when the navbar is in a "static position".
        nifty.mainNav.niftyAffix('update');
        nifty.aside.niftyAffix('update');
    } else {
        navbarFixedCheckbox.niftyCheck('toggleOff');
        nifty.container.removeClass('navbar-fixed');

        // Refresh the aside, to enable or disable the "Bootstrap Affix" when the navbar is in a "static position".
        nifty.mainNav.niftyAffix('update');
        nifty.aside.niftyAffix('update');
    };

});

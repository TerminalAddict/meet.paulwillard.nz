$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
     });
     // scroll body to 0px on click
     $('#back-to-top').click(function () {
         $('#back-to-top').tooltip('hide');
         $('body,html').animate({
             scrollTop: 0
         }, 800);
         return false;
     });
     $('#back-to-top').mouseover(function() {
         $('#back-to-top').tooltip('show');
     });
     $(".myAge").html(Math.floor((new Date() - new Date('1973-07-03').getTime()) / 3.15576e+10));
     $(".arrow").click(function(){
         $('html, body').animate({
                scrollTop: $("#start").offset().top
            }, 500);
     });
    $('a[data-mail]').on('click', function() {
        window.location = 'mailto:' + $(this).data('mail')+'@'+$(this).data('domain') + '?subject=Somebody wants to meet you Paul.';
    });
    $('.nav-tabs-top a[data-toggle="tab"]').on('click', function(){
        // console.log("click top");
        $('.nav-tabs-bottom a.active').removeClass('active');
        $('.nav-tabs-bottom a[href="'+$(this).attr('href')+'"]').addClass('active');
    });
    $('.nav-tabs-bottom a[data-toggle="tab"]').on('click', function(){
        $('.nav-tabs-top a.active').removeClass('active');
        $('.nav-tabs-top a[href="'+$(this).attr('href')+'"]').addClass('active');
        $('html, body').animate({
            scrollTop: $("#nav-tabContent").offset().top
        }, 500);
    });
});

var svg = '<svg width="200" height="200" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
' viewBox="0 0 50 55" style="enable-background:new 0 0 50 50;" xml:space="preserve">' +
'<style type="text/css">' +
'  .st0{fill:#FDDA3E;}' +
'  .st1{fill:#FFFFFF;}' +
'  .bounce{' +
'    transform-origin: center center;' +
'    animation-name: bounce;' +
'    animation-duration: 720ms;' +
'    animation-timing-function: cubic-bezier(.25,.72,.15,1.17);' +
'    animation-iteration-count: infinite;' +
'  }' +
'  @keyframes bounce {' +
'    0%, 50%, 100% {' +
'      transform:' +
'        rotate3d(0, 0, 0, 0deg)' +
'        translate3d(0, 5px, 0);' +
'    }' +
'    20% {' +
'      transform:' +
'        rotate3d(0, 0, 1, 4deg)' +
'        translate3d(0, 0, 0);' +
'    }' +
'    70% {' +
'      transform:' +
'        rotate3d(0, 0, 1, -4deg)' +
'        translate3d(0, 0, 0);' +
'    }' +
'  }' +
'</style>' +
'<g class="bounce">' +
'  <circle class="st0" cx="25" cy="25" r="25"/>' +
'  <polygon points="44.5,21 3.9,21 3.9,24.3 5.7,24.3 5.7,25.9 7.1,25.9 7.1,27.4 8.8,27.4 8.8,29 20.2,29 20.2,27.4 21.8,27.4' +
'        21.8,25.9 23.4,25.9 23.4,24.3 26.7,24.3 26.7,25.9 28.2,25.9 28.2,27.4 29.8,27.4 29.8,29 41.2,29 41.2,27.4 42.8,27.4' +
'        42.8,25.9 44.5,25.9 44.5,24.3 44.5,24.2 46.1,24.2 46.1,22.6 46.1,21"/>' +
'  <rect x="7.1" y="22.5" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="10.5" y="22.5" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="8.8" y="24.2" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="12.1" y="24.2" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="10.5" y="25.8" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="13.8" y="25.8" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="28.2" y="22.5" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="31.5" y="22.5" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="29.8" y="24.2" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="33.1" y="24.2" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="31.5" y="25.8" class="st1" width="1.6" height="1.6"/>' +
'  <rect x="34.8" y="25.8" class="st1" width="1.6" height="1.6"/>' +
'</g>' +
'</svg>';

var svgDataUrl = "data:image/svg+xml;base64," + btoa(svg);
console.log('%c ', "background-image: url(" + svgDataUrl + "); padding-bottom: 100px; padding-left: 100px; margin: 20px; background-size: contain; background-position: center center; background-repeat: no-repeat; line-height: 20em;");

var curyear = new Date().getFullYear();
console.log("%cAll code is copyright © Paul Willard " + curyear, "font: 2em sans-serif; color: yellow; background-color: red;");
console.log("%cAuthor: Paul Willard <paul@paulwillard.nz>", "font: 1.5em sans-serif; color: yellow; background-color: red;");

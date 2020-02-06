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
    // register a service worker for offline content
    var now=Date.now();
    if ("serviceWorker" in navigator) {
         navigator.serviceWorker.register('/sw.js?'+now).then(function() {
             // console.log('CLIENT: service worker registration complete.');
            }, function () {
             console.log('CLIENT: service worker registration failure.');
            });
    } else {
        console.log('CLIENT: service worker is not supported.');
    }
    $('.nav-tabs-top a[data-toggle="tab"]').on('click', function(){
        console.log("click top");
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

var curyear = new Date().getFullYear();
console.log("%cAll code is copyright © Paul Willard " + curyear, "font: 2em sans-serif; color: yellow; background-color: red;");
console.log("%cAuthor: Paul Willard <paul@paulwillard.nz>", "font: 1.5em sans-serif; color: yellow; background-color: red;");

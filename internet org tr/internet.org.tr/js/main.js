'use strict';
$(window).load(function () {


    // LIGHTBOX VIDEO
    $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-doc').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
    });

    //PRELOADER
    /** Loader */
    var loader = $(".loader");
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var o = 0;

    loader.css({
        top: wHeight / 2 - 2.5,
        left: wWidth / 2 - 200
    })

    do {
        loader.animate({
            width: o
        }, 10)
        o += 3;
    } while (o <= 400)
    if (o === 402) {
        loader.animate({
            left: 0,
            width: '100%'
        })
        loader.animate({
            top: '0',
            height: '100vh'
        })
    }

    setTimeout(function () {
        $(".loader-wrapper").fadeOut('fast');
        (loader).fadeOut('fast');
    }, 3500);



    // PORTFOLIO ISOTOPE
    if ($('.isotope_items').length) {

        var $container = $('.isotope_items');
        $container.isotope();

        $('.portfolio_filter ul li').on("click", function () {
            $(".portfolio_filter ul li").removeClass("select-cat");
            $(this).addClass("select-cat");
            var selector = $(this).attr('data-filter');
            $(".isotope_items").isotope({
                filter: selector,
                layoutMode: 'fitRows',
                cellsByRow: {
                    columnWidth: 220,
                    rowHeight: 220
                },
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                },
                sortBy: ['number', 'category'],
                getSortData: {
                    category: '[data-type]', // value of attribute
                    number: '[data-year]'
                }
            });
            return false;
        });

    }

}); // window load end 



$(document).ready(function () {


    // WOW JS
    new WOW({
        mobile: false
    }).init();



    //SMOOTH SCROLL
    $(document).on("scroll", onScroll);
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
            if ($(window).width() < 768) {
                $('.nav-menu').slideUp();
            }
        });

        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        target = $(target);
        $('html, body').stop().animate({
            'scrollTop': target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target.selector;
            $(document).on("scroll", onScroll);
        });
    });


    function onScroll(event) {
        if ($('#home').length) {
            var scrollPos = $(document).scrollTop();
            $('nav ul li a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos){
                    $('nav ul li a').removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            });
        }
    }




    //NAVBAR SHOW - HIDE
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var homeheight = $(".home").height() - 86;

        if (scroll > homeheight) {
            $("nav").slideDown(100);
        } else {
            $("nav").slideUp(100);
        }
    });


    // RESPONSIVE MENU
    $('.responsive').on('click', function (e) {
        $('.nav-menu').slideToggle();
    });


    // HOME PAGE HEIGHT
    function centerInit() {
        var hometext = $('.home')

        hometext.css({
            "height": $(window).height() + "px"
        });
    }
    centerInit();
    $(window).resize(centerInit);


    // HOME TYPED JS
    if ($('.element').length) {
        $('.element').each(function () {
            $(this).typed({
                strings: [$(this).data('text1'), $(this).data('text2')],
                loop: $(this).data('loop') ? $(this).data('loop') : false,
                backDelay: $(this).data('backdelay') ? $(this).data('backdelay') : 2000,
                typeSpeed: 10,
            });
        });
    }



    // MAGNIFIC POPUP FOR PORTFOLIO PAGE
    $('.link').magnificPopup({
        type: 'image',
        titleSrc: 'title',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    // OWL CAROUSEL GENERAL JS
    var owlcar = $('.owl-carousel');
    if (owlcar.length) {
        owlcar.each(function () {
            var $owl = $(this);
            var itemsData = $owl.data('items');
            var autoPlayData = $owl.data('autoplay');
            var paginationData = $owl.data('pagination');
            var navigationData = $owl.data('navigation');
            var stopOnHoverData = $owl.data('stop-on-hover');
            var itemsDesktopData = $owl.data('items-desktop');
            var itemsDesktopSmallData = $owl.data('items-desktop-small');
            var itemsTabletData = $owl.data('items-tablet');
            var itemsTabletSmallData = $owl.data('items-tablet-small');
            $owl.owlCarousel({
                items: itemsData,
                pagination: paginationData,
                navigation: navigationData,
                autoPlay: autoPlayData,
                stopOnHover: stopOnHoverData,
                navigationText: ["<", ">"],
                itemsCustom: [
                    [0, 1],
                    [500, itemsTabletSmallData],
                    [710, itemsTabletData],
                    [992, itemsDesktopSmallData],
                    [1199, itemsDesktopData]
                ],
            });
        });
    }


}); // document ready end 



/* Contact Form JS*/
(function ($) {
    'use strict';

    $(".contact-form").on('submit', function (e) {
        e.preventDefault();

        var uri = $(this).attr('action');
        $("#con_submit").val('Wait...');
        var con_name = $("#con_name").val();
        var con_email = $("#con_email").val();
        var con_message = $("#con_message").val();

        var required = 0;
        $(".requie", this).each(function () {
            if ($(this).val() == '') {
                $(this).addClass('reqError');
                required += 1;
            } else {
                if ($(this).hasClass('reqError')) {
                    $(this).removeClass('reqError');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0) {
            $.ajax({
                type: "POST",
                url: 'mail.php',
                data: {
                    con_name: con_name,
                    con_email: con_email,
                    con_message: con_message
                },
                success: function (data) {
                    $(".contact-form input, .contact-form textarea").val('');
                    $("#con_submit, .sitebtn").val('Done!');
                    $("#con_submit .sitebtn").addClass("ok");
                }
            });
        } else {
            $("#con_submit, .sitebtn").val('Failed!');
        }
    });
    $(".requie").keyup(function () {
        $(this).removeClass('reqError');
    });

    var map = L.map('map');
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'greench.n73j331o',
        accessToken: 'pk.eyJ1IjoiZ3JlZW5jaCIsImEiOiJjamUzdW4wbDkyZHh2MnFvNnFiNTlzeWFiIn0.rvp7E-OS2dviX1jto-WD4g'
    }).addTo(map);
    var latlng = [39.894, 32.78615];
    var marker = L.marker(latlng).addTo(map);
    map.setView(latlng, 16);
    map.scrollWheelZoom.disable();
    var popup = L.popup()
        .setLatLng([39.89496, 32.7863])
        .setContent('<p style="text-align:center">Orta Doğu Teknik Üniversitesi<br>Kongre ve Kültür Merkezi</p>')
        .openOn(map);


})(jQuery);
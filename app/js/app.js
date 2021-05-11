
$(document).ready(function(){
    var Marquee = function (element, defaults) {
        var elem = document.getElementById(element),
            options = (defaults === undefined) ? {} : defaults,
            continuous = options.continuous || true,	// once or continuous
            direction = options.direction || 'ltr', 	// ltr or rtl
            loops = options.loops || -1,
            speed = options.speed || 0.5,
            milestone = 0,
            marqueeElem = null,
            elemWidth = null,
            self = this,
            ltrCond = 0,
            loopCnt = 0,
            start = 0,
            textcolor = options.textcolor || '#000000', // Define the text color
            bgcolor = options.bgcolor || '#ffffff', // Define the background color
            opacity = options.opacity || 1.0,
            process = null,
            constructor = function (elem) {

                // Build html
                var elemHTML = elem.innerHTML;
                var elemNode = elem.childNodes[1] || elem;
                elemWidth = elemNode.offsetWidth;
                marqueeElem = '<div>' + elemHTML + '</div>';
                elem.innerHTML = marqueeElem;
                marqueeElem = elem.getElementsByTagName('div')[0];
                elem.style.overflow = 'hidden';
                marqueeElem.style.whiteSpace = 'nowrap';
                marqueeElem.style.position = 'relative';
                marqueeElem.style.color = textcolor;
                marqueeElem.style.backgroundColor = bgcolor;
                marqueeElem.style.opacity = opacity;

                if (continuous) {
                    marqueeElem.innerHTML += elemHTML;
                    marqueeElem.style.width = '200%';

                    if (direction === 'ltr') {
                        start = -elemWidth;
                    }
                } else {
                    ltrCond = elem.offsetWidth;

                    if (direction === 'rtl') {
                        milestone = ltrCond;
                    }
                }

                if (direction === 'ltr') {
                    milestone = -elemWidth;
                } else if (direction === 'rtl') {
                    speed = -speed;
                }

                self.start();

                return marqueeElem;
            }

        this.start = function () {
            process = window.setInterval(function () {
                self.play();
            });
        };

        this.play = function () {
            // beginning
            marqueeElem.style.left = start + 'px';
            start = start + speed;

            if (start > ltrCond || start < -elemWidth) {
                start = milestone;
                loopCnt++;

                if (loops !== -1 && loopCnt >= loops) {
                    marqueeElem.style.left = 0;
                }
            }
        }

        this.end = function () {
            window.clearInterval(process);
        }

        // Init plugin
        marqueeElem = constructor(elem);
    }
    new Marquee('run-stripe-1', {
        bgcolor: 'none',
    });
    new Marquee('run-stripe-2', {
        bgcolor: 'none',
        direction: 'rtl'
    });
    const slider = $(".owl-carousel").owlCarousel({
        center: true,
        items:5,
        loop:true,
        margin:0,
        nav:false,
        dots:false,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        autoplayHoverPause: false,
        touchDrag  : false,
        mouseDrag  : false,
        responsive:{
            0:{
                items:1,
                touchDrag  : true
            },
            600:{
                items:3,
            },
            1000:{
                items:5
            }
        }
    });
    $("#menu").on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),

        top = $(id).offset().top;

        $('body,html').animate({scrollTop: top-100}, 1000);
    });
    $("#menu-2").on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),

            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top-100}, 1000);
    });
    let f_click = false;
    function resized(){
        if ( $(window).width() < 992 ) {
            if(f_click === false)
            {
                $(".center-menu").on('click', function() {
                    $(this).toggleClass("click")
                    $(" .header .header-menu-2 ").slideToggle();
                    $(" body ").toggleClass("pos-fixed");
                });
                $("#menu-2 li a").on('click', function() {
                    $(" body ").removeClass("pos-fixed");
                    $(" .header .header-menu-2 ").slideToggle();
                    $(".center-menu").removeClass("click")
                });
            }

            f_click = true;
        }
    }

    $(window).on('resize', function() {
        resized();
    });
    $(window).on('load', function() {
        resized();
    });
    $(window).scroll(function() {
        if ($(document).scrollTop() > 400) {
            $('.scroll-top').addClass('show');
        } else {
            $('.scroll-top').removeClass('show');
        }
    });
})
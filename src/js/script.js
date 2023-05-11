$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
            // {
            //     breakpoint: 768,
            //     settings: {
            //         arrows: false,
            //         centerMode: true,
            //         centerPadding: '40px',
            //         slidesToShow: 1
            //    }
            // },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         arrows: false,
        //         centerMode: true,
        //         centerPadding: '40px',
        //         slidesToShow: 1
        //       }
        //     }
        ]
        //autoplay: true,
        //autoplaySpeed: 2000
        //fade: true,
        //cssEase: 'linear'
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });         
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    //закриття модальних вікон
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('0.75');
    });

    //Кнопка Купити
    //$('.button_mini').on('click', function() {
    //    $('.overlay, #order').fadeIn('slow');
    //});

    //each - перебір елементів, виконання функції для кожного з них
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            //Заміняємо текст в формі.
            // $('.catalog-item__subtitle').eq(i).text() - знаходимо і отримуємо текст з того блоку по якому клікнули
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // ВАЛІДАЦІЯ ФОРМ
    // $('.feed-form').validate(); Плагін валідації працює лише з першою знайденою формою, тому потрібно задавати кожну окремо
    // $('#consultation form').validate();
    // $('#consultation-form').validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //         }, 
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         // name: "Впишіть своє ім'я",
    //         phone: "Напишіть номер свого телефону",
    //         email: {
    //             required: "Впишіть свою пошту",
    //             email: "Адреса повинна бути в форматі name@domain.com"
    //         }
    //     }
    // });
    // $('#order form').validate();

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                }, 
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                // name: "Впишіть своє ім'я",
                phone: "Напишіть номер свого телефону",
                email: {
                    required: "Впишіть свою пошту",
                    email: "Адреса повинна бути в форматі name@domain.com"
                }
            }
        });
    }

    valideForms('#order form');
    valideForms('#consultation-form');
    valideForms('#consultation form');

    //переклад плагіна валідації з дистрибутива, вміст файла jquery.maskedinput.min.js
    !function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.messages,{required:"Це поле необхідно заповнити.",remote:"Будь ласка, введіть правильне значення.",email:"Будь ласка, введіть коректну адресу електронної пошти.",url:"Будь ласка, введіть коректний URL.",date:"Будь ласка, введіть коректну дату.",dateISO:"Будь ласка, введіть коректну дату у форматі ISO.",number:"Будь ласка, введіть число.",digits:"Вводите потрібно лише цифри.",creditcard:"Будь ласка, введіть правильний номер кредитної карти.",equalTo:"Будь ласка, введіть таке ж значення ще раз.",extension:"Будь ласка, виберіть файл з правильним розширенням.",maxlength:a.validator.format("Будь ласка, введіть не більше {0} символів."),minlength:a.validator.format("Будь ласка, введіть не менше {0} символів."),rangelength:a.validator.format("Будь ласка, введіть значення довжиною від {0} до {1} символів."),range:a.validator.format("Будь ласка, введіть число від {0} до {1}."),max:a.validator.format("Будь ласка, введіть число, менше або рівно {0}."),min:a.validator.format("Будь ласка, введіть число, більше або рівно {0}.")}),a});

    // Маска введення номера
    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // pageup
    //$(window).scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Smooth scroll Плавна анімація скролу посилань
    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    // Ще один приклад плавної анімації
    // Add smooth scrolling to all links
    // $("a").on('click', function(event) {

    // // Make sure this.hash has a value before overriding default behavior
    //     if (this.hash !== "") {
    //     // Prevent default anchor click behavior
    //     event.preventDefault();

    //     // Store hash
    //     var hash = this.hash;

    //     // Using jQuery's animate() method to add smooth page scroll
    //     // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    //     $('html, body').animate({
    //         scrollTop: $(hash).offset().top
    //     }, 800, function() {

    //         // Add hash (#) to URL when done scrolling (default click behavior)
    //         window.location.hash = hash;
    //     });
    //     } // End if
    // });

    // Анімація починається тобі, як дійде скрол до блоку
    new WOW().init();

});
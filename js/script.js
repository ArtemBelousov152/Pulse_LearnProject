$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow_prev.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrow_next.png"></button></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  arrows: false,
                  dots: true
                }
            }          
        ]
      });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });/* tabs scrips */

    function toggleSlide (item) {
        $(item).each(function(i){
            $(this).on('click',function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    };

    toggleSlide('.catalog-item__back')
    toggleSlide('.catalog-item__link')

    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    // Close the modal window with a cross
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    // Close the modal window by clicking on the screen
    $('.overlay').click(function(e) {
		if ($(e.target).closest('.modal').length == 0) {
			$('.overlay, #consultation, #order, #thanks').fadeOut();					
		}
	});

    // Open modal window buy order
    $('.button_mini').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // Validation form
    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: "required"
            },
            messages: {
                name: {
                    required: "Введите ваше имя",
                    minlength: jQuery.validator.format("Нужно ввести {0} или больше символов")
                },
                phone: "Введите ваш номер телефона",
                email: {
                  required: "Введите свой почтовый адрес",
                  email: "Не верный формат почтового адреса"
                }
            }
        });
    };

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    // Masked phone
    $("input[name=phone]").mask("+7(999) 999-99-99");
    // Send email
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
});